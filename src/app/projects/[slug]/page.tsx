import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailSection } from '@/components/projects/project-detail-section'
import { ContactSection } from '@/components/home/contact-section'
import { getProject, projects } from '@/lib/projects-data'
import { absoluteUrl, pageMetadata } from '@/lib/site'
import { JsonLd, breadcrumbSchema, personId } from '@/components/json-ld'

type Props = { params: Promise<{ slug: string }> }

// Only the projects listed in projects-data.ts get a page
export const dynamicParams = false

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject((await params).slug)
    if (!project) return {}
    return pageMetadata({
        title: project.featured ? `${project.name} – ${project.featured.tagline}` : project.name,
        description: project.featured?.summary ?? project.description,
        path: `/projects/${project.slug}`,
        image: project.preview
            ? { url: project.preview.cover, width: 1200, height: 750, alt: `${project.name} screenshot` }
            : undefined,
    })
}

export default async function ProjectPage({ params }: Props) {
    const project = getProject((await params).slug)
    if (!project) notFound()

    return (
        <main>
            <JsonLd
                data={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareSourceCode',
                        name: project.name,
                        description: project.description,
                        url: absoluteUrl(`/projects/${project.slug}`),
                        codeRepository: project.github,
                        programmingLanguage: project.stack,
                        keywords: project.stack.join(', '),
                        creativeWorkStatus: project.status,
                        ...(project.vercel && { sameAs: project.vercel }),
                        ...(project.preview && { image: absoluteUrl(project.preview.cover) }),
                        author: { '@id': personId },
                    },
                    breadcrumbSchema([
                        { name: 'Projects', path: '/projects' },
                        { name: project.name, path: `/projects/${project.slug}` },
                    ]),
                ]}
            />
            <ProjectDetailSection project={project} />
            <ContactSection />
        </main>
    )
}
