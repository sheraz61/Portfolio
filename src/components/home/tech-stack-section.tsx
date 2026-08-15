const stack = [
    {
        category: 'Languages',
        items: ['TypeScript', 'JavaScript', 'Python', 'C++'],
    },
    {
        category: 'Frontend',
        items: [
            'React',
            'Next.js',
            'Redux',
            'Tailwind CSS',
            'Material UI',
            'Shadcn UI',
        ],
    },
    {
        category: 'Backend',
        items: [
            'Node.js',
            'Express.js',
            'FastAPI',
            'REST APIs',
            'Socket.IO',
            'API Integration',
        ],
    },
    {
        category: 'Data & AI',
        items: [
            'NumPy',
            'Pandas',
            'Scikit-learn',
            'TensorFlow',
            'Computer Vision',
            'NLP',
            'Transformers',
            'Hugging Face',
            'LLMs',
        ],
    },
    {
        category: 'Databases',
        items: [
            'MongoDB',
            'PostgreSQL',
            'MySQL',
            'Redis',
        ],
    },
    {
        category: 'Cloud & DevOps',
        items: [
            'AWS',
            'Docker',
            'Nginx',
            'Git/GitHub',
            'GitHub Actions',
            'CI/CD',
            'Postman',
            'Vercel',
        ],
    },
]

export function TechStackSection() {
    return (
        <section id="stack" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
                <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">
                        Stack
                    </p>
                    <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                        Technologies I work with
                    </h2>
                </div>

                <div className="mt-10 divide-y divide-border overflow-hidden rounded-lg border border-border">
                    {stack.map((group) => (
                        <div
                            key={group.category}
                            className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:gap-8"
                        >
                            <p className="w-44 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                {group.category}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
