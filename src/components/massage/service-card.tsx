import Image from 'next/image'
import Link from 'next/link'
import type { ElementType } from 'react'
import type { Service } from '@/content/services.types'
import { CATEGORY_LABELS } from '@/content/services.types'
import { servicePriceFrom } from '@/content/services'
import { ArrowIcon, ButtonLink } from '@/components/ui'
import { cn, formatPrice } from '@/lib/utils'

export function ServiceCard({
  service,
  className,
  showImage = true,
  headingLevel = 'h3',
  variant = 'full',
}: {
  service: Service
  className?: string
  showImage?: boolean
  /** h2 when the cards sit directly under the page h1, h3 under a section h2. */
  headingLevel?: 'h2' | 'h3'
  /**
   * 'compact' is for the homepage: name, one line, price from, one link.
   * Durations, category and the booking button live in the catalogue, where
   * comparing is the point — on the homepage they read as a price table.
   */
  variant?: 'full' | 'compact'
}) {
  const durations = service.durations.map((d) => d.minutes)
  const Heading = headingLevel as ElementType

  if (variant === 'compact') {
    return (
      <article className={cn('group flex h-full flex-col', className)}>
        <Link href={`/masaze/${service.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
            />
          </div>
          <Heading className="text-display-3 mt-5">{service.name}</Heading>
          <p className="text-small mt-2 text-secondary">{service.summary}</p>
          <p className="mt-4 flex items-center gap-2 pt-1 text-[0.9375rem] sm:mt-auto">
            od {formatPrice(servicePriceFrom(service))}
            <span aria-hidden="true" className="text-secondary">·</span>
            <span className="inline-flex items-center gap-1.5 text-secondary transition-colors group-hover:text-foreground">
              Zjistit více
              <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </p>
        </Link>
      </article>
    )
  }

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card-lg border border-border-subtle bg-surface',
        className,
      )}
    >
      {showImage ? (
        <Link
          href={`/masaze/${service.slug}`}
          className="relative block aspect-[16/10] overflow-hidden"
        >
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <p className="text-eyebrow text-secondary">{CATEGORY_LABELS[service.category]}</p>

        <Heading className="text-display-3 mt-3">
          <Link
            href={`/masaze/${service.slug}`}
            className="transition-colors hover:text-secondary"
          >
            {service.name}
          </Link>
        </Heading>

        <p className="text-small mt-3 text-secondary">{service.summary}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {durations.map((m) => (
            <span
              key={m}
              className="text-small rounded-pill border border-border-hairline px-2.5 py-1 text-secondary"
            >
              {m} min
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="leading-none">
            <span className="text-small block text-secondary">od</span>
            <span className="font-display mt-1 block text-[1.75rem] leading-none">
              {formatPrice(servicePriceFrom(service))}
            </span>
          </p>
          <div className="flex flex-col items-end gap-2">
            <ButtonLink href={`/rezervace?masaz=${service.slug}`} size="sm">
              Rezervovat
            </ButtonLink>
            <Link
              href={`/masaze/${service.slug}`}
              className="text-small inline-flex items-center gap-1.5 text-secondary transition-colors hover:text-foreground"
            >
              Detail masáže
              <ArrowIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
