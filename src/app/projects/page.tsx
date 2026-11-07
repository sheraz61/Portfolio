import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import { ProjectListSection } from '@/components/projects/project-list-section'
import { ContactSection } from '@/components/home/contact-section'

export const metadata: Metadata = pageMetadata({
    title: 'Projects',
    description:
        'Projects by Sheraz Hussain: LearnEx, Mockly, CampusGuard and Vendora, full-stack builds spanning e-learning platforms, AI products, deep learning systems and real-time marketplaces.',
    path: '/projects',
})

export default function ProjectsPage() {
    return (
        <main>
            <ProjectListSection />
            <ContactSection />
        </main>
    )
}
