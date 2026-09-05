'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ─── Code block lines with syntax highlighting tokens ─── */
const CODE_LINES: { indent: number; tokens: { text: string; color: string }[] }[] = [
    {
        indent: 0,
        tokens: [
            { text: 'const', color: 'var(--code-keyword)' },
            { text: ' journey', color: 'var(--code-variable)' },
            { text: ' = {', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'startedWith', color: 'var(--code-property)' },
            { text: ': ', color: 'var(--code-punctuation)' },
            { text: "'Building interfaces'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'becameCuriousAbout', color: 'var(--code-property)' },
            { text: ': [', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'APIs & Databases'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'Authentication & Security'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'Real-Time Systems'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: '],', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'startedBuilding', color: 'var(--code-property)' },
            { text: ': [', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'LearnEx (E-Learning)'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'CampusGuard (AI Safety)'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'Vendora (Marketplace)'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: '],', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'nowExploring', color: 'var(--code-property)' },
            { text: ': [', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'System Design'", color: 'var(--code-string)' },
            { text: ', ', color: 'var(--code-punctuation)' },
            { text: "'Software Architecture'", color: 'var(--code-string)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: ']', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 0,
        tokens: [
            { text: '};', color: 'var(--code-punctuation)' },
        ],
    },
]

export function HeroSection() {
    const [visibleLines, setVisibleLines] = useState(0)

    useEffect(() => {
        const total = CODE_LINES.length
        let current = 0
        const interval = setInterval(() => {
            current++
            setVisibleLines(current)
            if (current >= total) clearInterval(interval)
        }, 85)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">

                {/* Two-column responsive layout */}
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">

                    {/* ─── Left column: Story text ─── */}
                    <div className="flex-1 min-w-0 max-w-xl">

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

                        {/* Name & Title */}
                        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                            Hi, I&apos;m Sheraz Hussain.
                        </h1>
                        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-primary sm:text-sm">
                            Software Engineer · Full-Stack Developer
                        </p>

                        {/* Story Paragraphs */}
                        <div className="mt-5 space-y-3.5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                            <p>
                                I like understanding how things work, then turning that understanding into software
                                people can actually use.
                            </p>
                            <p>
                                I build full-stack applications with TypeScript, React, Next.js, Node.js, and modern
                                databases, from APIs and authentication to real-time features and complete user experiences.
                            </p>
                            <p className="font-medium text-foreground">
                                Currently exploring software architecture and system design.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Button
                                size="lg"
                                nativeButton={false}
                                render={<Link href="/projects" />}
                            >
                                View projects
                                <ArrowRightIcon data-icon="inline-end" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                nativeButton={false}
                                render={<Link href="/connect" />}
                            >
                                Get in touch
                                <ArrowUpRightIcon data-icon="inline-end" />
                            </Button>
                        </div>
                    </div>

                    {/* ─── Right column: Journey code panel ─── */}
                    <div className="w-full lg:w-[440px] xl:w-[460px] shrink-0">
                        <div className="code-editor-card">

                            {/* Title bar */}
                            <div className="code-editor-titlebar">
                                <div className="code-editor-dots">
                                    <span className="code-dot code-dot--red" />
                                    <span className="code-dot code-dot--yellow" />
                                    <span className="code-dot code-dot--green" />
                                </div>
                                <span className="code-editor-filename">journey.js</span>
                                <div className="code-editor-dots invisible">
                                    <span className="code-dot" />
                                    <span className="code-dot" />
                                    <span className="code-dot" />
                                </div>
                            </div>

                            {/* Code body */}
                            <div className="code-editor-body">
                                <pre className="code-editor-pre">
                                    {CODE_LINES.map((line, lineIdx) => (
                                        <div
                                            key={lineIdx}
                                            className="code-line"
                                            style={{
                                                opacity: lineIdx < visibleLines ? 1 : 0,
                                                transform: lineIdx < visibleLines ? 'translateY(0)' : 'translateY(6px)',
                                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                            }}
                                        >
                                            <span className="code-line-number">
                                                {lineIdx + 1}
                                            </span>
                                            <code>
                                                {'  '.repeat(line.indent)}
                                                {line.tokens.map((token, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        style={{ color: token.color }}
                                                    >
                                                        {token.text}
                                                    </span>
                                                ))}
                                            </code>
                                            {/* Show cursor on last visible line */}
                                            {lineIdx === visibleLines - 1 && (
                                                <span className="code-cursor" />
                                            )}
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}