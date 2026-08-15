const timeline = [
    {
        period: '2020 — 2022',
        title: 'FSc Pre-Engineering',
        place: 'The beginning of my interest in computing',
        detail: 'Started exploring how online games, networks, and real-time systems work',
    },
    {
        period: '2022 — 2026',
        title: 'BS Software Engineering',
        place: 'University of Sargodha',
        detail: 'CGPA 3.76 / 4.00',
    },
    {
        period: '2024',
        title: 'Meta Front-End Developer Certificate',
        place: 'Meta · Coursera',
        detail: 'Professional Certificate',
    },
    {
        period: '2024 — 2026',
        title: 'Building independently',
        place: 'Full-stack, backend, and AI/ML projects',
        detail: 'LearnEx · InterviewPrep · CampusGuard · Vendora',
    },
    {
        period: 'Fall 2025',
        title: 'CALICO Fall 2025',
        place: 'UC Berkeley competitive programming',
        detail: 'Ranked #22 in Pakistan',
    },
    {
        period: 'Spring 2026',
        title: 'CALICO Spring 2026',
        place: 'UC Berkeley competitive programming',
        detail: 'Ranked #32 in Pakistan',
    },
    {
        period: '2025',
        title: 'CodeFusion Hackathon',
        place: '2nd place',
        detail: 'Built and shipped a working product under a hard deadline',
    },
    {
        period: '2026',
        title: 'DevWeekend Fellowship',
        place: 'Bronze Badge',
        detail: 'Developer fellowship',
    },
]

export function StorySection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:py-24 md:grid-cols-[1.4fr_1fr] md:gap-16">

                {/* Story */}
                <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">

                    {/* Page heading */}
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">About</p>
                        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            The story so far
                        </h1>
                    </div>

                    {/* Origin */}
                    <p className="pt-2 font-mono text-xs uppercase tracking-wider text-primary">
                        How it started
                    </p>

                    <p>It started during the COVID lockdown.</p>

                    <p>
                        I was studying FSc Pre-Engineering when our classes moved online and most of
                        our usual activities came to a stop. During that time, I started playing
                        online multiplayer games. What caught my attention was not just the game
                        itself, but everything happening behind the screen.
                    </p>

                    <p>
                        I kept wondering:{' '}
                        <span className="font-medium text-foreground">
                            How does a player&apos;s movement appear on someone else&apos;s screen
                            almost instantly? How can multiple players be in the same game and see
                            the same world? How does my voice travel across the internet in real time
                            and reach another player&apos;s headphones? What happens between pressing
                            a button and seeing the result on the screen?
                        </span>
                    </p>

                    <p>
                        I did not know the answers then. But I wanted to.
                    </p>

                    <p>
                        That curiosity eventually led me to Software Engineering at the University of
                        Sargodha in 2022. I am the first person in my family to pursue this field,
                        so there was not really a predefined path for me to follow. I found it by
                        following questions I could not stop asking.
                    </p>

                    {/* Projects */}
                    <p className="pt-2 font-mono text-xs uppercase tracking-wider text-primary">
                        What I&apos;ve built
                    </p>

                    <p>
                        Since then, I have tried to turn that curiosity into things I can actually build.
                    </p>

                    <p>
                        <span className="font-medium text-foreground">LearnEx</span> is my most
                        complete project — a full-stack learning management system with role-based
                        access, course management, Redis-backed sessions, and 38+ REST APIs. I am
                        continuing to build and improve it.
                    </p>

                    <p>
                        <span className="font-medium text-foreground">InterviewPrep</span> is an
                        AI-powered mock interview platform where I am exploring how AI can be used
                        to create more useful interview practice and feedback.
                    </p>

                    <p>
                        <span className="font-medium text-foreground">CampusGuard</span> took me
                        deeper into machine learning. I built a deep learning pipeline for suspicious
                        activity detection with a FastAPI backend, PostgreSQL, and a role-based alert
                        dashboard.
                    </p>

                    <p>
                        <span className="font-medium text-foreground">Vendora</span> gave me
                        experience building a more traditional production-style application: a
                        multi-vendor marketplace with real-time messaging, Stripe and PayPal payments,
                        and a CI/CD pipeline.
                    </p>

                    {/* Now */}
                    <p className="pt-2 font-mono text-xs uppercase tracking-wider text-primary">
                        Where I am now
                    </p>

                    <p>
                        I graduated in 2026, and I am now focused on going deeper rather than simply
                        adding more technologies to a list.
                    </p>

                    <p>
                        I am particularly interested in{' '}
                        <span className="font-medium text-foreground">
                            backend architecture, system design, databases, and
                            AI engineering
                        </span>
                        . I am currently working through{' '}
                        <span className="italic text-foreground">
                            Designing Data-Intensive Applications
                        </span>{' '}
                        by Martin Kleppmann, solving problems on LeetCode, and continuing to build.
                    </p>

                    <p>The question that started all of this is still the one I come back to:</p>

                    <blockquote className="border-l-2 border-primary pl-4 text-foreground">
                        How does this actually work behind the screen?
                    </blockquote>
                </div>

                {/* Timeline */}
                <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">
                        Timeline
                    </p>
                    <ol className="mt-6 space-y-6 border-l border-border pl-5">
                        {timeline.map((item) => (
                            <li key={item.title} className="relative">
                                <span className="absolute -left-[23px] top-1 size-2 rounded-full border-2 border-background bg-primary" />
                                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                    {item.period}
                                </p>
                                <p className="mt-1 text-sm font-medium text-foreground">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.place}</p>
                                {item.detail && (
                                    <p className="mt-0.5 text-sm text-muted-foreground">{item.detail}</p>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}
