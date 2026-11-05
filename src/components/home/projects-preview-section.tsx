import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { featuredProjects } from '@/lib/projects-data'
import { cn } from '@/lib/utils'
import { ProjectPreview } from '@/components/projects/project-preview'

type FeaturedProject = (typeof featuredProjects)[number]

/* "01 / E-learning platform" */
function Eyebrow({ index, project }: { index: number; project: FeaturedProject }) {
    return (
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="text-foreground">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-border">/</span>
            {project.featured.tagline}
        </p>
    )
}

/* Headline number with its label, kept on one line */
function Metric({ project, large = false }: { project: FeaturedProject; large?: boolean }) {
    const { metric } = project.featured
    return (
        <p className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
            <span className={cn('font-semibold tracking-tight text-foreground', large ? 'text-3xl' : 'text-xl')}>
                {metric.value}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{metric.label}</span>
        </p>
    )
}

function Title({ project, large = false }: { project: FeaturedProject; large?: boolean }) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className={cn('font-semibold tracking-tight text-foreground', large ? 'text-3xl' : 'text-2xl')}>
                {project.name}
            </h3>
            {project.featured.badge && (
                <span className="rounded-full border border-foreground/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground">
                    {project.featured.badge}
                </span>
            )}
        </div>
    )
}

function StackTags({ stack }: { stack: string[] }) {
    return (
        <ul className="flex flex-wrap gap-1.5">
            {stack.map((tech) => (
                <li
                    key={tech}
                    className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                    {tech}
                </li>
            ))}
        </ul>
    )
}

/* Looks like a button; the whole card is the link */
function ViewProject() {
    return (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            View project
            <span className="flex size-6 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowRightIcon className="size-3.5" />
            </span>
        </span>
    )
}

/* One bordered card holds the screenshot and its details, and the whole card links to the project page */
const cardClass =
    'group block rounded-2xl border border-border bg-background p-2.5 outline-none transition-[border-color,box-shadow] duration-500 hover:border-foreground/25 hover:shadow-xl hover:shadow-black/[0.06] focus-visible:ring-2 focus-visible:ring-ring sm:p-3 dark:hover:shadow-black/40'

export function ProjectsPreviewSection() {
    const [lead, ...rest] = featuredProjects

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Header */}
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">Selected work</p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Things I&apos;ve built
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="hidden shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
                    >
                        View all projects
                        <ArrowRightIcon className="size-3.5" />
                    </Link>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:gap-5">

                    {/* Lead project: preview and details side by side on large screens */}
                    {lead && (
                        <Link
                            href={`/projects/${lead.slug}`}
                            className={cn(cardClass, 'grid gap-4 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-6')}
                        >
                            <ProjectPreview project={lead} sizes="(min-width: 1024px) 560px, 100vw" />
                            <div className="flex flex-col gap-3 px-1.5 pb-1.5 sm:px-2 lg:py-2 lg:pr-4">
                                <Eyebrow index={0} project={lead} />
                                <Title project={lead} large />
                                <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {lead.featured.summary}
                                </p>
                                <Metric project={lead} large />
                                <div className="mt-1 flex flex-col gap-3 border-t border-border pt-3">
                                    <StackTags stack={lead.featured.stack} />
                                    <ViewProject />
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* The rest: two cards side by side from md up */}
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                        {rest.map((project, i) => (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className={cn(cardClass, 'flex flex-col gap-4')}
                            >
                                <ProjectPreview project={project} sizes="(min-width: 768px) 460px, 100vw" />
                                <div className="flex flex-1 flex-col gap-3 px-1.5 pb-1.5 sm:px-2">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <Eyebrow index={i + 1} project={project} />
                                        <Metric project={project} />
                                    </div>
                                    <Title project={project} />
                                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                                        {project.featured.summary}
                                    </p>
                                    <div className="mt-auto flex flex-col gap-3 border-t border-border pt-3">
                                        <StackTags stack={project.featured.stack} />
                                        <ViewProject />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile CTA */}
                <Link
                    href="/projects"
                    className="mt-8 flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                >
                    View all projects
                    <ArrowRightIcon className="size-3.5" />
                </Link>
            </div>
        </section>
    )
}
