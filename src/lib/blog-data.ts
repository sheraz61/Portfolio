export type Post = {
    title: string
    tags: string[]
    date: string
    readTime: string
    link: string
}

export const posts: Post[] = [
    {
        title: 'Route Handlers and Middleware in Next.js, Through the Eyes of an Express Developer',
        date: 'Jul 24, 2026',
        readTime: '7 min read',
        link: 'https://sheraz12.medium.com/route-handlers-and-middleware-in-next-js-through-the-eyes-of-an-express-developer-86e4ba783d0b',
        tags: ['Next.js', 'React', 'JavaScript'],
    },
    {
        title: 'Next.js Routing Deep Dive: Parallel Routes & Intercepting Routes',
        date: 'Jul 23, 2026',
        readTime: '6 min read',
        link: 'https://sheraz12.medium.com/next-js-routing-deep-dive-parallel-routes-intercepting-routes-552368dac5ac',
        tags: ['Next.js', 'React', 'Routing'],
    },
    {
        title: 'Next.js Routing and Rendering, In Plain Simple Terms',
        date: 'Jul 22, 2026',
        readTime: '6 min read',
        link: 'https://sheraz12.medium.com/next-js-routing-and-rendering-in-plain-simple-terms-299100d97146',
        tags: ['Next.js', 'TypeScript', 'React'],
    },

    {
        title: 'Renders, Memoization, and Refs: Everything I Learned Prepping for React Interviews',
        date: 'Jul 19, 2026',
        readTime: '12 min read',
        link: 'https://medium.com/@sheraz12/renders-memoization-and-refs-everything-i-learned-prepping-for-react-interviews-32d6b4ffe8f0',
        tags: ['React', 'Interviews'],
    },
    {
        title: 'JavaScript’s Hidden Engine: How the Event Loop, Memory, and Garbage Collection Actually Work',
        date: 'Apr 24, 2026',
        readTime: '16 min read',
        link: 'https://sheraz12.medium.com/javascripts-hidden-engine-how-the-event-loop-memory-and-garbage-collection-actually-work-fd95f6ca69f0',
        tags: ['JavaScript', 'Node.js', 'Memory'],
    },
    {
        title: 'I Spent a Weekend Learning How Software Actually Gets from Your Laptop to Millions of Users',
        date: 'Apr 19, 2026',
        readTime: '9 min read',
        link: 'https://medium.com/@sheraz12/i-spent-a-weekend-learning-how-software-actually-gets-from-your-laptop-to-millions-of-users-68965998a6bb',
        tags: ['DevOps', 'AWS', 'Infrastructure'],
    },
    {
        title: 'How JavaScript Actually Works: Engines, V8, and the Code Behind Your Code',
        date: 'Mar 31, 2026',
        readTime: '11 min read',
        link: 'https://sheraz12.medium.com/how-javascript-actually-works-engines-v8-and-the-code-behind-your-code-48e72a0178a3',
        tags: ['JavaScript', 'Node.js', 'Software Engineering'],
    },
]