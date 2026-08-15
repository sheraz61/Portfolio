'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '../components/theme-toggler'

const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/connect', label: 'Connect' },
]

export function Header() {
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false)

    return (
        <header className="sticky top-4 z-40 mx-auto w-full max-w-5xl px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between rounded-2xl border border-border bg-background/80 px-4 shadow-lg shadow-black/[0.03] backdrop-blur-md sm:px-6 transition-colors duration-500 ease-in-out">
                <Link
                    href="/"
                    className="group flex items-center gap-2"
                    aria-label="Sheraz Hussain — home"
                >
                    <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-online/60">
                        <img 
                            src="/logo.jpg" 
                            alt="Sheraz Hussain" 
                            className="size-full rounded-full object-cover"
                        />
                        <span className="absolute -right-0.5 -top-0.5 flex size-2.5 items-center justify-center">
                            <span className="absolute size-2.5 scale-0 rounded-full bg-online opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
                            <span className="absolute size-2.5 scale-0 animate-ping rounded-full bg-online opacity-0 transition-opacity duration-200 group-hover:scale-100 group-hover:opacity-75" />
                        </span>
                    </div>
                    <span className="hidden text-sm font-medium text-foreground sm:inline-block">
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
                                    'group relative rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
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

                <div className="flex items-center gap-1">
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
                                        <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-online/60">
                                            <img 
                                                src="/logo.jpg" 
                                                alt="Sheraz Hussain" 
                                                className="size-full rounded-full object-cover"
                                            />
                                            <span className="absolute -right-0.5 -top-0.5 flex size-2.5 items-center justify-center">
                                                <span className="absolute size-2.5 scale-0 rounded-full bg-online opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
                                                <span className="absolute size-2.5 scale-0 animate-ping rounded-full bg-online opacity-0 transition-opacity duration-200 group-hover:scale-100 group-hover:opacity-75" />
                                            </span>
                                        </div>
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
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
