import Image from 'next/image'
import { ACTIVE_THERAPISTS } from '@/content/therapists'
import { Container, SectionHead } from '@/components/ui'

function Initial({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      className="grid size-full place-items-center bg-foreground/[0.04]"
    >
      <span className="font-display text-[4rem] leading-none text-foreground/25">
        {name.charAt(0)}
      </span>
    </div>
  )
}

export function Team() {
  return (
    <section className="section border-t border-border-hairline" id="tym">
      <Container>
        <SectionHead
          eyebrow="Náš tým"
          title="Poznejte naše terapeuty"
          lede="V Berouně o vás pečují tři lidé, kteří se masáži věnují celý profesní život."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {ACTIVE_THERAPISTS.map((t) => (
            <li
              key={t.slug}
              className="overflow-hidden rounded-card-lg border border-border-subtle bg-surface"
            >
              <div className="relative aspect-[4/5]">
                {t.photo ? (
                  <Image
                    src={t.photo}
                    alt={`${t.name}, terapeut salonu Montra Beroun`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <Initial name={t.name} />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-display-3">{t.name}</h3>
                <p className="text-small mt-2 text-secondary">{t.specialization}</p>
                <p className="text-small mt-4 text-secondary">{t.bio[0]}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
