import { Building2Icon, GitMergeIcon, SparklesIcon, WrenchIcon } from 'lucide-react'
import { contributionStats, openSourceProjects } from '@/lib/open-source-data'
import { ProjectRow } from './project-row'
import { StatGrid, type Stat } from './shared'

const totals = contributionStats(openSourceProjects.flatMap((p) => p.pullRequests))

const STATS: Stat[] = [
    { icon: GitMergeIcon, value: `${totals.merged}`, label: 'Merged pull requests' },
    {
        icon: Building2Icon,
        value: `${openSourceProjects.length}`,
        label: openSourceProjects.length === 1 ? 'Organisation' : 'Organisations',
    },
    { icon: SparklesIcon, value: `${totals.features}`, label: totals.features === 1 ? 'Feature shipped' : 'Features shipped' },
    { icon: WrenchIcon, value: `${totals.fixes}`, label: totals.fixes === 1 ? 'Fix merged' : 'Fixes merged' },
]

export function OpenSourceListSection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Page header */}
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">Open Source</p>
                    <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        Contributions
                    </h1>
                    <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                        Organisations whose codebases I&apos;ve contributed to. Open one to see the main pull
                        requests, or view the full list.
                    </p>
                </div>

                {/* Stats */}
                <StatGrid stats={STATS} className="mt-10" />

                {/* Organisations */}
                <ul className="mt-12 flex flex-col gap-3 sm:mt-14">
                    {openSourceProjects.map((project) => (
                        <ProjectRow key={project.slug} project={project} />
                    ))}
                </ul>
            </div>
        </section>
    )
}
