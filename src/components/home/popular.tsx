import { getService } from '@/content/services'
import { ServiceCard } from '@/components/massage/service-card'
import { ButtonLink, Container, SectionHead } from '@/components/ui'

export function Popular() {
  /*
   * Four, not six — the section above already narrowed the choice once, and
   * repeating a long list right after undoes it. Curated to span the range:
   * the classic, the gentle one, the targeted one, the premium anchor.
   */
  const services = ['tradicni-thajska', 'celotelova-olejova', 'zada-a-sije', 'royal-bylinna']
    .map(getService)
    .filter((s) => s !== undefined)
  return (
    <section className="section border-t border-border-hairline">
      <Container>
        <SectionHead
          eyebrow="Výběr hostů"
          title="Nejoblíbenější masáže"
          lede="Čtyři, které si u nás hosté objednávají nejčastěji."
        />
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((s) => (
            <li key={s.slug}>
              <ServiceCard service={s} variant="compact" />
            </li>
          ))}
        </ul>
        <ButtonLink href="/masaze" variant="secondary" size="lg" className="mt-14">
          Zobrazit všechny masáže
        </ButtonLink>
      </Container>
    </section>
  )
}
