import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailSection } from '@/components/projects/project-detail-section'
import { ContactSection } from '@/components/home/contact-section'
import { getProject, projects } from '@/lib/projects-data'

type Props = { params: Promise<{ slug: string }> }

// Only the projects listed in projects-data.ts get a page
export const dynamicParams = false

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject((await params).slug)
    if (!project) return {}
    return {
        title: `${project.name} | Sheraz Hussain`,
        description: project.featured?.summary ?? project.description,
        openGraph: project.preview ? { images: [project.preview.cover] } : undefined,
    }
}

export default async function ProjectPage({ params }: Props) {
    const project = getProject((await params).slug)
    if (!project) notFound()

    return (
        <main>
            <ProjectDetailSection project={project} />
            <ContactSection />
        </main>
    )
}
