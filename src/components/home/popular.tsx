import { POPULAR_SERVICES } from '@/content/services'
import { ServiceCard } from '@/components/massage/service-card'
import { ButtonLink, Container, SectionHead } from '@/components/ui'

export function Popular() {
  const services = POPULAR_SERVICES.slice(0, 6)
  return (
    <section className="section border-t border-border-hairline">
      <Container>
        <SectionHead
          eyebrow="Výběr hostů"
          title="Nejoblíbenější masáže"
          lede="Šest masáží, které si u nás hosté objednávají nejčastěji."
          action={
            <ButtonLink href="/masaze" variant="secondary">
              Zobrazit všechny masáže
            </ButtonLink>
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((s) => (
            <li key={s.slug}>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
