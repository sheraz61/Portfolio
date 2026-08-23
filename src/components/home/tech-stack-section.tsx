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

const TECHNOLOGIES: { name: string; icon: IconType }[] = [
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'React', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Express', icon: SiExpress },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Redis', icon: SiRedis },
    { name: 'Docker', icon: SiDocker },
    { name: 'AWS', icon: FaAws },
    { name: 'Git', icon: SiGit },
    { name: 'GitHub', icon: SiGithub },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
]

export function TechStackSection() {
    return (
        <section id="stack" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">

                {/* Label */}
                <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Technologies &amp; Tools
                </p>

                {/* Marquee — contained within max-w */}
                <div className="marquee-container mt-10">
                    <div className="marquee-track">
                        {/* First copy */}
                        {TECHNOLOGIES.map((tech) => (
                            <div key={`a-${tech.name}`} className="marquee-item">
                                <tech.icon className="marquee-icon" />
                                <span className="marquee-label">{tech.name}</span>
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {TECHNOLOGIES.map((tech) => (
                            <div key={`b-${tech.name}`} className="marquee-item" aria-hidden="true">
                                <tech.icon className="marquee-icon" />
                                <span className="marquee-label">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
