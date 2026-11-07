import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailSection } from '@/components/open-source/project-detail-section'
import { ContactSection } from '@/components/home/contact-section'
import { getProject, openSourceProjects } from '@/lib/open-source-data'
import { pageMetadata } from '@/lib/site'
import { JsonLd, breadcrumbSchema } from '@/components/json-ld'

type Props = { params: Promise<{ slug: string }> }

// Only the projects listed in open-source-data.ts get a page
export const dynamicParams = false

export function generateStaticParams() {
    return openSourceProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject((await params).slug)
    if (!project) return {}
    return pageMetadata({
        title: `${project.org} Open Source Contributions`,
        description: `${project.pullRequests.length} merged pull requests by Sheraz Hussain to ${project.name}. ${project.description}`,
        path: `/open-source/${project.slug}`,
    })
}

export default async function OpenSourceProjectPage({ params }: Props) {
    const project = getProject((await params).slug)
    if (!project) notFound()

    return (
        <main>
            <JsonLd
                data={breadcrumbSchema([
                    { name: 'Open Source', path: '/open-source' },
                    { name: project.org, path: `/open-source/${project.slug}` },
                ])}
            />
            <ProjectDetailSection project={project} />
            <ContactSection />
        </main>
    )
}
