# Logo — assety a co ještě chybí

## Zdroje

| Soubor | Co to je |
|---|---|
| `logo-flat-original.webp` | **plochá verze** dodaná klientem — tmavě hnědá na krémové, bez efektů. Z ní je odvozeno všechno, co web používá. |
| `logo-original.webp` | starší **rendrovaný mockup** — zlatá ražba na texturovaném disku, se zapečeným stínem. Ponecháno pro referenci; web z něj už nečerpá. |

Plochá verze je čistá grafika: pozadí `#FEF7EA`, kresba `#5F4024`, polotónů
pod jedno procento. Oddělení kresby od podkladu je proto triviální — stačí
práh na světlost, žádné triky s teplotou barvy, které si vyžádal mockup.

## Assety

| Soubor | Použití |
|---|---|
| `public/brand/montra-mark.svg` | **vektor** samotného znaku, `fill="currentColor"` — barvu řídí CSS |
| `public/brand/montra-wordmark.svg` | **vektor** nápisu „Montra“ v původním písmu loga |
| `public/brand/montra-lockup.svg` | **vektor** celého lockupu včetně podtitulu |
| `public/brand/montra-mark.png` | rastr znaku, tmavě hnědá |
| `public/brand/montra-lockup.png` | rastr lockupu, tmavě hnědá |
| `public/brand/montra-lockup-cream.png` | krémová varianta na tmavé pozadí |
| `src/app/icon.png` (512) | favicon — hnědý lotos na krémovém disku |
| `src/app/apple-icon.png` (180) | ikona na plochu iOS |

Vektory vznikly obkreslením plochého originálu (potrace). Znak má 4,6 kB,
lockup 14 kB. Vedle rastru je nerozeznatelný a na rozdíl od něj drží ostrost
v jakékoli velikosti. Z mockupu by takový obkres nešel — zlatá ražba má
texturu a měkké okraje, které se do křivek nepřevedou.

Kontrast `#5F4024` na krémové `#FFF5E6` je 8,7:1.

## Kde se logo na webu používá

V hlavičce a patičce stojí lotos vedle nápisu „Montra“, obojí v barvě
`--color-brand-ink` (`#5F4024`) — vlastní barvě loga, odečtené z dodané
ploché kresby. Kontrast na krémové je 8,7:1.

Znak je vložený inline jako `src/components/brand/logo-mark.tsx`, ne jako
soubor: `<img>` nemá barevný kontext, takže by se `currentColor` vyhodnotil
na černou. Inline verze barvu dědí z CSS, takže stejná komponenta obslouží
tmavý i světlý podklad.

Před obkreslením se zahazují komponenty menší než 500 px. Výřez sedí těsně
nad nápisem a zachytával levou patku písmene „M“, která se pak pod květem
objevovala jako smítko.

Nápis **není vysázený písmem** — je to obkreslená kresba z loga. Dřív stálo
v hlavičce „MONTRA“ v Interu, verzálkami a s velkým prostrkáním; to je styl
rozhraní, ne značky. Skutečný nápis je kontrastní serif s výraznou „M“.
Použít přímo jeho je přesnější než hledat podobné písmo, které nemáme.

Celý svislý lockup se v rozhraní nepoužívá — do hlavičky se nevejde.
Vodorovná sestava se skládá ze znaku a nápisu zvlášť.

## Co chybí

1. **Původní křivky.** Obkres je dobrý, ale je to obkres. Od autora loga je
   lepší získat zdrojové AI/EPS — hlavně kvůli tisku a kvůli tomu, aby
   písmo v nápisu bylo skutečné písmo, ne obrys.
2. **Vodorovná varianta.** Dodané logo je stavěné na výšku. V hlavičce se
   proto lockup nepoužívá.
3. **Zlatá verze** se podle zadání nechává na vývěsní štít, dárkové poukazy
   a tiskoviny — ne do rozhraní.

## Podtitul v patičce

V patičce je pod nápisem „Thajské masáže“ — bez „& wellness“, na přání
klienta. Podtitul v logu („THAI MASSAGE & WELLNESS“) tím není dotčený,
mění se jen text na webu.
