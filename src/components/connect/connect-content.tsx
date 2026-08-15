'use client'

import {
    ArrowUpRightIcon,
    FileTextIcon,
    MailIcon,
} from 'lucide-react'
import {
    FaGithub,
    FaLinkedin,
    FaMedium,
    FaWhatsapp,
} from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

const socialLinks = [
    {
        name: 'LinkedIn',
        handle: '@hsheraz',
        href: 'https://www.linkedin.com/in/hsheraz',
        icon: FaLinkedin,
    },
    {
        name: 'GitHub',
        handle: '@sheraz61',
        href: 'https://github.com/sheraz61',
        icon: FaGithub,
    },
    {
        name: 'Medium',
        handle: '@sheraz12',
        href: 'https://medium.com/@sheraz12',
        icon: FaMedium,
    },
    {
        name: 'LeetCode',
        handle: '@sheraz1_2',
        href: 'https://leetcode.com/u/sheraz1_2/',
        icon: SiLeetcode,
    },
]

const opportunities = [
    'Software Engineering',
    'Full-stack Development',
    'Backend Development',
    'AI Engineering',
]

export function ConnectContent() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Header */}
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">
                        Connect
                    </p>

                    <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        Let&apos;s build something useful.
                    </h1>

                    <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                        I&apos;m currently open to software engineering opportunities,
                        interesting projects, and conversations about technology.
                        If you&apos;d like to work together or just say hello,
                        I&apos;d be happy to hear from you.
                    </p>
                </div>

                {/* Main Content */}
                <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-20">

                    {/* Left Column */}
                    <div className="space-y-10">

                        {/* Open To */}
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                                Open to
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {opportunities.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-foreground"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                                Get in touch
                            </p>

                            <div className="mt-4 flex flex-col gap-4">

                                {/* Email */}
                                <a
                                    href="mailto:hsheraz271@gmail.com"
                                    className="group inline-flex w-fit items-center gap-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                                >
                                    <MailIcon className="size-4" />

                                    <span>
                                        hsheraz271@gmail.com
                                    </span>

                                    <ArrowUpRightIcon
                                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/923052094845"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group inline-flex w-fit items-center gap-2 text-base font-medium text-foreground transition-colors hover:text-primary"
                                >
                                    <FaWhatsapp className="size-4" />

                                    <span>
                                        WhatsApp
                                    </span>

                                    <ArrowUpRightIcon
                                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* Resume */}
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                                Resume
                            </p>

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="group mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                            >
                                <FileTextIcon className="size-4" />

                                <span>
                                    View my resume
                                </span>

                                <ArrowUpRightIcon
                                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </a>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                            Find me online
                        </p>

                        <div className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border">
                            {socialLinks.map((social) => {
                                const Icon = social.icon

                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/40"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />

                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {social.name}
                                                </p>

                                                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                                                    {social.handle}
                                                </p>
                                            </div>
                                        </div>

                                        <ArrowUpRightIcon
                                            className="size-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                                        />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-16 border-t border-border pt-10 sm:mt-20">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                Have an opportunity or idea?
                            </p>

                            <p className="mt-2 text-sm text-foreground">
                                I&apos;d be glad to hear what you&apos;re working on.
                            </p>
                        </div>

                        <a
                            href="mailto:hsheraz271@gmail.com?subject=Software%20Engineering%20Opportunity"
                            className="inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                        >
                            Send me an email
                            <ArrowUpRightIcon className="size-4" />
                        </a>
                    </div>
                </div>

            </div>
        </section>
    )
}