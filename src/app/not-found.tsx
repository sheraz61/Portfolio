import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
            <p className="font-mono text-sm font-medium uppercase tracking-wider text-primary">
                404 Error
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Page not found
            </h1>

            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Sorry, the page you are looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            <div className="mt-10">
                <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <ArrowLeftIcon className="size-4" />
                    Back to home
                </Link>
            </div>
        </main>
    )
}
