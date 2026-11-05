import archive from '@/data/medium-archive.json'
import { FEED_URL, MEDIUM_USERNAME, parseMediumFeed } from './medium-feed.mjs'

/*
 * Articles are written on Medium. The site merges two sources:
 *  - the live Medium RSS feed (latest 10 posts, refreshed every few hours), so new posts appear on their own
 *  - src/data/medium-archive.json, which keeps every older post (refresh it with `npm run articles:sync`)
 * Sections and DDIA chapters come from OVERRIDES below, or are guessed from the Medium tags.
 */

export const MEDIUM_PROFILE = `https://medium.com/@${MEDIUM_USERNAME}`

const REVALIDATE_SECONDS = 60 * 60 * 6
const NEW_FOR_DAYS = 7

export type SectionKey = 'ddia' | 'system-design' | 'backend' | 'frontend' | 'devops' | 'other'

export const SECTIONS: { key: SectionKey; label: string }[] = [
    { key: 'ddia', label: 'DDIA' },
    { key: 'system-design', label: 'System Design' },
    { key: 'backend', label: 'Backend' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'devops', label: 'DevOps' },
    { key: 'other', label: 'Other reading' },
]

/* Designing Data-Intensive Applications, 2nd edition (Kleppmann & Riccomini) */
export const DDIA_CHAPTERS: { number: number; title: string }[] = [
    { number: 1, title: 'Trade-offs in Data Systems Architecture' },
    { number: 2, title: 'Defining Nonfunctional Requirements' },
    { number: 3, title: 'Data Models and Query Languages' },
    { number: 4, title: 'Storage and Retrieval' },
    { number: 5, title: 'Encoding and Evolution' },
    { number: 6, title: 'Replication' },
    { number: 7, title: 'Sharding' },
    { number: 8, title: 'Transactions' },
    { number: 9, title: 'The Trouble with Distributed Systems' },
    { number: 10, title: 'Consistency and Consensus' },
    { number: 11, title: 'Batch Processing' },
    { number: 12, title: 'Stream Processing' },
    { number: 13, title: 'A Philosophy of Streaming Systems' },
    { number: 14, title: 'Doing the Right Thing' },
]

/*
 * Per-article placement, keyed by Medium post id (the hex at the end of the URL).
 * The first section is the article's home; it also appears under the others when filtering.
 * For a new DDIA post, add a line here with its chapter.
 */
const OVERRIDES: Record<string, { sections: SectionKey[]; ddiaChapter?: number }> = {
    // DDIA, chapter 1
    '21ae4e66b57b': { sections: ['ddia', 'system-design'], ddiaChapter: 1 }, // Bank app vs sales report (OLTP / OLAP)
    '268f2e662fda': { sections: ['ddia', 'system-design', 'devops'], ddiaChapter: 1 }, // Servers you rent vs own
    // DDIA, chapter 2
    '21be16fb7ba0': { sections: ['ddia', 'system-design'], ddiaChapter: 2 }, // Celebrity post breaks a database
    b6894c07c31f: { sections: ['ddia', 'system-design'], ddiaChapter: 2 }, // Retries make everything worse
    '919ff0972eee': { sections: ['ddia', 'system-design'], ddiaChapter: 2 }, // Poorly scoped circuit breaker
    e3e3a619f437: { sections: ['ddia', 'system-design'], ddiaChapter: 2 }, // Server saying no on purpose
    '990918bb0dfc': { sections: ['ddia', 'system-design'], ddiaChapter: 2 }, // Average response time is lying
    '9a4af87e155f': { sections: ['ddia', 'system-design'], ddiaChapter: 2 }, // Three questions every data system answers
    // Frontend
    '86e4ba783d0b': { sections: ['frontend', 'backend'] }, // Route handlers & middleware in Next.js
    '552368dac5ac': { sections: ['frontend'] }, // Parallel & intercepting routes
    '299100d97146': { sections: ['frontend'] }, // Next.js routing and rendering
    '32d6b4ffe8f0': { sections: ['frontend'] }, // React renders, memoization, refs
    // Backend
    fd95f6ca69f0: { sections: ['backend', 'frontend'] }, // Event loop, memory, GC
    '48e72a0178a3': { sections: ['backend', 'frontend'] }, // How JavaScript engines work (V8)
    // DevOps
    '68965998a6bb': { sections: ['devops'] }, // Laptop to millions of users (CI/CD)
}

/* Fallback for posts without an override, from their Medium tags */
function guessSections(tags: string[]): SectionKey[] {
    const has = (...words: string[]) => tags.some((t) => words.some((w) => t.toLowerCase().includes(w)))
    const sections: SectionKey[] = []
    if (has('dia-d', 'ddia')) sections.push('ddia', 'system-design')
    if (has('system-design', 'distributed', 'scalab', 'architecture')) sections.push('system-design')
    if (has('node', 'express', 'backend', 'api', 'database')) sections.push('backend')
    if (has('react', 'next', 'frontend', 'css', 'javascript-frameworks')) sections.push('frontend')
    if (has('devops', 'docker', 'kubernetes', 'aws', 'ci-cd', 'cloud')) sections.push('devops')
    return sections.length ? [...new Set(sections)] : ['other']
}

type StoredArticle = {
    id: string
    title: string
    link: string
    date: string
    readMinutes: number
    description: string
    tags: string[]
    mediumTags?: string[]
    cover?: string
}

export type Article = StoredArticle & {
    sections: SectionKey[]
    ddiaChapter?: number
    isNew: boolean
}

function withPlacement(a: StoredArticle, now: number): Article {
    const override = OVERRIDES[a.id]
    const ageDays = (now - new Date(`${a.date}T00:00:00Z`).getTime()) / 86_400_000
    return {
        ...a,
        sections: override?.sections ?? guessSections([...(a.mediumTags ?? []), ...a.tags]),
        ddiaChapter: override?.ddiaChapter,
        isNew: ageDays <= NEW_FOR_DAYS,
    }
}

async function fetchFeed(): Promise<StoredArticle[]> {
    try {
        const res = await fetch(FEED_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-site)' },
            next: { revalidate: REVALIDATE_SECONDS },
        })
        return res.ok ? parseMediumFeed(await res.text()) : []
    } catch {
        return []
    }
}

/** Every article, newest first. Falls back to the archive alone if Medium can't be reached. */
export async function getArticles(): Promise<Article[]> {
    const byId = new Map<string, StoredArticle>((archive as StoredArticle[]).map((a) => [a.id, a]))
    for (const fresh of await fetchFeed()) {
        const saved = byId.get(fresh.id)
        // Keep the saved description, tags and read time; take everything else fresh from the feed
        byId.set(
            fresh.id,
            saved ? { ...fresh, description: saved.description, tags: saved.tags, readMinutes: saved.readMinutes } : fresh
        )
    }
    const now = Date.now()
    return [...byId.values()].map((a) => withPlacement(a, now)).sort((a, b) => b.date.localeCompare(a.date))
}

export function formatArticleDate(date: string) {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    })
}

export function sectionLabel(key: SectionKey) {
    return SECTIONS.find((s) => s.key === key)?.label ?? key
}
