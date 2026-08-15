import { Fragment } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { Button } from '@/components/ui/button'

const SOCIAL_LINKS = [
    {
        label: 'GitHub',
        href: 'https://github.com/sheraz61',
        icon: FaGithub,
        username: 'sheraz61',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/hsheraz',
        icon: FaLinkedin,
        username: 'hsheraz',
    },
    {
        label: 'LeetCode',
        href: 'https://leetcode.com/sheraz1_2',
        icon: SiLeetcode,
        username: '300+ solved',
    },
] as const

export function HeroSection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">

                {/* Availability */}
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-primary" />
                    </span>

                    <span className="tracking-wide">
                        OPEN TO SOFTWARE ENGINEERING ROLES
                    </span>
                </div>

                {/* Name */}
                <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                    Sheraz Hussain
                </h1>

                {/* Positioning */}
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    Software Engineering graduate building{' '}
                    <span className="text-foreground">
                        full-stack products and backend systems
                    </span>{' '}
                    with TypeScript, Next.js, Node.js, and modern cloud
                    technologies.
                </p>

                {/* Supporting Context */}
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Currently focused on backend architecture, system design,
                    and building software that works beyond the demo.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button
                        nativeButton={false}
                        render={<Link href="/projects" />}
                    >
                        View projects
                        <ArrowRightIcon data-icon="inline-end" />
                    </Button>

                    <Button
                        variant="outline"
                        nativeButton={false}
                        render={<Link href="/connect" />}
                    >
                        Get in touch
                        <ArrowUpRightIcon data-icon="inline-end" />
                    </Button>
                </div>

                {/* Social Links */}
                <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
                    {SOCIAL_LINKS.map(
                        ({ label, href, icon: Icon, username }, index) => (
                            <Fragment key={label}>
                                {index > 0 && (
                                    <span
                                        className="hidden text-muted-foreground sm:inline"
                                        aria-hidden="true"
                                    >
                                        ·
                                    </span>
                                )}

                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${label} — ${username}`}
                                    className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Icon className="size-4 shrink-0" />

                                    <span>{label}</span>

                                    <span className="text-xs opacity-60">
                                        — {username}
                                    </span>

                                    <ArrowUpRightIcon className="size-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-60" />
                                </a>
                            </Fragment>
                        )
                    )}
                </div>
            </div>
        </section>
    )
}