'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon, ArrowUpRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '../components/theme-toggler'

const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/open-source', label: 'Open Source' },
    { href: '/blog', label: 'Blog' },
    { href: '/connect', label: 'Connect' },
]

/* True once the page is scrolled a little, so the bar can firm up over content */
function useScrolled(threshold = 8) {
    return React.useSyncExternalStore(
        (onChange) => {
            window.addEventListener('scroll', onChange, { passive: true })
            return () => window.removeEventListener('scroll', onChange)
        },
        () => window.scrollY > threshold,
        () => false
    )
}

/* Header avatar: grayscale until hovered, with a small monochrome status dot */
function Avatar() {
    return (
        <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground/40">
            <Image
                src="/logo.png"
                alt="Sheraz Hussain"
                width={32}
                height={32}
                className="size-full rounded-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
            />
            <span aria-hidden className="absolute -right-0.5 -top-0.5 flex size-2.5 items-center justify-center">
                <span className="absolute size-2.5 scale-0 animate-ping rounded-full bg-foreground opacity-0 transition-opacity duration-200 group-hover:scale-100 group-hover:opacity-50 motion-reduce:hidden" />
                <span className="absolute size-2.5 scale-0 rounded-full bg-foreground opacity-0 ring-2 ring-background transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
            </span>
        </span>
    )
}

export function Header() {
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false)
    const scrolled = useScrolled()

    return (
        <header className="sticky top-4 z-40 mx-auto w-full max-w-5xl px-4 sm:px-6">
            <div
                className={cn(
                    'flex h-16 items-center justify-between rounded-2xl border px-4 shadow-lg backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-in-out sm:px-6',
                    scrolled
                        ? 'border-foreground/10 bg-background/90 shadow-black/[0.07] dark:shadow-black/40'
                        : 'border-border bg-background/80 shadow-black/[0.03]'
                )}
            >
                <Link
                    href="/"
                    className="group flex items-center gap-2"
                    aria-label="Sheraz Hussain Home"
                >
                    <Avatar />
                    <span className="hidden whitespace-nowrap text-sm font-medium text-foreground sm:inline-block md:hidden lg:inline-block">
                        Sheraz Hussain
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'group relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                                    isActive && 'text-foreground'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {link.label}
                                <span
                                    className={cn(
                                        'pointer-events-none absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100',
                                        isActive && 'scale-x-100'
                                    )}
                                />
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                    >
                        Resume
                        <ArrowUpRightIcon className="size-3" />
                    </a>
                    <ThemeToggle />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="md:hidden"
                                    aria-label="Open menu"
                                />
                            }
                        >
                            <MenuIcon />
                        </SheetTrigger>
                        <SheetContent side="top" showCloseButton={false} className="px-4 sm:px-6 pt-4 border-b border-border rounded-b-2xl shadow-xl">
                            <div className="mx-auto w-full max-w-5xl">
                                <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                                    <Link
                                        href="/"
                                        className="group flex items-center gap-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Avatar />
                                        <span className="text-sm font-medium text-foreground">
                                            Sheraz Hussain
                                        </span>
                                    </Link>

                                    <SheetClose
                                        render={
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                className="md:hidden"
                                                aria-label="Close menu"
                                            />
                                        }
                                    >
                                        <XIcon className="size-4" />
                                    </SheetClose>
                                </div>
                                <nav className="flex flex-col gap-2 px-6 pb-6 pt-4">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href
                                        return (
                                            <SheetClose
                                                key={link.href}
                                                nativeButton={false}
                                                render={
                                                    <Link
                                                        href={link.href}
                                                        className={cn(
                                                            'rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                                                            isActive && 'text-foreground'
                                                        )}
                                                        aria-current={isActive ? 'page' : undefined}
                                                    />
                                                }
                                            >
                                                {link.label}
                                            </SheetClose>
                                        )
                                    })}
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        Resume
                                        <ArrowUpRightIcon className="size-3.5" />
                                    </a>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
