import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { posts } from '@/lib/blog-data'

export function ArticlesSection() {
    const recentArticles = posts.slice(0, 3)

    return (
        <section id="writing" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Header */}
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">
                            Writing
                        </p>

                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Things I&apos;ve been learning
                        </h2>

                        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                            Notes and deep dives on the technologies, concepts,
                            and engineering problems I&apos;ve been exploring.
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

                {/* Articles */}
                <div className="mt-10 divide-y divide-border border-y border-border">
                    {recentArticles.map((article) => (
                        <article
                            key={article.link}
                            className="group py-6 sm:py-7"
                        >
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">

                                    {/* Article content */}
                                    <div className="min-w-0">

                                        {/* Metadata */}
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                                            <span>{article.tags[0]}</span>
                                            <span aria-hidden="true">·</span>
                                            <span>{article.date}</span>
                                            <span aria-hidden="true">·</span>
                                            <span>{article.readTime}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="mt-2 max-w-3xl text-base font-medium leading-relaxed text-foreground transition-colors group-hover:text-primary sm:text-lg">
                                            {article.title}
                                        </h3>
                                    </div>

                                    {/* Arrow */}
                                    <div className="hidden shrink-0 sm:block">
                                        <ArrowUpRightIcon className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                                    </div>
                                </div>
                            </a>
                        </article>
                    ))}
                </div>

                {/* Mobile link */}
                <Link
                    href="/blog"
                    className="mt-6 flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                >
                    All articles
                    <ArrowRightIcon className="size-3.5" />
                </Link>
            </div>
        </section>
    )
}