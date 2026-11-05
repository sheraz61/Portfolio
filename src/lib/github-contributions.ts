/*
 * Public GitHub contribution calendar (the green squares on a profile), fetched on the server.
 * github.com/users/<username>/contributions serves it as HTML without a token, so we read each
 * day's date, level and count from it. The result is cached and refreshed every 12 hours.
 */

export const GITHUB_USERNAME = 'sheraz61'

const REVALIDATE_SECONDS = 60 * 60 * 12

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type ContributionDay = {
    /** YYYY-MM-DD */
    date: string
    count: number
    level: ContributionLevel
}

export type GitHubContributions = {
    username: string
    profileUrl: string
    /** Total for the last year, as GitHub reports it */
    total: number
    /** Oldest first */
    days: ContributionDay[]
    currentStreak: number
    longestStreak: number
}

function attr(tag: string, name: string) {
    return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]
}

function parseCalendar(html: string) {
    // Tooltips carry the exact count: "3 contributions on October 4th." / "No contributions on …"
    const counts = new Map<string, number>()
    for (const [, forId, text] of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
        counts.set(forId, Number(text.match(/^(\d+) contributions?/)?.[1] ?? 0))
    }

    const days: ContributionDay[] = []
    for (const [tag] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
        const date = attr(tag, 'data-date')
        const id = attr(tag, 'id')
        const level = Number(attr(tag, 'data-level') ?? 0)
        if (!date || !id) continue
        days.push({ date, count: counts.get(id) ?? 0, level: Math.min(4, Math.max(0, level)) as ContributionLevel })
    }
    days.sort((a, b) => a.date.localeCompare(b.date))

    const heading = html.match(/id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? ''
    const reportedTotal = Number(heading.replace(/[^\d]/g, '') || NaN)
    const total = Number.isFinite(reportedTotal) ? reportedTotal : days.reduce((sum, d) => sum + d.count, 0)

    return { days, total }
}

function streaks(days: ContributionDay[]) {
    let longest = 0
    let run = 0
    for (const day of days) {
        run = day.count > 0 ? run + 1 : 0
        longest = Math.max(longest, run)
    }

    // Current streak counts back from today; an empty today doesn't break it yet
    let current = 0
    let i = days.length - 1
    if (i >= 0 && days[i].count === 0) i--
    while (i >= 0 && days[i].count > 0) {
        current++
        i--
    }
    return { current, longest }
}

/** Returns null if GitHub can't be reached or the page format changes, so callers can hide the widget. */
export async function getGitHubContributions(username = GITHUB_USERNAME): Promise<GitHubContributions | null> {
    try {
        const res = await fetch(`https://github.com/users/${username}/contributions`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-site)' },
            next: { revalidate: REVALIDATE_SECONDS },
        })
        if (!res.ok) return null

        const { days, total } = parseCalendar(await res.text())
        if (days.length === 0) return null

        const { current, longest } = streaks(days)
        return {
            username,
            profileUrl: `https://github.com/${username}`,
            total,
            days,
            currentStreak: current,
            longestStreak: longest,
        }
    } catch {
        return null
    }
}
