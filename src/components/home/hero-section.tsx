'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon, FileTextIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ─── Phrases typed out after "who builds" ─── */
const PHRASES = [
    'secure, scalable APIs.',
    'real-time web apps.',
    'AI-powered products.',
    'clean, fast interfaces.',
]

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function usePrefersReducedMotion() {
    return useSyncExternalStore(
        (onChange) => {
            const query = window.matchMedia(REDUCED_MOTION)
            query.addEventListener('change', onChange)
            return () => query.removeEventListener('change', onChange)
        },
        () => window.matchMedia(REDUCED_MOTION).matches,
        () => false
    )
}

/* Types each phrase out, pauses, deletes it, then moves to the next one. */
function useTypewriter(phrases: string[], enabled: boolean) {
    const [phrase, setPhrase] = useState(0)
    const [text, setText] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (!enabled) return
        const full = phrases[phrase]
        const finishedTyping = !deleting && text === full
        const finishedDeleting = deleting && text === ''
        const delay = finishedTyping ? 1900 : finishedDeleting ? 350 : deleting ? 30 : 65

        const id = setTimeout(() => {
            if (finishedTyping) setDeleting(true)
            else if (finishedDeleting) {
                setDeleting(false)
                setPhrase((p) => (p + 1) % phrases.length)
            } else {
                setText(full.slice(0, text.length + (deleting ? -1 : 1)))
            }
        }, delay)
        return () => clearTimeout(id)
    }, [phrases, phrase, text, deleting, enabled])

    return enabled ? text : phrases[0]
}

/* Corner crop marks drawn around the portrait */
function CropMarks() {
    const base = 'absolute size-5 border-foreground/70'
    return (
        <>
            <span aria-hidden className={`${base} -left-3 -top-3 border-l border-t`} />
            <span aria-hidden className={`${base} -right-3 -top-3 border-r border-t`} />
            <span aria-hidden className={`${base} -bottom-3 -left-3 border-b border-l`} />
            <span aria-hidden className={`${base} -bottom-3 -right-3 border-b border-r`} />
        </>
    )
}

export function HeroSection() {
    const reducedMotion = usePrefersReducedMotion()
    const typed = useTypewriter(PHRASES, !reducedMotion)
    const cardRef = useRef<HTMLDivElement>(null)

    // Subtle 3D tilt + light sheen that follows the mouse over the portrait
    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const el = cardRef.current
        if (!el || reducedMotion || e.pointerType !== 'mouse') return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
        el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
    }

    const onPointerLeave = () => {
        const el = cardRef.current
        if (!el) return
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
    }

    return (
        <section className="relative overflow-hidden border-b border-border">
            {/* Dotted grid backdrop */}
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

            {/* Height follows the content; vertical padding scales with screen height so the
                hero fits on laptop screens while big screens show the next section below */}
            <div className="relative mx-auto max-w-5xl px-6 pt-14 pb-16 md:py-[clamp(2.5rem,9svh,6rem)]">
                <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_340px] lg:gap-16">

                    {/* ─── Portrait (tablet + desktop, right column; hidden on phones) ─── */}
                    <figure className="hidden md:order-2 md:block">
                        <div
                            ref={cardRef}
                            onPointerMove={onPointerMove}
                            onPointerLeave={onPointerLeave}
                            className="hero-portrait group relative"
                        >
                            <CropMarks />
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl shadow-black/10 dark:shadow-black/50">
                                <Image
                                    src="/logo.png"
                                    alt="Portrait of Sheraz Hussain"
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 340px, 260px"
                                    className="object-cover object-top grayscale contrast-[1.08] transition-[filter,scale] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:contrast-100"
                                />
                                <div aria-hidden className="hero-portrait-sheen absolute inset-0" />
                            </div>
                        </div>
                        <figcaption className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            <span>Sheraz Hussain</span>
                            <span className="h-px flex-1 mx-3 bg-border" />
                            <span>Software Engineer</span>
                        </figcaption>
                    </figure>

                    {/* ─── Intro ─── */}
                    <div className="min-w-0">

                        {/* Availability */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground backdrop-blur-sm">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground opacity-60 motion-reduce:hidden" />
                                <span className="relative inline-flex size-2 rounded-full bg-foreground" />
                            </span>
                            OPEN TO SOFTWARE ENGINEERING ROLES
                        </div>

                        {/* Name */}
                        <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:whitespace-nowrap lg:text-6xl">
                            Sheraz Hussain<span className="text-muted-foreground">.</span>
                        </h1>

                        {/* Role with typewriter */}
                        <p className="mt-5 text-xl leading-snug text-muted-foreground sm:text-2xl">
                            <span className="sr-only">
                                Full-stack software engineer who builds secure APIs, real-time web apps, AI-powered
                                products and clean interfaces.
                            </span>
                            <span aria-hidden>
                                Full-stack engineer who builds
                                <span className="block min-h-[1.375em] font-medium text-foreground">
                                    {typed}
                                    <span className="hero-caret" />
                                </span>
                            </span>
                        </p>

                        {/* Intro */}
                        <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                            I like understanding how things work, then turning that into software people can
                            actually use, with TypeScript, React, Next.js, Node.js and modern databases.
                            Currently exploring system design and software architecture.
                        </p>

                        {/* Actions */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Button size="lg" nativeButton={false} render={<Link href="/projects" />}>
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
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1.5 px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <FileTextIcon className="size-4" />
                                Resume
                                <ArrowUpRightIcon className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
