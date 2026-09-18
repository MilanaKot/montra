'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { SERVICES } from '@/content/services'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/content/services.types'
import type { ServiceCategory } from '@/content/services.types'
import { getScenario } from '@/content/scenarios'
import { ServiceCard } from './service-card'
import { cn } from '@/lib/utils'

const FILTERS: Array<{ value: 'vse' | ServiceCategory; label: string }> = [
  { value: 'vse', label: 'Všechny' },
  ...CATEGORY_ORDER.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
]

function plural(n: number) {
  return n === 1 ? 'masáž' : n < 5 ? 'masáže' : 'masáží'
}

export function Catalog() {
  const router = useRouter()
  const params = useSearchParams()
  const active = (params.get('kategorie') ?? 'vse') as 'vse' | ServiceCategory
  const scenario = getScenario(params.get('pro') ?? '')

  const services = useMemo(() => {
    // A scenario is a curated list, so it wins over the category chips.
    if (scenario) {
      const order = new Map(scenario.serviceSlugs.map((s, i) => [s, i]))
      return SERVICES.filter((s) => order.has(s.slug)).sort(
        (a, b) => order.get(a.slug)! - order.get(b.slug)!,
      )
    }
    return active === 'vse' ? SERVICES : SERVICES.filter((s) => s.category === active)
  }, [active, scenario])

  function select(value: string) {
    const next = new URLSearchParams(params.toString())
    next.delete('pro')
    if (value === 'vse') next.delete('kategorie')
    else next.set('kategorie', value)
    const qs = next.toString()
    router.replace(qs ? `/masaze?${qs}` : '/masaze', { scroll: false })
  }

  return (
    <>
      {scenario ? (
        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[1.0625rem]">
            <span className="text-secondary">Vybráno pro: </span>
            {scenario.title}
          </p>
          <Link
            href="/masaze"
            scroll={false}
            className="text-small text-secondary underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Zobrazit všechny masáže
          </Link>
        </div>
      ) : (
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
      )}

      <p aria-live="polite" className="text-small mt-6 text-secondary">
        {services.length} {plural(services.length)}
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
