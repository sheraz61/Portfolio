import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/projects-data'
import { cn } from '@/lib/utils'

/* "learn-ex-client.vercel.app" or "host/path" */
function addressBarText(url: string) {
    const { host, pathname } = new URL(url)
    return pathname === '/' ? host : host + pathname
}

/*
 * A project's screenshot inside a minimal browser window.
 * Grayscale until a parent `.group` is hovered; full-page shots scroll top to bottom on hover.
 * Projects without screenshots get a typographic cover instead.
 */
export function ProjectPreview({
    project,
    sizes,
    priority = false,
    className,
    viewportClassName,
}: {
    project: Project
    sizes: string
    priority?: boolean
    className?: string
    /** Override the screen shape, e.g. a taller aspect ratio on the project page */
    viewportClassName?: string
}) {
    const preview = project.preview
    const pageUrl = preview?.url ?? project.vercel
    const full = preview?.full
    // Longer pages scroll for longer, so the speed feels the same on every card
    const scrollSeconds = full ? Math.min(9, Math.max(4, (full.height / 1200) * 1.8)) : 0

    return (
        <div className={cn('overflow-hidden rounded-xl border border-border bg-background', className)}>
            {/* Window bar */}
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-3 py-2">
                <span aria-hidden className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-foreground/15" />
                    <span className="size-2 rounded-full bg-foreground/15" />
                    <span className="size-2 rounded-full bg-foreground/15" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-md bg-background px-2.5 py-0.5 text-center font-mono text-[10px] text-muted-foreground">
                    {pageUrl ? addressBarText(pageUrl) : `${project.slug} · source on GitHub`}
                </span>
            </div>

            {/* Viewport */}
            <div className={cn('preview-viewport relative aspect-[16/10] overflow-hidden bg-muted', viewportClassName)}>
                {full ? (
                    <Image
                        src={full.src}
                        alt={`${project.name} live site`}
                        width={1200}
                        height={full.height}
                        sizes={sizes}
                        priority={priority}
                        className="preview-shot preview-scroll absolute inset-x-0 top-0 h-auto w-full"
                        style={{ '--scroll-duration': `${scrollSeconds}s` } as CSSProperties}
                    />
                ) : preview ? (
                    <Image
                        src={preview.cover}
                        alt={`${project.name} live site`}
                        fill
                        sizes={sizes}
                        priority={priority}
                        className="preview-shot object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                ) : (
                    <TitleCover project={project} />
                )}
            </div>
        </div>
    )
}

/* Monochrome cover for projects that have no live demo to screenshot */
function TitleCover({ project }: { project: Project }) {
    return (
        <div className="hero-grid-soft absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {project.categories[0]}
            </span>
            <div>
                <p className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-3xl">
                    {project.name}
                </p>
                <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] text-muted-foreground">
                    {project.stack.slice(0, 4).map((tech, i) => (
                        <span key={tech}>
                            {i > 0 && <span className="mr-2 text-border">/</span>}
                            {tech}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}
