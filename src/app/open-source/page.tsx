import type { Metadata } from 'next'
import { OpenSourceListSection } from '@/components/open-source/project-list-section'
import { ContactSection } from '@/components/home/contact-section'

export const metadata: Metadata = {
    title: 'Open Source | Sheraz Hussain',
    description: 'Open source organisations I contribute to, with my main merged pull requests.',
}

export default function OpenSourcePage() {
    return (
        <main>
            <OpenSourceListSection />
            <ContactSection />
        </main>
    )
}
