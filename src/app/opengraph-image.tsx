import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

// The preview card shown when the site is shared on LinkedIn, X, WhatsApp, Slack...
// Every page uses it unless it sets its own image (project pages use their screenshot).
export const alt = `${site.name}, ${site.jobTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    const portrait = await readFile(join(process.cwd(), 'public/og-portrait.jpg'), 'base64')
    const skills = ['TypeScript', 'React', 'Next.js', 'Node.js', 'MongoDB']

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 56,
                    padding: '0 80px',
                    background: '#0a0a0a',
                    color: '#fafafa',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`data:image/jpeg;base64,${portrait}`}
                    alt=""
                    width={300}
                    height={375}
                    style={{ borderRadius: 24, border: '1px solid #262626', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: 22, letterSpacing: 4, color: '#a3a3a3', textTransform: 'uppercase' }}>
                        Open to software engineering roles
                    </div>
                    <div style={{ marginTop: 20, fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
                        {site.name}
                    </div>
                    <div style={{ marginTop: 20, fontSize: 36, color: '#d4d4d4' }}>{site.jobTitle}</div>
                    <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {skills.map((skill) => (
                            <div
                                key={skill}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 999,
                                    border: '1px solid #404040',
                                    fontSize: 20,
                                    color: '#e5e5e5',
                                }}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 40, fontSize: 24, color: '#737373' }}>
                        {site.url.replace(/^https?:\/\//, '')}
                    </div>
                </div>
            </div>
        ),
        size
    )
}
