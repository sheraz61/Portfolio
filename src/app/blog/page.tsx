import type { Metadata } from 'next'
import { BlogSection } from '@/components/blog/blog-section'
import { getArticles } from '@/lib/articles'

export const metadata: Metadata = {
    title: 'Writing | Sheraz Hussain',
    description:
        'Chapter notes from Designing Data-Intensive Applications (2nd edition) and deep dives on system design, backend, frontend and DevOps.',
}

export default async function BlogPage() {
    // Latest posts come from the Medium feed (refreshed every 6 hours), older ones from the saved archive
    const articles = await getArticles()

    return (
        <main>
            <BlogSection articles={articles} />
        </main>
    )
}
