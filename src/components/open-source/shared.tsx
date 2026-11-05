import Image from 'next/image'
import { ArrowUpRightIcon, GitMergeIcon, type LucideIcon } from 'lucide-react'
import { formatDate, type OpenSourceProject, type PullRequest } from '@/lib/open-source-data'
import { cn } from '@/lib/utils'

/* Org avatar: grayscale until its parent `group` is hovered, like the portrait photos */
export function ProjectAvatar({ project, size }: { project: OpenSourceProject; size: number }) {
    return (
        <Image
            src={project.avatar}
            alt={`${project.org} logo`}
            width={size}
            height={size}
            className="shrink-0 rounded-xl border border-border bg-muted object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            style={{ width: size, height: size }}
        />
    )
}

export function KindBadge({ kind }: { kind: PullRequest['kind'] }) {
    return (
        <span
            className={cn(
                'rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                kind === 'Fix' ? 'border border-border text-muted-foreground' : 'bg-foreground text-background'
            )}
        >
            {kind}
        </span>
    )
}

/* Card for a featured PR. `compact` trims the summary for the expanded row on /open-source. */
export function FeaturedPRCard({ pr, compact = false }: { pr: PullRequest; compact?: boolean }) {
    return (
        <a
            href={pr.url}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg hover:shadow-black/5 sm:p-5 dark:hover:shadow-black/40"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <KindBadge kind={pr.kind} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {pr.area}
                    </span>
                </div>
                <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>

            <h3 className="mt-3 font-semibold leading-snug tracking-tight text-foreground sm:text-lg">{pr.title}</h3>
            {pr.featured && (
                <p
                    className={cn(
                        'mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground',
                        compact && 'line-clamp-2'
                    )}
                >
                    {pr.featured.summary}
                </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3 font-mono text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 text-foreground">
                    <GitMergeIcon className="size-3.5" />#{pr.number}
                </span>
                <span>{formatDate(pr.mergedAt, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                {!compact && (
                    <span className="ml-auto">
                        <span className="text-foreground">+{pr.additions}</span> −{pr.deletions} · {pr.files}{' '}
                        {pr.files === 1 ? 'file' : 'files'}
                    </span>
                )}
            </div>
        </a>
    )
}

export type Stat = { icon: LucideIcon; value: string; label: string }

/* 2x2 on phones, 4 across from sm up, with hairline dividers */
export function StatGrid({ stats, className }: { stats: Stat[]; className?: string }) {
    return (
        <dl
            className={cn(
                'grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4',
                className
            )}
        >
            {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="group flex flex-col bg-background p-4 transition-colors hover:bg-muted/40 sm:p-5">
                    <Icon
                        aria-hidden
                        className="order-1 size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                    />
                    <dt className="order-3 mt-1 text-xs leading-snug text-muted-foreground">{label}</dt>
                    <dd className="order-2 mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    )
}
