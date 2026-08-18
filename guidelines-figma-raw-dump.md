# Fudis Design Guidelines

Extracted from Figma file: FD-design-guidelines

Language: Finnish (fi)

---

### Käyttö yleisesti

- Fudis-notification on staattisempia kuin fudis-alert
  - Notifikaatiot kertovat tietoa, joka on tiedossa ilman käyttäjän aktiivista toimintaakin, eli ovat usein näkyvissä jo käyttäjän saapuessa näkymään
    - Notifikaatio voi myös ilmestyä toiminnan seuraksena mm. tapauksissa, joissa käyttäjä tekee valinnan, joka vaikuttaa formin tietojen antamiseen.

### Variaatiot

Notifikaatioita on 4 eri väriä/käyttötarkoitusta varten:

#### Punainen / Error:

Virheestä tai virhetilanteesta informoiminen. Tilanteet, joissa eteneminen estyy (joko heti tai pidemmällä aikavälillä: esim. opiskelijan virhetilassa oleva suunnitelma saattaa vaikuttaa opintojen etenemiseen ja mm. estää myöhemmin valmistumisen)

#### Keltainen / Warning:

Varoittaminen esim. olennaisen tiedon puuttumisesta tai asiasta, joka voi myöhemmin kostautua / josta käyttäjän olisi hyvä olla tietoinen. Ei kuitenkaan estä käyttäjää etenemästä.

#### Vihreä / Success:

Antaa positiivisen palautteen, esim. admin -> uusien opiskelijoiden vahvistus -> kun odottamassa ei ole yhtään opiskelijaa, vaan kaikki on käsitelty tai student: kun kaikki opinnot on tehty ja opiskelija voi hakea tutkinnon koostamista.

#### Sininen / Info:

Antaa neutraalia tietoa.

### Painike (link-button)

- Notifikaatiossa on mahdollistettu linkin näköinen painike. Muutoin fudis ei tue ko. painike -tyyliä.

### Käyttötapaukset

Teksti voidaan tarvittaessa jäsentää halutulla tavalla ja linkkejä/painikkeita voidaan lisätä notifikaation sisälle. Notifikaation sisällölle ei ole teknisiä rajoitteita.

### Asemointi

- Notifikaatiot sijoittuvat sivulla sisällön sekaan ja lähelle tietoa/osiota, johon ne viittaavat.
- Notifikaatiot voivat koskea jotain tiettyä sisältöä, jolloin ne sijoitellaan sen yhteyteen.
- Huomioi lukujärjestys jotta kokonaisuus on käyttäjälle selkeä.
- Notifikaatio voi myös viitata näkymään tai muuhun olennaiseen tietoon yleisemmin.
- Notifikaation leveys ja korkeus määritetään tilannekohtaisesti.
- Leveys notifikaation yhteydessä olevan sisällön tai elementin rajojen mukaan.
- Notifikaatioita voidaan käyttää sekä ns. varsinaisissa näkymissä, että dialogeissa.

### Figma -komponentti

Tässä on toinen asia josta käyttäjälle kerrotaan ja sen alla linkki.

### Alertteja on 4 eri tyyppiä, eri käyttötapauksia varten

Alerteilla voidaan mm. kertoa toiminnon onnistumisesta/epäonnistumisesta tai antaa ohjeita käyttäjältä edellyteistä jatkotoimista Alert ei ole näkymäsidonnainen, vaan se jää käyttäjä selainsivun ylälaitaan näkyviin, vaikka käyttäjä siirtyisi järjestelmässä näkymästä toiseen Alerttiin ei voi laittaa linkkiä (Ei saavutettava) Käyttäjän täytyy sulkea alert, jotta se häviää näkyvistä. Kun alert suljetaan/siitä poistutaan, siirretään kohdistus siihen elementtiin missä käyttäjä oli ennen kuin kohdistus siirtyi alerttiin

### Punainen / Error:

Virheestä tai virhetilanteesta informoiminen jossa käyttäjän toiminta on estynyt. Tilanteet, joissa eteneminen estyy, esim. käyttäjän käyttöoikeudet eivät riitä tai kaikkia formissa ei ole annettu kaikkia pakollisia tietoja.

### Keltainen / Warning:

Varoittaminen esim. olennaisen tiedon puuttumisesta tai asiasta, joka voi myöhemmin kostautua / josta käyttäjän olisi hyvä olla tietoinen. Ei kuitenkaan estä käyttäjää etenemästä. Käytetään myös pdf-tiedostojen muodostuksessa latauksen aikana kertomassa toiminnon olevan kesken.

### Vihreä / Success:

Kertoo toiminnon onnistumisesta

### Sininen / Info:

Antaa vinkkejä, ohjeita ja infoa

### Useampi alert

Jos alertteja aukeaa yhtä aikaa useampi kuin yksi, asettuvat ne alekkain niin, että viimeisimmäksi auennut aukeaa alimmaksi.

### Asemointi

Alert aukeaa kiinnittyneenä sivun ylälaitaan Alert asettuu kaiken muun sisällön päälle Alert ei poistu näkyvistä vaikka käyttäjä vaihtaisi näkymää Alert ulottuu aina koko näytön leveydelle Alertit lisätään kronologisessa järjestyksessä (uusin alimmaiseksi)

### Dialogeja on kahta päätyyppi: Choises ja Info

Käytetään pääsasiassa lomakkeissa ja toimintojen vahvistuksiin Rakenne H2 -otsikko dialogin alussa ensimmäisenä otsikkona. (Fudis ei määritä dialogin otsikkotasoa) Päätoiminnot dialogin oikeassa alakulmassa Sulje -painike dialogin oikeassa yläkulmassa Dialogia ei voi sulkea klikkaamalla sen ulkopuolelta Dialogin toimintoihin oikeassa alakulmassa (fudis-dialog-actions) ei lähtökohtaisesti voi lisätä enempää toimintoja kuin variaatiossa on oletuksena Huom! On suositeltavaa käyttää vain yhtä dialogia kerrallaan. Päällekkäisten dialogien käyttöä ei suositella, mutta se on kuitenkin mahdollista ja joskus ns. “vähiten huonoin” ratkaisu. Alle jääviin dialogeihin on mahdollista tallentaa käyttäjän syöttämää tietoa.

Käytetään pääsasiassa lomakkeissa ja toimintojen vahvistuksiin Dialogissa on oletuksena kaksi (2) painiketta oikeassa alakulmassa: Peruuta toiminto ja sulje dialogi: Eiku -painike Vahvista toiminto, esim. Vahvista/Tallenna/lähetä (teksti määritetään tapauskohtaisesti)

### Variaatiot

Käytetään mm. lisätietojen ja joidenkin virheilmoitusten esittämiseen. Voi sisältää pelkästään tarkasteltavaa (read only) tietoa Dialogissa on oletuksena yksi painike oikeassa alakulmassa: Vahvista toiminto joka sulkee dialogin, esim. Kyllä/Ok/Ymmärsin/Jatka (teksti määritetään tapauskohtaisesti) Sulje -painike dialogin oikeassa yläkulmassa Dialogia ei voi sulkea klikkaamalla sen ulkopuolelta

### sm: 704 px

Käytettäväksi esimerkiksi: Pienet lomakkeet: esim. yhden rajatun kohteen muokkaustoiminnot Vahvistusdialogeissa, missä tilaa sisällölle tarvitaan enemmän Info-dialogeissa, missä tekstiä odotetaan olevan maltillisesti. Sisältö kannattaa sijoittaa yhteen sarakkeeseen.

### xs: 480 px

Käytettäväksi esim. vahvistusdialogeissa tai info-dialogeissa, missä tekstiä ei ole odoteta olevan kovin paljon. Sisältö kannattaa sijoittaa yhteen sarakkeeseen.

Fudis dialogista löytyy kokovariaatiot: xs, sm, md, lg, xl. Kokovariaatio määrittelee dialogin maksimileveyden. Näyttökoon pienentyessä dialogi skaalautuu näyttökoon mukaan. Dialogin otsikoiden tai tekstien koot eivät kuitenkaan muutu näyttökoon pienentyessä.

### md: 880 px

Käytettäväksi suuremmissa lomakkeissa: esim. monen tieto/valintakentän täyttäminen tai muokkaustoiminnot Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

### lg: 1120 px

Käytettäväksi esimerkiksi: Erittäin suuret lomakkeet/muokkaustoiminnot Kun tietoa pitää näyttää paljon, esim. taulukot Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

### xl: 1440 px

Käytettäväksi esim. kun tietoa pitää näyttää erittäin paljon: suuria taulukoita tai tekstirikkaita description listejä Esim. opintojaksoesite Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

### fudis-dialog 2/2

Muokkausta aloittaessa pyritään käyttämään muokkauksen avaavasta painikkeesta tekstiversiota eli “muokkaa”-sanaa. Kynä-ikonia voidaan käyttää vaihtoehtoisesti, jos teksti ei mahdu (huom. ikonin minimikoko 32px\*32px ja sen yhteydessä tulee esittää alt-teksti). Jos on yksittäinen muokattava kenttä, avataan muokkaus dialogissa. Avataan muokattavia tietoja sisältävät kokonaisuudet suoraan dialogissa, jos mukana on yksikin tietoja sisältävä kenttä. (Voi olla sekaisin read-only ja muokattavia kenttiä, mutta vältetään että aukeasi tietojen tarkasteluun modaali ja siitä vielä jokin uusi näkymä.) Näytetään vihreä success alert onnistuneista tallennuksista.

### Tietojen muokkaus

Dialogin toimintoihin (fudis-dialog-actions) ei lähtökohtaisesti voi lisätä uusia painikkeita (Vain submit ja cancel) Dialogi sijoitetaan 100px sivun ylälaidasta ja keskitetään horisontaalisesti Dialogi aukeaa aina whitelayerin päälle (kts. fudis-dimmer) Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations

### Vertikaalinen

Ruutukoon pienetessä ja mentäessä pienimpään breakpointiin, muuttuu dialogi mobiili-optimoiduksi. Otsikon koko ja marginit pienenevät, jotta sisältö mahtuisi mahdollisimman hyvin pieneen kokoon. Mobiili-optimoidussa dialogissa sisältö latoutuu lähtökohtaisesti päällekkäin. Suunnittelun apuna on Figmassa erillinen mobiili-kokovariantti dialogista. Huom. tämä ei ole virallinen dialogin kokovariantti.

Dialogin enimmäiskorkeus määrittyy käyttäjän ruutukoon mukaan, max-height: 65vh Jos dialogissa kerralla näytettävän sisällön enimmäismäärä ylittyy, sisällöstä tulee vertikaalisesti vieritettävä (vertical scrolling) Dialogin header ja toiminnot (painikkeet dialogin ala-laidassa) ovat aina näkyvissä

### Käyttö yleisesti

Wizardeja käytetään tiedon vaiheistettua lisäämistä/muokkaamista/käsittelyä varten Wizardeja käytetään pidemmissä prosesseissa, joissa käsitellään paljon tietoa ja, jota monessa tapauksessa joudutaan tarkastamaan/validoimaan suhteessa toisiinsa (edeltävässä vaiheessa annetut tiedot vaikuttavat seuraavan vaiheen tietoihin) Pystytään vaiheistamaan tarkastuksia ja etenemistä, jolloin käyttökokemus ei ole niin kuormittava Pystytään välttämään valtavan pitkät formit Pystytään välttämään lomakkeen muutoksia sen täyttämisen aikana

Wizardeja käytetään focused modessa Murupolkua ei näytetä Toiminnot alaoikealla Pyritään siihen, että painikkeita ei koskaan disabloida > nappia painaessa validaatiovirheet Pyritään siihen, että ei tabeja eikä expandableja wizardien sisälle Mikäli wizardin stepin sisältö on pitkä, mieti voisiko tilanteen jäsentää useampaan eri steppiin

### Viimeinen vaihe (End)

Wizarding viimeinen vaihe on esikatselu ja vahvistus, jossa esitetään tehtävät muutokset, sekä mihin muutokset vaikuttavat ja missä on virheitä Vaiheen oletusnimi on “Esikatsele ja vahvista” Vaihe ei sisällä toimintoja tai valintoja. Toiminnot: Edellinen, Vahvista (Vahvista -termiä voi muuttaa käyttökontekstin mukaan)

### Toiminnon vahvistus

Kun käyttäjä vahvistaa tiedot, näytetään alert toiminnon onnistumisesta/epäonnistumisesta

### fudis-wizard-progress (aka. stepper)

Komponenttia käytetään vain wizardissa Vaiheen edessä on numerointi 1, 2, 3 Aktiivinen vaihe on alleviivattu ja font-weight: 600 Komponentilla on oletuksena aria-label: “Toiminnon vaiheet”. Aria-label on muokattavissa käyttökontekstin mukaan esim. “Hakemuksen tekeminen – toiminnon vaiheet” Komponentin jokaisella vaiheella on aria-label: Vaihe 1/5 Wizard, Vaihe 2/5 Wizard

### Virheiden tiedot dialogissa

Wizardin toiminnon virheistä pyritään kertomaan viimeisessä "Esikatsele ja vahvista" -vaiheessa Sivulla näytetään contextual notifikaatio, jossa on tieto toiminnon suorittamisessa ilmenneistä virheistä ja linkiksi tyylitelty painike josta aukeavassa dialogissa on tarkempia tietoja toiminnon virheistä

Näytetään empty-state -teksti kun wizardissa ei ole mitään valittavaa

### Empty state

Jos käyttäjä yrittää poistua, näytetään käyttäjälle vahvistusdialogi ja varoitetaan tallentamattomista muutoksista

### Saavutettavuus

Huomioi sivun title (kts. kohta Saavutettavuus, Sivun title)

### Käyttö yleisesti

Kuvattuna kun kaikki tabit mahtuvat näkymän leveyteen (ei karusellia)

Kuvattuna kun kaikki tabit ei mahdu näkymän leveyteen (karuselli aktivoituna)

Figmaan rakennettu kaksi eri variantia suunnittelua varten primary ja secondary ja lisäksi karuselli-variantit molemmille Karuselli-variantia käytetään silloin kun tabeja on enemmän eivätkä ne eivät mahdu koko leveydelle Tabeissa lukumäärä näytetään tabin otsikon jälkeen suluissa.

Huomioitava, että tabien alla tulee esittää otsikko. Tabissa esitetty otsikko ei riitä saavutettavuuden näkökulmasta. Tabin alla voi olla useampi saman heading -tason otsikko

Fudiksen tabeissa käytetään kaikilla tabline-tasoilla (primary&secondary) samaa suunniteltua m-koon tekstityyliä. Katso Foundations > Typography > Other UI text styles / Muut kälissä käytetyt tekstityylit

### Typografia

Jäsentyminen isompaan, esim. desktop-leveyteen Alla olevassa esimerkissä demottu tilannetta kun tabit mahtuvat näkymään koko näkymän leveydelle (isommat näyttökoot). Huom! Sivuilla olevat chevron-painikkeet eivät tällöin näy

Jäsentyminen pienempään, esim. mobiilileveyteen Käytetään esim mobiilinäkymissä tai tilanteissa, kun kaikki tabit eivät mahdu samalle riville koko näkymän leveydelle. Huom! Chevron-painikkeet tulevat näkyviin silloin, kun jommalla kummalla sivulla karusellia on näytettävää tavaraa. Jos jommalla kummalla puolella karusellia ei ole näytettävää, chevron-painike ei silloin näy.

### fudis-table-header

Jokaisella taulukon sarakkeella on table-header (th) joka kuvaa sarakkeen soluissa olevaa sisältöä Pyri pitämään header lyhyenä ja helposti ymmärrettävä Komponentista on mobile -variaatio Komponentti tukee sarakkeen sisällön järjestämistä (sorting).

### Figma -komponentti

Taulukkoa käytetään tiedon järjestämiseen ja esittämiseen Taulukko on kokonaisuus joka koostuu useammasta komponentista (kts. yksittäiset komponentit) Harkitse toista esitystapaa (esim. fudis-dl) kun esitettävää tietoa on vain vähän, ja sarakkeita/rivejä on alle 3 kpl. Vältä yhdistämästä soluja (merge)

Taulukosta on olemassa mobile -variaatia, jossa fontti ja välistykset ovat pienemmät Näytetään variaatio kun ruudun leveys on alle 767 px

### Taulukon oletuskoko

Ruutukoon pienentyessä: Taulukosta näytetään mobile -variaatio. Breakpoint: <767 px Mahdollistetaan taulukon vaakavieritys (horizontal scrolling). Huom. Muun näkymän vaakavieritystä on vältettävä. Taulukkoa suunnitellessa, pyri pitämään taulukossa näytettävä tieto tiiviinä ja vältä pitkiä sarakkeen otsikoita (table-header). Harkitse taulukon sijaan myös muista tapoja tiedon esittämiseen.

Taulukko tasataan lähtökohtaisesti sivun vasempaan ylälaitaan Taulukon kokonaisleveys määräytyy lähtökohtaisesti sitä ympäröivän osion mukaan (width: 100%). Esimerkiksi luettavuuden helpottamiseksi taulukon leveyttä voidaan säätää, asettamalla se parent -elementin sisään.

### Tiedon esittäminen

Pyritään siihen, että sisältö linjataan samalla tavalla soluissa. Esim. kokonaisluvut voidaan linjata vasempaan reunaan, vaikka yleinen tapa laskentataulukoissa ja tilastoissa olisikin tasata ne oikeaan reunaan.

### Koko taulukko

Mikäli koko taulukossa ei ole esitettävää tietoa, näytetään käyttäjälle tyhjän taulukon sijaan empty state -teksti, joka kuvaa käyttäjälle syyn miksi näytettävää tietoa ei ole.

### Taulukon solu (table cell)

Jos taulukon solussa ei ole esitettävää tietoa, näytetään empty state -teksti esim.:

### fudis-table-caption

Taulukolla tulee olla aina sen sisältöä kuvaava otsikko (caption) Näkyvän ja ruudunlukijalle tarkoitetun captionin tulisi olla sama Font: Heading - s (small)

### fudis-table-cell

Komponentista on mobile -variaatio, jonka välistykset ja fonttikoko on pienemmät

### Järjestäminen

Fudis-table-header tukee sarakkeen sisällön järjestämistä. Käytä sarakkeen järjestämistä vain kun se on välttämätöntä, tai muuten hyödyllistä käyttäjälle. Kun sarake on järjestettävissä (sortable): Table-header label:n yhteydessä näytetään sorter -ikoni (väri: primary). Label ja ikoni toimivat painikkeena. Kun käyttäjä järjestää sarakkeen..: Laskevasti: sorter -ikoni osoittaa alapain label alleviivataan aria-sort: descending aria-live: _Table header_ järjestetty laskevasti Nousevasti: sorter -ikoni osoittaa ylöpäin label alleviivataan aria-sort: ascending aria-live: _Table header_ järjestetty nousevasti

### Tilat ja lisäosat

Section on html -semanttinen ryhmä joka ryhmittää sisältöä. Section elementtejä voi asettaa sisäkkäin (nested) Sectionilla on aina oltava kuvaava otsikko (heading). Otsikon tyyli voi vaihdella ja se määräytyy pitkälti sivuston muun otsikkorakenteen mukaan. Kuten muillekin otsikoille, myös sectionin otsikolle tulee määritellä otsikkotaso. Myös expandable on html -semanttisesti section

## EXPANDABLE

Harkitse käyttöä jos: Jos sivulla on paljon näytettävää tietoa. Tiedon voi pilkkoa tai jäsentää useampaan selkeään osaan tai kategoriaan. Nämä kategoriat voivat tarvittaessa olla toisistaan riippumattomia (esim. opiskeluoikeudet). Käyttäjän näkökulmasta voi hyötyä että pystyy piilotamaan osan sivulla esitettävistä tiedoista. Vältä käyttöä jos: Jos tieto on käyttäjälle tärkeää tai välttämätöntä toiminnon kannalta. Tällöin voi olla parempi että tieto pysyy koko ajan näkyvillä. Jos sivun tiedot ovat niin vähäiset että ne ovat kerralla silmäiltävissä. Tällöin yksittäisen tiedon piilottaminen ei oikein ole perusteltua. Vältä tämän haitari-tyypin sisäkkäistä käyttöä. Käytä kevyempiä haitareita jos tarvitsee sisäkkäisiä haitareita. Expandable näytetään lähtökohtaisesti kiinni - tilanteesta riippuen haitarit voidaan näyttää myös oletuksena auki (esim. opintojen rakenne, viestit). Pyritään kirjaamaan suunnitelmille miten kyseisessä tilanteessa haitarit oletuksena toimivat. Expandable on section jolloin sillä on aina oltava kuvaava otsikko (heading). Huomioi tämä annotoidessa otsikkojärjestystä.

### Mobiili (320 px)

Alimman tietotason haitari Kevyin haitari-variantti Käytä esim. tilanteissa missä on jotain ei niin tärkeää sivu- tai ohjetietoa jota käyttäjä voi halutessaan lukea Vältä haitarin käyttöä: Jos tieto on käyttäjälle tärkeää tai välttämätöntä toiminnon kannalta. Tällöin voi olla parempi että tieto pysyy koko ajan näkyvillä. Jos sivun tiedot ovat niin vähäiset että ne ovat kerralla silmäiltävissä. Tällöin yksittäisen tiedon piillottaminen ei oikein ole perusteltua. Haitarit näytetään lähtökohtaisesti kiinni - tilanteesta riippuen haitarit voidaan näyttää myös oletuksena auki (esim. opintojen rakenne, viestit). Pyritään kirjaamaan suunnitelmille miten kyseisessä tilanteessa haitarit oletuksena toimivat. Haitari on lähtökohtaisesti otsikkotaso. Huomioi tämä annotoidessa otsikkojärjestystä.

### Default

Description list (regular) -komponenttia käytetään ns. lomakkeiden lukutilassa, ja kun halutaan esittää tietoa tilavammassa muodossa.

Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations

### Responsiivisuus

Description listin tekstit pysyvät aina saman kokoisina eli näyttökoon pienentyessä description listin tekstit eivät pienene.

### Sisällytty description list (nested)

Description list komponentit voi tarvittaessa sisällyttää toistensa sisälle. Tämä mahdollistaa description list ryhmän “otsikoinnin” ilman heading komponenttia.

### Ei annettua arvoa (sisältö puuttuu)

Mikäli tekstikentässä ei ole mitään arvoa, näytetään empty state- teksti.

### Koodit

Pyritään siihen, että koodi näytetään aina (esim. opintojakso, koulutus, tutkinto-ohjelma) Pyritään siihen, että koodi tulee aina ensin Koodi erotetaan muusta tiedosta pilkulla HUOM! Opintolaatikossa koodilla oma paikka

### Yksikkö

Kun esitetään numeerisia arvoja, näytetään yksikkö aina arvon perässä (ei labelissä kuten lomakekentissä)

### Vaihteluvälillinen arvo

Mikäli käytetään tekstikentässä arvoa tulee käyttää jotain seuraavista esitystavoista:

### Sisäkkäinen description list (nested)

Description list -komponenttiin on mahdollista lisätä painike

Description list komponentit voi tarvittaessa sisällyttää toistensa sisälle. Tämä mahdollistaa ikäänkuin description list -ryhmän otsikoinnin ilman heading komponentteja. Huomioi, että sisäkkäistä description listaa tulee käyttää harkiten. Huomioi aina, että description list sisältää termi + arvo -pareja. Sisäkkäisestä description lististä osoitetietojen täyttäminen on hyvä esimerkki.

Description list (compact) -komponenttia käytetään kun halutaan esittää tietoa tiiviimmässä muodossa, esimerkiksi hakemuksen meta -tietojen esittämiseen.

### Kielivalinnan variaatiot (fudis-language-options)

Käytetään lomakkeella kun sisällöksi odotetaan korkeintaan lyhyttä lausetta lauseita. Jos odotettu sisältö ei mahdu kokonaan kentän sisään, voi olla syytä käyttää text-area -komponenttia

### fudis-text-area

Käytetään lomakkeella kun sisällöksi odotetaan täysiä lauseita tai pidempää tekstiä, käytetään text-area -komponenttia

Käytetään lomakkeella kun tekstisisältö voidaan syöttää useammalla kielellä (fi, sv, en) Tekstikentän tyyppi (Input type) voi olla tarpeen mukaan fudis-text-input tai fudis-text-area Kieli valitaan puolella olevasta pudotusvalikosta Jos lomakekenttä on pakollinen, sisältö on tyypillisesti pakollinen vain yhdellä kielellä

Localized text group -komponentti on rakennettu siten, että siinä olevat molemmat input-kentät ovat semanttisesti saman groupin sisällä. Tällä groupilla on ruudunlukijoille luettava oma erillinen group label, jolla kuvataan että kentät ovat samaa ryhmää. Tämä ruudunlukijoille luettava otsikko ei ole näkyvissä näkevälle käyttäjälle. Näkevälle käyttäjälle kentät ovat visuaalisesti niin sidoksissa toisiinsa, että otsikolle ei nähty olevan tarvetta. Näin ollen kuitenkin on hyvä huomioida että ohjetekstien on oltava erityisen selkeät. Localized text group -komponentin valintaosiota voidaan hyödyntää myös muuhun tarkoitukseen kuin kielen valitsemiseen.

### Figma -komponentti

Komponenttia voidaan käyttää boolean arvon valintaan yksistään (valittu/ei valittu). Esimerkkejä: Käyttöliittymässä kun on tarve korvata esim. vanhoja toggle-switchejä saavutettaviksi. Valinta tuo näkymään esille/piilottaa asioita. Taulukot Valintatilanteeseen, kun ei ole tarvetta pakollisuudelle HUOM! Jos on tarve pakollisuudelle yksittäisen checkboxin osalta, käytä silloin groupia jossa pakollisuutta ilmaistaan legendin yhteydessä.

Käyttöliittymästä esim. piilotetaan tai näytetään jotain valinnan mukaan.Ao. esimerkki Opettajan Opetukseni -näkymä

Erilaisten ehtojen hyväksymiseen. Huomioi inputien leveyden maksimimitat.

Tyylillisesti samat kuin groupin osalla (yksittäinen checkbox). Kts. guidelines Fudis-checkbox-group → Tilat

### fudis-checkbox

Käytetään silloin kun on tarve vain yhdelle valinnalle. Huom! Checkbox on oma checkbox-groupista erillinen itsenäinen komponenttinsa. Se ei siis ole checkbox groupin osa tai variant. Komponentilla ei ole erillistä näkyvää legendiä/otsikkoa. Pakollisuutta esitetään option-tekstin perässä seuraavalla syntaksilla: (pakollinen). Tämä on huomioitava case-by-case suunnittelussa ja viestittävä kehittävälle päälle. Tyyli on sama kuin muillakin inputien pakollisuusmerkinnöillä. Checkboxin klikkausalue on checkbox input -alue (valintaruutu) + teksti. Mahdollisella linkillä on oma klikkausalueensa. Option-teksti ei ole pakollinen (esimerkiksi taulukoissa voi esiintyä pelkkä valintaruutu). Jos option-tekstiä ei ole, on tarjottava ruudunlukijakäyttäjälle aria-labelled by-tieto (huomioitava suunnittelussa että mikä teksti!). Loppukäyttäjän on mahdollista aina poistaa valinta Huom! Toisin kuin groupilla, itsenäisen checkboxin sisään on mahdollista laittaa linkki. Linkki voi esiintyä missä kohtaa vain optionin tekstissä. Virhesanomien osalta vastuu käyttävällä päällä. Tämä on mahdollisuuksien mukaan huomioitava case-by-case suunnittelussa ja viestittävä kehittävälle päälle.

### fudis-checkbox-group

Käytetään lomakkeessa kun valitaan useampi arvo (group) tai boolean arvon valintaan yksistään (valittu/ei valittu) Suositellaan käyttöä jos alle 5 valittavaa arvoa (https://www.nngroup.com/articles/listbox-dropdown/) Voidaan halutessa sisällyttää myös vain 1 kpl valintaoption (kts. kuitenkin myös standalone-checkbox) Ensisijaisesti valinta on oletuksena tyhjä Loppukäyttäjän on mahdollista aina poistaa valinta Komponentilla on oltava aina erillinen, näkyvä legend Checkbox -group on semanttisesti fieldset, mutta se käyttäytyy samoin kuin yksittäinen lomakekomponentti HUOM! Checkbox groupin sisään ei ole mahdollista laittaa muuta sisältöä kuin checkbox (ei esim. linkkejä tms.) Checkboxin klikkausalue kattaa sekä valintaruudun että option-tekstin (Huom! Toisin kuin standalone-checkboxilla). Leveys tulee groupia ympäröivältä fieldsetiltä. Groupeissa on fieldset. CheckboxGroupissa käytettävän checkboxin selector: fudis-checkbox-group-option

### Disabled

CheckboxGroupissa käytettävän checkboxin selector → fudis-checkbox-group-option Tilat

### fudis-calendar-popup

Käytetään päivämäärän valintaan. Huom! Placeholder-tekstin järjestys aina suomenkielen mallilla (dd.mm.yyyy), eli ei esim. tarjota tukea englanninkieliselle järjestykselle. Huomioidaan kuitenkin kielistys eli että käytetään oikeaa kieltä.

Käytetään ajanjakson valintaan (alku -ja päätöspäivä) HUOM! Date range -valinnan ei ole pakko olla fieldset elementin sisällä jos konteksti ja kenttien labelit ovat riittävän selkeät, vaikka kyseessä onkin fieldset.

Käytetään fudis-date ja fudis-date-range -kentissä päivämäärän valintaan

### Aloituspäivä määräytyy erillisen valinnan mukaan

Aloituspäivä määräytyy erillisen valinnan mukaan ja päivämäärän tieto on lisätty kenttään jos tieto on teknisesti saatavilla

### Avataan date picker

Sijoitetaan input-kentät aina vierekkäin myös mobiilissa, koska kentät liittyvät toisiinsa.

Date rangella ei ole välttämätöntä olla otsikkoa (legendiä). Riittää että input-kentillä on labelit. Huom! Koska date-range koostuu kahdesta erillisestä datepickeristä, niin silloin molemmilla inputeilla on oltava labelit, toinen ei voi jäädä ilman sitä.Suunnittelussa arvioidaan tapauskohtaisesti onko tarvetta otsikolle (esim. voimassaoloaika tmv.) ja tällöin date range asetetaan Fieldsetin sisään. Näissä tapauksissa fieldsetille tulee aina myös legend. Legendillä on tällä hetkellä oletustyyli jota ei voi muuttaa.

Molemmilla inputeilla on omat kontrollit joille voidaan antaa min- ja max-arvoja. Date rangen osalta molemmille input-kentille (fudis-datepicker) tehdään omat validaationsa eli validaatio tapahtuu lomakekentän tasolla (ei siis ns. fieldsetin tasolla). Validoidaan käyttäjän tekemät virhevalinnat aina input-tasolla ja kerrotaan virheistä inputin alla.

### Date range

Käyttäjää voidaan ohjata Calendar-popupin valinnoissa. 1. Esimerkki: Estetään jälkimmäisessä input-kentästä avautuvasta popupista käyttäjää valitsemasta esimerkiksi aikaisempia päivämääriä kuin ensimmäiseen input-kenttään on valittuna jos lopetuspäivä ei voi olla ennen aloituspäivää (kts ao. kuva).

Esimerkki: Jos käyttäjä tekee ensimmäisen inputin calendar-popupissa valintoja esim. tulevaisuuteen (Esim. vuoteen 2027) tarjotaan myös seuraavan kentän calendar-popupissa tämän vuoden valintoja.

### fudis-radio-button

Käytetään lomakkeessa kun valitaan vain yksi arvo Suositellaan käyttöä jos alle 5 valittavaa arvoa (https://www.nngroup.com/articles/listbox-dropdown/) Ensisijaisesti valinta on oletuksena tyhjä Valintaa ei voi poistaa Komponentilla on oltava aina erillinen, näkyvä legend Radio button groupissa pitää olla vähintään kaksi valintaa Radio button group on semanttisesti fieldset, mutta se käyttäytyy samoin kuin yksittäinen lomakekomponentti Leveys tulee groupia ympäröivältä fieldsetiltä. Groupeissa on fieldset.

### Selected (with clear button)

Käytetään lomakkeessa kun valitaan vain yksi arvo. Sisältää erikseen avattavan pudotusvalikon, sekä hakurajauksen

Käytetään lomakkeessa kun valitaan vain yksi arvo. Sisältää hakurajauksen

### Dropdown

Käytetään lomakkeessa kun valitaan vain yksi arvo. Sisältää erikseen avattavan pudotusvalikon. Ei hakurajausta

### Pudotusvalikoiden sisältö

Tuetaan käyttäjää laittamalla valinnat aakkosjärjestykseen. Valintoja voidaan jäsentää väliotsikoiden avulla (kts. screenshot) Käyttäjälle on mahdollisuus tarjota valinnan lisätietoa eli main- ja sub-sisältö (kts. screenshot) Tietyn tyyppisten pudotusvalikoiden sisältö ja järjestys määrittyy kuitenkin automaattisesti koodistoista. Esimerkiksi opiskelijoiden tiedoissa kotikunta, kansalaisuus ja sukupuoli saadaan koodiston kautta, joten pudotusvalikon sisältöön ei ole mahdollista vaikuttaa. Myös koodistojen sisällön järjestys on korkeakoulujen itse muokattavissa, joten senkään osalta suunnittelussa ei ole mahdollista ottaa kantaa missä järjestyksessä vaihtoehtojen tulisi olla.

### Pudotusvalikoiden leveys

Pudotusvalikoiden leveyksissä noudatetaan samoja leveys-vaihtoehtoja kuin lomakkeen inputeissa, kts. guidelinesin kohta fudis inputs (general) -> Form komponentin enimmäisleveydet. Leveydet ovat siten nämä kolme: large: 368px (default) medium: 224px small: 160px

### Search + Selected (2kpl)

Sisältää erikseen avattavan pudotusvalikon, sekä hakurajauksen Sisältää aina listatut valinnat input-kentän alapuolella (“chipsit”)

Sisältää hakurajauksen Sisältää aina listatut valinnat input-kentän alapuolella (“chipsit”)

### fudis-multiselect

Käytetään lomakkeessa kun voidaan valita useampi arvo (yli 5 valittavaa arvoa) Sisältää erikseen avattavan pudotusvalikon. Ei hakurajausta Jos valittavien vaihtoehtojen määrä on pieni, voidaan käyttää myös checkbox -group elementtiä. HUOM! Käytä harkiten, koska ei voi käyttää hakua hyödyntävissä dropdowneissa. Huom! Valintojen osalta multiselectissä on käytetty natiivia input elementtiä (type="checkbox"), eli se ei ole mitenkään yhteydessä Fudiksen Checkbox tai CheckboxGroup-komponentteihin.

### Selected (valinnat kentän sisällä)

Chipsien tekstit linjataan alkamaan aina vasempaan laitaan (ei siis esim. keskitetysti). Poistoruksi säilyy aina samassa kohdassa chippiä vasemmassa yläkulmassa.

### Pakollisuuden merkitseminen

Tämän osion linjaukset ovat yleispäteviä kaikkiin lomakkeen (fudis-form) sisällä käytettäviin komponentteihin (paitsi niiltä osin kun ko. komponentissa ei ole osiossa mainittuja elementtejä)

### Asemointi ja koko

Pyritään yleisesti välttämään disabloitujen kenttien käyttöä, mutta niitä voi kuitenkin tarvittaessa käyttää

### Numeerinen arvo ja yksikkö

Labelin yhteyteen lisätään lyhenteenä yksikkö jos haluttu arvo on numeerinen esim. LAAJUUS (OP) tai HINTA (€). Poisluettuna päivämäärät ja vuodet.

Fudis-grid ja lomake-elementtien leveydet määrittävät komponenttien väliset etäisyydet. Form-komponenteille on määritelty enimmäisleveys (max-width) Fudis-gridin ansiosta form-komponentti voi olla leveydeltään myös pienempi Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations

Fudiksen lomakekomponenteille on määritelty neljä variaatiota, jotka määrittelevät niiden enimmäisleveyden. Size property-muuttuja → sm/md/lg/full-width Fieldsetillä on käytössä sama size property -muuttuja kuin muillakin lomakekomponenteilla. Maksimileveys periytyy alemmille elementeille fieldsetiltä jos se on käytössä.

### sm: 160 px

Soveltuu käyttötarpeisiin jossa lyhyttä sisältöä kuten päivämäärä (variaatio käytössä mm. date-range -komponentissa)

### md: 224 px

Soveltuu käyttötarpeisiin jossa odotetaan lyhyempää sisältöä, kuten käyttäjän puhelinnumero tai postinumero

### full-width: esim. 650px

Soveltuu käyttötarpeisiin jossa odotetaan suurempaa sisältömäärää. Variaatiota käytettäessä lomakekomponentin enimmäisleveys voidaan määrittää kehityksessä käyttötarpeen vaatimalla tavalla. Suositeltu lomakekomponentin enimmäisleveys on noin 650px.

### Hinta/summa valuutassa

Kun kyseessä on hinta, annetaan placeholder muodossa “0,00”.

### Suorituksen laajuus

Pyritään siihen, että koodi näytetään aina (esim. opintojakso, koulutus, tutkinto-ohjelma) Pyritään siihen, että koodi tulee aina ensin Koodi erotetaan muusta tiedosta pilkulla HUOM! Opintolaatikossa koodilla oma paikka Esimerkki: HIS1234, Antiikin historian perusteet

### Lomakekentän virheviesti (case: Puhelinnumero)

Käyttäjän poistuessa pakollisesta lomakekentästä täyttämättä sitä (validaatiovirhe)

Käyttäjän poistuessa lomakekentästä kun kentässä on teknisesti virheellistä tietoa (validaatiovirhe)

### Lomakkeiden välinen konflikti

Kahden eri lomakkeen väliset validaatiovirheet (konfliktit) esitetään lähtökohtaisesti työstettävän lomakkeen lomakekentän omassa virheviesti -kentässä.

### Case: Päivämäärä ei ole date-rangen sisällä

Lomakkeen teknisessä alustuksessa asetetaan kalenterin min-max -päivämäärät

Jos päivämäärä yritetään asettaa suoraan, näytetään virheviesti lomakekentän alla + error summary jos lomake yritetään lähettää (submit)

Error summary sijaitsee aina lomakkeen alussa ja siinä listataan kaikkien lomakekenttien validaatiovirheet Komponentti näytetään ja se päivitetään lomakkeen lähettämisen (submit) yhteydessä Error summaryn virheet voidaan asettaa poistuvaksi joko kyseisen virheen korjauksen yhteydessä (dynaamisesti) tai vasta seuraavan submitin yhteydessä. Komponenttia ei voi käyttää itsenäisesti, irrallaan fudis-form -komponentista Kohdistus siirretään komponenttiin lomakkeen lähettämisen (submit) jälkeen Listatuissa virheviesteissä on ankkurilinkit ko. lomakekenttään. Linkin breadcrumb-polkuun voi tarvittaessa lisätä sectionin tai fieldsetin otsikot (Esimerkkitoteutus Intossa). Automaatisesti linkkiin tulee lomakekentän label ja virheviesti (sama kuin lomakekentässä) Error-summary tulee, vaikka olisi vain yksi kenttä

### Case esimerkki: virheellinen opiskeluoikeus

Lomakekentästä ei haluta piilottaa valintoja käyttäjältä, vaan ensisijaisesti näyttää kaikki mahdolliset valinnat ja antaa virheilmoitus jos käyttäjä tekee valinnan jota ei voi suorittaa/ei läpäise validaatiota Lomakekentän ulkopuolisen validaation virhe näytetään lomakekentän virheviestinä ja virhe lisätään myös error summaryyn ts. virhe näytetään normaalin lomakekentän virheviestin tavoin

Käyttäjän lähettäessä (submit) lomaketta kun lomakkeella on virhe (tyhjä pakollinen tyhjä kenttä) näytetään lomakkeen alussa error summary

### Date-range

Lisää/poista sisältöä jossa useampi input (case: Into vastuuorganisaatiot)

### Valitse

Fieldset on alimman tason html -semanttinen ryhmä joka ryhmittää toisiinsa liittyvät lomakekentät. Fieldsetillä on aina sen sisältöä kuvaava legend (ei heading) Legend oletuskoot: sm ja md. Figma-komponentissa oletuskoko on sm. Fieldset elementtejä ei voi asettaa sisäkkäin (nested) Fieldsetillä voi tarpeen ja tilanteen mukaan olla info ikoni, ohjeteksti, painike ja/tai notifikaatio Fieldsettiä ei html -semanttisesti käytetä lukutilaisessa lomakkeessa, vaikka ulkoisesti rakenteet muokattavan lomakkeen ja read only- lomakkeen välillä voivat muistuttaa toisiaan. Max-width on 368px (23 remiä).

### Fieldset ja pakollisuuden merkintä

Fieldset ei voi semanttisesti olla pakollinen, joten ilmaistaan pakollisuutta input-kentän labelin yhteydessä. (Huom. Checkbox - / Radio button -groupien / fieldsettien pakollisuus merkitään myös labelin yhteydessä)

### fudis-form

Fudis Form is a layout component which enables semantically coherent and easy flow for building forms. It constructs from three main sections: header content, header actions and main content.

Lomakkeen otsikko on pakollinen Otsikkotyyli määräytyy oletuksena otsikkotason mukaan (H1, H2...) Otsikkotyyli on yliajettavissa

### Lomakkeen otsikko

Fudiksen input-komponenttien keskinäinen tasaus toimii siten että fudis-gridin sisällä, samalla rivillä olevat komponentit tasautuvat inputin tekstilaatikon mukaisesti linjaan (kts. ao. esimerkkikuva): Tasautuminen perustuu LabelHeightServiceen, joka on käytössä kaikissa Fudis-komponenteissa, joissa on käytössä fudiksen Label-komponentti tai Fieldset-komponetti. Käytännössä tämä tarkoittaa sitä, että kaikki Fudiksen lomakekomponentit ovat "tasauksen" piirissä. Tasaus toimii myös esim. haussa käytettävissä multiselecteissä, eli lomakekomponentin ei ole pakko olla lomakkeen sisällä, jotta tasaus toimii. Huom! Suunnitellessa muistettava tasata komponentit laatikon mukaisesti

## LINK

Käytetään, kun halutaan ohjata käyttäjä toiselle sivulle. Koko määräytyy parentin tekstikoon mukaan. Voidaan määritellä joko koko 'md' (14px) tai 'lg' (16px).

## HORIZONTAL RULE

Käytetään jakamaan osioita samassa näkymässä esim. Wizard näkymässä jakamassa sisältö toiminnoista

## POPOVER

Käytetään tarvittaessa: avautumaan input kentän info -ikonista, ja esittämään input kenttään liittyvien lisätietojen esittämiseen. selittämään ikonin merkitystä jos näkyvää selitettä ei ole muutoin mahdollista käyttää. Aktivoituu käyttäjä klikatessa tietyn elementin päällä Saa pois näkyviltä painamalla esc-näppäintä, klikkaamalla popoverin ulkopuolista aluetta, klikkamalla popoverin triggeröivää ikonia tai siirtymällä tabilla muualle, tai klikkaamalla muualle. Popoverin selitteen tulee olla lyhyt. Ruudunlukija lukee popoverin tilasta käyttäjälle siten että se on joko “expanded” tai “collapsed” -tilassa, eli ruudunlukuohjelmaa käyttävä ymmärtää näin myös onko popover näkyvillä vai ei. (Aiemmin ruudunlukija luki koko popoverin sisällön vaikka se ei ollut aktiivisena eli nyt käyttökokemukset näkevän ja ruudunlukuohjelmaa käyttävän käyttäjän osalta on jatkossa yhdenmukaisemmat) Kehittäjä (eli fudiksen käyttäjä) voi itse määrittää popoverin (mustan tekstilaatikon) sijaintitoiveen. Sijainti kuitenkin käyttäytyy siten, että popover pyrkii aina hakeutumaan näkymään siten että se mahtuu järkevästi sisältöön. Eli popoverin sijainti voi siis elää näytön leveyden mukaan. Defaultina sijainti on aina “bottom” jos käyttäjä ei määritä sitä.

### Dimension Value

Käytetään viestimään sivun rakenteesta Murupolussa listataan sivuston rakenteen mukaiset sivut ja välilehdet Murupolku on aina sivu vasemmassa ylälaidassa, heti navigaation alla Murupolku ei ole käytössä focus-mode:ssa (kts. focus-mode)

### Käyttötapaukset

Voidaan käyttää mm. korostamaan hakemuksen tilaa tai esittämään jotain muuta oleellista tietoa helpommin silmäiltävässä muodossa

### Info

Neutraali tieto joka on syytä erottaa muista helposti silmäiltävällä tavalla

### Figma -komponentti

Käytetään tarjoamaan erilaisia toimintoja jotka liittyvät ko. näkymään/toimintoon. Komponentti on niin sanottu pattern -komponentti, joka koostuu useammasta muusta fudis komponentista Koostuu komponenteista: fudis-button fudis-dropdown-menu _ fudis-dropdown-menu-item _ \* = komponentti on piilotettu hakemistosta, eli ei ole käytettävissä muussa yhteydessä

### UI-patterns

Figmaan on koottu kokoelma komponentteja joita hyödynnetään suunnitelmia tehtäessä. Niissä on tyypillisesti yhdistetty useampi fudis komponentti yhdeksi kokonaisuudeksi. Kyseisiä komponentteja ei kuitenkaan löydy sellaisenaan fudiksen storybookista

### Figma -komponentti

Käytetään viestimään viiveestä yksittäisen osion -tai koko sivun sisällön latauksessa. Kehitys määrittää latausindikaattorin käytön tapauskohtaisesti Komponenttiin kuuluu: Ikoni (sama svg. ikoni molemmissa variaatioissa) Label, joka on muokattavissa tarpeen mukaan. Oletuksena “Ladataan”

### Osion lataus - sm (small)

Kun järjestelmä lataa yksittäisen osion sisältöä Toiminta: Kun osion latausaika on ylittänyt 2 sekuntia: Näytetään fudis-loading-spinner Ei kohdisteta elementtiin Label: “Ladataan” Kun osion lataus on valmis: Jos kohdistus on latausindikaattorissa kun sisällön lataus on valmis, siirretään kohdistus sisällön ensimmäiseen elementtiin

Käynnistetään hitaasti valmistuva toiminto käyttöliittymästä - lg (large)

Käyttöliittymästä käynnistetään painiketta klikkaamalla toiminto, jonka valmistumisessa odotetaan kestävän vähintään yli 1 sekunti. selvitetään ja arvioidaan kehityksen kanssa käyttö tapauskohtaisesti Toiminta: Kun painiketta on klikattu: Näytetään fudis-loading-spinner Ei kohdisteta elementtiin Label ja status-role: esim. “Hyväksytään opintojaksoa”. Oletuksena “Ladataan” Kun painikkeen klikkauksesta on kulunut 5 sekuntia: Label ja status-role: esim. “Pahoittelut, opintojakson hyväksyminen kestää odotettua kauemmin.” Oletuksena “Pahoittelut, lataus kestää odotettua kauemmin.” Kun painikkeen klikkauksesta käynnistetty toiminto on valmis: Status-role: esim. “Opintojakso hyväksytty” Oletuksena “Lataus valmis” Näppäinkohdistus H1 elementtiin tai sivun alkuun Mikäli toiminnon käynnistämisessä odotetaan kestävän kymmeniä sekunteja, pyritään antamaan käyttäjälle jokin arvio latausajan kestosta. Esim. “Ladataan. Tässä voi kestää joitakin minuutteja” Soveltamisen kannalta huomioitavaa: Loading-spinnerin näyttämisen valmius on tehtävä jokaisen toiminnon yhteyteen manuaalisesti. Priorisoidaan loading-spinnerin käyttöä sellaisten toimintojen yhteydessä, joissa toiminnon valmistumisen odotetaan kestävän vähintään yli 1 sekunnin. Kun painiketta on klikattu, uusien pyyntöjen lähettäminen painiketta klikkaamalla on teknisesti estettävä kunnes toiminto on valmis.

### sm (small)

Käytetään viestimään viiveestä yksittäisen osion sisällön latauksessa. Tyyli ja koko: Ikoni: 24px\*24px #1076DB Label: 14px regular #484848 Max-width: 256px Margin top: 24px Keskitetty (horizontal)

### Toteutuksen valinta

Tällä sivulla voit valita miten suoritat kunkin opintojakson, valita mihin toteutuksiin osallistut sekä ilmoittautua valitsemillesi toteutuksille. Lisäksi näet ilmoittautumisten kokonaistilanteen.

### Efektit

Painikkeiden tyypit (Primary, secondary, tertiary) kertovat käyttäjälle painikkeiden oletetusta tärkeydestä. Käytettävät tyyppi on päätettävä tapauskohtaisesti, eikä tarkkaa linjausta ole.

Käytetään aktivoimaan toiminto (esim. avaa dialogi, tallenna lomake tms.)

Pyritään siihen, että nappeja ei piiloteta. Ensisijaisesti näytetään kaikki painikkeet ja annetaan virhe/info -alert/dialogi -ilmoitus jos käyttäjä klikkaa painiketta, miksi toimintoa ei voitu suorittaa.

### Small

Käytetään variaatiota valikoidusti matalan prioriteetin toiminnoissa tai kun painike on liitetty toiseen komponenttiin (kts. description list)

### Icon only

Voidaan käyttää kun normaalille painikkeelle ei ole näkymässä tilaa (esim. muokkaa toiminto taulukossa) tai mobiilissa kun tilaa on rajallisesti Pyritään käyttämään painikkeita, joissa on näkyvä label. Tällöin sekä näkevä että lukuohjelmiakäyttävä saa saman informaation.

Valikkopainikkeen koko määräytyy sitä ympäröivien painikkeiden koon mukaan, tai toimintojen prioriteetin mukaan näkymäkohtaisesti

### Medium (show icon)

Käytetään toimintojen yhteydessä lisäämään silmäiltävyyttä ja erottamaan muiden painikkeiden joukosta joitakin toimintoja joilla voi olla suuret seuraukset (Esim. poista)

### Small (show icon)

Käytetään toimintojen yhteydessä lisäämään silmäiltävyyttä ja erottamaan muiden painikkeiden joukosta joitakin toimintoja joilla voi olla suuret seuraukset (Esim. poista) Small variaatiota käytetään valikoidusti matalan prioriteetin toiminnoissa tai kun painike on liitetty toiseen komponenttiin (kts. description list)

### Small (show icon, hide label)

Käytetään tällä hetkellä vain valikkopainikkeena (kolmen pisteen valikko)

### Valikko (ns. kolmen pisteen valikko)

Painikkeesta avataan tyypillisesti pudotusvalikko jossa on listattu matalan prioriteetin toimintoja joita käyttäjä voi valita mutta joita useimmat käyttäjät eivät tarvitse. Käytetään usein muiden painikkeiden kanssa ns. sarjassa jossa on muita ensisijaisia ja toissijaisia toimintoja. On käytetty myös avaamaan muita toimintoja (esim. Toteutuksen arviointi -näkymässä avataan Lisätiedot -toiminto)

### Lisää uusi

Käytössä, kun näkymään tulee klikkauksella modaali tms, jonka kautta lisätään elementti listaan syötettäviä tietoja. (Esim. lisää vastuuhenkilö)

### Muokkaa

Käytössä yleensä lomakkeiden yhteydessä joissa halutaan avata niiden muokkausmahdollisuus. Medium (primary) -painiketta on käytetty koko sivun lomakkeiden muokkauspainikkeena. Small with icon (tertiary) -painiketta käytetään kun sivulla on paljon toistoa tai yksittäisen tietokenttien muokkaukseen (katso: description list -komponentti) Icon only -painiketta käytetään vastaavissa tilanteissa kuin small with icon (tertiary) -painiketta, kun tilaa on rajallisesti ja/tai mobiilissa

### Hover

Ei hover -tilan efektiä Hoveroitaessa interaktiivisen elementin päällä (case: button) kursori vaihtuu => pointer

### Disabled

Disabloitu painike viestii ettei toimintoa voida suorittaa, eikä painikkeeseen ei voi kohdistaa. HUOM! Painikkeen disablointia tulee välttää saavutettavuussyistä. Mikäli painike kuitenkin disabloidaan, tulee syy kertoa käyttäjälle selkeästi.

### Tertiary

Käytetään toimintoon joka on mahdollinen, mutta jota useimpien käyttäjien ei odoteta tai toivota suorittavan. Voidaan käyttää myös vähentämään näkymän hälyä jos toistuvia, toissijaisia toimintoja on paljon.

### Secondary

Käytetään toissijaiseen toimintoon jonka käyttäjä voi suorittaa mutta joka ei ole odotettua tai toivottua ensisijaisen toiminnon suorittamisen kannalta

### Primary

Käytetään ensisijaiseen toimintoon jonka käyttäjän uskotaan tai toivotaan suorittavan

## PAGINATION

10 tai enemmän sivuja

### Into

Käytetään sivuilla ja elementeissä joissa sisältö jakautuu useammalle sivulle Käytetään vain sisällössä jonka rakenne ei muutu sivujen välillä (listat ja taulukot) Käyttötapauksia mm. Hallinnon asiointi -näkymä ja Opiskelijan haku -näkymä

### Painikkeiden värit yhtenäistetään tuotekohtaisesti

Sijoitetaan komponentti sivutettavan sisällön alle keskitetysti Käytetään 40px välistystä sivutettavaan sisältöön (taulukko/lista)

Näppäinkohdistus pyritään siirtämään selattavia sivuja kuvaavaan otsikkoon käyttäjän navigoidessa sivujen välillä. Käyttävän pään on määritettävä kohditus tapauskohtaisesti. Oletuksena näppäinkohdistus säilyy paginaatio-komponentissa.

### Käyttö yleisesti

Käytetään Funidatan kaikkien tuotteiden sivun alalaidassa, kaikissa näkymissä. Fudis määrittelee footerin taustan sekä logon paikan. Oranssilla katkoviivalla merkitty alue on se, jonka sisällöstä kukin sovellus vastaa itse.Huomiona, että suuremmalla näytöllä logon oikealle puolelle jää tilaa (margin-right) ja pienemmällä näytöllä vastaava tila jää logon alle (margin-bottom).

### Asemointi ja koot

Footerilla on kaksi breakpointia, joissa sisällön rakenne muuttuu. Funidatan logo ja linkkien tekstikoko pysyvät samana näytön koosta riippumatta.

### Brändi

Linkkien värit yhtenäistetään tuotekohtaisesti käyttämällä tuotekohtaista väriä linkissä.
