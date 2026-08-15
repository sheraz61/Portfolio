import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'

const projects = [
    {
        index: '01',
        name: 'LearnEx',
        description:
            'Full-stack learning management system with 38+ REST APIs, Redis-backed sessions, role-based access, course management, and notifications.',
        stack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Redis'],
        href: '/projects#learnex',
    },
    {
        index: '02',
        name: 'CampusGuard',
        description:
            'Deep learning system for suspicious activity detection with a FastAPI backend, PostgreSQL, role-based dashboards, and AWS S3.',
        stack: ['React', 'FastAPI', 'PostgreSQL', 'TensorFlow', 'AWS'],
        href: '/projects#campusguard',
    },
    {
        index: '03',
        name: 'Vendora',
        description:
            'Multi-vendor marketplace with real-time messaging, role-based dashboards, and Stripe and PayPal payment integration.',
        stack: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Stripe'],
        href: '/projects#vendora',
    },
] as const

export function ProjectsPreviewSection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Header */}
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">
                            Selected work
                        </p>

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

                {/* Projects */}
                <div className="mt-10 divide-y divide-border border-y border-border">
                    {projects.map((project) => (
                        <Link
                            key={project.name}
                            href={project.href}
                            className="group block py-7"
                        >
                            <div className="flex gap-5">

                                {/* Number */}
                                <span className="hidden shrink-0 pt-1 font-mono text-xs text-muted-foreground/50 sm:block">
                                    {project.index}
                                </span>

                                {/* Content */}
                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                            {project.name}
                                        </h3>

                                        <ArrowUpRightIcon
                                            className="size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                                        />
                                    </div>

                                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                                        {project.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile CTA */}
                <Link
                    href="/projects"
                    className="mt-6 flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                >
                    View all projects
                    <ArrowRightIcon className="size-3.5" />
                </Link>
            </div>
        </section>
    )
}