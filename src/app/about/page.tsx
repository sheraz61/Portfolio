import type { Metadata } from 'next'
import { absoluteUrl, pageMetadata } from '@/lib/site'
import { JsonLd, breadcrumbSchema, personId } from '@/components/json-ld'
import { StorySection } from '@/components/about/story-section'
import { LookingForSection } from '@/components/about/looking-for-section'

export const metadata: Metadata = pageMetadata({
    title: 'About',
    description:
        "Sheraz Hussain is a full-stack MERN and Next.js developer from the University of Sargodha. The story behind LearnEx, CampusGuard and Vendora, and what I'm looking for next.",
    path: '/about',
    type: 'profile',
})

export default function AboutPage() {
    return (
        <main>
            <JsonLd
                data={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ProfilePage',
                        url: absoluteUrl('/about'),
                        mainEntity: { '@id': personId },
                    },
                    breadcrumbSchema([{ name: 'About', path: '/about' }]),
                ]}
            />
            <StorySection />
            <LookingForSection />
        </main>
    )
}
