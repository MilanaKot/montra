# Logo — jak je použité a co ještě chybí

## Zdroj

`logo-original.webp` je to, co dodal klient: **rendrovaný mockup** — zlatá
ražba na texturovaném krémovém disku, se zapečeným stínem a černými rohy.
Není to produkční logo. Pro web z něj byla znovu vytvořena kresba.

## Jak z mockupu vznikly assety

Maska se počítá ze dvou podmínek zároveň: pixel musí být **tmavší** než
podklad a zároveň **teplejší** než podklad. Samotná tmavost nestačí — měkký
stín v levém horním rohu je tmavý, ale neutrální, takže na teplotě neprojde
a do kresby se nedostane. Podklad se odhaduje rozostřenou kopií plotny, aby
gradient stínu nečetl jako inkoust.

Výsledek:

| Soubor | Použití |
|---|---|
| `public/images/montra-lotus-gold.png` | značka v hlavičce a patičce |
| `public/images/montra-lotus-black.png` | jednobarevná varianta, zatím nepoužitá |
| `src/app/icon.png` (512) | favicon — zlatý lotos na krémovém disku |
| `src/app/apple-icon.png` (180) | ikona na plochu iOS |
| `lockup-gold-extracted.png` | celý lockup; podtitul se z mockupu vytáhnout nepodařilo |

Barva disku `#E2D2BA` je odečtená z originálu, ne zvolená — ikona tak drží
značku a zároveň se neztratí na bílém panelu prohlížeče.

## Co chybí

1. **Vektor.** Všechno výše je rastr dopočítaný z obrázku. Na tisk, na velká
   zobrazení a na ostré vykreslení v libovolné velikosti je potřeba **SVG
   nebo AI/EPS** od autora loga.
2. **Podtitul „THAI MASSAGE & WELLNESS“.** V mockupu je drobný a prostrkaný;
   z rastru vyšel roztrhaný, proto se nepoužívá. V patičce je zatím vysázený
   textem (česky, „Thajské masáže & wellness“). Z vektoru půjde použít
   originál.
3. **Vodorovná varianta.** Dodané logo je stavěné na výšku. V hlavičce je
   proto lotos vedle textového „MONTRA“. Pokud existuje oficiální vodorovný
   lockup, nahradí to.
4. **Rozhodnutí zlatá vs. černá.** Web teď používá zlatou. Jednobarevná černá
   je připravená a je to změna jedné cesty k souboru
   v `src/components/layout/header.tsx` a `footer.tsx`.
