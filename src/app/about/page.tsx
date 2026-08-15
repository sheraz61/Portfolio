import type { Metadata } from 'next'
import { StorySection } from '@/components/about/story-section'
import { LookingForSection } from '@/components/about/looking-for-section'

export const metadata: Metadata = {
    title: 'About — Sheraz Hussain',
    description:
        "Full-stack MERN and Next.js developer from the University of Sargodha. The story behind InterviewPrep, CampusGuard, and Vendora — and what I'm looking for next.",
}

export default function AboutPage() {
    return (
        <main>
            <StorySection />
            <LookingForSection />
        </main>
    )
}
