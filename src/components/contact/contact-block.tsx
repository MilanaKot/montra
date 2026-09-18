import { LOCATION } from '@/content/location'
import { ButtonLink, Container, SectionHead } from '@/components/ui'

export function ContactBlock({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="section border-t border-border-hairline" id="kontakt">
      <Container>
        {withHeading ? (
          <SectionHead
            eyebrow="Kontakt"
            title="Najdete nás na Slapské 130."
            lede="Ve druhém patře, kousek od centra Berouna."
          />
        ) : null}

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <dl className="space-y-8">
              <div>
                <dt className="text-eyebrow text-secondary">Adresa</dt>
                <dd className="text-body-lg mt-2">
                  {LOCATION.address.street}
                  <br />
                  {LOCATION.address.postalCode} {LOCATION.address.city}
                </dd>
                <p className="text-small mt-2 text-secondary">{LOCATION.address.floorNote}</p>
              </div>

              <div>
                <dt className="text-eyebrow text-secondary">Otevírací doba</dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5">
                    {LOCATION.openingHours
                      .filter((h) => h.weekday !== 0)
                      .map((h) => (
                        <li key={h.weekday} className="flex justify-between gap-6 text-[0.9375rem]">
                          <span className="text-secondary">{h.label}</span>
                          <span>
                            {h.open}–{h.close}
                          </span>
                        </li>
                      ))}
                    <li className="flex justify-between gap-6 text-[0.9375rem]">
                      <span className="text-secondary">Neděle</span>
                      <span>po dohodě</span>
                    </li>
                  </ul>
                </dd>
              </div>

              <div>
                <dt className="text-eyebrow text-secondary">Telefon a e-mail</dt>
                <dd className="text-body-lg mt-2">
                  <a
                    href={`tel:${LOCATION.phone.e164}`}
                    className="underline underline-offset-4 transition-colors hover:text-secondary"
                  >
                    {LOCATION.phone.display}
                  </a>
                  <br />
                  <a
                    href={`mailto:${LOCATION.email}`}
                    className="underline underline-offset-4 transition-colors hover:text-secondary"
                  >
                    {LOCATION.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/rezervace">Rezervovat online</ButtonLink>
              <ButtonLink href={`tel:${LOCATION.phone.e164}`} variant="secondary">
                Zavolat
              </ButtonLink>
              <ButtonLink href={LOCATION.maps.directions} variant="secondary">
                Navigovat
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[2rem] border border-border-subtle">
              <iframe
                src={LOCATION.maps.embed}
                title="Mapa — Montra Beroun, Slapská 130"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full border-0 lg:h-full lg:min-h-[30rem]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
