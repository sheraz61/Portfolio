import Image from 'next/image'
import { ArrowUpRightIcon } from 'lucide-react'
import { formatArticleDate, sectionLabel, type Article } from '@/lib/articles'
import { cn } from '@/lib/utils'

/* Seven bar heights (30-100%) derived from the article id, so every generated cover is a little different */
function barHeights(id: string) {
    let hash = 2166136261
    for (const ch of id) hash = Math.imul(hash ^ ch.charCodeAt(0), 16777619)
    return Array.from({ length: 7 }, (_, i) => 30 + (((hash >>> (i * 4)) & 0xf) / 15) * 70)
}

/*
 * Cover for articles without an image, in the same style as the Medium covers:
 * dark background, small label, bold white title, and a bar motif. Sizes scale with the cover (cqw),
 * so it reads the same as a thumbnail or as a large lead image.
 */
function GeneratedCover({ article }: { article: Article }) {
    const bars = barHeights(article.id)
    const peak = bars.indexOf(Math.max(...bars))
    return (
        <div aria-hidden className="@container absolute inset-0 overflow-hidden bg-neutral-950 text-white">
            <div className="article-cover-dots absolute inset-0" />
            <div className="relative flex h-full flex-col justify-between p-[6cqw]">
                <span className="font-mono text-[3.2cqw] uppercase tracking-[0.2em] text-white/55">
                    {sectionLabel(article.sections[0])} notes
                </span>
                <span className="line-clamp-3 max-w-[72%] text-balance text-[6.6cqw] font-semibold leading-[1.1] tracking-tight transition-transform duration-500 group-hover:-translate-y-[1cqw]">
                    {article.title}
                </span>
            </div>
            <div className="absolute right-[6cqw] bottom-[6cqw] flex h-[30cqw] items-end gap-[1.4cqw]">
                {bars.map((h, i) => (
                    <span
                        key={i}
                        className={cn('w-[2.2cqw] rounded-t-[0.6cqw]', i === peak ? 'bg-white/80' : 'bg-white/15')}
                        style={{ height: `${h}%` }}
                    />
                ))}
            </div>
        </div>
    )
}

/* Article image, or a generated cover in the same style when there isn't one */
export function ArticleCover({ article, sizes, className }: { article: Article; sizes: string; className?: string }) {
    return (
        <div className={cn('relative overflow-hidden rounded-xl border border-border bg-neutral-950', className)}>
            {article.cover ? (
                <Image src={article.cover} alt="" fill sizes={sizes} className="article-cover object-cover" />
            ) : (
                <GeneratedCover article={article} />
            )}
        </div>
    )
}

/*
 * Tags (the same names as the Blog page filters), then "Nov 4, 2026 · 12 min" and a New badge.
 * The first tag carries the DDIA chapter, e.g. "DDIA · Ch 2".
 */
export function ArticleMeta({ article, className }: { article: Article; className?: string }) {
    return (
        <div className={cn('flex flex-wrap items-center gap-x-2.5 gap-y-1.5', className)}>
            <ul className="flex flex-wrap gap-1.5">
                {article.sections.map((key, i) => (
                    <li
                        key={key}
                        className={cn(
                            'rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                            i === 0 ? 'border-foreground/25 text-foreground' : 'border-border text-muted-foreground'
                        )}
                    >
                        {sectionLabel(key)}
                        {i === 0 && article.ddiaChapter && ` · Ch ${article.ddiaChapter}`}
                    </li>
                ))}
            </ul>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                <span className="text-border">·</span>
                {article.readMinutes} min
                {article.isNew && (
                    <span className="rounded-full bg-foreground px-1.5 py-0.5 text-[9px] text-background">New</span>
                )}
            </p>
        </div>
    )
}

/*
 * List row: tags and date, title, summary, and a small cover that colours in on hover.
 * The whole row opens the article on Medium. Used on the home page and the Blog page.
 */
export function ArticleRow({ article }: { article: Article }) {
    return (
        <li>
            <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-6 border-b border-border py-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <div className="min-w-0 flex-1">
                    <ArticleMeta article={article} />
                    <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug tracking-tight text-foreground decoration-foreground/30 underline-offset-4 group-hover:underline sm:text-xl">
                        {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {article.description}
                    </p>
                </div>

                <ArticleCover
                    article={article}
                    sizes="160px"
                    className="hidden aspect-[16/10] w-40 shrink-0 rounded-lg sm:block"
                />
            </a>
        </li>
    )
}

/* Magazine-style lead story: no box, rules above and below, big title beside the cover */
export function ArticleLead({ article, label }: { article: Article; label?: string }) {
    return (
        <a
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-6 border-y border-border py-8 outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[1fr_1.05fr] md:items-center md:gap-10"
        >
            <div className="order-2 md:order-1">
                {label && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                )}
                <ArticleMeta article={article} className="mt-3" />
                <h2 className="mt-3 text-pretty text-3xl font-semibold leading-[1.1] tracking-tight text-foreground decoration-foreground/30 underline-offset-[6px] group-hover:underline sm:text-4xl">
                    {article.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-pretty leading-relaxed text-muted-foreground">{article.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    Read on Medium
                    <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
            </div>
            <ArticleCover
                article={article}
                sizes="(min-width: 768px) 520px, 100vw"
                className="order-1 aspect-[16/9] md:order-2"
            />
        </a>
    )
}
