const interests = [
    {
        title: 'Reading',
        detail:
            "I'm currently working through Designing Data-Intensive Applications by Martin Kleppmann, alongside books on focus, solitude, and personal growth. The technical books sharpen how I think about systems; the personal ones often influence how I approach the work itself.",
    },
    {
        title: 'Teaching',
        detail:
            "I teach Python to FSc and ICS students in my hometown. Explaining programming from first principles forces me to understand things more deeply myself.",
    },
    {
        title: 'Farming',
        detail:
            "When I'm home, I work in the fields with my father. It's slow, physical, and completely away from a screen. Some of my clearest thinking about difficult problems happens after a few hours of doing something unrelated.",
    },
    {
        title: 'Traveling',
        detail:
            "I enjoy visiting places I've never seen before. Getting away from familiar surroundings is a good reminder to step back, change perspective, and notice what actually matters.",
    },
]

export function BeyondSection() {
    return (
        <section id="beyond" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
                <p className="font-mono text-xs uppercase tracking-wider text-primary">
                    Beyond the screen
                </p>
                <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                    What keeps me grounded                </h2>
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                    Most of my day is code, but the things that keep me grounded are mostly not.
                    Here&apos;s what actually feeds back into the engineering.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {interests.map((interest) => (
                        <div
                            key={interest.title}
                            className="rounded-lg border border-border p-6 transition-colors hover:border-primary/40"
                        >
                            <h3 className="text-base font-semibold text-foreground">
                                {interest.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {interest.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
