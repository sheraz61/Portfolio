'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Photo = { src: string; alt: string; position?: string }

type Chapter = {
    title: string
    detail: string
    /* What it gives back to the engineering, in my own words */
    feeds: string
    link?: { href: string; label: string }
    photo: Photo
}

const CHAPTERS: Chapter[] = [
    {
        title: 'Reading',
        detail:
            "I'm currently working through Designing Data-Intensive Applications by Martin Kleppmann, alongside books on focus, solitude, and personal growth. The technical books sharpen how I think about systems; the personal ones often influence how I approach the work itself.",
        feeds: 'How I think about systems',
        link: { href: '/blog#ddia', label: 'Read my DDIA notes' },
        photo: { src: '/5.jpeg', alt: 'Two laptops beside a copy of Designing Data-Intensive Applications', position: '70% 75%' },
    },
    {
        title: 'Traveling',
        detail:
            "I enjoy visiting places I've never seen before. Getting away from familiar surroundings is a good reminder to step back, change perspective, and notice what actually matters.",
        feeds: 'Stepping back to see what matters',
        photo: { src: '/2.jpeg', alt: 'Sunset over a river, seen from a bridge', position: '50% 55%' },
    },
    {
        title: 'Farming',
        detail:
            "When I'm home, I work in the fields with my father. It's slow, physical, and completely away from a screen. Some of my clearest thinking about difficult problems happens after a few hours of doing something unrelated.",
        feeds: 'My clearest thinking on hard problems',
        photo: { src: '/3.jpeg', alt: 'An open field with a line of trees under a grey sky', position: '50% 80%' },
    },
]

/* Black and white until its chapter is active, then it slowly comes into colour */
function StoryPhoto({ photo, active, sizes, className }: { photo: Photo; active: boolean; sizes: string; className?: string }) {
    return (
        <div className={cn('relative overflow-hidden bg-muted', className)}>
            <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={sizes}
                style={{ objectPosition: photo.position }}
                className={cn(
                    'object-cover transition-[filter,transform] duration-[1400ms] ease-out motion-reduce:transition-none',
                    active ? 'scale-100 grayscale-0 delay-200' : 'scale-[1.04] grayscale'
                )}
            />
        </div>
    )
}

/* The visual for one chapter, filling whatever frame it's placed in */
function ChapterVisual({ chapter, active, sizes }: { chapter: Chapter; active: boolean; sizes: string }) {
    return <StoryPhoto photo={chapter.photo} active={active} sizes={sizes} className="absolute inset-0" />
}

/* Title and index over the bottom of the frame */
function FrameCaption({ chapter, index }: { chapter: Chapter; index: number }) {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-12 text-white sm:p-5 sm:pt-14">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                {String(index + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">{chapter.title}</p>
        </div>
    )
}

function ChapterText({ chapter, index }: { chapter: Chapter; index: number }) {
    return (
        <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {String(index + 1).padStart(2, '0')} · Off screen
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{chapter.title}</h3>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">{chapter.detail}</p>
            <p className="mt-6 flex items-baseline gap-3 border-t border-border pt-4 text-sm">
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Feeds back as
                </span>
                <span className="font-medium text-foreground">{chapter.feeds}</span>
            </p>
            {chapter.link && (
                <Link
                    href={chapter.link.href}
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                    {chapter.link.label}
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            )}
        </div>
    )
}

/*
 * Phones and tablets: one card per chapter, photo on top and its story underneath, joined by a
 * soft fade so they read as one piece. Cards swipe sideways and snap; arrows and dots move too.
 * Only the card in view is in colour.
 */
function StoryCards() {
    const [current, setCurrent] = useState(0)
    const track = useRef<HTMLDivElement>(null)

    // The card nearest the middle of the track is the current one
    const onScroll = () => {
        const el = track.current
        if (!el) return
        const centre = el.scrollLeft + el.clientWidth / 2
        let nearest = 0
        let best = Infinity
        Array.from(el.children).forEach((child, i) => {
            const card = child as HTMLElement
            const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre)
            if (distance < best) {
                best = distance
                nearest = i
            }
        })
        setCurrent(nearest)
    }

    const goTo = (i: number) => {
        const el = track.current
        const target = Math.max(0, Math.min(CHAPTERS.length - 1, i))
        const card = el?.children[target] as HTMLElement | undefined
        if (!el || !card) return
        el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
        setCurrent(target)
    }

    const arrowClass =
        'flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground disabled:cursor-default disabled:opacity-30 disabled:hover:border-border'

    return (
        <div className="mt-10 lg:hidden">
            <div
                ref={track}
                onScroll={onScroll}
                className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {CHAPTERS.map((chapter, i) => (
                    <article
                        key={chapter.title}
                        aria-label={chapter.title}
                        className="flex w-[86%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-border bg-background sm:w-[55%]"
                    >
                        {/* Photo, fully visible; only a small index sits on it */}
                        <div className="relative aspect-[4/3] shrink-0">
                            <StoryPhoto
                                photo={chapter.photo}
                                active={i === current}
                                sizes="(min-width: 640px) 55vw, 85vw"
                                className="absolute inset-0"
                            />
                            <span className="absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                                {String(i + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
                            </span>
                            {/* Soft fade from the photo into the story below */}
                            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background to-transparent" />
                        </div>

                        {/* The story */}
                        <div className="flex flex-1 flex-col px-5 pt-1 pb-5">
                            <h3 className="text-3xl font-semibold tracking-tight text-foreground">{chapter.title}</h3>
                            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{chapter.detail}</p>
                            <p className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-border pt-3 text-xs">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                    Feeds back as
                                </span>
                                <span className="font-medium text-foreground">{chapter.feeds}</span>
                            </p>
                            {chapter.link && (
                                <Link
                                    href={chapter.link.href}
                                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
                                >
                                    {chapter.link.label}
                                    <ArrowRightIcon className="size-3.5" />
                                </Link>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* Dots (where you are) and arrows */}
            <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-1.5" role="tablist" aria-label="Stories">
                    {CHAPTERS.map((chapter, i) => (
                        <button
                            key={chapter.title}
                            type="button"
                            role="tab"
                            aria-selected={i === current}
                            aria-label={chapter.title}
                            onClick={() => goTo(i)}
                            className={cn(
                                'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                                i === current ? 'w-8 bg-foreground' : 'w-3 bg-foreground/20'
                            )}
                        />
                    ))}
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => goTo(current - 1)}
                        disabled={current === 0}
                        aria-label="Previous story"
                        className={arrowClass}
                    >
                        <ArrowLeftIcon className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(current + 1)}
                        disabled={current === CHAPTERS.length - 1}
                        aria-label="Next story"
                        className={arrowClass}
                    >
                        <ArrowRightIcon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export function BeyondSection() {
    const [active, setActive] = useState(0)
    const blocks = useRef<(HTMLElement | null)[]>([])

    // The chapter containing the middle of the screen is the active one. The observer only says
    // when something changed; the centre check decides which chapter wins near a boundary.
    useEffect(() => {
        const pickCentre = () => {
            const mid = window.innerHeight / 2
            const i = blocks.current.findIndex((el) => {
                const r = el?.getBoundingClientRect()
                return r && r.top <= mid && r.bottom >= mid
            })
            if (i !== -1) setActive(i)
        }
        const observer = new IntersectionObserver(pickCentre, { rootMargin: '-45% 0px -45% 0px' })
        blocks.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="beyond" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
                <p className="font-mono text-xs uppercase tracking-wider text-primary">Beyond the screen</p>
                <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                    What keeps me grounded
                </h2>
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                    Most of my day is code, but the things that keep me grounded are mostly not. Here&apos;s what
                    actually feeds back into the engineering.
                </p>

                <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[340px_1fr]">

                    {/* Desktop: pinned frame that follows the story */}
                    <div className="hidden lg:block">
                        <div className="sticky top-28">
                            {/* 4:5 frame, narrowed on short screens so it always fits under the header */}
                            <div className="relative mx-auto aspect-[4/5] w-full max-w-[min(340px,calc((100svh-11rem)*0.8))] overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl shadow-black/10 dark:shadow-black/50">
                                {CHAPTERS.map((chapter, i) => (
                                    <div
                                        key={chapter.title}
                                        aria-hidden={i !== active}
                                        className={cn(
                                            'absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none',
                                            i === active ? 'opacity-100' : 'opacity-0'
                                        )}
                                    >
                                        <ChapterVisual chapter={chapter} active={i === active} sizes="340px" />
                                        <FrameCaption chapter={chapter} index={i} />
                                    </div>
                                ))}
                            </div>

                            {/* Progress */}
                            <div className="mx-auto mt-4 flex w-full max-w-[min(340px,calc((100svh-11rem)*0.8))] gap-1.5" aria-hidden>
                                {CHAPTERS.map((chapter, i) => (
                                    <span
                                        key={chapter.title}
                                        className={cn(
                                            'h-1 flex-1 rounded-full transition-colors duration-500',
                                            i <= active ? 'bg-foreground' : 'bg-foreground/10'
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop: the stories that drive the pinned frame */}
                    <ol className="hidden lg:block">
                        {CHAPTERS.map((chapter, i) => (
                            <li
                                key={chapter.title}
                                ref={(el) => {
                                    blocks.current[i] = el
                                }}
                                data-index={i}
                                className="flex min-h-[60svh] items-center"
                            >
                                <ChapterText chapter={chapter} index={i} />
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Phones and tablets: swipeable cards with the story written on the photo */}
                <StoryCards />
            </div>
        </section>
    )
}
