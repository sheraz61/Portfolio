import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'

const projects = [
    {
        index: '01',
        name: 'LearnEx',
        status: 'In Progress',
        period: 'Jan 2026 — Present',
        description:
            'Full-stack learning management system with role-based access, course management, review/Q&A threads, notifications, and Redis-backed session architecture. Backend exposes 38+ REST APIs.',
        stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis'],
        href: '/projects/learnex',
        github: 'https://github.com/sheraz61/learnex',
    },
    {
        index: '02',
        name: 'InterviewPrep',
        status: 'In Progress',
        period: 'Oct 2025 — Present',
        description:
            'AI-powered mock interview platform that generates role-specific questions, evaluates answers, and delivers structured feedback with progress tracking.',
        stack: ['React', 'Node.js', 'Express', 'MongoDB'],
        href: '/projects/interviewprep',
        github: 'https://github.com/sheraz61/interviewprep',
    },
    {
        index: '03',
        name: 'CampusGuard',
        status: 'Completed',
        period: 'Sep 2025 — Jun 2026',
        description:
            'Hybrid deep learning pipeline for real-time suspicious activity detection on campus. Integrates computer vision with role-based incident dashboards and AWS S3 media storage.',
        stack: ['React', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'AWS S3', 'TensorFlow'],
        href: '/projects/campusguard',
        github: 'https://github.com/sheraz61/CampusGaurd',
    },
    {
        index: '04',
        name: 'Vendora',
        status: 'Completed',
        period: 'Feb 2026 — Apr 2026',
        description:
            'Multi-vendor e-commerce platform with real-time messaging, role-based dashboards, Stripe and PayPal payment processing, and CI/CD deployment pipeline.',
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Stripe', 'PayPal'],
        href: '/projects/vendora',
        github: 'https://github.com/sheraz61/vendora',
    },
] as const

export function ProjectsPreviewSection() {
    return (
        <section id="work" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Section header */}
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">
                            Selected work
                        </p>
                        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Projects
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="hidden shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
                    >
                        All projects
                        <ArrowRightIcon className="size-3.5" />
                    </Link>
                </div>

                {/* Project list */}
                <div className="mt-10 divide-y divide-border overflow-hidden rounded-lg border border-border">
                    {projects.map((project) => (
                        <div
                            key={project.name}
                            className="group flex flex-col gap-4 bg-background px-5 py-6 transition-colors hover:bg-muted/40 sm:flex-row sm:items-start sm:gap-8"
                        >
                            {/* Index number */}
                            <span className="shrink-0 font-mono text-sm text-muted-foreground/50 sm:pt-0.5 sm:w-6">
                                {project.index}
                            </span>

                            {/* Main content */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                                        {project.name}
                                    </h3>
                                    {project.status === 'In Progress' && (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                                            <span className="relative flex size-1.5">
                                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                                                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                                            </span>
                                            Active
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {project.description}
                                </p>

                                <div className="mt-1 flex flex-wrap gap-1.5">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right meta — period + GitHub */}
                            <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                                <p className="font-mono text-[11px] text-muted-foreground/60">
                                    {project.period}
                                </p>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${project.name} on GitHub`}
                                    className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    GitHub
                                    <ArrowUpRightIcon className="size-3" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile — all projects link */}
                <Link
                    href="/projects"
                    className="mt-6 flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                >
                    All projects
                    <ArrowRightIcon className="size-3.5" />
                </Link>
            </div>
        </section>
    )
}
