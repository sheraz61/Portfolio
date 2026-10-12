export type Post = {
    title: string
    tags: string[]
    date: string
    readTime: string
    link: string
    description: string
    featured?: boolean
}

export const posts: Post[] = [
    {
        title: 'Why a Server Saying No on Purpose Can Be the Healthiest Thing It Does',
        date: 'Oct 04, 2026',
        readTime: '8 min read',
        link: 'https://sheraz12.medium.com/why-a-server-saying-no-on-purpose-can-be-the-healthiest-thing-it-does-e3e3a619f437',
        tags: ['System Design', 'Backpressure', 'Load Shedding', 'Architecture'],
        description:
            'Why intentional rejection protects overall system viability: understanding backpressure, rate-limiting, and load shedding to avoid catastrophic crashes when incoming traffic peaks.',
        featured: true,
    },
    {
        title: 'Why a Poorly Scoped Circuit Breaker Can Turn a Small Failure into a Big One',
        date: 'Sep 29, 2026',
        readTime: '6 min read',
        link: 'https://sheraz12.medium.com/why-a-poorly-scoped-circuit-breaker-can-turn-a-small-failure-into-a-big-one-919ff0972eee',
        tags: ['Reliability', 'Circuit Breakers', 'Distributed Systems', 'Architecture'],
        description:
            'The anatomy of blast radiuses: how over-eager or broadly scoped circuit breakers turn localized component errors into widespread system outages, and how to scope fault boundaries properly.',
    },
    {
        title: 'Why Retrying a Failed Request Can Make Everything Worse',
        date: 'Sep 27, 2026',
        readTime: '7 min read',
        link: 'https://sheraz12.medium.com/why-retrying-a-failed-request-can-make-everything-worse-b6894c07c31f',
        tags: ['Distributed Systems', 'Resilience', 'Metastable Failure', 'Performance'],
        description:
            'Exploring retry storms and metastable failure states: why intuitive client-side retries amplify backend saturation, and why simple backoff with jitter is not always enough.',
    },
    {
        title: 'Why One Post from a Celebrity Can Break a Database',
        date: 'Sep 21, 2026',
        readTime: '7 min read',
        link: 'https://sheraz12.medium.com/why-one-post-from-a-celebrity-can-break-a-database-21be16fb7ba0',
        tags: ['Databases', 'Scalability', 'High Traffic', 'Distributed Systems'],
        description:
            'The viral fan-out dilemma: how an unexpected surge in follower interactions causes database hot-partitioning, cache invalidation stampedes, and write lock contention.',
    },
    {
        title: 'Why the Servers You Rent and the Servers You Own Make Completely Different Promises',
        date: 'Sep 14, 2026',
        readTime: '8 min read',
        link: 'https://sheraz12.medium.com/why-the-servers-you-rent-and-the-servers-you-own-make-completely-different-promises-268f2e662fda',
        tags: ['Cloud Computing', 'Infrastructure', 'DevOps', 'Architecture'],
        description:
            'Cloud rentals vs. self-hosted bare metal: weighing operational convenience, vendor boundaries, cost predictability, and strategic control for modern engineering teams.',
    },
    {
        title: 'Why Your Bank App and Your Company’s Sales Report Run on Completely Different Systems',
        date: 'Sep 11, 2026',
        readTime: '7 min read',
        link: 'https://sheraz12.medium.com/why-your-bank-app-and-your-companys-sales-report-run-on-completely-different-systems-21ae4e66b57b',
        tags: ['Databases', 'OLTP & OLAP', 'Data Engineering', 'System Design'],
        description:
            'Breaking down transactional vs. analytical workloads: why systems of record separate from reporting engines, and how HTAP attempts to bridge the gap.',
    },
    {
        title: 'Route Handlers and Middleware in Next.js, Through the Eyes of an Express Developer',
        date: 'Jul 24, 2026',
        readTime: '7 min read',
        link: 'https://sheraz12.medium.com/route-handlers-and-middleware-in-next-js-through-the-eyes-of-an-express-developer-86e4ba783d0b',
        tags: ['Next.js', 'React', 'JavaScript'],
        description:
            'Bridging the paradigm shift between Express middleware pipelines and Next.js App Router route handlers, edge runtimes, and request context handling.',
    },
    {
        title: 'Next.js Routing Deep Dive: Parallel Routes & Intercepting Routes',
        date: 'Jul 23, 2026',
        readTime: '6 min read',
        link: 'https://sheraz12.medium.com/next-js-routing-deep-dive-parallel-routes-intercepting-routes-552368dac5ac',
        tags: ['Next.js', 'React', 'Routing'],
        description:
            'Mastering advanced routing mechanisms in Next.js: building modal workflows, contextual routing slots, and multi-view layouts without losing URL integrity.',
    },
    {
        title: 'Next.js Routing and Rendering, In Plain Simple Terms',
        date: 'Jul 22, 2026',
        readTime: '6 min read',
        link: 'https://sheraz12.medium.com/next-js-routing-and-rendering-in-plain-simple-terms-299100d97146',
        tags: ['Next.js', 'TypeScript', 'React'],
        description:
            'A clear, visual breakdown of Server Components, Client Components, Static Site Generation (SSG), and Dynamic Rendering without confusing terminology.',
    },
    {
        title: 'Renders, Memoization, and Refs: Everything I Learned Prepping for React Interviews',
        date: 'Jul 19, 2026',
        readTime: '12 min read',
        link: 'https://medium.com/@sheraz12/renders-memoization-and-refs-everything-i-learned-prepping-for-react-interviews-32d6b4ffe8f0',
        tags: ['React', 'Performance', 'Interviews'],
        description:
            'Comprehensive deep dive into React reconciliation, render passes, useMemo, useCallback trade-offs, and mutable ref values under the hood.',
    },
    {
        title: 'JavaScript’s Hidden Engine: How the Event Loop, Memory, and Garbage Collection Actually Work',
        date: 'Apr 24, 2026',
        readTime: '16 min read',
        link: 'https://sheraz12.medium.com/javascripts-hidden-engine-how-the-event-loop-memory-and-garbage-collection-actually-work-fd95f6ca69f0',
        tags: ['JavaScript', 'Node.js', 'Memory Internals'],
        description:
            'An in-depth look under the hood of JavaScript runtimes: microtask queues, macrotasks, stack frames, heap allocation, and mark-and-sweep garbage collection.',
    },
    {
        title: 'I Spent a Weekend Learning How Software Actually Gets from Your Laptop to Millions of Users',
        date: 'Apr 19, 2026',
        readTime: '9 min read',
        link: 'https://medium.com/@sheraz12/i-spent-a-weekend-learning-how-software-actually-gets-from-your-laptop-to-millions-of-users-68965998a6bb',
        tags: ['DevOps', 'AWS', 'Infrastructure', 'CI/CD'],
        description:
            'Unpacking CI/CD pipelines, containerization, reverse proxies, CDNs, and orchestration from a developer perspective stepping into infrastructure.',
    },
    {
        title: 'How JavaScript Actually Works: Engines, V8, and the Code Behind Your Code',
        date: 'Mar 31, 2026',
        readTime: '11 min read',
        link: 'https://sheraz12.medium.com/how-javascript-actually-works-engines-v8-and-the-code-behind-your-code-48e72a0178a3',
        tags: ['JavaScript', 'V8', 'Compilers', 'Software Engineering'],
        description:
            'From source code to machine instructions: JIT compilation, Ignition bytecode interpreter, TurboFan optimization passes, and hidden classes in V8.',
    },
]