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
            { text: ' engineer', color: 'var(--code-variable)' },
            { text: ' = {', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'role', color: 'var(--code-property)' },
            { text: ': ', color: 'var(--code-punctuation)' },
            { text: "'Software Engineer'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'core', color: 'var(--code-property)' },
            { text: ': [', color: 'var(--code-punctuation)' },
            { text: "'TypeScript'", color: 'var(--code-string)' },
            { text: ', ', color: 'var(--code-punctuation)' },
            { text: "'Next.js'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
            { text: "'Node.js'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'PostgreSQL'", color: 'var(--code-string)' },
            { text: ', ', color: 'var(--code-punctuation)' },
            { text: "'MongoDB'", color: 'var(--code-string)' },
            { text: ', ', color: 'var(--code-punctuation)' },
            { text: "'Redis'", color: 'var(--code-string)' },
            { text: '],', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'builds', color: 'var(--code-property)' },
            { text: ': [', color: 'var(--code-punctuation)' },
            { text: "'REST APIs'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
            { text: "'Real-time systems'", color: 'var(--code-string)' },
            { text: ', ', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [

            { text: "'Full-stack products'", color: 'var(--code-string)' },
            { text: '],', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'experience', color: 'var(--code-property)' },
            { text: ': {', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: 'apis', color: 'var(--code-property)' },
            { text: ': ', color: 'var(--code-punctuation)' },
            { text: "'38+'", color: 'var(--code-string)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: 'paymentGateways', color: 'var(--code-property)' },
            { text: ': ', color: 'var(--code-punctuation)' },
            { text: '2', color: 'var(--code-number)' },
            { text: ',', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: 'productionProjects', color: 'var(--code-property)' },
            { text: ': ', color: 'var(--code-punctuation)' },
            { text: '3', color: 'var(--code-number)' },
            { text: '+', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: '},', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 1,
        tokens: [
            { text: 'currentlyLearning', color: 'var(--code-property)' },
            { text: ': [', color: 'var(--code-punctuation)' },
        ],
    },
    {
        indent: 2,
        tokens: [
            { text: "'System Design'", color: 'var(--code-string)' },
            { text: ', ', color: 'var(--code-punctuation)' },
            { text: "'Distributed Systems'", color: 'var(--code-string)' },
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
        }, 90)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">

                {/* Two-column layout */}
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

                    {/* ─── Left column: text intro ─── */}
                    <div className="flex-1 min-w-0">

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
                            with TypeScript, Node.js , PostgreSQL, MongoDB, and Redis.
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
                    </div>

                    {/* ─── Right column: code editor block ─── */}
                    <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0">
                        <div className="code-editor-card">

                            {/* Title bar */}
                            <div className="code-editor-titlebar">
                                <div className="code-editor-dots">
                                    <span className="code-dot code-dot--red" />
                                    <span className="code-dot code-dot--yellow" />
                                    <span className="code-dot code-dot--green" />
                                </div>
                                <span className="code-editor-filename">engineer.js</span>
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