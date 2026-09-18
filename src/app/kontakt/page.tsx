import type { Metadata } from 'next'
import { LOCATION } from '@/content/location'
import { Container, SectionHead } from '@/components/ui'
import { ContactBlock } from '@/components/contact/contact-block'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Montra Beroun, Slapská 130, 266 01 Beroun. Telefon 777 758 755, beroun@montra.cz. Otevřeno Po–So 9:00–20:00.',
  alternates: { canonical: '/kontakt' },
}

export default function KontaktPage() {
  return (
    <>
      <section className="pt-12 pb-4 md:pt-20">
        <Container>
          <SectionHead
            level="h1"
            eyebrow="Kontakt"
            title="Montra Beroun."
            lede="Slapská 130, ve druhém patře. Rezervovat můžete online i telefonicky."
          />
        </Container>
      </section>

      <ContactBlock withHeading={false} />

      <section className="section border-t border-border-hairline">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-display-2">Máte dotaz?</h2>
              <p className="text-body-lg mt-5 text-secondary">
                Napište nám. Formulář slouží pro dotazy — rezervaci prosím vytvořte
                online nebo telefonicky, ať vám termín rovnou zablokujeme.
              </p>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="text-eyebrow text-secondary">Provozovatel</dt>
                  <dd className="text-small mt-2 text-secondary">
                    {LOCATION.operator.name}
                    <br />
                    {LOCATION.operator.street}, {LOCATION.operator.city}
                    <br />
                    IČO: {LOCATION.operator.ico}
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-secondary">Číslo účtu</dt>
                  <dd className="text-small mt-2 text-secondary">
                    {LOCATION.operator.bankAccount}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
