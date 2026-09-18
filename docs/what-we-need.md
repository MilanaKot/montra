# Co potřebujeme od klienta

Prototyp je postavený na skutečných datech tam, kde jsme je měli — ceník,
otevírací doba, akce a kontakty jsou přepsané ze současného webu a ověřené
proti zdroji. Zbytek je zástupný. Tento seznam je to, co odděluje prototyp
od spustitelného webu.

Řazeno podle toho, co blokuje spuštění nejdřív.

## 1. Fotografie salonu — blokující

Všechny snímky na webu jsou vygenerované. Vypadají dobře a drží jednotný
tón, ale **nejsou to fotky salonu Montra Beroun**. Potřebujeme:

- skutečný vchod a cestu do druhého patra,
- recepci,
- masážní místnost a párovou místnost,
- relaxační zónu s čajem,
- 3–5 klidných detailů (oleje, bylinné sáčky, textil).

Focení doporučujeme za denního světla, bez blesku. Barevnost sjednotíme
v postprodukci, aby reálné fotky zapadly do stávajícího tónu webu.

## 2. Fotografie a údaje týmu — blokující

Web teď ukazuje **vymyšlené osoby** Arthit, Ploy a Mali s vygenerovanými
portréty. Skutečný tým je Somyong, Kung a Mimi; jejich jména a životopisy
jsou uložené v `docs/team-original.md`.

Syntetickou tvář pod jménem skutečného člověka jsme záměrně nepoužili —
host si v rezervaci vybírá, kdo ho bude masírovat.

Potřebujeme portréty všech tří ve stejném stylu: jednotné světlo, klidné
pozadí, výřez 4:5, po pás.

U Somyonga navíc pozor: původní text uvádí, že „úspěšně léčí migrény“.
Takové formulace na web nedáváme — viz `docs/content-migration.md`, §2.

## 3. Právní dokumenty — blokující

Chybí plná znění:

- Všeobecné obchodní podmínky
- Zásady zpracování osobních údajů
- Cookies

Stránky existují a obsahují pravidla, která známe ze současného webu (storno
24 hodin, podmínky poukazů a akcí), ale s viditelnou poznámkou, že závazné
znění teprve doplníme.

## 4. Zdrojové křivky loga — už ne blokující

Plochá verze loga dorazila a web z ní čerpá: znak i celý lockup jsou
obkreslené do SVG (`public/brand/`), barvu dědí z CSS, favicon a iOS ikona
jsou přegenerované z ploché kresby.

Zbývá jen **zdrojový soubor od autora loga** (AI/EPS) — kvůli tisku a kvůli
tomu, aby nápis „Montra“ byl skutečné písmo, ne obrys. Na web to nemá vliv.

Chybí také oficiální **vodorovná varianta**; dodaná je stavěná na výšku,
takže v hlavičce se lockup nepoužívá.

## 5. Rezervační systém — rozhodnutí

Prototyp má průchozí rezervaci, ale **termíny jsou vymyšlené** a rezervace
se nikam neukládá. Potřebujeme rozhodnout:

- vlastní rezervační backend, nebo napojení na hotové řešení,
- kdo bude zadávat telefonické rezervace a kde (bez toho se online kalendář
  rozejde s realitou),
- jestli chceme online platbu, nebo stačí platba na místě,
- jestli posílat SMS potvrzení.

K tomu potřebujeme provozní data, která zatím nemáme: rozpisy směn
terapeutů, počet lůžek, zda je zvlášť párová místnost, a kdo dělá které
masáže (Hot Stone, Royal a kosmetiku obličeje zřejmě nedělá každý).

## 6. Aktuálnost nabídky

- **Akce měsíce** — na webu je „Thajská masáž biokokosovým olejem“ bez
  uvedeného období. Platí ještě? Do kdy? Jaká sleva?
- **Happy Hours** — web je nezobrazuje, dokud není vypsaný konkrétní čas,
  přesně podle vašeho vlastního pravidla. Jsou aktuálně nějaké termíny?
- **Permanentky** — jaké varianty a za kolik?
- **Otevírací doba** — současný web uvádí „9–20 (21)“. Počítáme s 20:00.
  Je 21:00 po domluvě, nebo běžně?

## 7. Rozsah — rozhodnutí

Po Berouně přibyly Kladno, Mladá Boleslav, Rudná a dvě pražské pobočky.
Redesignujeme **jeden salon, nebo celou síť Montra**?

Pokud síť, je lepší rozhodnout hned: architektura `montra.cz` → výběr
pobočky → `montra.cz/beroun` se staví jinak než jednostránkový web jedné
pobočky a pozdější přestavba je dražší.

## 8. Doplňkové

- Sociální sítě — máme jen Facebook. Je Instagram?
- Recenze — pokud existují na Google nebo Facebooku, můžeme je zobrazit.
  Vymýšlet je nebudeme.
- E-shop s thajským zbožím — převádíme, nebo zůstane jen na starém webu?
