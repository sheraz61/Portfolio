import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailSection } from '@/components/open-source/project-detail-section'
import { ContactSection } from '@/components/home/contact-section'
import { getProject, openSourceProjects } from '@/lib/open-source-data'

type Props = { params: Promise<{ slug: string }> }

// Only the projects listed in open-source-data.ts get a page
export const dynamicParams = false

export function generateStaticParams() {
    return openSourceProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject((await params).slug)
    if (!project) return {}
    return {
        title: `${project.org} · Open Source | Sheraz Hussain`,
        description: `${project.pullRequests.length} merged pull requests to ${project.name}. ${project.description}`,
    }
}

export default async function OpenSourceProjectPage({ params }: Props) {
    const project = getProject((await params).slug)
    if (!project) notFound()

    return (
        <main>
            <ProjectDetailSection project={project} />
            <ContactSection />
        </main>
    )
}
