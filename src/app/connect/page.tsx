import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import { ConnectContent } from '@/components/connect/connect-content'

export const metadata: Metadata = pageMetadata({
    title: 'Contact',
    description:
        'Get in touch with Sheraz Hussain by email, LinkedIn, GitHub or LeetCode. Open to full-stack, backend and software engineering roles.',
    path: '/connect',
})

export default function ConnectPage() {
    return (
        <main>
            <ConnectContent />
        </main>
    )
}
