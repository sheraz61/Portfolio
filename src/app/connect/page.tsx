import type { Metadata } from 'next'
import { ConnectContent } from '@/components/connect/connect-content'

export const metadata: Metadata = {
    title: 'Connect — Sheraz Hussain',
    description:
        'Get in touch — email, LinkedIn, GitHub, and LeetCode. Open to full-stack, backend, and software engineering roles.',
}

export default function ConnectPage() {
    return (
        <main>
            <ConnectContent />
        </main>
    )
}
