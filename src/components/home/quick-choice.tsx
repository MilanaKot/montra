import Image from 'next/image'
import Link from 'next/link'
import { SCENARIOS, SECONDARY_SCENARIOS } from '@/content/scenarios'
import { ArrowIcon, Container, SectionHead } from '@/components/ui'

/**
 * The spine of the site: people arrive with a complaint, not a product name.
 * Everything below this section is subordinate to it.
 */
export function QuickChoice() {
  return (
    <section className="section border-t border-border-hairline" id="co-potrebujete">
      <Container>
        <SectionHead
          eyebrow="Kudy začít"
          title="Co dnes potřebujete?"
          lede="Vyberte, s čím přicházíte. Zbytek za vás zúžíme my."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SCENARIOS.map((s) => (
            <li key={s.id}>
              <Link href={`/masaze?pro=${s.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="text-display-3 mt-5 lg:min-h-[2.2em]">{s.title}</h3>
                <p className="text-small mt-2 inline-flex items-center gap-2 text-secondary">
                  {s.text}
                  <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* The less common reasons. A quiet line keeps them reachable without
            diluting the four cards above. */}
        <p className="text-small mt-10 flex flex-wrap items-baseline gap-x-2 gap-y-2 text-secondary">
          <span>Nebo:</span>
          {SECONDARY_SCENARIOS.map((s, i) => (
            <span key={s.id} className="inline-flex items-baseline gap-2">
              <Link
                href={`/masaze?pro=${s.id}`}
                className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {s.title.toLowerCase()}
              </Link>
              {i < SECONDARY_SCENARIOS.length - 1 ? (
                <span aria-hidden="true">·</span>
              ) : null}
            </span>
          ))}
        </p>
      </Container>
    </section>
  )
}
