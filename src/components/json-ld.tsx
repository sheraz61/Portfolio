import { absoluteUrl, site } from '@/lib/site'

/** Renders schema.org structured data. `<` is escaped so the JSON can't close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    )
}

export const personId = `${site.url}/#person`
export const websiteId = `${site.url}/#website`

/** Who the site is about. Search engines use this for the knowledge panel and to link the profiles below. */
export const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    url: site.url,
    image: absoluteUrl('/logo.png'),
    email: `mailto:${site.email}`,
    jobTitle: site.jobTitle,
    description: site.description,
    knowsAbout: site.skills,
    alumniOf: { '@type': 'CollegeOrUniversity', name: site.university },
    nationality: { '@type': 'Country', name: site.country },
    sameAs: Object.values(site.socials),
}

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    author: { '@id': personId },
    publisher: { '@id': personId },
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    }
}
