# Content migration — montra.cz/beroun → nový web

Zdrojem je současný web `montra.cz/beroun` (PDF exporty stránek Ceník, Naše
masérky, Něco o nás, Kontakt, Akce, Fotogalerie, Nákupní košík). **Žádný
obchodní obsah nebyl smazán** — ceny, délky, kontakty a pravidla jsou přeneseny
doslovně, původní znění dlouhých popisů je zachováno v kódu.

## 1. Mapa URL → 301 redirecty

Implementováno v `next.config.ts` (`LEGACY_REDIRECTS`), vše trvale (301).

| Původní URL | Nová URL | Obsah převzat |
|---|---|---|
| `/beroun` | `/` | ano |
| `/beroun/cenik-a-druhy-masazi` | `/masaze` | ano — všech 26 masáží |
| `/beroun/nase-maserky` | `/o-nas#tym` | ano — Somyong, Kung, Mimi |
| `/beroun/fotogalerie` | `/o-nas#galerie` | částečně — viz §4 |
| `/beroun/neco-o-nas` | `/o-nas` | ano |
| `/beroun/kontakt` | `/kontakt` | ano |
| `/beroun/darkovy-poukaz` | `/darkove-poukazy` | ano |
| `/beroun/e-shop` | `/darkove-poukazy` | částečně — viz §5 |
| `/beroun/nakupni-kosik` | `/darkove-poukazy` | ano (nový flow) |
| `/beroun/specialni-akce` | `/akce` | ano |
| `/beroun/akce/481/*` | `/akce#happy-hours` | ano |
| `/beroun/akce/591/*` | `/akce` | viz §3 |
| `/beroun/akce/14/*` | `/darkove-poukazy` | ano |
| `/beroun/akce/193/*` | `/akce#vernostni-karta` | ano |
| `/beroun/akce/282/*` | `/akce#permanentky` | ano |
| `/beroun/akce/:id/*` | `/akce` | catch-all |
| `/beroun/vseobecne-obchodni-podminky` | `/vseobecne-obchodni-podminky` | viz §6 |
| `/beroun/zasady-zpracovani-osobnich-udaju` | `/zasady-zpracovani-osobnich-udaju` | viz §6 |
| `/beroun/cookies-sprava-predvoleb` | `/cookies` | viz §6 |

## 2. Léčebná tvrzení — vyžaduje rozhodnutí provozovatele

Původní ceník obsahuje tvrzení, která jdou nad rámec wellness služby. Nová
verze je **nepřebírá ani nezesiluje**; publikované texty používají opatrnější
formulace. Původní znění je zachováno v poli `legacyDescription` u každé služby
v `src/content/services.ts`, takže nic není ztraceno.

Nejvýraznější případy k revizi:

| Služba | Původní tvrzení | Nově |
|---|---|---|
| `proti-bolestem-hlavy` | „Pravidelná masáž Vás dokáže migreny zbavit.“ / „Již po první masáži není migréna intenzivní.“ | popis bez příslibu účinku + výzva poradit se s lékařem; název změněn na „Thajská masáž hlavy a šíje“ |
| `zada-a-sije` | „odbourává i chronické bolesti zad“ | „může přinést úlevu od pocitu tuhosti“ |
| `konopna-euforia` | „Vhodné též na léčbu suché, ekzematické a lupénkou postižené pokožky“ | vynecháno |
| `aloe-vera` | „tlumí záněty“, „podpořit úplné zahojení jizviček“ | popis péče o pokožku bez léčebného nároku |
| `anti-cellulite` | „odbourávání celulitidy ve velmi krátké době“ | „nejlepších výsledků se dosahuje při opakování“ |
| `tradicni-thajska` | „vynikající prevence před nemocemi“ | vynecháno |
| profil Somyong | „úspěšně léčí migrény, bolesti zad…“ | popis kvalifikace a praxe bez slova „léčí“ |

Kontraindikace z původního webu jsou zachovány doslovně
(`CONTRAINDICATIONS` v `src/content/location.ts`) a zobrazeny na `/o-nas`
i u detailu každé masáže.

## 3. Akce měsíce

`/beroun/akce/591/` („Thajská masáž biokokosovým olejem“) je časově omezená
kampaň bez uvedeného období. Nepřenesena jako samostatná stránka — masáž
existuje v katalogu jako `bio-kokosova`. Pokud má akce běžet dál, patří do
`PROMOTIONS` v `src/content/promotions.ts` s konkrétním obdobím a slevou.

## 4. Fotografie a tým — zástupný obsah

Původní fotky salonu (`montra.cz/galerie/*.jpg`) a portréty terapeutů
(`montra.cz/maserky/*.jpg`) **nebylo možné stáhnout** — doména je blokovaná
síťovou politikou prostředí, ve kterém prototyp vznikal.

### Fotografie

Web používá dvanáct AI generovaných snímků v `public/images/`
a `src/app/opengraph-image.png`. **Nejsou to fotografie salonu Montra
Beroun.** Před spuštěním je nahraďte skutečnými.

### Tým — vyžaduje pozornost

`src/content/therapists.ts` neobsahuje skutečný tým. Somyong, Kung a Mimi
jsou nahrazeni **vymyšlenými personami** Arthit, Ploy a Mali s AI portréty.

Důvod: prototyp používá generované portréty a postavit syntetickou tvář pod
jméno skutečného člověka by klamalo hosta, který si v kroku 4 rezervace
vybírá, kdo ho bude masírovat — a bylo by to nekorektní i vůči samotným
terapeutům.

Skutečná jména, biografie a názvy souborů s fotkami jsou zachovány
v **`docs/team-original.md`**.

Každý zástupný záznam nese `isPlaceholder: true`; `TEAM_IS_PLACEHOLDER`
zůstává `true`, dokud nejsou všechny nahrazeny. **Před spuštěním:** přepište
obsah podle `docs/team-original.md` (pozor na léčebná tvrzení u Somyonga,
viz §2), doplňte skutečné fotografie a příznak odstraňte.

## 5. E-shop se zbožím

Původní web prodává i thajské zboží, balzámy a oleje. Nový web zatím řeší pouze
dárkové poukazy; zmínka o sortimentu zůstala na `/o-nas`. Pokud má e-shop
pokračovat, je to samostatný rozsah práce.

## 6. Právní dokumenty

Plná znění VOP, zásad zpracování osobních údajů a cookies nebyla k dispozici
(stránky nebyly v exportu). Stránky existují, obsahují pravidla, která z webu
známe (storno 24 h, podmínky poukazů a akcí), a viditelně upozorňují, že
závazné znění se přebírá z původního webu. **Před spuštěním doplňte.**

## 7. Data převzatá beze změny

- Ceník: 26 masáží, 80 kombinací délka/cena — ověřeno proti zdroji, 100 % shoda.
- Adresa, telefon, e-mail, otevírací doba, provozovatel, IČO, číslo účtu.
- Storno lhůta 24 hodin (`BOOKING_POLICY.cancellationCutoffHours`).
- „V každé masáži je zahrnuto 5 min na přípravu“ (`preparationMinutes`).
- Akční ceny Po–Pá 9:00–14:00 včetně pravidla posledního termínu a plateb
  pouze v hotovosti.
- Happy Hours včetně pravidla, že se nenabízí bez vypsaného termínu.
- Věrnostní karta, permanentky, série anti-cellulite procedur.
