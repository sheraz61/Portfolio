import type { MetadataRoute } from 'next'
import { absoluteUrl, site } from '@/lib/site'

// Served at /robots.txt
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/' }],
        sitemap: absoluteUrl('/sitemap.xml'),
        host: site.url,
    }
}
