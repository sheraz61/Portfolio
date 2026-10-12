import type { Metadata } from 'next'
import { PostListSection } from '@/components/blog/post-list-section'

export const metadata: Metadata = {
    title: 'Blog & System Design | Sheraz Hussain',
    description:
        'In-depth write-ups on distributed systems, load shedding, retry storms, backend resilience, and modern Next.js/React engineering.',
}

export default function BlogPage() {
    return (
        <main>
            <PostListSection />
        </main>
    )
}
