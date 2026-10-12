'use client'

import * as React from 'react'
import {
    ArrowUpRightIcon,
    SearchIcon,
    XIcon,
    ClockIcon,
    CalendarIcon,
    LayoutGridIcon,
    ListIcon,
    BookOpenIcon,
    SparklesIcon,
} from 'lucide-react'
import { FaMedium } from 'react-icons/fa'
import { posts } from '@/lib/blog-data'
import { cn } from '@/lib/utils'

// Top-level categories for quick filtering
const CATEGORIES = [
    { label: 'All', value: 'all' },
    { label: 'Distributed Systems', value: 'Distributed Systems' },
    { label: 'System Design', value: 'System Design' },
    { label: 'Reliability', value: 'Reliability' },
    { label: 'Databases', value: 'Databases' },
    { label: 'Next.js', value: 'Next.js' },
    { label: 'React', value: 'React' },
    { label: 'JavaScript & V8', value: 'JavaScript' },
    { label: 'Infrastructure', value: 'Infrastructure' },
]

export function PostListSection() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('all')
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')

    // Filter posts based on category and search query (sorted newest first)
    const filteredPosts = React.useMemo(() => {
        let result = posts.filter((post) => {
            const matchesCategory =
                selectedCategory === 'all' ||
                post.tags.some(
                    (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
                )

            const query = searchQuery.trim().toLowerCase()
            const matchesQuery =
                !query ||
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query))

            return matchesCategory && matchesQuery
        })

        // Default newest first
        return [...result].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    }, [searchQuery, selectedCategory])

    // Featured post for spotlight when no search is active and category is 'all'
    const featuredPost = React.useMemo(() => {
        if (selectedCategory !== 'all' || searchQuery.trim() !== '') return null
        return posts.find((p) => p.featured) || posts[0]
    }, [selectedCategory, searchQuery])

    // The remaining posts to display in the main list/grid
    const displayPosts = React.useMemo(() => {
        if (featuredPost && selectedCategory === 'all' && !searchQuery.trim()) {
            return filteredPosts.filter((p) => p.link !== featuredPost.link)
        }
        return filteredPosts
    }, [filteredPosts, featuredPost, selectedCategory, searchQuery])

    const handleClearFilters = () => {
        setSearchQuery('')
        setSelectedCategory('all')
    }

    return (
        <section className="border-b border-border bg-background">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">

                {/* ================= Hero Section (Seamless without dividing line) ================= */}
                <div className="relative pb-4 sm:pb-6">
                    {/* Top Row: Category Pill + Medium Profile Button */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            <span>Engineering Notes & Architecture</span>
                            <span className="text-border">·</span>
                            <span className="text-foreground">{posts.length} Articles</span>
                        </div>

                        {/* Medium Profile Button */}
                        <a
                            href="https://sheraz12.medium.com"
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
                        >
                            <FaMedium className="size-3.5" />
                            <span>Visit @sheraz12 on Medium</span>
                            <ArrowUpRightIcon className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>

                    {/* Full-width Title & Subtitle */}
                    <div className="mt-6">
                        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Writing & System Design
                        </h1>

                        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Deep dives into distributed systems, load shedding, failure cascades, and modern web architecture.
                            Practical lessons and mental models written as I build and scale software.
                        </p>
                    </div>

                    {/* ================= Clean Search & Category Controls ================= */}
                    <div className="mt-8 space-y-3">
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                            {/* Search Input */}
                            <div className="relative flex-1 max-w-lg">
                                <SearchIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles by title, topic, or keyword..."
                                    className="w-full rounded-lg border border-border/80 bg-muted/20 py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground/40 focus:bg-background focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        aria-label="Clear search"
                                    >
                                        <XIcon className="size-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* View Mode Switcher */}
                            <div className="flex items-center rounded-lg border border-border/80 p-0.5 self-start sm:self-auto">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('grid')}
                                    className={cn(
                                        'rounded-md p-1.5 transition-colors',
                                        viewMode === 'grid'
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                    title="Grid view"
                                    aria-label="Grid view"
                                >
                                    <LayoutGridIcon className="size-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('list')}
                                    className={cn(
                                        'rounded-md p-1.5 transition-colors',
                                        viewMode === 'list'
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                    title="List view"
                                    aria-label="List view"
                                >
                                    <ListIcon className="size-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Category Filter Chips */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar sm:flex-wrap">
                            {CATEGORIES.map((cat) => {
                                const isSelected = selectedCategory.toLowerCase() === cat.value.toLowerCase()
                                const count =
                                    cat.value === 'all'
                                        ? posts.length
                                        : posts.filter((p) =>
                                            p.tags.some(
                                                (t) => t.toLowerCase() === cat.value.toLowerCase()
                                            )
                                        ).length

                                if (count === 0 && cat.value !== 'all') return null

                                return (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.value)}
                                        className={cn(
                                            'shrink-0 rounded-md px-2.5 py-1 text-xs transition-colors',
                                            isSelected
                                                ? 'bg-foreground text-background font-medium'
                                                : 'border border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                                        )}
                                    >
                                        <span>{cat.label}</span>
                                        <span
                                            className={cn(
                                                'ml-1.5 font-mono text-[10px]',
                                                isSelected ? 'opacity-80' : 'text-muted-foreground/60'
                                            )}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* ================= Featured Article Spotlight ================= */}
                {featuredPost && (
                    <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary">
                                <SparklesIcon className="size-3" />
                                <span>Featured Deep Dive</span>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">
                                Latest Article
                            </span>
                        </div>

                        <article className="group relative rounded-xl border border-border/90 bg-card/60 p-6 transition-all hover:border-foreground/30 sm:p-7">
                            <a
                                href={featuredPost.link}
                                target="_blank"
                                rel="noreferrer"
                                className="block"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="max-w-3xl">
                                        {/* Metadata */}
                                        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-muted-foreground">
                                            <span className="inline-flex items-center gap-1 text-foreground">
                                                <CalendarIcon className="size-3" />
                                                {featuredPost.date}
                                            </span>
                                            <span aria-hidden="true">·</span>
                                            <span className="inline-flex items-center gap-1">
                                                <ClockIcon className="size-3" />
                                                {featuredPost.readTime}
                                            </span>
                                            <span aria-hidden="true">·</span>
                                            <span className="inline-flex items-center gap-1 text-[11px]">
                                                <FaMedium className="size-2.5" />
                                                Medium
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                                            {featuredPost.title}
                                        </h2>

                                        {/* Description */}
                                        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                            {featuredPost.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {featuredPost.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded border border-border/70 bg-muted/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="mt-2 shrink-0 lg:mt-0">
                                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-xs font-medium text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <span>Read on Medium</span>
                                            <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </div>
                )}

                {/* ================= Posts Collection ================= */}
                <div className="mt-8">
                    {displayPosts.length === 0 ? (
                        /* Empty State */
                        <div className="rounded-xl border border-dashed border-border py-14 text-center">
                            <BookOpenIcon className="mx-auto size-9 text-muted-foreground/40" />
                            <h3 className="mt-3 text-sm font-semibold text-foreground">
                                No articles found
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                No articles match &quot;{searchQuery || selectedCategory}&quot;.
                            </p>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="mt-3 inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        /* ================= GRID VIEW ================= */
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {displayPosts.map((post, index) => (
                                <article
                                    key={post.link}
                                    className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card/40 p-5 transition-all hover:border-foreground/30 hover:bg-card"
                                >
                                    <div>
                                        {/* Meta header */}
                                        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <span>{post.date}</span>
                                                <span aria-hidden="true" className="text-border">·</span>
                                                <span>{post.readTime}</span>
                                            </div>

                                            <span className="font-mono text-[10px] text-muted-foreground/60">
                                                #{String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                            <a
                                                href={post.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="focus:outline-none"
                                            >
                                                {post.title}
                                            </a>
                                        </h2>

                                        {/* Description */}
                                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                                            {post.description}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-5 border-t border-border/50 pt-3">
                                        <div className="flex flex-wrap items-center gap-1">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => setSelectedCategory(tag)}
                                                    className="rounded border border-border/60 bg-muted/30 px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                            {post.tags.length > 3 && (
                                                <span className="font-mono text-[10px] text-muted-foreground/60">
                                                    +{post.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-3 flex items-center justify-between text-xs">
                                            <span className="font-mono text-[11px] text-muted-foreground/70">
                                                Medium
                                            </span>

                                            <a
                                                href={post.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 font-medium text-foreground transition-colors group-hover:text-primary"
                                            >
                                                <span>Read article</span>
                                                <ArrowUpRightIcon className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* ================= LIST VIEW ================= */
                        <div className="divide-y divide-border border-y border-border">
                            {displayPosts.map((post, index) => (
                                <article
                                    key={post.link}
                                    className="group py-5 transition-colors hover:bg-muted/10"
                                >
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block"
                                    >
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                                    <span>#{String(index + 1).padStart(2, '0')}</span>
                                                    <span aria-hidden="true">·</span>
                                                    <span>{post.date}</span>
                                                    <span aria-hidden="true">·</span>
                                                    <span>{post.readTime}</span>
                                                </div>

                                                <h3 className="mt-1.5 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
                                                    {post.title}
                                                </h3>

                                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                                    {post.description}
                                                </p>

                                                <div className="mt-2.5 flex flex-wrap gap-1">
                                                    {post.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="rounded border border-border/60 bg-muted/30 px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="hidden shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary sm:flex">
                                                <span>Read</span>
                                                <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </div>
                                        </div>
                                    </a>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}