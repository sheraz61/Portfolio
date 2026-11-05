// Saves new Medium posts into src/data/medium-archive.json.
// The site already shows the latest 10 posts straight from the feed; run this now and then
// (npm run articles:sync) so posts stay listed after they drop out of Medium's 10-item feed.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { FEED_URL, parseMediumFeed } from '../src/lib/medium-feed.mjs'

const ARCHIVE = fileURLToPath(new URL('../src/data/medium-archive.json', import.meta.url))

const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-site)' } })
if (!res.ok) {
    console.error(`Could not fetch ${FEED_URL}: HTTP ${res.status}`)
    process.exit(1)
}

const feed = parseMediumFeed(await res.text())
const archive = JSON.parse(readFileSync(ARCHIVE, 'utf8'))
const byId = new Map(archive.map((a) => [a.id, a]))

let added = 0
for (const fresh of feed) {
    const saved = byId.get(fresh.id)
    if (!saved) added++
    // Keep any hand-edited description, tags and read time
    byId.set(
        fresh.id,
        saved ? { ...fresh, description: saved.description, tags: saved.tags, readMinutes: saved.readMinutes } : fresh
    )
}

const merged = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date))
writeFileSync(ARCHIVE, JSON.stringify(merged, null, 2) + '\n')
console.log(`Feed: ${feed.length} posts. Added ${added} new, archive now has ${merged.length}.`)
if (added) console.log('New DDIA post? Add its chapter to OVERRIDES in src/lib/articles.ts.')
