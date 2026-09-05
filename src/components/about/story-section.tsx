const timeline = [
    {
        period: '2022 - 2026',
        title: 'BS Software Engineering',
        place: 'University of Sargodha',
        detail: 'CGPA 3.75 / 4.00',
    },
    {
        period: '2024 - 2026',
        title: 'Building Independently',
        place: 'Full-stack, backend, and AI/ML projects',
        detail: 'LearnEx · Mockly · CampusGuard · Vendora',
    },
    {
        period: '2025',
        title: 'CodeFusion Hackathon',
        place: '2nd place',
        detail: 'Built and shipped a working product under a hard deadline',
    },
    {
        period: '2025 - 2026',
        title: 'CALICO Competitive Programming',
        place: 'UC Berkeley competitive programming',
        detail: 'Ranked #22 in Pakistan',
    },
    {
        period: '2026',
        title: 'DevWeekend Fellowship',
        place: 'Developer fellowship',
        detail: 'Bronze Badge',
    },
    {
        period: '2024',
        title: 'Meta Front-End Developer Certificate',
        place: 'Meta · Coursera',
        detail: 'Professional Certificate',
    },
]

export function StorySection() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">

                {/* ─── Story Header & Body ─── */}
                <div className="w-full space-y-6 text-pretty leading-relaxed text-muted-foreground">

                    {/* Page heading */}
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">About</p>
                        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            The story so far
                        </h1>
                    </div>

                    {/* Origin */}
                    <p className="pt-4 font-mono text-xs uppercase tracking-wider text-primary">
                        How it started
                    </p>

                    <p className="text-lg text-foreground/90 leading-relaxed">
                        I did not grow up around engineers or computers. I grew up around agriculture
                        and family farming, where work was physical and solutions required patience.
                    </p>

                    <p>
                        In farming, you learn very early that everything is an interconnected system:
                        water channels have to flow without bottlenecks, timing determines the entire
                        season&apos;s yield, and when a mechanical pump or engine breaks down, you take
                        it apart with your hands to understand why it stopped working.
                    </p>

                    <p>
                        My shift toward technology happened during the COVID lockdown. When classes
                        abruptly moved online, my daily environment shifted from open fields to a computer
                        screen. While attending virtual lectures, I realized that software operates on
                        the exact same principles as physical systems: data flows through pipelines like
                        water in channels, servers manage capacity like storage silos, and systems require
                        solid foundations and careful maintenance to remain reliable.
                    </p>

                    <p>
                        As the first person in my family to pursue software engineering, I entered the
                        University of Sargodha in 2022. Without a predefined roadmap, I relied on the
                        discipline I learned at home: show up every day, dig into the fundamentals, and
                        keep building until it works.
                    </p>

                    {/* Projects */}
                    <p className="pt-4 font-mono text-xs uppercase tracking-wider text-primary">
                        What I have built
                    </p>

                    <p>
                        I channeled that practical mindset into building complete, production-grade applications:
                    </p>

                    <p>
                        <span className="font-medium text-foreground">LearnEx</span> is my flagship
                        full-stack e-learning ecosystem spanning three separate deployed applications:
                        a student-facing platform, a dedicated administrative dashboard, and a robust
                        backend server. It features 38+ REST APIs, Redis caching layers, Stripe payment
                        processing, real-time Socket.IO notifications, and 12-month Chart.js analytics.
                    </p>

                    <p>
                        <span className="font-medium text-foreground">CampusGuard</span> was my
                        BS final-year capstone project (awarded A+), developed under Dr. Muhammad
                        Ramzan. We collected and labeled a custom dataset of 9,000+ images across 7
                        suspicious activity classes and trained a hybrid ResNet50 + CBAM + custom head deep learning
                        model (91% accuracy), leading to two research papers currently under review.
                        I led the full-stack engineering, building a FastAPI service, AWS RDS PostgreSQL
                        database, Amazon S3 evidence storage, and role-based incident workflows for
                        Admins, Security Guards, and CSA to digitize campus safety.
                    </p>

                    <p>
                        With <span className="font-medium text-foreground">Mockly</span>, I built an
                        AI-powered technical interview platform featuring Google Gemini AI evaluations,
                        real-time voice transcription via the Web Speech API, and interactive analytics
                        dashboards.
                    </p>

                    <p>
                        With <span className="font-medium text-foreground">Vendora</span>, I architected
                        a production-grade multi-vendor marketplace across four deployment units,
                        engineering autonomous seller storefronts, dual Stripe and PayPal payment flows,
                        and a dedicated Socket.io microservice for instant buyer-seller messaging.
                    </p>

                    {/* Now */}
                    <p className="pt-4 font-mono text-xs uppercase tracking-wider text-primary">
                        Where I am now
                    </p>

                    <p>
                        Having graduated in 2026 with a 3.75 CGPA, I am dedicated to backend architecture,
                        system design, database engineering, and building resilient systems that scale.
                    </p>

                    <p>
                        I spend my time studying distributed systems literature, working through{' '}
                        <span className="italic text-foreground">
                            Designing Data-Intensive Applications
                        </span>
                        , practicing problem-solving on LeetCode, and building software that lasts.
                    </p>

                    <blockquote className="border-l-2 border-primary pl-4 text-foreground italic">
                        Whether cultivating a field or designing a backend, good engineering comes down
                        to the same core principle: build solid foundations, eliminate bottlenecks, and
                        respect the details.
                    </blockquote>
                </div>

                {/* ─── Horizontal Timeline / Milestones ─── */}
                <div className="mt-16 pt-12 border-t border-border">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-primary">
                            Timeline &amp; Milestones
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            Key chapters along the way
                        </h2>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {timeline.map((item) => (
                            <div
                                key={item.title}
                                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40 hover:bg-card"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                            {item.period}
                                        </span>
                                    </div>
                                    <h3 className="mt-3 text-base font-semibold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.place}
                                    </p>
                                </div>
                                {item.detail && (
                                    <p className="mt-3 border-t border-border/60 pt-2 text-xs text-muted-foreground/80 font-mono">
                                        {item.detail}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
