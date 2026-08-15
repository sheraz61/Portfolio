import Link from 'next/link'
import {
    ArrowUpRightIcon,
    ExternalLinkIcon,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../../lib/projects-data'

export function ProjectListSection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Page Header */}
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">
                        Projects
                    </p>

                    <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        Selected work
                    </h1>

                    <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                        A few projects where I&apos;ve spent significant time
                        building, debugging, and figuring things out.
                    </p>
                </div>

                {/* Projects */}
                <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">

                    {projects.map((project, index) => {
                        const isFeatured = index === 0

                        return (
                            <article
                                key={project.slug}
                                id={project.slug}
                                className="group scroll-mt-24"
                            >
                                {/* Project Number */}
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="font-mono text-xs text-muted-foreground">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {isFeatured && (
                                        <>
                                            <span className="size-1 rounded-full bg-border" />

                                            <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                                                Featured
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Featured Image */}
                                {project.image && (
                                    <div className="mb-8 overflow-hidden rounded-xl border border-border bg-muted/30">
                                        <img
                                            src={project.image}
                                            alt={`${project.name} project preview`}
                                            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                                        />
                                    </div>
                                )}

                                {/* Project Header */}
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                                {project.name}
                                            </h2>

                                            <span
                                                className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${project.status === 'Building'
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-muted text-muted-foreground'
                                                    }`}
                                            >
                                                {project.status}
                                            </span>
                                        </div>

                                        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                            {project.period}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    {project.description}
                                </p>

                                {/* Links */}
                                <div className="mt-6 flex flex-wrap items-center gap-5">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                                    >
                                        <FaGithub className="size-4" />
                                        GitHub
                                        <ArrowUpRightIcon className="size-3.5" />
                                    </a>

                                    {project.vercel && (
                                        <a
                                            href={project.vercel}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                                        >
                                            <ExternalLinkIcon className="size-4" />
                                            Live demo
                                            <ArrowUpRightIcon className="size-3.5" />
                                        </a>
                                    )}


                                </div>

                                {/* Engineering Highlights */}
                                <div className="mt-10">
                                    <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                                        Engineering highlights
                                    </p>

                                    <ul className="mt-4 max-w-3xl space-y-3">
                                        {project.highlights.map((point) => (
                                            <li
                                                key={point}
                                                className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                                            >
                                                <span className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-primary" />

                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Stack */}
                                <div className="mt-8">
                                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                        Built with
                                    </p>

                                    <div className="mt-3 flex max-w-3xl flex-wrap gap-2">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md border border-border bg-muted/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors group-hover:border-border group-hover:text-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Divider */}
                                {index !== projects.length - 1 && (
                                    <div className="mt-16 border-b border-border sm:mt-24" />
                                )}
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}