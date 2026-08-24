import type { Metadata } from 'next'
import { ProjectListSection } from '@/components/projects/project-list-section'
import { ContactSection } from '@/components/home/contact-section'

export const metadata: Metadata = {
    title: 'Projects — Sheraz Hussain',
    description:
        'LearnEx, InterviewPrep, CampusGuard, and Vendora — full-stack builds spanning e-learning platforms, AI products, deep learning systems, and real-time marketplaces.',
}

export default function ProjectsPage() {
    return (
        <main>
            <ProjectListSection />
            <ContactSection />
        </main>
    )
}
