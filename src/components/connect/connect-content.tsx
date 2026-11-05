'use client'

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ComponentType } from 'react'
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, FileTextIcon, MailIcon } from 'lucide-react'
import { FaGithub, FaLinkedin, FaMedium, FaWhatsapp } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { cn } from '@/lib/utils'

const EMAIL = 'hsheraz271@gmail.com'
const WHATSAPP = 'https://wa.me/923052094845'
const TIME_ZONE = 'Asia/Karachi'

/* What the visitor wants to talk about: clickable words inside the sentence */
const TOPICS = [
    { key: 'role', label: 'a role', subject: 'Software engineering role', line: 'a software engineering role' },
    { key: 'project', label: 'a project', subject: 'Project collaboration', line: 'a project we could work on together' },
    { key: 'hello', label: 'just saying hi', subject: 'Hello from your portfolio', line: 'nothing in particular, just saying hi' },
] as const

type TopicKey = (typeof TOPICS)[number]['key']

/* Example name + company typed into the empty blanks, so it's clear what goes where */
const DEMOS: [string, string][] = [
    ['Alex', 'Acme'],
    ['Sara', 'Nova'],
    ['Ali', 'Orbit'],
]

/* Example texts each blank shows; invisible copies of them set the blank's width (the widest one wins) */
const NAME_EXAMPLES = DEMOS.map(([n]) => n)
const COMPANY_EXAMPLES = DEMOS.map(([, c]) => c)

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

/* Live local time in Pakistan, updated every 30s; nothing on the server to avoid a mismatch */
function useLocalTime() {
    return useSyncExternalStore(
        (onChange) => {
            const id = setInterval(onChange, 30_000)
            return () => clearInterval(id)
        },
        () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE }),
        () => null
    )
}

type DemoStep = { demo: number; phase: 'name' | 'company' | 'hold' | 'delete'; name: string; company: string }

/* Types a name, then a company, holds, deletes both, and moves on to the next example */
function useDemoTyping(enabled: boolean) {
    const [step, setStep] = useState<DemoStep>({ demo: 0, phase: 'name', name: '', company: '' })

    useEffect(() => {
        if (!enabled) return
        const [fullName, fullCompany] = DEMOS[step.demo]
        let next: DemoStep
        let delay: number

        if (step.phase === 'name') {
            next = step.name.length < fullName.length
                ? { ...step, name: fullName.slice(0, step.name.length + 1) }
                : { ...step, phase: 'company' }
            delay = step.name.length < fullName.length ? 110 : 350
        } else if (step.phase === 'company') {
            next = step.company.length < fullCompany.length
                ? { ...step, company: fullCompany.slice(0, step.company.length + 1) }
                : { ...step, phase: 'hold' }
            delay = step.company.length < fullCompany.length ? 90 : 1800
        } else if (step.phase === 'hold') {
            next = { ...step, phase: 'delete' }
            delay = 0
        } else if (step.company) {
            next = { ...step, company: step.company.slice(0, -1) }
            delay = 35
        } else if (step.name) {
            next = { ...step, name: step.name.slice(0, -1) }
            delay = 45
        } else {
            next = { demo: (step.demo + 1) % DEMOS.length, phase: 'name', name: '', company: '' }
            delay = 500
        }

        const id = setTimeout(() => setStep(next), delay)
        return () => clearTimeout(id)
    }, [step, enabled])

    return enabled ? step : null
}

/*
 * An underlined blank inside the sentence. Invisible copies of the demo examples sit in the same
 * grid cell, so the blank is exactly as wide as the widest example and never changes size while
 * the demo types. It only grows if the visitor types something longer.
 */
function Blank({
    value,
    onChange,
    onFocus,
    demo,
    sizers,
    label,
}: {
    value: string
    onChange: (v: string) => void
    onFocus: () => void
    /* Text being typed by the demo; the blank is otherwise empty (no hint text) */
    demo: string | null
    sizers: string[]
    label: string
}) {
    return (
        <span className="inline-grid max-w-full align-baseline">
            {sizers.map((text) => (
                <span
                    key={text}
                    aria-hidden
                    className="invisible col-start-1 row-start-1 whitespace-pre px-0.5 font-semibold"
                >
                    {text}
                </span>
            ))}
            <input
                aria-label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                placeholder={demo ?? ''}
                autoComplete="off"
                spellCheck={false}
                className={cn(
                    'col-start-1 row-start-1 w-full min-w-0 border-b-2 border-foreground/25 bg-transparent px-0.5 pb-0.5 font-semibold text-foreground outline-none transition-colors field-sizing-content focus:border-foreground',
                    'placeholder:font-semibold placeholder:text-foreground/45'
                )}
            />
        </span>
    )
}

/* "Hi Sheraz, I'm ___ from ___, and I'd like to talk about [a role / a project / just saying hi]." */
function Composer() {
    const reducedMotion = usePrefersReducedMotion()
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [touched, setTouched] = useState(false)
    const [topic, setTopic] = useState<TopicKey>('role')
    const chosen = TOPICS.find((t) => t.key === topic) ?? TOPICS[0]

    // The demo runs until the visitor clicks into either blank
    const demo = useDemoTyping(!reducedMotion && !touched && !name && !company)

    const who = name.trim() ? `I'm ${name.trim()}${company.trim() ? ` from ${company.trim()}` : ''}, and ` : ''
    const body = `Hi Sheraz,\n\n${who}I'd like to talk about ${chosen.line}.\n\n`
    const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(chosen.subject)}&body=${encodeURIComponent(body)}`
    const whatsappHref = `${WHATSAPP}?text=${encodeURIComponent(body.trim())}`

    return (
        <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Write me a line</p>

            <p className="mt-6 max-w-4xl text-pretty text-3xl font-medium leading-[1.45] tracking-tight text-muted-foreground sm:text-4xl sm:leading-[1.4] lg:text-5xl lg:leading-[1.35]">
                Hi Sheraz, I&apos;m{' '}
                <Blank
                    value={name}
                    onChange={setName}
                    onFocus={() => setTouched(true)}
                    demo={demo ? demo.name : null}
                    sizers={NAME_EXAMPLES}
                    label="Your name"
                />{' '}
                from{' '}
                <Blank
                    value={company}
                    onChange={setCompany}
                    onFocus={() => setTouched(true)}
                    demo={demo ? demo.company : null}
                    sizers={COMPANY_EXAMPLES}
                    label="Your company (optional)"
                />
                , and I&apos;d like to talk about{' '}
                <span role="radiogroup" aria-label="What you'd like to talk about">
                    {TOPICS.map((t, i) => (
                        <span key={t.key}>
                            <button
                                type="button"
                                role="radio"
                                aria-checked={topic === t.key}
                                onClick={() => setTopic(t.key)}
                                className={cn(
                                    'cursor-pointer rounded-md px-1 transition-colors',
                                    topic === t.key ? 'bg-foreground text-background' : 'text-foreground/40 hover:text-foreground'
                                )}
                            >
                                {t.label}
                            </button>
                            {i < TOPICS.length - 1 && <span className="mx-1 text-foreground/20">/</span>}
                        </span>
                    ))}
                </span>
                .
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                    href={emailHref}
                    className="group inline-flex items-center gap-3 rounded-full bg-foreground py-2.5 pr-2.5 pl-5 text-base font-medium text-background transition-transform active:scale-[0.98]"
                >
                    <MailIcon className="size-4" />
                    Send by email
                    <span className="flex size-8 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRightIcon className="size-4" />
                    </span>
                </a>
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-border py-2.5 pr-2.5 pl-5 text-base font-medium text-foreground transition-colors hover:border-foreground active:scale-[0.98]"
                >
                    <FaWhatsapp className="size-4 transition-colors group-hover:text-[#25D366]" />
                    Send on WhatsApp
                    <span className="flex size-8 items-center justify-center rounded-full bg-muted text-foreground transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRightIcon className="size-4" />
                    </span>
                </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Either one opens with your message already written.</p>
        </div>
    )
}

type Place = {
    name: string
    handle: string
    href: string
    icon: ComponentType<{ className?: string }>
    /* Logo colour on hover; null for black logos, which follow the theme */
    brand: string | null
}

const PLACES: Place[] = [
    { name: 'LinkedIn', handle: '@hsheraz', href: 'https://www.linkedin.com/in/hsheraz', icon: FaLinkedin, brand: '#0A66C2' },
    { name: 'GitHub', handle: '@sheraz61', href: 'https://github.com/sheraz61', icon: FaGithub, brand: null },
    { name: 'Medium', handle: '@sheraz12', href: 'https://medium.com/@sheraz12', icon: FaMedium, brand: null },
    { name: 'LeetCode', handle: '@sheraz1_2', href: 'https://leetcode.com/u/sheraz1_2/', icon: SiLeetcode, brand: '#FFA116' },
    { name: 'WhatsApp', handle: 'Message me', href: WHATSAPP, icon: FaWhatsapp, brand: '#25D366' },
    { name: 'Resume', handle: 'PDF', href: '/resume.pdf', icon: FileTextIcon, brand: null },
]

/* Tiles: 2 across on phones, 3 from md up; the logo takes its brand colour and the tile lifts on hover */
function Elsewhere() {
    return (
        <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Or find me here</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {PLACES.map(({ name, handle, href, icon: Icon, brand }) => (
                    <li key={name}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            style={{ '--brand': brand ?? 'var(--foreground)' } as CSSProperties}
                            className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-border p-4 outline-none transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-lg hover:shadow-black/5 focus-visible:ring-2 focus-visible:ring-ring sm:p-5 dark:hover:shadow-black/40"
                        >
                            <div className="flex items-start justify-between">
                                <Icon className="size-7 text-muted-foreground transition-[color,transform] duration-300 group-hover:scale-110 group-hover:text-[var(--brand)]" />
                                <ArrowUpRightIcon className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{name}</p>
                                <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{handle}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function ConnectContent() {
    const time = useLocalTime()
    const [copied, setCopied] = useState(false)

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard can be blocked; the composer below still opens an email
        }
    }

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Headline + availability, written as a sentence */}
                <p className="font-mono text-xs uppercase tracking-wider text-primary">Connect</p>
                <h1 className="mt-4 text-[clamp(4rem,16vw,10rem)] font-semibold leading-[0.85] tracking-tighter text-foreground">
                    Let&apos;s talk<span className="text-muted-foreground">.</span>
                </h1>
                <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-lg text-muted-foreground sm:text-xl">
                    <span className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground opacity-60 motion-reduce:hidden" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-foreground" />
                    </span>
                    <span className="font-medium text-foreground">Open to work.</span>
                    {time && (
                        <span>
                            It&apos;s <span className="font-medium tabular-nums text-foreground">{time}</span> here in Pakistan.
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={copyEmail}
                        className="ml-1 inline-flex cursor-pointer items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                    >
                        {copied && <CheckIcon className="size-3.5" />}
                        {copied ? 'Email copied' : 'Copy my email'}
                    </button>
                </p>

                {/* The message */}
                <div className="mt-20 sm:mt-28">
                    <Composer />
                </div>

                {/* Everywhere else */}
                <div className="mt-20 sm:mt-28">
                    <Elsewhere />
                </div>
            </div>
        </section>
    )
}
