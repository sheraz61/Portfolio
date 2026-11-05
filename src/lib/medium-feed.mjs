// Medium RSS parsing, shared by the site (src/lib/articles.ts) and the archive sync script
// (scripts/sync-medium.mjs). Plain JavaScript so Node can run the script without a build step.

export const MEDIUM_USERNAME = 'sheraz12'
export const FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`

const WORDS_PER_MINUTE = 238
const SUMMARY_MAX = 230

/** Readable names for Medium's tag slugs; anything else is title-cased */
const TAG_NAMES = {
    'dia-d': 'DDIA',
    ddia: 'DDIA',
    nextjs: 'Next.js',
    'next-js': 'Next.js',
    javascript: 'JavaScript',
    'javascript-development': 'JavaScript',
    'javascript-frameworks': 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    nodejs: 'Node.js',
    devops: 'DevOps',
    aws: 'AWS',
    'ci-cd': 'CI/CD',
}

/**
 * @typedef {Object} FeedArticle
 * @property {string} id           Medium's post id (the hex suffix of the URL)
 * @property {string} title
 * @property {string} link         Article URL without tracking parameters
 * @property {string} date         YYYY-MM-DD
 * @property {number} readMinutes
 * @property {string} description  Opening paragraph(s), trimmed at a sentence or word boundary
 * @property {string[]} tags       Readable tag names
 * @property {string[]} mediumTags Raw Medium tag slugs, used to pick sections
 * @property {string} [cover]      First image in the article
 */

const decode = (s) =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&#x27;/g, "'")
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
        .replace(/ /g, ' ')

const stripTags = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

const cdata = (item, tag) => {
    const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))
    return m ? m[1].trim() : ''
}

/** Medium post ids are the 10-14 hex characters at the end of the URL slug */
export function articleId(link) {
    return link.split('?')[0].match(/-([0-9a-f]{10,14})\/?$/)?.[1] ?? link
}

export function readableTag(slug) {
    return TAG_NAMES[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function summarise(html) {
    const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => stripTags(m[1])).filter((p) => p.length > 40)
    let text = ''
    for (const p of paragraphs) {
        text = text ? `${text} ${p}` : p
        if (text.length >= 120) break
    }
    if (text.length <= SUMMARY_MAX) return text
    const cut = text.slice(0, SUMMARY_MAX)
    const sentenceEnd = cut.lastIndexOf('. ')
    return sentenceEnd > 120 ? cut.slice(0, sentenceEnd + 1) : `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/** @returns {FeedArticle[]} newest first */
export function parseMediumFeed(xml) {
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
        .map(([, item]) => {
            const link = cdata(item, 'link').split('?')[0]
            const body = cdata(item, 'content:encoded')
            const mediumTags = [...item.matchAll(/<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g)].map((m) => m[1].trim())
            const pub = new Date(cdata(item, 'pubDate'))
            const words = stripTags(body).split(' ').filter(Boolean).length
            return {
                id: articleId(link),
                title: decode(cdata(item, 'title')),
                link,
                date: Number.isNaN(pub.getTime()) ? '' : pub.toISOString().slice(0, 10),
                readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
                description: summarise(body),
                tags: [...new Set(mediumTags.map(readableTag))],
                mediumTags,
                cover: body.match(/<img[^>]+src="([^"]+)"/)?.[1],
            }
        })
        .filter((a) => a.link && a.date)
        .sort((a, b) => b.date.localeCompare(a.date))
}
