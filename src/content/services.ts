import type { Service } from './services.types'

const IMG = {
  thai: '/images/salon-masazni-lehatko.png',
  oil: '/images/salon-oleje-a-bylinky.png',
  herbs: '/images/salon-bylinne-sacky.png',
  reception: '/images/salon-recepce.png',
  lounge: '/images/salon-relaxacni-zona.png',
} as const

/**
 * The Beroun price list, transcribed from montra.cz/beroun/cenik-a-druhy-masazi.
 * Prices and durations are verbatim. Descriptions are rewritten in wellness
 * language; the originals are kept in `legacyDescription`.
 */
export const SERVICES: Service[] = [
  // ---------------------------------------------------------------- klasické
  {
    slug: 'tradicni-thajska',
    name: 'Tradiční thajská masáž',
    category: 'klasicke',
    summary:
      'Starobylá technika tlaku a protažení podél energetických drah. Masíruje se v oblečení, bez olejů. Doporučujeme 90 minut.',
    description: [
      'Tradiční thajská masáž je nejstarší a nejcharakterističtější z našich masáží. Masérka pracuje dlaněmi, palci, lokty i chodidly podél drah, kterými podle thajské tradice proudí tělem energie, a kombinuje tlak s pasivním protahováním.',
      'Masíruje se na thajské matraci, v pohodlném volném oděvu, který vám rádi zapůjčíme. Nepoužívají se oleje, takže po masáži můžete rovnou pokračovat v běžném dni.',
      'Je to masáž intenzivní a velmi dobře prokrvující. Bývá vyhledávaná při pocitu ztuhlosti, při dlouhém sezení a při celkové únavě. Aby technika vynikla, doporučujeme délku alespoň 90 minut.',
    ],
    durations: [
      { minutes: 60, priceCzk: 990 },
      { minutes: 90, priceCzk: 1390, recommended: true },
      { minutes: 120, priceCzk: 1790 },
      { minutes: 150, priceCzk: 1990 },
    ],
    notes: ['Masíruje se v zapůjčeném volném oděvu nebo ve spodním prádle.'],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.thai,
    popular: true,
    legacyDescription:
      'Starověké umění, jehož základem je pročištění energetických drah, procházejících tělem, pomocí tlakových a tahových cviků. Je to vynikající prevence před nemocemi. Díky ní dosáhnete psychické pohody. Doporučujeme volný oděv, který Vám rádi zapůjčíme. Doporučená délka masáže 90 min. Úspěšná masáž při bolestech zad, migreně, stresu a mnoha dalších obtíží.',
  },
  {
    slug: 'celotelova-olejova',
    name: 'Thajská celotělová olejová masáž',
    category: 'klasicke',
    summary:
      'Plynulá olejová masáž celého těla. Jemnější než tradiční thajská, příjemná i pro první návštěvu.',
    description: [
      'Orientální olejová terapie, při které se teplý olej vmasírovává do svalů dlouhými plynulými tahy. Masáž je měkčí a klidnější než tradiční thajská technika a je proto dobrou volbou, pokud u nás jste poprvé.',
      'Pracuje se s celým tělem — zády, nohama, pažemi i šíjí. Olej pečuje o pokožku a masáž příjemně podporuje prokrvení.',
      'Na olejovou masáž si ponechte spodní prádlo (ženy bez podprsenky), případně použijte naše jednorázové.',
    ],
    durations: [
      { minutes: 60, priceCzk: 990, recommended: true },
      { minutes: 90, priceCzk: 1390 },
      { minutes: 120, priceCzk: 1790 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.oil,
    popular: true,
    legacyDescription:
      'Orientální terapie, při níž se vmasírovává olej do svalů, prospívá pleti a podporuje činnost lymfatického systému, který odvádí škodliviny z těla. Pravidelná masáž posiluje svaly, redukuje otoky, zbavuje odumřelých částí kůže a navrací mladistvý vzhled.',
  },

  // ------------------------------------------------------------------ cílené
  {
    slug: 'zada-a-sije',
    name: 'Thajská masáž zad a šíje',
    category: 'cilene',
    summary:
      'Soustředí se na šíji, ramena, hrudní a bederní páteř. Nejčastější volba, když vás po dni u počítače tlačí záda.',
    description: [
      'Masáž zaměřená na oblast, kde se napětí drží nejčastěji — šíji, hlavu, ramena a křížovou i bederní část zad.',
      'Masérka postupuje od ramen dolů, uvolňuje ztuhlá místa a věnuje se jim déle. Může přinést úlevu od pocitu tuhosti po dlouhém sezení, řízení nebo jednostranné zátěži.',
      'Na třicet minut se stihne šíje a horní část zad; hodina už umožní projít celá záda v klidu.',
    ],
    durations: [
      { minutes: 30, priceCzk: 690 },
      { minutes: 45, priceCzk: 790 },
      { minutes: 60, priceCzk: 990, recommended: true },
      { minutes: 90, priceCzk: 1390 },
      { minutes: 120, priceCzk: 1790 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.thai,
    popular: true,
    legacyDescription:
      'Masáž zaměřená na šíji, hlavu, ramena, křížovou a bederní oblast. Pravidelná masáž odbourává i chronické bolesti zad. Thajská masáž zad účinně působí proti negativním účinkům stresu.',
  },
  {
    slug: 'proti-bolestem-hlavy',
    name: 'Thajská masáž hlavy a šíje',
    category: 'cilene',
    summary:
      'Jemné hmaty na šíjovém a mimickém svalstvu s prací s akupresurními body. Vyhledávaná při napětí v hlavě a krku.',
    description: [
      'Klidná masáž, při které masérka jemnými hmaty uvolňuje šíjové a mimické svalstvo a věnuje se akupresurním bodům na hlavě, v obličeji a na krku.',
      'Bývá vyhledávaná lidmi, kteří tráví den u obrazovky, a těmi, kdo cítí napětí v oblasti hlavy, čelistí a krku. Mnozí hosté ji popisují jako hluboce zklidňující.',
      'Masáž je relaxační procedura, nikoli zdravotní výkon. Pokud vás bolesti hlavy trápí dlouhodobě nebo se zhoršují, poraďte se prosím nejprve se svým lékařem.',
    ],
    durations: [
      { minutes: 30, priceCzk: 690 },
      { minutes: 45, priceCzk: 790 },
      { minutes: 60, priceCzk: 990, recommended: true },
      { minutes: 90, priceCzk: 1390 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.lounge,
    legacyDescription:
      'Masáž k odstranění a prevenci bolestí hlavy a migrény, při které, jemnými hmaty, masérka uvolňuje šíjové a mimické svalstvo, využívá akupresurní body. Již po první masáži není migréna intenzivní. Nejvhodnější je masáž jako prevence. Pravidelná masáž Vás dokáže migreny zbavit.',
  },
  {
    slug: 'nohy',
    name: 'Thajská masáž nohou',
    category: 'cilene',
    summary:
      'Akupresura reflexních bodů na chodidlech spojená s masáží lýtek a prstců. Úleva po dni na nohou.',
    description: [
      'Masáž začíná u chodidel — akupresurou reflexních bodů — a pokračuje svaly lýtek. Masérka vmasíruje olej do chodidel a postupně uvolní jednotlivé prstce.',
      'Je to jedna z nejpříjemnějších masáží, které u nás máme. Bývá vyhledávaná po dni stráveném na nohou, po delší chůzi nebo v období, kdy nohy otékají.',
      'Masáž probíhá v pohodlném polosedu, není potřeba se odstrojovat.',
    ],
    durations: [
      { minutes: 30, priceCzk: 690 },
      { minutes: 45, priceCzk: 790 },
      { minutes: 60, priceCzk: 990, recommended: true },
      { minutes: 90, priceCzk: 1390 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.lounge,
    legacyDescription:
      'Akupresurní masáž reflexních bodů na chodidlech spojená s masáží svalů lýtek, vmasírování oleje do chodidel a uvolnění jednotlivých prstců. Thajská masáž nohou má uvolňující účinek a působí příznivě na psychiku.',
  },
  {
    slug: 'office',
    name: 'Office masáž krku, šíje a rukou',
    category: 'cilene',
    summary:
      'Krátká masáž v oblečení, vsedě nebo vleže. Krk, šíje, ramena a ruce — ideální uprostřed pracovního dne.',
    description: [
      'Office masáž vychází z tradiční thajské techniky a je uzpůsobená tomu, abyste se k nám mohli zastavit uprostřed dne a hned pokračovat dál.',
      'Masíruje se krk, šíje, ramena a ruce včetně oblasti zápěstí. Masáž probíhá v oblečení, bez olejů, a můžete u ní sedět i ležet.',
      'Půlhodina stačí na příjemné uvolnění; pokud máte čas, hodina umožní projít celou oblast beze spěchu.',
    ],
    durations: [
      { minutes: 30, priceCzk: 790, recommended: true },
      { minutes: 45, priceCzk: 890 },
      { minutes: 60, priceCzk: 1090 },
    ],
    notes: ['Masáž probíhá v oblečení — není potřeba se odstrojovat.'],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.reception,
    legacyDescription:
      'Vhodná kdykoliv během dne či ráno. Office masáží se rozumí akutní masážní procedura uprostřed dne, která má za cíl zbavit napětí a tlaku. Tato masáž se zaměřuje na šíji, krk a ruce pro uvolnění karpálů. Vychází z tradiční thajské masáže. Masérka působí různými způsoby masírování a dochází tak k uvolnění napětí, zmírnění stresu a průchodnosti energie do konečků prstů. Masíruje se krk, šíje, ramena a ruce. Tato masáž probíhá v oblečení, lze při ní sedět i ležet. K této thajské masáži stačí půlhodina, během níž dojde k příjemnému uvolnění. Můžete si ale i dopřát masáž hodinovou.',
  },
  {
    slug: 'face-anti-age',
    name: 'Obličejová masáž FACE ANTI AGE',
    category: 'cilene',
    summary:
      'Masáž obličeje bio olejem české firmy Saloos s rostlinnými výtažky. Skvělý doplněk k hodinové masáži těla.',
    description: [
      'Jemná ruční masáž obličeje, krku a dekoltu s bio olejem od české firmy Saloos, obohaceným o rostlinné výtažky.',
      'Masérka pracuje pomalu a s lehkým tlakem, aby se olej dobře vstřebal. Pleť po masáži působí odpočatě a prosvětleně.',
      'Masáž je vhodným doplňkem k hodinové masáži těla, pokud chcete péči dotáhnout do konce.',
    ],
    durations: [
      { minutes: 30, priceCzk: 790, recommended: true },
      { minutes: 45, priceCzk: 890 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.reception,
    legacyDescription:
      'Omlazující masáž obličeje olejem od české firmy Saloos s výtažky z rostlin pro posílení pleti a zmírnění drobných vrásek. Díky ruční masáži se olej absorbuje do spodní vrstvy kůže a navrací mladistvý a odpočatý vzhled. Masáž je vhodným doplňkem k hodinové masáži při komplexní péči o tělo. Již po první masáži je okem viditelný výsledek vypnuté pleti. Při pravidelné masáži obličeje mizí jemné vrásky a hluboké se velmi zmírní.',
  },
  {
    slug: 'anti-cellulite',
    name: 'Thajská manuální anti-cellulite masáž',
    category: 'cilene',
    summary:
      'Intenzivní ruční masáž se skořicovým olejem, který pokožku prohřívá. Doporučujeme jako sérii opakovaných procedur.',
    description: [
      'Ruční, nikoli strojová masáž problémových partií se skořicovým olejem. Olej pokožku prohřívá a podporuje prokrvení, masérka se přizpůsobí vašemu tělu a zvolí tlak, který je pro vás snesitelný.',
      'Nejlepších výsledků se dosahuje při opakování — doporučujeme sérii zhruba deseti procedur po 90 minutách. Při zakoupení celé série deseti procedur je další procedura zdarma.',
      'Po dobu série doporučujeme zvýšit pohyb a příjem tekutin — vody a bylinných čajů.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1190 },
      { minutes: 90, priceCzk: 1590, recommended: true },
      { minutes: 120, priceCzk: 2090 },
    ],
    notes: ['Při zakoupení celé série 10 procedur je další procedura zdarma.'],
    requiredTherapists: 1,
    partySizes: [1],
    image: IMG.oil,
    legacyDescription:
      'Pomocí manuální thajské anti cellulite masáže a skořicového oleje, docílíte nejlepšího výsledku. Oleje obsahují přírodní látky, které zlepší krevní oběh a zbaví tělo toxických látek. Ve spojení s masáží pomáhají odbourat podkožní tuk a tím zmenšit objem. Masérka se přizpůsobí Vašemu tělu, masáž je ruční, neprobíhá strojově. Skořicový olej prohřívá a tím prokrvuje pokožku. Spolu se speciální masáží dochází k odbourávání celulitidy ve velmi krátké době. Vhodné jako serie opakovaných procedur. Doporučujeme po dobu procedur zvýšit pohyb a příjem tekutin (voda, bylinné čaje). PŘI ZAKOUPENÍ CELÉ SERIE PROCEDUR (10ks), DALŠÍ PROCEDURA ZDARMA. Doporučeno 10 intervalů po 90 min.',
  },
]

// -------------------------------------------------------------- relaxační
SERVICES.push(
  {
    slug: 'bio-kokosova',
    name: 'Vitality masáž bio kokosovým olejem',
    category: 'relaxacni',
    summary:
      'Relaxační masáž celého těla s BIO panenským kokosovým olejem. Pokožka jej přijímá obzvlášť ochotně.',
    description: [
      'Spojení akupresury a BIO panenského kokosového oleje, který patří mezi nejpříjemnější oleje pro relaxační masáž celého těla.',
      'Složení kokosového oleje je blízké podkožnímu tuku, a pokožka jej proto přijímá velmi ochotně. Po masáži je pleť sametově zjemnělá a vláčná.',
      'Tato masáž je dlouhodobě naší nejoblíbenější volbou mezi aroma masážemi.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1090, recommended: true },
      { minutes: 90, priceCzk: 1490 },
      { minutes: 120, priceCzk: 1990 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.oil,
    popular: true,
    legacyDescription:
      'Spojení akupresury a BIO panenského kokosového oleje, který patří mezi nejlepší masážní oleje v relaxační masáži celého těla. Složení tohoto oleje je stejné jako u podkožního tuku, proto jej pokožka ochotně přijímá. Má zvláštní schopnost ji regenerovat. Pleť sametově zjemní a bude připravena nejen na léto, k získání rovnoměrného opálení.',
  },
  {
    slug: 'levandulova',
    name: 'Thajská masáž levandulovým olejem',
    category: 'relaxacni',
    summary:
      'Klidná relaxační masáž s levandulí. Vhodná po náročném dni a před spaním.',
    description: [
      'Relaxační celotělová masáž s levandulovým olejem. Levandule patří mezi nejklidnější vůně, které v salonu máme, a masáž je proto obzvlášť vhodná na konec náročného dne.',
      'Masérka pracuje pomalými, plynulými tahy. Mnoho hostů si tuto masáž objednává na podvečer, aby mohli den nechat za sebou.',
      'Vhodná i pro ty, kdo hůře usínají nebo cítí dlouhodobé napětí.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1090, recommended: true },
      { minutes: 90, priceCzk: 1490 },
      { minutes: 120, priceCzk: 1990 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.lounge,
    legacyDescription:
      'Relaxační levandulová masáž je vhodná nejen pro milovníky levandule, ale působí velmi pozitivně i při psychických a citových problémech, stresu, depresích a nespavosti. Je velmi účinná při kožních problémech. Přináší úlevu při bolestech hlavy či bolestivé menstruaci a uvolňuje svalové napětí. Relaxační levandulová masáž je obzvláště vhodná pro relaxaci po náročném dni a před spaním, abyste mohli náročný den nechat za sebou.',
  },
  {
    slug: 'skoricova-detox',
    name: 'Thajská skořicová detoxikační masáž',
    category: 'relaxacni',
    summary:
      'Skořicová silice pokožku lokálně prohřívá. Aroma masáž zaměřená na problémové partie.',
    description: [
      'Celotělová aroma masáž se skořicovou silicí, která pokožku lokálně prohřívá a podporuje prokrvení. Masérka se věnuje zejména partiím, které si určíte.',
      'Teplo a výrazná vůně skořice dělá z této masáže příjemnou volbu pro chladnější měsíce.',
      'Po masáži doporučujeme zvýšit pohyb a příjem tekutin.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1090, recommended: true },
      { minutes: 90, priceCzk: 1490 },
      { minutes: 120, priceCzk: 1990 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.herbs,
    legacyDescription:
      'Skořicová silice použitá při této thajské detoxikační masáži způsobuje lokální prohřátí pokožky, rozšíření cév a tím odbourávání tuků v kůži. Používá se zejména v místech výskytu příznaků celulitidy. Po masáži se doporučuje určené partie těla procvičit, čímž násobíme účinek skořicové silice a tím urychlíme odbourávání tuků. Aroma působí velmi pozitivně na unavenou mysl.',
  },
  {
    slug: 'aloe-vera',
    name: 'Thajská masáž gelem Aloe vera (96 %)',
    category: 'relaxacni',
    summary:
      'Chladivý gel s 96 % aloe vera. Volba pro suchou, citlivou nebo sluncem zatíženou pokožku.',
    description: [
      'Místo oleje se při této masáži používá 96% gel z aloe vera s přírodním olejem. Gel je lehký a chladivý, a proto je masáž vyhledávaná v létě.',
      'Aloe vera pokožku zvláčňuje a zklidňuje — hodí se pro pleť suchou, citlivou nebo po dni stráveném na slunci.',
      'Masáž je jemná a klidná, bez výrazné vůně.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1090, recommended: true },
      { minutes: 90, priceCzk: 1490 },
      { minutes: 120, priceCzk: 1990 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.oil,
    legacyDescription:
      'Aloe vera je vynikající pro pleť suchou, citlivou nebo zatíženou sluncem. 96% aloe vera gel s přírodním olejem Vaši pleť zvláční, zregeneruje, uklidňuje a celkově chrání pokožku. Zbavuje jí nedokonalostí a může podpořit úplné zahojení drobných jizviček. ALOE VERA - přirozeným způsobem proniká do spodních vrstev kůže, urychluje cyklus tvorby buněk a odstraňuje zrohovatělé buňky, tlumí záněty. Skvěle také působí na popáleniny, a to i na spálení od sluníčka. Nechte svoji pokožku hýčkat...',
  },
  {
    slug: 'horky-olej',
    name: 'Thajská masáž horkým olejem',
    category: 'relaxacni',
    summary:
      'Celotělová masáž nahřátým olejem. Teplo prostupuje do svalů — vděčná volba v zimě.',
    description: [
      'Olejová masáž celého těla, při které masérka pracuje s nahřátým olejem. Teplo prostupuje do svalů a uvolňuje je rychleji, než je u běžné olejové masáže obvyklé.',
      'V zimních měsících je to jedna z nejvyhledávanějších masáží — po hodině máte pocit, jako byste leželi na prohřáté pláži.',
      'Doporučujeme doplnit obličejovou masáží bio olejem Saloos.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1090, recommended: true },
      { minutes: 90, priceCzk: 1490 },
      { minutes: 120, priceCzk: 1990 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.oil,
    legacyDescription:
      'Spojení dvou nádherných masáží - olejová masáž celého těla nahřátým olejem, který vaše tělo prohřeje a masérka uvolní ztuhlé svaly a vám dodá pocit tepla v zimním období, jako by jste leželi na prohřáté pláži ve slunném Thajsku...doporučujeme po masáži obličejovou masáž bio obličejovým olejíčkem Saloos (naleznete v ceníku pod názvem Obličejová masáž)',
  },
  {
    slug: 'pestici-biokokos',
    name: 'Pěstící masáž biokokosovým olejem',
    category: 'relaxacni',
    summary:
      'Bio kokosový olej lisovaný za studena s vonnými extrakty. Na výběr čokoláda, pomeranč nebo caffè latte.',
    description: [
      'Celotělová relaxační masáž s bio kokosovým olejem lisovaným za studena a obohaceným o vzácné vonné extrakty.',
      'Vůni si vybíráte sami — čokoláda, pomeranč nebo caffè latte. Řekněte nám prosím při objednání, kterou máte rádi.',
      'Olej pokožku hydratuje a chrání před vysycháním, což oceníte zejména v zimě a po létě.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1190, recommended: true },
      { minutes: 90, priceCzk: 1590 },
      { minutes: 120, priceCzk: 2090 },
    ],
    notes: ['Výběr vůně: čokoláda, pomeranč nebo caffè latte — uveďte prosím při objednání.'],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.oil,
    legacyDescription:
      'Celotělová relaxační masáž. Dopřejte pokožce pěstící kůru pomocí bio kokosového oleje lisovaného za studena a obohaceného o vzácné vonné extrakty. Povzbudí a zregeneruje unavenou pleť i mysl. Skvěle hydratuje, zjemňuje a chrání před vysycháním. Tyto luxusní oleje hydratují sluncem či mrazem namáhanou pokožku. Na výběr - čokoláda, pomeranč, caffe latte',
  },
  {
    slug: 'konopna-euforia',
    name: 'Konopná celotělová masáž EUFORIA',
    category: 'relaxacni',
    summary:
      'Relaxační masáž s konopným olejem v bio kvalitě, zakončená antistresovou masáží hlavy a obličeje.',
    description: [
      'Relaxační celotělová olejová masáž s konopným olejem v bio kvalitě, který pokožku zvláčňuje a dobře se vstřebává.',
      'Masérka postupuje od dolních končetin přes zádové svalstvo a páteř k horním končetinám. Proceduru zakončuje velmi klidnou antistresovou masáží hlavy a obličeje.',
      'Je to jedna z našich nejcelistvějších relaxačních masáží — na konci nezůstane část těla, které by se masérka nevěnovala.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1190 },
      { minutes: 90, priceCzk: 1590, recommended: true },
      { minutes: 120, priceCzk: 2090 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.herbs,
    legacyDescription:
      'Relaxační celotělová olejová masáž s použitím konopného oleje v bio kvalitě, který má výborné regenerační, zvláčňující a protizánětlivé účinky. Zpomaluje proces stárnutí a blahodárně působí proti různým druhům alergií. Hlavním efektem této procedury, není jen pocit maximálního uvolnění a vitality, ale právě i zdravá a vláčná pokožka. Prvky aroma a relaxační masáže založené na stimulaci neurolymfatických bodů a na protažení ztuhlého svalstva Vám přinesou zaslouženou úlevu. Terapeutka se zaměří nejprve na uvolnění dolních končetin, zádových svalů a páteře a poté provede masáž horních končetin. Procedura je zakončena velmi relaxační antistresovou masáží hlavy a obličeje. Při masáži dochází k maximálnímu uvolnění organismu, odstranění únavy a bolesti. Buďte svěží a plní vitality! Vhodné též na léčbu suché, ekzematické a lupénkou postižené pokožky',
  },
  {
    slug: 'granatove-jablko',
    name: 'Luxusní masáž olejem z granátového jablka',
    category: 'relaxacni',
    summary:
      'Nejluxusnější olej z naší nabídky. Výrazná vůně a hluboká hydratace pokožky.',
    description: [
      'Celotělová relaxační masáž olejem s výtažky z granátového jablka — nejbohatším olejem, který v salonu máme.',
      'Olej pokožku vyživuje do hloubky a dlouho ji hydratuje. Vůně je výrazná a teplá; spolu s pomalým tempem masáže vytváří velmi klidnou hodinu.',
      'Oblíbená volba jako dárek nebo jako péče v zimních měsících.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1190, recommended: true },
      { minutes: 90, priceCzk: 1590 },
      { minutes: 120, priceCzk: 2090 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.oil,
    legacyDescription:
      'Luxusní péče pro pokožku v zimních dnech. Doteky i vůně působí na emoce, dokáží vnést naprosté uvolnění a úlevu celému tělu. Je proto velmi důležité, aby byla při masáži uklidněná i naše mysl. Pokožka je hýčkána tím nejluxusnějším olejem s výtažky z granátového jablka. Tato masáž je léčebná metoda, při níž mechanické podněty prováděné rukama masérek vyvolají místní i vzdálené reflexní změny. Masáž stimuluje krevní oběh, uklidňuje nervový systém a uvolňuje svalové napětí. Olej s výtažky z granátového jablka pokožku vyživuje do hloubky a zásobuje vitaminy, hydratuje ji na dlouhou dobu.',
  },
)

// --------------------------------------------------------------- prémiové
SERVICES.push(
  {
    slug: 'tepla-skoricova-aroma',
    name: 'Thajská teplá skořicová aroma masáž',
    category: 'premiove',
    summary:
      'Celotělová masáž nahřátým skořicovým olejem spojená s aromaterapií. Skořicové prohřátí pro zimní dny.',
    description: [
      'Celotělová masáž nahřátým esenciálním skořicovým olejem, doplněná o aromaterapii.',
      'Teplo oleje prostupuje do svalů, vůně skořice naplní celou masérnu. Masáž stimuluje prokrvení a patří k nejpříjemnějším způsobům, jak se v zimě zahřát.',
      'Masérka pracuje pomalu a rovnoměrně po celém těle.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1190 },
      { minutes: 90, priceCzk: 1590, recommended: true },
      { minutes: 120, priceCzk: 2090 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.herbs,
    legacyDescription:
      'Zažijte skořicové prohřátí v zimních dnech. Esenciální skořicový olej vám pomůže s uvolněním a svojí vůní masáž zpříjemní. Masáž je léčebná metoda, při níž mechanické podněty prováděné rukama masérek vyvolají místní i vzdálené reflexní změny. Masáž stimuluje krevní oběh, uklidňuje nervový systém a uvolňuje svalové napětí. Skořicový olej má antiseptické a čistící účinky, působí jako afrodiziakum. Pomáhá při nachlazení, nadýmání, silně prokrvuje pokožku a napomáhá činnosti lymfatického systému, který odbourává tuky a s nimi spojenou celulitidu. Jedná se o celotělovou masáž nahřátým skořicovým olejem spojenou s aromaterapií.',
  },
  {
    slug: 'tepla-levandulova-aroma',
    name: 'Thajská teplá levandulová aroma masáž',
    category: 'premiove',
    summary:
      'Teplý levandulový olej, hluboké uvolnění a klid. Nejtišší masáž z naší nabídky.',
    description: [
      'Celotělová aroma masáž s teplým levandulovým olejem. Teplo oleje proniká do svalů, levandule zklidňuje.',
      'Mezi našimi masážemi je tahle nejtišší — hosté u ní často usínají. Doporučujeme ji, pokud potřebujete opravdu vypnout.',
      'Vhodná při dlouhodobé únavě, napětí i při horším usínání.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1190 },
      { minutes: 90, priceCzk: 1590, recommended: true },
      { minutes: 120, priceCzk: 2090 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.lounge,
    legacyDescription:
      'Dopřejte si hluboké uvolnění s teplým levandulovým olejem, který zklidňuje mysl, uvolňuje svalové napětí a navozuje pocit bezpečí a klidu. Teplo oleje proniká do svalů, levandule harmonizuje nervový systém, pomáhá při stresu, únavě i nespavosti.',
  },
  {
    slug: 'royal-bylinna',
    name: 'Royal — královská bylinná masáž',
    category: 'premiove',
    summary:
      'Tradiční thajská masáž a po ní horké bylinné sáčky. Dvojkombinace našich nejoblíbenějších technik.',
    description: [
      'Královská masáž spojuje dvě techniky. Nejprve klasická thajská masáž uvolní svaly a klouby, protáhne páteř a končetiny a rozproudí v těle krevní oběh.',
      'Poté následuje bylinná terapie: thajské bylinné sáčky se nahřejí na příjemnou teplotu a masérka je přikládá na místa, kde cítíte největší únavu. Bylinky a koření v sáčku uvolňují svoji vůni přímo na pokožce.',
      'Je to naše nejcelistvější procedura — a také nejdéle doznívající. Doporučujeme 90 minut a více.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1290, note: 'masáž zad' },
      { minutes: 90, priceCzk: 1790, recommended: true },
      { minutes: 120, priceCzk: 2190 },
    ],
    notes: [
      'Po masáži se prosím 4 hodiny nesprchujte, aby bylinky mohly působit.',
      'V délce 60 minut se masírují pouze záda.',
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.herbs,
    popular: true,
    legacyDescription:
      'Luxusní dvojkombinace nejpopulárnějších thajských masáží. Nejprve klasická thajská masáž a poté úžasná bylinná masáž. Královská thajská masáž je kombinací tradiční thajské masáže a starodávné léčebné metody vycházející z přikládání horkých bylinných sáčků na místa, kde v těle proudí energie. Tradiční thajská masáž nejprve odstraní ztuhlost svalů a kloubů, účinně protáhne páteř a končetiny a rozproudí v těle přirozený krevní oběh. Masérka tlakovým působením na akupresurní body celé tělo uvolní a připraví na následnou terapii. Ta probíhá za pomoci bylinných balíčků, které jsou předem nahřívány na příjemnou teplotu a přikládány na unavená místa na těle. Thajské bylinky a koření obsažené v sáčku způsobují zpevnění pokožky, dokonalé odbourání stresu a dlouhotrvající fyzické i duševní uvolnění. Je důležité se 4hodiny po masáži nesprchovat!',
  },
  {
    slug: 'hot-stone',
    name: 'Hot Stone — masáž horkými lávovými kameny',
    category: 'premiove',
    summary:
      'Lávové kameny nahřáté na 40–50 °C. Teplo se postupně rozlévá po těle — hluboká relaxace.',
    description: [
      'K masáži se používají speciální lávové kameny, které výborně drží teplo. Nahřívají se ve vodní lázni na 40–50 °C.',
      'Masérka nejprve projde jednotlivé partie těla kameny, čímž se svalstvo postupně uvolní, a poté je ještě promasíruje rukama. Nakonec provede celkovou harmonizaci těla.',
      'Patří k nejluxusnějším masážím, které nabízíme. Mnoho hostů u ní usne — a klid po ní drží ještě dlouho.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1290, note: 'masáž zad' },
      { minutes: 90, priceCzk: 1790, recommended: true },
      { minutes: 120, priceCzk: 2190 },
    ],
    notes: ['V délce 60 minut se masírují pouze záda.'],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.herbs,
    popular: true,
    legacyDescription:
      'Masáž lávovými kameny patří mezi nejluxusnější masáže, která svými účinky určitě uspokojí i ty nejnáročnější klienty. Dopřejte si masáž horkými kameny z hlubin země a uvolněte se díky teplu, které se postupně rozlévá po celém Vašem těle. Nechejte své tělo hýčkat příjemnými masážními tahy a dopřejte mu energii, která přichází z lávových kamenů. K masáži se používají speciální lávové kameny, které výborně akumulují teplo a tím přispívají k větší účinnosti masáže. Tyto kameny mají zároveň i mimořádně silnou energetickou vibraci. Lávové kameny pomáhají odstraňovat blokace na důležitých bodech (meridiánech) a rozproudí energii ve Vašem těle. Masáž lávovými kameny má vysoký terapeutický a relaxační účinek. Správně provedená masáž Vás dovede k absolutní relaxaci, a mnohdy Vás ukolébá i k posilujícímu spánku. Ještě dlouho po masáži budete cítit hluboký klid a vyrovnání. Lávové kameny se nahřejí ve vodní lázni na teplotu 40 - 50 °C. Jednotlivé partie těla jsou nejdříve masírovány lávovými kameny. Tímto opravdu příjemným způsobem postupně uvolníme svalstvo a pak ještě důkladně promasírujeme bez kamenů. Zvýší se tak účinek oproti klasické masáži. Nakonec je provedena celková harmonizace těla.',
  },
  {
    slug: 'citronova-trava',
    name: 'Prohřívací masáž horkým olejem z citronové trávy',
    category: 'premiove',
    summary:
      'Celotělová masáž horkým olejem z citronové trávy včetně masáže chodidel jako bonus. Doporučujeme 90 minut.',
    description: [
      'Celotělová masáž horkým olejem z citronové trávy, doplněná o masáž chodidel jako bonus.',
      'Silice citronové trávy má osvěžující, svěží vůni — na rozdíl od těžších olejů spíše povzbudí, než uspí. Hodí se, když se cítíte unavení, ale potřebujete zůstat v chodu.',
      'Aby vynikla i část věnovaná chodidlům, doporučujeme délku alespoň 90 minut.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1290 },
      { minutes: 90, priceCzk: 1790, recommended: true },
      { minutes: 120, priceCzk: 2190 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.oil,
    legacyDescription:
      'Celotělová masáž horkým olejem z citronové trávy včetně masáže chodidel jako bonus. Pro celkovou harmonii těla, lymfatického systému i vnitřních orgánů. Doporučujeme v délce alespoň 90 min. Silice citronely se používá v přírodní medicíně již více než 3000 let. Aroma citronové trávy osvěžuje při stresu a napětí. Působí proti únavě a zvyšuje schopnost koncentrovat se. Omezuje nadměrné pocení. Citronová tráva má značné zvláčňující účinky, a proto se ve východní medicíně využívá k omlazujícím procedurám. Olej má velice příjemné aroma.',
  },
  {
    slug: 'omlazujici-kosmetika-obliceje',
    name: 'Thajská omlazující kosmetika obličeje',
    category: 'premiove',
    summary:
      'Péče o pleť v pěti krocích — čištění, peeling, liftingová masáž, maska a rostlinný elixír. Produkty Saloos.',
    description: [
      'Kompletní péče o pleť v pěti krocích. Masérka nejprve pleť vyčistí jemnou masáží, poté následuje peeling pro odstranění odumřelých buněk.',
      'Třetím krokem je liftingová masáž se stimulací akupresurních bodů, po ní se nanáší omlazující maska s vyhlazujícím efektem.',
      'Procedura končí vmasírováním rostlinného elixíru. Používáme výrobky od české firmy Saloos.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1090, recommended: true },
      { minutes: 90, priceCzk: 1490 },
    ],
    requiredTherapists: 1,
    partySizes: [1, 2],
    image: IMG.reception,
    legacyDescription:
      'Omlazující péče o pleť v pěti krocích: Čištění pleti jemnou masáží. Peeling pro odstranění odumřelých buněk a rozjasnění pleti. Liftingová masáž, při které masérka stimuluje akupresurní body. Nanesení omlazující masky s vyhlazujícím efektem. Vmasírování rostlinného elixíru s vyhlazujícím efektem. Používáme výrobky od české firmy Saloos.',
  },
)

// -------------------------------------------------------------- speciální
SERVICES.push(
  {
    slug: 'detska-olejova',
    name: 'Dětská olejová masáž',
    category: 'specialni',
    summary: 'Jemná celotělová masáž pro děti do 12 let.',
    description: [
      'Jemná celotělová olejová masáž uzpůsobená dětem do 12 let.',
      'Masérka pracuje s výrazně nižším tlakem a masáž kdykoli přizpůsobí tomu, jak se dítě cítí. Doprovod rodiče je v masérně samozřejmostí.',
      'Vhodná pro děti, které sportují, nebo jen jako společný klidný čas.',
    ],
    durations: [
      { minutes: 30, priceCzk: 590, recommended: true },
      { minutes: 60, priceCzk: 890 },
    ],
    notes: ['Pouze pro děti do 12 let. Doprovod rodiče je vítán.'],
    requiredTherapists: 1,
    partySizes: [1],
    image: IMG.lounge,
    legacyDescription: 'Jemná celotělová masáž pro děti do 12 let.',
  },
  {
    slug: 'tehotenska-biokokosova',
    name: 'Těhotenská biokokosová masáž',
    category: 'specialni',
    summary:
      'Celotělová masáž bio kokosovým olejem, uzpůsobená stadiu těhotenství. Provádíme od ukončeného třetího měsíce.',
    description: [
      'Celotělová relaxační masáž bio kokosovým olejem lisovaným za studena, uzpůsobená pokožce, která se v těhotenství napíná.',
      'Masáž i poloha se přizpůsobují stadiu těhotenství — prosíme, uveďte ho při objednání a připomeňte masérce ještě před masáží.',
      'Vůni si můžete vybrat: čokoláda, pomeranč nebo caffè latte.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1290, recommended: true },
      { minutes: 90, priceCzk: 1790 },
      { minutes: 120, priceCzk: 2190 },
    ],
    notes: [
      'Těhotenskou masáž provádíme od ukončeného třetího měsíce.',
      'Stadium těhotenství prosím uveďte při objednání.',
      'Výběr vůně: čokoláda, pomeranč nebo caffè latte.',
    ],
    requiredTherapists: 1,
    partySizes: [1],
    image: IMG.oil,
    legacyDescription:
      'Celotělová relaxační masáž. Dopřejte pokožce, napínající se při těhotenství, pěstící kůru, pomocí bio kokosového oleje, který je lisovaný za studena a obohacený o vzácné vonné extrakty. Možno doplnit výběr: Čokoláda, pomeranč nebo caffe latte - hlaste si při objednání. Proniká do hloubky a působí proti vzniku strií. Skvěle hydratuje, zjemňuje a chrání před vysycháním. Během masáže terapeutka vmasíruje olej do hloubky a vaše pleť bude vyživená a zamezí jejímu praskání. Masáž je uzpůsobena stadiu těhotenství, který nahlašte již při objednání i před samotnou masáží. Těhotenskou masáž provádíme od ukončeného třetího měsíce.',
  },
  {
    slug: 'parova-biokokos',
    name: 'Párová masáž biokokosovým olejem',
    category: 'specialni',
    summary:
      'Dva hosté, dvě masérky, jedna masérna. Relaxační biokokosová masáž ve stejný čas, vedle sebe.',
    description: [
      'Párová masáž znamená, že si lehnete vedle sebe a masáž probíhá ve stejný čas — každému se věnuje jedna masérka.',
      'Masíruje se bio kokosovým olejem, který skvěle regeneruje a hydratuje pokožku a dobře se vstřebává u jakéhokoli typu pleti.',
      'Uvedená cena je za dvě osoby dohromady. Nově si můžete užít až 120 minut společného času.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1990 },
      { minutes: 90, priceCzk: 2690, recommended: true },
      { minutes: 120, priceCzk: 2990 },
    ],
    notes: ['Uvedená cena platí za dvě osoby dohromady.'],
    requiredTherapists: 2,
    partySizes: [2],
    image: IMG.thai,
    popular: true,
    legacyDescription:
      'Nově si nyní můžete užívat až 120min jedinečné společné zážitky u provoněné relaxační masáže ve dvou... Párová masáž je komplexní regenerační péče celého těla spojená s biokokosovou olejovou masáží, která skvěle regeneruje a hydratuje pokožku! Kokosová masáž je unikátní procedura, která velice pozitivně působí proti únavě, zklidňuje psychiku, navozuje příjemné uvolnění organismu a odbourává stres. Budete se cítit jako znovuzrození. Bio kokosový olej je úžasný dar přírody. S pokožkou dokáže doslova zázraky! Nejen, že se dobře vstřebává a je vhodný pro jakýkoliv typ pokožky, ale hydratuje do hloubky a léčí.',
  },
  {
    slug: 'ctyri-ruce',
    name: 'Masáž čtyř rukou',
    category: 'specialni',
    summary:
      'Dvě masérky masírují jednoho hosta současně a synchronně. Velmi intenzivní zážitek — doporučujeme 120 minut.',
    description: [
      'Při masáži čtyř rukou pracují na jednom hostovi dvě masérky současně, v naprostém souladu. Obě strany těla se masírují ve stejný okamžik.',
      'Synchronní pohyb znásobuje účinek klasické thajské olejové masáže — mysl přestane pohyb sledovat a uvolnění přichází rychleji. Masíruje se originálním biokokosovým olejem.',
      'Je to náš nejintenzivnější zážitek. Aby vynikl, doporučujeme délku 120 minut.',
    ],
    durations: [
      { minutes: 60, priceCzk: 1990 },
      { minutes: 90, priceCzk: 2690 },
      { minutes: 120, priceCzk: 2990, recommended: true },
    ],
    notes: ['Masáž provádějí dvě masérky současně — rezervace vyžaduje dva volné terapeuty.'],
    requiredTherapists: 2,
    partySizes: [1],
    image: IMG.thai,
    legacyDescription:
      'Masáž „čtyř rukou“ je velmi intenzivní synchronní masáž, dvěma masérkami současně. Tato metoda znásobuje účinek klasické thajské olejové masáže a mnohem účinněji tak odbourává svalové napětí a stres. Thajská olejová masáž je prováděna originálním biokokosovým olejem. Jde o kombinaci klasické thajské masáže spolu s jemnou masáží celého těla od konečků prstců na nohách až po kořínky vlasů za pomocí olejů, které napomáhají k celkové relaxaci, odstranění únavy, bolesti a nastavení duševní a tělesné harmonie. Tento druh masáže je obzvláště účinný při odstraňování napětí a ztuhlosti svalů. Působí také blahodárně na pokožku. Doporučujeme masáž v délce 2 hodin.',
  },
)

export const SERVICE_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]))

export function getService(slug: string): Service | undefined {
  return SERVICE_BY_SLUG.get(slug)
}

export function servicePriceFrom(service: Service): number {
  return Math.min(...service.durations.map((d) => d.priceCzk))
}

export const POPULAR_SERVICES = SERVICES.filter((s) => s.popular)
