'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { LOCATION } from '@/content/location'
import { ButtonLink, Container } from '@/components/ui'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/masaze', label: 'Masáže' },
  { href: '/akce', label: 'Akce' },
  { href: '/darkove-poukazy', label: 'Dárkové poukazy' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

function Wordmark() {
  return (
    <Link
      href="/"
      className="text-[1.25rem] leading-none font-medium tracking-[0.16em] whitespace-nowrap uppercase sm:text-[1.375rem] sm:tracking-[0.22em]"
      aria-label="Montra Beroun — úvodní stránka"
    >
      Montra
    </Link>
  )
}

function BranchSelector({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="text-eyebrow flex items-center gap-1.5 rounded-pill border border-border-subtle px-3.5 py-2 transition-colors hover:border-foreground/40"
      >
        {LOCATION.branchLabel}
        <svg viewBox="0 0 10 6" className="size-2.5" aria-hidden="true" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-48 overflow-hidden rounded-card border border-border-subtle bg-surface py-1.5"
        >
          <p className="text-eyebrow px-4 py-2 text-secondary">Další pobočky</p>
          {LOCATION.otherBranches.map((b) => (
            <a
              key={b.href}
              href={b.href}
              role="menuitem"
              className="block px-4 py-2.5 text-[0.9375rem] transition-colors hover:bg-foreground/[0.05]"
            >
              {b.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border-hairline bg-background/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 sm:gap-6 md:h-20">
          <div className="flex min-w-0 items-center gap-8">
            <Wordmark />
            <nav aria-label="Hlavní navigace" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {NAV.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'relative text-[0.9375rem] transition-colors',
                          active ? 'text-foreground' : 'text-secondary hover:text-foreground',
                        )}
                      >
                        {item.label}
                        {active ? (
                          <span className="absolute -bottom-1.5 left-0 h-px w-full bg-foreground" />
                        ) : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <BranchSelector className="hidden sm:block" />
            {/* One button, two labels. Toggling two whole buttons with `hidden`
                would fight the base `inline-flex` in buttonClass(). */}
            <ButtonLink href="/rezervace" size="sm">
              <span className="sm:hidden">Rezervovat</span>
              <span className="hidden sm:inline">Rezervovat online</span>
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobilni-menu"
              className="grid size-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-foreground/[0.06] lg:hidden"
            >
              <span className="sr-only">{menuOpen ? 'Zavřít menu' : 'Otevřít menu'}</span>
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true" fill="none">
                {menuOpen ? (
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 6h14M3 13h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {menuOpen ? (
        <div
          id="mobilni-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-border-hairline bg-background lg:hidden"
        >
          <Container>
            <nav aria-label="Hlavní navigace (mobil)" className="py-6">
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-border-hairline py-4 font-display text-[1.75rem] leading-tight"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href="/rezervace" size="lg" onClick={() => setMenuOpen(false)}>
                  Rezervovat online
                </ButtonLink>
                <ButtonLink href={`tel:${LOCATION.phone.e164}`} variant="secondary" size="lg">
                  Zavolat {LOCATION.phone.display}
                </ButtonLink>
              </div>
              <p className="text-small mt-8 text-secondary">
                {LOCATION.address.street}, {LOCATION.address.city}
                <br />
                {LOCATION.openingHoursSummary}
              </p>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
