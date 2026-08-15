import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { posts } from '@/lib/blog-data'

export function ArticlesSection() {
    // Only show the first 3 articles on the home page
    const recentArticles = posts.slice(0, 3)

    return (
        <section id="writing" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Section header */}
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">
                            Writing
                        </p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Recent articles
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
                    >
                        All articles
                        <ArrowRightIcon className="size-3.5" />
                    </Link>
                </div>

                {/* Article list */}
                <div className="mt-10 divide-y divide-border border-y border-border">
                    {recentArticles.map((article) => (
                        <div
                            key={article.link}
                            className="flex items-start justify-between gap-6 py-5"
                        >
                            {/* Left — tag + title */}
                            <div className="flex flex-col gap-1.5">
                                <span className="w-fit rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                                    {article.tags[0]}
                                </span>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium leading-snug text-foreground transition-colors hover:text-primary"
                                >
                                    {article.title}
                                </a>
                            </div>

                            {/* Right — read time + link */}
                            <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                                <span className="font-mono text-[11px] text-muted-foreground/70">
                                    {article.readTime}
                                </span>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-0.5 font-mono text-[11px] text-muted-foreground/70 underline-offset-2 transition-colors hover:text-foreground hover:underline"
                                >
                                    Read on Medium
                                    <ArrowUpRightIcon className="size-3" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Mobile — blog link */}
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
