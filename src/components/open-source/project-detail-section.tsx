import Link from 'next/link'
import {
    ArrowLeftIcon,
    ArrowUpRightIcon,
    FileDiffIcon,
    GitMergeIcon,
    GlobeIcon,
    SparklesIcon,
    WrenchIcon,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import {
    contributionStats,
    featuredPullRequests,
    formatDate,
    type OpenSourceProject,
} from '@/lib/open-source-data'
import { FeaturedPRCard, KindBadge, ProjectAvatar, StatGrid, type Stat } from './shared'

function projectStats(project: OpenSourceProject): Stat[] {
    const t = contributionStats(project.pullRequests)
    return [
        { icon: GitMergeIcon, value: `${t.merged}`, label: 'Merged pull requests' },
        { icon: SparklesIcon, value: `${t.features}`, label: t.features === 1 ? 'Feature shipped' : 'Features shipped' },
        { icon: WrenchIcon, value: `${t.fixes}`, label: t.fixes === 1 ? 'Fix merged' : 'Fixes merged' },
        {
            icon: FileDiffIcon,
            value: `+${t.added.toLocaleString('en-US')}`,
            label: `Lines added, ${t.removed.toLocaleString('en-US')} removed`,
        },
    ]
}

export function ProjectDetailSection({ project }: { project: OpenSourceProject }) {
    const featured = featuredPullRequests(project)
    const stats = projectStats(project)

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">

                <Link
                    href="/open-source"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
                    Open source
                </Link>

                {/* Project header */}
                <div className="group mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                        <ProjectAvatar project={project} size={56} />
                        <div className="min-w-0">
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                {project.org}
                            </h1>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <FaGithub className="size-3.5" />
                                {project.name}
                                <ArrowUpRightIcon className="size-3" />
                            </a>
                            <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                                {project.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {[project.language, project.license].map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {project.homepage && (
                        <a
                            href={project.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <GlobeIcon className="size-4" />
                            {project.homepage.replace(/^https?:\/\//, '')}
                            <ArrowUpRightIcon className="size-3.5" />
                        </a>
                    )}
                </div>

                {/* Stats */}
                <StatGrid stats={stats} className="mt-10" />

                {/* Highlights */}
                {featured.length > 0 && (
                    <>
                        <h2 className="mt-14 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            Highlights
                        </h2>
                        <ul className="mt-4 grid gap-4 md:grid-cols-3">
                            {featured.map((pr) => (
                                <li key={pr.number}>
                                    <FeaturedPRCard pr={pr} />
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Every merged PR */}
                <h2 className="mt-14 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    All pull requests · {project.pullRequests.length}
                </h2>
                <ol className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                    {project.pullRequests.map((pr) => (
                        <li key={pr.number}>
                            <a
                                href={pr.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-start gap-4 px-4 py-4 transition-colors hover:bg-muted/50 sm:px-5"
                            >
                                <GitMergeIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-pretty text-sm font-medium leading-snug text-foreground sm:text-base">
                                        {pr.title}
                                    </p>
                                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
                                        <span>#{pr.number}</span>
                                        <KindBadge kind={pr.kind} />
                                        <span>{pr.area}</span>
                                        <span className="sm:hidden">
                                            {formatDate(pr.mergedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                                <span className="hidden shrink-0 text-right font-mono text-[11px] leading-relaxed text-muted-foreground sm:block">
                                    {formatDate(pr.mergedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    <span className="block">
                                        <span className="text-foreground">+{pr.additions}</span> −{pr.deletions}
                                    </span>
                                </span>
                                <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                            </a>
                        </li>
                    ))}
                </ol>

                <a
                    href={project.allPullRequestsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                    <FaGithub className="size-4" />
                    View these PRs on GitHub
                    <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>
        </section>
    )
}
