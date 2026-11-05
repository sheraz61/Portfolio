import Link from 'next/link'
import { ArrowRightIcon, BookOpenIcon } from 'lucide-react'
import { DDIA_CHAPTERS, type Article } from '@/lib/articles'
import { cn } from '@/lib/utils'
import { ArticleRow } from '@/components/writing/article-parts'

/* Book-on-the-desk panel: where the DDIA reading has got to */
function NowReading({ articles }: { articles: Article[] }) {
    const ddia = articles.filter((a) => a.sections.includes('ddia'))
    const chapters = new Set(ddia.map((a) => a.ddiaChapter).filter((c): c is number => Boolean(c)))
    const current = Math.max(0, ...chapters)
    const currentTitle = DDIA_CHAPTERS.find((c) => c.number === current)?.title

    return (
        <Link
            href="/blog#ddia"
            className="group flex h-full flex-col rounded-2xl border border-border bg-muted/30 p-5 transition-colors hover:border-foreground/25 sm:p-6"
        >
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
                    <BookOpenIcon className="size-3.5" />
                </span>
                Now reading
            </p>

            <h3 className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight text-foreground">
                Designing Data-Intensive Applications
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">2nd edition · Kleppmann &amp; Riccomini</p>

            {current > 0 && (
                <div className="mt-6">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        Chapter {current} of {DDIA_CHAPTERS.length}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{currentTitle}</p>
                    <div className="mt-3 flex gap-1" aria-hidden>
                        {DDIA_CHAPTERS.map((c) => (
                            <span
                                key={c.number}
                                className={cn(
                                    'h-1.5 flex-1 rounded-full transition-colors',
                                    chapters.has(c.number) ? 'bg-foreground' : 'bg-foreground/10'
                                )}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <p className="text-sm text-muted-foreground">
                    <span className="text-2xl font-semibold tracking-tight text-foreground">{ddia.length}</span> chapter notes
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    The series
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
            </div>
        </Link>
    )
}

/* Latest three articles (fetched from Medium on the server) beside the current reading */
export function ArticlesSection({ articles }: { articles: Article[] }) {
    const latest = articles.slice(0, 3)

    return (
        <section id="writing" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Header */}
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">Writing</p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Things I&apos;ve been learning
                        </h2>
                        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                            Notes and deep dives on systems, backend and frontend engineering, written as I work
                            through them.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
                    >
                        All articles
                        <ArrowRightIcon className="size-3.5" />
                    </Link>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
                    <NowReading articles={articles} />

                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Latest</p>
                        <ol className="mt-2 border-t border-border">
                            {latest.map((article) => (
                                <ArticleRow key={article.id} article={article} />
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Mobile CTA */}
                <Link
                    href="/blog"
                    className="mt-8 flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                >
                    All articles
                    <ArrowRightIcon className="size-3.5" />
                </Link>
            </div>
        </section>
    )
}
