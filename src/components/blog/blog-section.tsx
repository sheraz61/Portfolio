'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRightIcon, BookOpenIcon, ChevronDownIcon, SearchIcon, XIcon } from 'lucide-react'
import {
    DDIA_CHAPTERS,
    MEDIUM_PROFILE,
    SECTIONS,
    formatArticleDate,
    type Article,
    type SectionKey,
} from '@/lib/articles'
import { cn } from '@/lib/utils'
import { ArticleLead, ArticleRow } from '@/components/writing/article-parts'

type Filter = 'all' | SectionKey

function matches(article: Article, query: string) {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return [article.title, article.description, ...article.tags].some((s) => s.toLowerCase().includes(q))
}

/* ─── Reading DDIA: chapters in order, with my articles under each ─── */
function DdiaSeries({ articles }: { articles: Article[] }) {
    const [showAll, setShowAll] = useState(false)
    // Chapters start closed; clicking one shows its articles
    const [open, setOpen] = useState<Set<number>>(new Set())
    const toggle = (chapter: number) =>
        setOpen((prev) => {
            const next = new Set(prev)
            if (next.has(chapter)) next.delete(chapter)
            else next.add(chapter)
            return next
        })
    const byChapter = new Map<number, Article[]>()
    for (const a of articles) {
        if (!a.ddiaChapter) continue
        byChapter.set(a.ddiaChapter, [...(byChapter.get(a.ddiaChapter) ?? []), a])
    }
    const unassigned = articles.filter((a) => !a.ddiaChapter)
    const current = Math.max(0, ...byChapter.keys())
    const covered = byChapter.size
    const total = DDIA_CHAPTERS.length
    // Covered chapters plus the next one; the rest behind "show all"
    const visible = showAll ? DDIA_CHAPTERS : DDIA_CHAPTERS.filter((c) => c.number <= current + 1)

    return (
        <section id="ddia" aria-labelledby="ddia-title" className="scroll-mt-28 rounded-2xl border border-border p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                        <BookOpenIcon className="size-5" />
                    </span>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Reading series</p>
                        <h2 id="ddia-title" className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                            Designing Data-Intensive Applications
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            2nd edition, Kleppmann &amp; Riccomini. I write up each chapter as I read it.
                        </p>
                    </div>
                </div>
                <div className="sm:text-right">
                    <p className="text-sm text-muted-foreground">
                        <span className="text-2xl font-semibold tracking-tight text-foreground">{covered}</span> of {total}{' '}
                        chapters · {articles.length} articles
                    </p>
                </div>
            </div>

            {/* Progress */}
            <div className="mt-5 flex gap-1" aria-hidden>
                {DDIA_CHAPTERS.map((c) => (
                    <span
                        key={c.number}
                        className={cn(
                            'h-1.5 flex-1 rounded-full',
                            byChapter.has(c.number)
                                ? 'bg-foreground'
                                : c.number === current + 1
                                  ? 'bg-foreground/30'
                                  : 'bg-foreground/10'
                        )}
                    />
                ))}
            </div>

            {/* Chapters: names only; a chapter with articles opens to list them */}
            <ol className="mt-6 divide-y divide-border border-y border-border">
                {visible.map((chapter) => {
                    const notes = byChapter.get(chapter.number) ?? []
                    const isNext = chapter.number === current + 1
                    const isOpen = open.has(chapter.number)
                    const panelId = `ddia-chapter-${chapter.number}`
                    const number = (
                        <span className="w-7 shrink-0 font-mono text-[11px] text-muted-foreground">
                            {String(chapter.number).padStart(2, '0')}
                        </span>
                    )

                    if (!notes.length) {
                        return (
                            <li key={chapter.number} className="flex items-baseline gap-4 py-4">
                                {number}
                                <span className="min-w-0 flex-1 font-semibold tracking-tight text-muted-foreground">
                                    {chapter.title}
                                </span>
                                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                    {isNext ? 'Reading next' : 'Not yet'}
                                </span>
                            </li>
                        )
                    }

                    return (
                        <li key={chapter.number}>
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(chapter.number)}
                                className="group flex w-full cursor-pointer items-baseline gap-4 py-4 text-left"
                            >
                                {number}
                                <span className="min-w-0 flex-1 font-semibold tracking-tight text-foreground decoration-foreground/30 underline-offset-4 group-hover:underline">
                                    {chapter.title}
                                </span>
                                <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                    {notes.length} article{notes.length === 1 ? '' : 's'}
                                    <ChevronDownIcon
                                        className={cn(
                                            'size-4 self-center transition-transform duration-300 group-hover:text-foreground',
                                            isOpen && 'rotate-180'
                                        )}
                                    />
                                </span>
                            </button>

                            <div
                                id={panelId}
                                inert={!isOpen}
                                className={cn(
                                    'grid transition-[grid-template-rows] duration-300 ease-out',
                                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                )}
                            >
                                <div className="overflow-hidden">
                                    <ul className="flex flex-col gap-1 pb-4 pl-11">
                                        {[...notes].reverse().map((a) => (
                                            <li key={a.id}>
                                                <a
                                                    href={a.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group/item -mx-2 flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/60"
                                                >
                                                    <span className="min-w-0 flex-1 text-pretty text-sm leading-snug text-foreground">
                                                        {a.title}
                                                        {a.isNew && (
                                                            <span className="ml-2 rounded-full bg-foreground px-1.5 py-0.5 align-middle font-mono text-[9px] uppercase text-background">
                                                                New
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground sm:block">
                                                        {formatArticleDate(a.date)} · {a.readMinutes} min
                                                    </span>
                                                    <ArrowUpRightIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-all group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-foreground" />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ol>

            {unassigned.length > 0 && (
                <div className="mt-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">More DDIA notes</p>
                    <ul className="mt-2 flex flex-col gap-1">
                        {unassigned.map((a) => (
                            <li key={a.id}>
                                <a
                                    href={a.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/60"
                                >
                                    <span className="min-w-0 flex-1 truncate">{a.title}</span>
                                    <ArrowUpRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {DDIA_CHAPTERS.length > visible.length || showAll ? (
                <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    {showAll ? 'Show fewer chapters' : `Show all ${total} chapters`}
                    <ChevronDownIcon className={cn('size-4 transition-transform', showAll && 'rotate-180')} />
                </button>
            ) : null}
        </section>
    )
}

export function BlogSection({ articles }: { articles: Article[] }) {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState<Filter>('all')

    const filters = useMemo(
        () =>
            [
                { key: 'all' as Filter, label: 'All', count: articles.length },
                ...SECTIONS.map((s) => ({
                    key: s.key as Filter,
                    label: s.label,
                    count: articles.filter((a) => a.sections.includes(s.key)).length,
                })),
            ].filter((f) => f.count > 0),
        [articles]
    )

    const results = articles.filter((a) => (filter === 'all' || a.sections.includes(filter)) && matches(a, query))
    const searching = query.trim() !== ''
    const ddiaArticles = articles.filter((a) => a.sections.includes('ddia'))
    const [latest] = articles

    // Overview: latest, the DDIA series, then every other article in one list (tags on each row say where it fits)
    const rest = articles.filter((a) => a !== latest && a.sections[0] !== 'ddia')
    const overview = filter === 'all' && !searching
    const ddiaView = filter === 'ddia' && !searching

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Header */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">Writing</p>
                        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Things I&apos;ve been learning
                        </h1>
                        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                            Notes from reading Designing Data-Intensive Applications, plus deep dives on system design,
                            backend, frontend and DevOps. New articles show up here automatically from Medium.
                        </p>
                    </div>
                    <a
                        href={MEDIUM_PROFILE}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground sm:self-auto"
                    >
                        Follow on Medium
                        <ArrowUpRightIcon className="size-3.5" />
                    </a>
                </div>

                {/* Search + filters */}
                <div className="mt-10 flex flex-col gap-4">
                    <label className="relative block max-w-md">
                        <span className="sr-only">Search articles</span>
                        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search titles, topics and tags"
                            className="w-full rounded-full border border-border bg-background py-2.5 pr-10 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40 [&::-webkit-search-cancel-button]:hidden"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                aria-label="Clear search"
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted-foreground hover:text-foreground"
                            >
                                <XIcon className="size-3.5" />
                            </button>
                        )}
                    </label>

                    <div role="group" aria-label="Filter articles by section" className="flex flex-wrap gap-2">
                        {filters.map(({ key, label, count }) => {
                            const active = filter === key
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setFilter(key)}
                                    className={cn(
                                        'inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                                        active
                                            ? 'border-foreground bg-foreground text-background'
                                            : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                                    )}
                                >
                                    {label}
                                    <span className={cn('font-mono text-[10px]', active ? 'text-background/70' : 'text-muted-foreground')}>
                                        {count}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-10 flex flex-col gap-16">
                    {overview && (
                        <>
                            {latest && <ArticleLead article={latest} label="Latest" />}
                            {ddiaArticles.length > 0 && <DdiaSeries articles={ddiaArticles} />}
                            {rest.length > 0 && (
                                <ol className="border-t border-border">
                                    {rest.map((a) => (
                                        <ArticleRow key={a.id} article={a} />
                                    ))}
                                </ol>
                            )}
                        </>
                    )}

                    {ddiaView && <DdiaSeries articles={ddiaArticles} />}

                    {!overview && !ddiaView && (
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                {results.length} article{results.length === 1 ? '' : 's'}
                                {searching && <> for &ldquo;{query.trim()}&rdquo;</>}
                            </p>
                            {results.length ? (
                                <ol className="mt-4 border-t border-border">
                                    {results.map((a) => (
                                        <ArticleRow key={a.id} article={a} />
                                    ))}
                                </ol>
                            ) : (
                                <div className="mt-5 rounded-2xl border border-dashed border-border p-10 text-center">
                                    <p className="text-sm text-muted-foreground">Nothing matches that yet.</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery('')
                                            setFilter('all')
                                        }}
                                        className="mt-3 cursor-pointer text-sm font-medium text-foreground underline underline-offset-4"
                                    >
                                        Show all articles
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
