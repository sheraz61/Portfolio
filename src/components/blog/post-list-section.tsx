import { ArrowUpRightIcon } from 'lucide-react'
import { posts } from '@/lib/blog-data'

export function PostListSection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Page Header */}
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">
                        Blog
                    </p>

                    <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        Writing & notes
                    </h1>

                    <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                        Notes on software engineering, JavaScript, Next.js,
                        backend development, and things I&apos;m learning along the way.
                    </p>
                </div>

                {/* Posts */}
                <div className="mt-16 sm:mt-24">
                    <div className="flex flex-col">

                        {posts.map((post, index) => (
                            <article
                                key={post.title}
                                className="group border-b border-border py-10 first:pt-0 last:border-b-0 last:pb-0 sm:py-12"
                            >
                                <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block"
                                >
                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                        <span>{post.date}</span>

                                        <span aria-hidden="true">·</span>

                                        <span>{post.readTime}</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                                        {post.title}
                                    </h2>

                                    {/* Tags */}
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read Link */}
                                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
                                        Read on Medium
                                        <ArrowUpRightIcon
                                            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </div>
                                </a>
                            </article>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}