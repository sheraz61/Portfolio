import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, MousePointer2Icon } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects, type Project } from '@/lib/projects-data'
import { ProjectPreview } from './project-preview'

/* Screen recording when there is one, otherwise the screenshot (scrolls on hover) or title cover */
function ProjectMedia({ project }: { project: Project }) {
    if (project.video) {
        return (
            <div className="overflow-hidden rounded-xl border border-border bg-background">
                <video
                    src={project.video}
                    poster={project.preview?.cover}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    className="aspect-[16/10] w-full bg-muted object-cover"
                >
                    {project.name} walkthrough
                </video>
            </div>
        )
    }

    const scrolls = Boolean(project.preview?.full)
    return (
        <div className="group">
            <ProjectPreview
                project={project}
                sizes="(min-width: 1024px) 470px, 100vw"
                priority
                // Full-page shots get a taller screen so more of the site shows while it scrolls
                viewportClassName={scrolls ? 'aspect-[4/3]' : undefined}
            />
            {scrolls && (
                <p className="mt-3 hidden items-center gap-1.5 font-mono text-[11px] text-muted-foreground [@media(hover:hover)]:flex">
                    <MousePointer2Icon className="size-3.5" />
                    Hover to scroll through the live site
                </p>
            )}
        </div>
    )
}

function ActionLinks({ project }: { project: Project }) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {project.vercel && (
                <a
                    href={project.vercel}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                    Live demo
                    <ArrowUpRightIcon className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </a>
            )}
            <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
                <FaGithub className="size-4" />
                Source code
            </a>
        </div>
    )
}

/* Headline fact (featured metric, or the project's own fact), category, timeline and status */
function FactGrid({ project }: { project: Project }) {
    const headline = project.featured?.metric ?? project.fact
    const facts = [
        ...(headline ? [{ label: headline.label, value: headline.value, big: true }] : []),
        { label: 'Category', value: project.categories.join(' · '), big: false },
        { label: 'Timeline', value: project.period, big: false },
        { label: 'Status', value: project.status, big: false },
    ]
    return (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {facts.map(({ label, value, big }, i) => (
                <div
                    key={label}
                    // With an odd number of boxes, the last one spans the row so no empty cell is left
                    className={`flex flex-col bg-background p-4 ${facts.length % 2 === 1 && i === facts.length - 1 ? 'col-span-2' : ''}`}
                >
                    <dt className="order-2 mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {label}
                    </dt>
                    <dd
                        className={
                            big
                                ? 'order-1 text-3xl font-semibold leading-none tracking-tight text-foreground'
                                : 'order-1 text-sm font-medium text-foreground'
                        }
                    >
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    )
}

/* Previous / next project, wrapping around the list. One compact row on phones, roomier from sm up. */
function ProjectPager({ project }: { project: Project }) {
    const i = projects.indexOf(project)
    const prev = projects[(i - 1 + projects.length) % projects.length]
    const next = projects[(i + 1) % projects.length]
    const linkClass =
        'group flex min-w-0 flex-col gap-0.5 rounded-xl border border-border px-3.5 py-3 transition-colors hover:border-foreground/30 hover:bg-muted/40 sm:gap-1 sm:rounded-2xl sm:p-5'
    const labelClass =
        'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:gap-1.5 sm:text-[11px]'
    const nameClass = 'truncate text-sm font-semibold tracking-tight text-foreground sm:text-lg'

    return (
        <nav aria-label="More projects" className="mt-12 grid grid-cols-2 gap-2.5 sm:mt-16 sm:gap-3">
            <Link href={`/projects/${prev.slug}`} className={linkClass}>
                <span className={labelClass}>
                    <ArrowLeftIcon className="size-3 transition-transform group-hover:-translate-x-0.5 sm:size-3.5" />
                    Previous
                </span>
                <span className={nameClass}>{prev.name}</span>
            </Link>
            <Link href={`/projects/${next.slug}`} className={`${linkClass} items-end text-right`}>
                <span className={labelClass}>
                    Next
                    <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5 sm:size-3.5" />
                </span>
                <span className={`${nameClass} max-w-full`}>{next.name}</span>
            </Link>
        </nav>
    )
}

/*
 * Two columns on large screens: the preview stays in view on the left while the details scroll
 * on the right. On phones it stacks as header, preview, then details.
 */
export function ProjectDetailSection({ project }: { project: Project }) {
    const featured = project.featured

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">

                <Link
                    href="/projects"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
                    All projects
                </Link>

                <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-10">

                    {/* Header (right column on desktop) */}
                    <header className="lg:col-start-2 lg:row-start-1">
                        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            <span className="text-foreground">{featured?.tagline ?? project.categories[0]}</span>
                            {project.status === 'Building' && (
                                <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] text-background">
                                    Building
                                </span>
                            )}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{project.name}</h1>
                            {featured?.badge && (
                                <span className="rounded-full border border-foreground/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground">
                                    {featured.badge}
                                </span>
                            )}
                        </div>
                        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
                        <div className="mt-6">
                            <ActionLinks project={project} />
                        </div>
                    </header>

                    {/* Preview (left column on desktop, stays in view while the details scroll) */}
                    <div className="lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
                        <ProjectMedia project={project} />
                    </div>

                    {/* Details (right column on desktop) */}
                    <div className="flex flex-col gap-10 lg:col-start-2 lg:row-start-2">
                        <FactGrid project={project} />

                        <div>
                            <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                Engineering highlights
                            </h2>
                            <ol className="mt-4 divide-y divide-border border-y border-border">
                                {project.highlights.map((point, i) => (
                                    <li key={point} className="flex gap-4 py-3.5">
                                        <span className="w-6 shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-pretty text-sm leading-relaxed text-foreground sm:text-[15px]">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div>
                            <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Built with</h2>
                            <ul className="mt-3 flex flex-wrap gap-1.5">
                                {project.stack.map((tech) => (
                                    <li
                                        key={tech}
                                        className="rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <ProjectPager project={project} />
            </div>
        </section>
    )
}
