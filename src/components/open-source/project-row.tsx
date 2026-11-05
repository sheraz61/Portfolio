'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon, ChevronDownIcon } from 'lucide-react'
import { featuredPullRequests, type OpenSourceProject } from '@/lib/open-source-data'
import { cn } from '@/lib/utils'
import { FeaturedPRCard, ProjectAvatar } from './shared'

/* How many featured PRs to preview when a row is expanded */
const PREVIEW_COUNT = 2

export function ProjectRow({ project }: { project: OpenSourceProject }) {
    const [open, setOpen] = useState(false)
    const panelId = useId()
    const total = project.pullRequests.length
    const preview = featuredPullRequests(project).slice(0, PREVIEW_COUNT)

    return (
        <li
            className={cn(
                'overflow-hidden rounded-2xl border bg-background transition-colors duration-300',
                open ? 'border-foreground/20' : 'border-border hover:border-foreground/20'
            )}
        >
            {/* Summary row: the whole row toggles the preview */}
            <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                className="group flex w-full cursor-pointer items-center gap-4 p-4 text-left sm:p-5"
            >
                <ProjectAvatar project={project} size={44} />

                <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-semibold tracking-tight text-foreground sm:text-lg">{project.org}</span>
                        <span className="truncate font-mono text-[11px] text-muted-foreground">{project.name}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted-foreground">{project.description}</span>
                    <span className="mt-1 block font-mono text-[11px] text-muted-foreground sm:hidden">
                        {total} merged PRs · {project.language}
                    </span>
                </span>

                <span className="hidden shrink-0 text-right font-mono text-[11px] leading-relaxed text-muted-foreground sm:block">
                    <span className="block text-sm font-semibold text-foreground">{total} merged PRs</span>
                    {project.language}
                </span>

                <span
                    className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground/40 group-hover:text-foreground',
                        open && 'border-foreground bg-foreground text-background group-hover:text-background'
                    )}
                >
                    <ChevronDownIcon className={cn('size-4 transition-transform duration-300', open && 'rotate-180')} />
                    <span className="sr-only">{open ? 'Hide' : 'Show'} main pull requests</span>
                </span>
            </button>

            {/* Preview panel: animates open with a grid-rows transition */}
            <div
                id={panelId}
                inert={!open}
                className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-border bg-muted/30 p-4 sm:p-5">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            Main contributions
                        </p>
                        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                            {preview.map((pr) => (
                                <li key={pr.number}>
                                    <FeaturedPRCard pr={pr} compact />
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <Link
                                href={`/open-source/${project.slug}`}
                                className="group/all inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                            >
                                View all {total} PRs
                                <ArrowRightIcon className="size-3.5 transition-transform group-hover/all:translate-x-0.5" />
                            </Link>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Repository on GitHub
                                <ArrowUpRightIcon className="size-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
