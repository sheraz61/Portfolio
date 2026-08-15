import type { Metadata } from 'next'
import { PostListSection } from '@/components/blog/post-list-section'

export const metadata: Metadata = {
    title: 'Blog — Sheraz Hussain',
    description:
        'Write-ups on architecture, backend systems, and the projects behind InterviewPrep, CampusGuard, and Vendora.',
}

export default function BlogPage() {
    return (
        <main>
            <PostListSection />
        </main>
    )
}
