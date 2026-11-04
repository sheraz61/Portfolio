'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { projectCategories, projects, type ProjectCategory } from '@/lib/projects-data'
import { cn } from '@/lib/utils'
import { ProjectPreview } from './project-preview'

type Filter = 'All' | ProjectCategory

const TAGS_ON_CARD = 4

/* Only offer categories that have projects, each with its count */
const FILTERS: { label: Filter; count: number }[] = [
    { label: 'All' as Filter, count: projects.length },
    ...projectCategories.map((c) => ({ label: c as Filter, count: projects.filter((p) => p.categories.includes(c)).length })),
].filter((f) => f.count > 0)

export function ProjectListSection() {
    const [filter, setFilter] = useState<Filter>('All')
    const visible = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Page header */}
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">Projects</p>
                    <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        Things I&apos;ve built
                    </h1>
                    <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                        Projects where I&apos;ve spent real time building, debugging and figuring things out. Open
                        one for the full story, the stack and the engineering details.
                    </p>
                </div>

                {/* Filters */}
                <div role="group" aria-label="Filter projects by category" className="mt-10 flex flex-wrap gap-2">
                    {FILTERS.map(({ label, count }) => {
                        const active = filter === label
                        return (
                            <button
                                key={label}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setFilter(label)}
                                className={cn(
                                    'inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                                    active
                                        ? 'border-foreground bg-foreground text-background'
                                        : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                                )}
                            >
                                {label}
                                <span
                                    className={cn(
                                        'font-mono text-[10px]',
                                        active ? 'text-background/70' : 'text-muted-foreground'
                                    )}
                                >
                                    {count}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Grid: every card is one link to the project page */}
                <ul className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
                    {visible.map((project) => {
                        const index = projects.indexOf(project)
                        const extra = project.stack.length - TAGS_ON_CARD
                        return (
                            <li key={project.slug} className="animate-in fade-in duration-300">
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-background p-2.5 outline-none transition-[border-color,box-shadow] duration-500 hover:border-foreground/25 hover:shadow-xl hover:shadow-black/[0.06] focus-visible:ring-2 focus-visible:ring-ring sm:p-3 dark:hover:shadow-black/40"
                                >
                                    <ProjectPreview project={project} sizes="(min-width: 768px) 460px, 100vw" />

                                    <div className="flex flex-1 flex-col gap-3 px-1.5 pb-1.5 sm:px-2">
                                        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                            <span>
                                                <span className="text-foreground">{String(index + 1).padStart(2, '0')}</span>
                                                <span className="mx-2 text-border">/</span>
                                                {project.categories[0]}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                {project.period}
                                                {project.status === 'Building' && (
                                                    <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] text-background">
                                                        Building
                                                    </span>
                                                )}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{project.name}</h2>
                                        <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-3">
                                            <ul className="flex flex-wrap gap-1.5">
                                                {project.stack.slice(0, TAGS_ON_CARD).map((tech) => (
                                                    <li
                                                        key={tech}
                                                        className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                                                    >
                                                        {tech}
                                                    </li>
                                                ))}
                                                {extra > 0 && (
                                                    <li className="px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
                                                        +{extra} more
                                                    </li>
                                                )}
                                            </ul>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                                                View project
                                                <span className="flex size-6 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                                                    <ArrowRightIcon className="size-3.5" />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
