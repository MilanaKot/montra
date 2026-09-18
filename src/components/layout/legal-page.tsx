import type { ReactNode } from 'react'
import { LOCATION } from '@/content/location'
import { Container, SectionHead } from '@/components/ui'

export function LegalPage({
  title,
  lede,
  children,
}: {
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <section className="section">
      <Container>
        <div className="max-w-[44rem]">
          <SectionHead level="h1" eyebrow="Právní informace" title={title} lede={lede} />
          <div className="text-body-lg mt-12 space-y-5 text-secondary [&_h2]:pt-6 [&_h2]:text-foreground">
            {children}
          </div>
          <div className="mt-14 rounded-card border border-border-subtle p-6">
            <p className="text-small text-secondary">
              Provozovatel: {LOCATION.operator.name}, {LOCATION.operator.street},{' '}
              {LOCATION.operator.city}, IČO {LOCATION.operator.ico}. Kontakt:{' '}
              <a href={`mailto:${LOCATION.email}`} className="underline underline-offset-4">
                {LOCATION.email}
              </a>
              , {LOCATION.phone.display}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** Shown where the legacy legal text still needs to be migrated by the client. */
export function PendingContent({ source }: { source: string }) {
  return (
    <div className="rounded-card border border-accent/40 bg-accent/10 p-6">
      <p className="text-small text-foreground">
        Tento dokument zatím přebíráme z původního webu beze změny. Závazné znění najdete
        na <span className="break-all">{source}</span>. Text sem doplníme po kontrole
        provozovatelem.
      </p>
    </div>
  )
}
