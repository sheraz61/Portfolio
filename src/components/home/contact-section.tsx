import { ArrowUpRightIcon, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const links = [
    {
        label: 'Email',
        description: 'hsheraz271@gmail.com',
        href: 'mailto:hsheraz271@gmail.com',
        icon: Mail,
    },
    {
        label: 'LinkedIn',
        description: 'linkedin.com/in/hsheraz',
        href: 'https://linkedin.com/in/hsheraz',
        icon: FaLinkedin,
    },
    {
        label: 'GitHub',
        description: 'github.com/sheraz61',
        href: 'https://github.com/sheraz61',
        icon: FaGithub,
    },
] as const

export function ContactSection() {
    return (
        <section id="connect" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* Header */}
                <p className="font-mono text-xs uppercase tracking-wider text-primary">
                    Get in touch
                </p>
                <h2 className="mt-3 max-w-lg text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                    Open to roles and conversations
                </h2>
                <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                    I am looking for software engineering roles where I can work on real problems,
                    learn from experienced engineers, and contribute to products people use.
                    If that sounds like your team, reach out.
                </p>

                {/* Contact links */}
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    {links.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Icon className="size-4" />
                            <span>{label}</span>
                            <ArrowUpRightIcon className="size-3 text-muted-foreground opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground group-hover:opacity-100" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
