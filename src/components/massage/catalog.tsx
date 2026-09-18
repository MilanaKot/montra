'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { SERVICES } from '@/content/services'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/content/services.types'
import type { ServiceCategory } from '@/content/services.types'
import { ServiceCard } from './service-card'
import { cn } from '@/lib/utils'

const FILTERS: Array<{ value: 'vse' | ServiceCategory; label: string }> = [
  { value: 'vse', label: 'Všechny' },
  ...CATEGORY_ORDER.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
]

export function Catalog() {
  const router = useRouter()
  const params = useSearchParams()
  const active = (params.get('kategorie') ?? 'vse') as 'vse' | ServiceCategory

  const services = useMemo(
    () => (active === 'vse' ? SERVICES : SERVICES.filter((s) => s.category === active)),
    [active],
  )

  function select(value: string) {
    const next = new URLSearchParams(params.toString())
    if (value === 'vse') next.delete('kategorie')
    else next.set('kategorie', value)
    const qs = next.toString()
    router.replace(qs ? `/masaze?${qs}` : '/masaze', { scroll: false })
  }

  return (
    <>
      {/* Horizontally scrollable on mobile, wrapped on desktop. */}
      <div
        role="group"
        aria-label="Filtr kategorií"
        className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {FILTERS.map((f) => {
          const isActive = active === f.value
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => select(f.value)}
              aria-pressed={isActive}
              className={cn(
                'shrink-0 rounded-pill border px-5 py-2.5 text-[0.9375rem] transition-colors duration-200',
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border-subtle text-secondary hover:border-foreground/40 hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="text-small mt-6 text-secondary">
        {services.length}{' '}
        {services.length === 1 ? 'masáž' : services.length < 5 ? 'masáže' : 'masáží'}
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {services.map((s) => (
          <li key={s.slug}>
            <ServiceCard service={s} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </>
  )
}
