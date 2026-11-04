import type { CSSProperties } from 'react'
import {
    SiTypescript,
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiExpress,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiDocker,
    SiGit,
    SiGithub,
    SiTailwindcss,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import type { IconType } from 'react-icons'

type Tech = {
    name: string
    icon: IconType
    /** Official brand colour; `null` for black logos, which follow the theme (black / white) */
    brand: string | null
}

/* Two rows that scroll in opposite directions */
const ROWS: { label: string; reverse?: boolean; items: Tech[] }[] = [
    {
        label: 'Languages and frontend',
        items: [
            { name: 'TypeScript', icon: SiTypescript, brand: '#3178C6' },
            { name: 'JavaScript', icon: SiJavascript, brand: '#F7DF1E' },
            { name: 'React', icon: SiReact, brand: '#61DAFB' },
            { name: 'Next.js', icon: SiNextdotjs, brand: null },
            { name: 'Tailwind CSS', icon: SiTailwindcss, brand: '#06B6D4' },
            { name: 'Node.js', icon: SiNodedotjs, brand: '#5FA04E' },
            { name: 'Express', icon: SiExpress, brand: null },
        ],
    },
    {
        label: 'Data, infrastructure and tools',
        reverse: true,
        items: [
            { name: 'PostgreSQL', icon: SiPostgresql, brand: '#4169E1' },
            { name: 'MongoDB', icon: SiMongodb, brand: '#47A248' },
            { name: 'Redis', icon: SiRedis, brand: '#FF4438' },
            { name: 'Docker', icon: SiDocker, brand: '#2496ED' },
            { name: 'AWS', icon: FaAws, brand: '#FF9900' },
            { name: 'Git', icon: SiGit, brand: '#F05032' },
            { name: 'GitHub', icon: SiGithub, brand: null },
        ],
    },
]

function TechTile({ tech }: { tech: Tech }) {
    const Icon = tech.icon
    return (
        <div
            className="tech-tile"
            style={{ '--brand': tech.brand ?? 'var(--foreground)' } as CSSProperties}
        >
            <Icon aria-hidden className="tech-icon" />
            <span className="tech-label">{tech.name}</span>
        </div>
    )
}

export function TechStackSection() {
    return (
        <section id="stack" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">

                {/* Label */}
                <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Technologies &amp; Tools
                </p>

                {/* Rows: each loops seamlessly. A group holds the list twice so it is always wider
                    than the section (no gap at the end), then an aria-hidden copy of the group. */}
                <div className="mt-10 flex flex-col gap-3">
                    {ROWS.map((row) => (
                        <div key={row.label} className="marquee-container">
                            <div className={row.reverse ? 'marquee-track marquee-track--reverse' : 'marquee-track'}>
                                {[false, true].map((isCopy) => (
                                    <ul
                                        key={String(isCopy)}
                                        aria-label={isCopy ? undefined : row.label}
                                        aria-hidden={isCopy || undefined}
                                        className={isCopy ? 'marquee-group marquee-group--copy' : 'marquee-group'}
                                    >
                                        {[...row.items, ...row.items].map((tech, i) => {
                                            const repeat = i >= row.items.length
                                            return (
                                                <li
                                                    key={`${tech.name}-${i}`}
                                                    aria-hidden={(!isCopy && repeat) || undefined}
                                                    className={repeat ? 'marquee-repeat' : undefined}
                                                >
                                                    <TechTile tech={tech} />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
