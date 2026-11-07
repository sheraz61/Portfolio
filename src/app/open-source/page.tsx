import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import { OpenSourceListSection } from '@/components/open-source/project-list-section'
import { ContactSection } from '@/components/home/contact-section'

export const metadata: Metadata = pageMetadata({
    title: 'Open Source Contributions',
    description:
        'Open source projects Sheraz Hussain contributes to, with merged pull requests, the areas they touched and what each change does.',
    path: '/open-source',
})

export default function OpenSourcePage() {
    return (
        <main>
            <OpenSourceListSection />
            <ContactSection />
        </main>
    )
}
