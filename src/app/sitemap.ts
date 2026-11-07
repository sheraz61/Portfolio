import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects-data'
import { openSourceProjects } from '@/lib/open-source-data'
import { absoluteUrl } from '@/lib/site'

// Served at /sitemap.xml. New projects and open source repos are picked up from the data files.
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const pages: MetadataRoute.Sitemap = [
        { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
        { url: absoluteUrl('/about'), changeFrequency: 'monthly', priority: 0.9 },
        { url: absoluteUrl('/projects'), changeFrequency: 'monthly', priority: 0.9 },
        { url: absoluteUrl('/open-source'), changeFrequency: 'weekly', priority: 0.8 },
        { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 },
        { url: absoluteUrl('/connect'), changeFrequency: 'yearly', priority: 0.6 },
    ].map((page) => ({ ...page, lastModified: now }) as MetadataRoute.Sitemap[number])

    const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
        url: absoluteUrl(`/projects/${p.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        ...(p.preview && { images: [absoluteUrl(p.preview.cover)] }),
    }))

    const openSourcePages: MetadataRoute.Sitemap = openSourceProjects.map((p) => ({
        url: absoluteUrl(`/open-source/${p.slug}`),
        // Newest merged PR is first in the list
        lastModified: p.pullRequests[0] ? new Date(p.pullRequests[0].mergedAt) : now,
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    return [...pages, ...projectPages, ...openSourcePages]
}
