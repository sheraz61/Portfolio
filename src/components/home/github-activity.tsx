import { ArrowUpRightIcon } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import type { ContributionDay, ContributionLevel, GitHubContributions } from '@/lib/github-contributions'
import { cn } from '@/lib/utils'

/* How many recent weeks fit the hero column */
const WEEKS = 34

/* Monochrome scale: darker squares mean more contributions, in both themes */
const LEVEL_CLASS: Record<ContributionLevel, string> = {
    0: 'bg-foreground/[0.07]',
    1: 'bg-foreground/25',
    2: 'bg-foreground/45',
    3: 'bg-foreground/70',
    4: 'bg-foreground',
}

function formatDay(day: ContributionDay) {
    const date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    })
    const what = day.count === 0 ? 'No contributions' : `${day.count} contribution${day.count === 1 ? '' : 's'}`
    return `${what} on ${date}`
}

/* Columns of 7 (Sunday first), like GitHub's own graph; leading days of the first week stay empty */
function toWeeks(days: ContributionDay[]) {
    const weeks: (ContributionDay | null)[][] = []
    for (const day of days) {
        const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay()
        if (weeks.length === 0 || weekday === 0) weeks.push(Array(weekday).fill(null))
        weeks[weeks.length - 1].push(day)
    }
    return weeks.slice(-WEEKS)
}

export function GitHubActivity({ data, className }: { data: GitHubContributions; className?: string }) {
    const weeks = toWeeks(data.days)
    const recentTotal = weeks.flat().reduce((sum, d) => sum + (d?.count ?? 0), 0)

    return (
        <div className={className}>
            {/* Header: total on the left, profile link on the right */}
            <div className="flex items-center justify-between gap-3">
                <p className="inline-flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <FaGithub className="size-3.5 shrink-0 text-foreground" />
                    <span className="truncate">
                        <span className="font-semibold text-foreground">{data.total.toLocaleString('en-US')}</span>{' '}
                        contributions in the last year
                    </span>
                </p>
                <a
                    href={data.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                >
                    @{data.username}
                    <ArrowUpRightIcon className="size-3" />
                </a>
            </div>

            {/* Heatmap: hover a square for that day's count */}
            <div
                role="img"
                aria-label={`${recentTotal} GitHub contributions in the last ${WEEKS} weeks, ${data.total} in the last year`}
                className="mt-2 grid gap-[2px]"
                style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
            >
                {weeks.map((week, w) => (
                    <div key={w} className="grid grid-rows-7 gap-[2px]">
                        {Array.from({ length: 7 }, (_, d) => {
                            const day = week[d]
                            return day ? (
                                <span
                                    key={day.date}
                                    title={formatDay(day)}
                                    className={cn(
                                        'aspect-square rounded-[2px] transition-transform duration-150 hover:scale-125',
                                        LEVEL_CLASS[day.level]
                                    )}
                                />
                            ) : (
                                <span key={d} className="aspect-square" />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
