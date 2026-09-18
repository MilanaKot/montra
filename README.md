# Montra Beroun — redesign (prototyp)

Prototyp nového webu salonu thajských masáží Montra Beroun. Slouží jako
podklad pro diskusi se zadavatelem: kompletní veřejný web, katalog masáží
a průchozí rezervační flow.

## Spuštění

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # produkční build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Žádná databáze — prototyp běží na statickém obsahu a mock dostupnosti.

## Struktura

```
src/content/      veškerý obchodní obsah (ceník, tým, pobočka, akce)
src/features/     booking (rozhraní dostupnosti) a analytics — oba jako seam
src/components/   layout, ui, massage, booking, voucher, contact, home
src/app/          routy
docs/             mapa migrace obsahu a 301 redirectů
```

Obsah je oddělen od komponent: ceny, texty a pravidla se mění v
`src/content/`, nikdy v JSX.

## Co je prototyp a co je hotové

**Hotové a reálné**

- Kompletní ceník — 26 masáží, ověřeno proti současnému webu.
- Design systém, responzivita 320–1440 px, přístupnost (sémantika, focus,
  popisky formulářů, bez horizontálního scrollu).
- SEO: metadata, canonical, Open Graph, `LocalBusiness` a `Service` structured
  data, sitemap, robots, 301 redirecty ze starých URL.
- Pravidla akcí a Happy Hours odvozená z dat, ne natvrdo v komponentách.

**Prototyp — před ostrým provozem nutné nahradit**

- `src/features/booking/mock-availability.ts` generuje termíny
  deterministicky z data. Nezná skutečné rezervace, rozpisy terapeutů, lůžka
  ani buffery. UI závisí pouze na rozhraní `AvailabilityProvider`, takže
  výměna za server nevyžaduje zásah do komponent.
- Rezervace se nikam neukládá; potvrzení je jen obrazovka.
- Formulář dotazů a nákup poukazu nic neodesílají.
- Fotografie nejsou skutečné fotky salonu — viz `docs/content-migration.md`.
- Chybí administrace, e-maily, platby a správa rezervace přes token.

## Pro produkci

Rezervační backend musí:

1. počítat termíny na serveru (služba, délka, kvalifikace a rozpis terapeuta,
   pauzy, svátky, existující rezervace, lůžka, počet osob, buffery),
2. počítat cenu na serveru — nikdy nepřijímat cenu z prohlížeče,
3. ověřit dostupnost znovu v transakci těsně před zápisem (ochrana proti
   dvojí rezervaci),
4. používat kryptograficky náhodný token pro správu rezervace, ne ID,
5. sdílet jednu databázi s telefonickými rezervacemi z administrace.
