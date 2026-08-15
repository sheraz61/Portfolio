import Link from 'next/link'
import { ArrowUpRightIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LookingForSection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                <p className="font-mono text-xs uppercase tracking-wider text-primary">
                    What I am looking for
                </p>
                <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                    The right next step
                </h2>

                <div className="mt-6 max-w-2xl space-y-5 text-pretty leading-relaxed text-muted-foreground">
                    <p>
                        I am a fresh graduate looking for a software engineering role where I can
                        work on real problems, take real ownership, and keep getting better at my
                        craft. I am especially drawn to backend engineering, system design, and how
                        production systems are built to scale and stay reliable.
                    </p>
                    <p>
                        I want to work with engineers who care about building things properly, not
                        just shipping quickly. I am at the start of my career, and the environment
                        I grow in matters. I am looking for a team where I can contribute
                        meaningfully from day one and learn from people with more experience than me.
                    </p>
                    <p>
                        I go deep on things I care about. I do not give up on hard problems.
                        And I try to be a good teammate.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                    <Button
                        size="lg"
                        variant="outline"
                        nativeButton={false}
                        render={<Link href="/projects" />}
                    >
                        View projects
                        <ArrowRightIcon data-icon="inline-end" />
                    </Button>
                    <Button
                        size="lg"
                        nativeButton={false}
                        render={<Link href="/connect" />}
                    >
                        Get in touch
                        <ArrowUpRightIcon data-icon="inline-end" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
