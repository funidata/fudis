# Fudis Design Guidelines

Extracted from Figma file: FD-design-guidelines

Language: Finnish (fi)

Rebuilt component-by-component from visual-order copy-paste of each component's Figma frame (see `guidelines-figma-raw-dump.md` for the original, layer-order extraction this replaces).

---

## Button (fudis-button)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=19%3A28

### Käyttö yleisesti

Käytetään aktivoimaan toiminto (esim. avaa dialogi, tallenna lomake tms.)

#### Painikkeen piilottaminen

Pyritään siihen, että nappeja ei piiloteta. Ensisijaisesti näytetään kaikki painikkeet ja annetaan virhe/info -alert/dialogi -ilmoitus jos käyttäjä klikkaa painiketta, miksi toimintoa ei voitu suorittaa.

### Variaatiot

#### Tyypit

Painikkeiden tyypit (Primary, secondary, tertiary) kertovat käyttäjälle painikkeiden oletetusta tärkeydestä. Käytettävät tyyppi on päätettävä tapauskohtaisesti, eikä tarkkaa linjausta ole.

- **Primary**: Käytetään ensisijaiseen toimintoon jonka käyttäjän uskotaan tai toivotaan suorittavan
- **Secondary**: Käytetään toissijaiseen toimintoon jonka käyttäjä voi suorittaa mutta joka ei ole odotettua tai toivottua ensisijaisen toiminnon suorittamisen kannalta
- **Tertiary**: Käytetään toimintoon joka on mahdollinen, mutta jota useimpien käyttäjien ei odoteta tai toivota suorittavan. Voidaan käyttää myös vähentämään näkymän hälyä jos toistuvia, toissijaisia toimintoja on paljon.

#### Disabloitu

- **Disabled**: Disabloitu painike viestii ettei toimintoa voida suorittaa, eikä painikkeeseen ei voi kohdistaa. HUOM! Painikkeen disablointia tulee välttää saavutettavuussyistä. Mikäli painike kuitenkin disabloidaan, tulee syy kertoa käyttäjälle selkeästi.

#### Koko

Valikkopainikkeen koko määräytyy sitä ympäröivien painikkeiden koon mukaan, tai toimintojen prioriteetin mukaan näkymäkohtaisesti.

- **Medium**: Ensisijaisesti käytetty koko
- **Small**: Käytetään variaatiota valikoidusti matalan prioriteetin toiminnoissa tai kun painike on liitetty toiseen komponenttiin (kts. description list)
- **Icon only**: Voidaan käyttää kun normaalille painikkeelle ei ole näkymässä tilaa (esim. muokkaa toiminto taulukossa) tai mobiilissa kun tilaa on rajallisesti. Pyritään käyttämään painikkeita, joissa on näkyvä label. Tällöin sekä näkevä että lukuohjelmiakäyttävä saa saman informaation.

#### Ikoni (show/hide)

- **Medium (show icon)**: Käytetään toimintojen yhteydessä lisäämään silmäiltävyyttä ja erottamaan muiden painikkeiden joukosta joitakin toimintoja joilla voi olla suuret seuraukset (Esim. poista)
- **Small (show icon)**: Käytetään toimintojen yhteydessä lisäämään silmäiltävyyttä ja erottamaan muiden painikkeiden joukosta joitakin toimintoja joilla voi olla suuret seuraukset (Esim. poista). Small variaatiota käytetään valikoidusti matalan prioriteetin toiminnoissa tai kun painike on liitetty toiseen komponenttiin (kts. description list)

#### Label (show/hide)

- **Medium (show icon, hide label)**: Käytetään tällä hetkellä vain valikkopainikkeena (kolmen pisteen valikko)
- **Small (show icon, hide label)**: Käytetään tällä hetkellä vain valikkopainikkeena (kolmen pisteen valikko)

### Efektit

- **Hover**: Ei hover -tilan efektiä. Hoveroitaessa interaktiivisen elementin päällä (case: button) kursori vaihtuu => pointer
- **Active**: Ei active -tilan efektiä
- **Focus**: Ei active -tilan efektiä

### Käyttötapaukset

- **Lisää uusi**: Käytössä, kun näkymään tulee klikkauksella modaali tms, jonka kautta lisätään elementti listaan syötettäviä tietoja. (Esim. lisää vastuuhenkilö)
- **Muokkaa**: Käytössä yleensä lomakkeiden yhteydessä joissa halutaan avata niiden muokkausmahdollisuus. Medium (primary) -painiketta on käytetty koko sivun lomakkeiden muokkauspainikkeena. Small with icon (tertiary) -painiketta käytetään kun sivulla on paljon toistoa tai yksittäisen tietokenttien muokkaukseen (katso: description list -komponentti). Icon only -painiketta käytetään vastaavissa tilanteissa kuin small with icon (tertiary) -painiketta, kun tilaa on rajallisesti ja/tai mobiilissa.
- **Valikko (ns. kolmen pisteen valikko)**: Painikkeesta avataan tyypillisesti pudotusvalikko jossa on listattu matalan prioriteetin toimintoja joita käyttäjä voi valita mutta joita useimmat käyttäjät eivät tarvitse. Käytetään usein muiden painikkeiden kanssa ns. sarjassa jossa on muita ensisijaisia ja toissijaisia toimintoja. On käytetty myös avaamaan muita toimintoja (esim. Toteutuksen arviointi -näkymässä avataan Lisätiedot -toiminto)

### Muut painikkeet

- **Linkin näköinen painike** (Käytettävissä Sisussa, mutta ei sisälly Fudikseen): Pyritään käyttämään normaalia painiketta, mutta tarpeen tullen voidaan käyttää linkin näköistä painiketta esim. avaamaan modaali/dialogi. Erityisesti toimintoihin jotka eivät vaihda käyttäjän näkymää, pyritään suosimaan normaalia painiketta. Link-button komponenttia ei ole lisätty fudikseen, mutta se on silti käytettävissä Sisussa vanhastaan.
- **Milloin linkki? Milloin button?**: Lähtökohtaisesti painike on painikkeen näköinen ja ohjelmallisesti button, ja linkki on linkin näköinen ja ohjelmallisesti link, mutta jos on selkeä tarve niin tästä linjauksesti voidaan poiketa. Huomioitava tämä käyttäjille kerrotussa ohjetekstissä. Ei viitata painikkeen ohjelmallisuuteen (button vs. link) vaan sen sisältöön:
  - KÄYTÄ OHJETEKSTISSÄ: esim. "Paina Tallenna"
  - ÄLÄ KÄYTÄ OHJETEKSTISSÄ: esim. "Paina linkkiä"

### Asettelu

- Jos painikkeen yhteydessä on otsikko, ne lisätään samalle riville (esim. case: muokkaa-toiminto)
- Painikkeet sijoitetaan ensisijaisesti sitä ympäröivän elementin (container) oikeaan laitaan

---

## Notification (fudis-notification)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3235-3759

### Käyttö yleisesti

- Fudis-notification on staattisempia kuin fudis-alert
- Notifikaatiot kertovat tietoa, joka on tiedossa ilman käyttäjän aktiivista toimintaakin, eli ovat usein näkyvissä jo käyttäjän saapuessa näkymään
- Notifikaatio voi myös ilmestyä toiminnan seurauksena mm. tapauksissa, joissa käyttäjä tekee valinnan, joka vaikuttaa formin tietojen antamiseen.

### Variaatiot

Notifikaatioita on 4 eri väriä/käyttötarkoitusta varten:

- **Sininen / Info**: Antaa neutraalia tietoa
- **Vihreä / Success**: Antaa positiivisen palautteen, esim. admin -> uusien opiskelijoiden vahvistus -> kun odottamassa ei ole yhtään opiskelijaa, vaan kaikki on käsitelty tai student: kun kaikki opinnot on tehty ja opiskelija voi hakea tutkinnon koostamista.
- **Keltainen / Warning**: Varoittaminen esim. olennaisen tiedon puuttumisesta tai asiasta, joka voi myöhemmin kostautua / josta käyttäjän olisi hyvä olla tietoinen. Ei kuitenkaan estä käyttäjää etenemästä.
- **Punainen / Error**: Virheestä tai virhetilanteesta informoiminen. Tilanteet, joissa eteneminen estyy (joko heti tai pidemmällä aikavälillä: esim. opiskelijan virhetilassa oleva suunnitelma saattaa vaikuttaa opintojen etenemiseen ja mm. estää myöhemmin valmistumisen)

### Käyttötapaukset

Listataan yleisiä käyttötapauksia ja notifikaation mahdollistamia sisältöjä.

Teksti voidaan tarvittaessa jäsentää halutulla tavalla ja linkkejä/painikkeita voidaan lisätä notifikaation sisälle. Notifikaation sisällölle ei ole teknisiä rajoitteita.

#### Linkki

Notifikaatioon voi lisätä linkin. Jos notifikaatiossa on useampi asia ja linkki, ne voidaan jäsentää rivinvaihdolla niin, että kukin asia kuvataan omalla tekstillään ja sen alla on oma linkkinsä.

#### Painike (link-button)

Notifikaatiossa on mahdollistettu linkin näköinen painike. Muutoin fudis ei tue ko. painike -tyyliä.

### Asemointi

- Notifikaatiot sijoittuvat sivulla sisällön sekaan ja lähelle tietoa/osiota, johon ne viittaavat.
- Notifikaatiot voivat koskea jotain tiettyä sisältöä, jolloin ne sijoitellaan sen yhteyteen.
- Huomioi lukujärjestys jotta kokonaisuus on käyttäjälle selkeä.
- Notifikaatio voi myös viitata näkymään tai muuhun olennaiseen tietoon yleisemmin.
- Notifikaation leveys ja korkeus määritetään tilannekohtaisesti.
- Leveys notifikaation yhteydessä olevan sisällön tai elementin rajojen mukaan.
- Notifikaatioita voidaan käyttää sekä ns. varsinaisissa näkymissä, että dialogeissa.

---

## Alert (fudis-alert)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1284-9399

### Käyttö yleisesti

- Alerteilla voidaan mm. kertoa toiminnon onnistumisesta/epäonnistumisesta tai antaa ohjeita käyttäjältä edellyteistä jatkotoimista.
- HUOM! Fudis-alert on tällä hetkellä käytössä vain Intossa!
- Alert ei ole näkymäsidonnainen, vaan se jää käyttäjän selainsivun ylälaitaan näkyviin, vaikka käyttäjä siirtyisi järjestelmässä näkymästä toiseen.
- Alerttiin ei voi laittaa linkkiä (Ei saavutettava).
- Käyttäjän täytyy sulkea alert, jotta se häviää näkyvistä.
- Kun alert suljetaan/siitä poistutaan, siirretään kohdistus siihen elementtiin missä käyttäjä oli ennen kuin kohdistus siirtyi alerttiin.

### Variaatiot

Alertteja on 4 eri tyyppiä, eri käyttötapauksia varten:

- **Sininen / Info**: Antaa vinkkejä, ohjeita ja infoa
- **Vihreä / Success**: Kertoo toiminnon onnistumisesta
- **Keltainen / Warning**: Varoittaminen esim. olennaisen tiedon puuttumisesta tai asiasta, joka voi myöhemmin kostautua / josta käyttäjän olisi hyvä olla tietoinen. Ei kuitenkaan estä käyttäjää etenemästä. Käytetään myös pdf-tiedostojen muodostuksessa latauksen aikana kertomassa toiminnon olevan kesken.
- **Punainen / Error**: Virheestä tai virhetilanteesta informoiminen jossa käyttäjän toiminta on estynyt. Tilanteet, joissa eteneminen estyy, esim. käyttäjän käyttöoikeudet eivät riitä tai kaikkia formissa ei ole annettu kaikkia pakollisia tietoja.

### Käyttötapaukset

Listataan yleisiä käyttötapauksia ja niissä käytettyjä alertteja teksteineen.

#### Tallennus onnistui (quick alert)

Tallennus onnistui.

Aria live: "Info, Tallennus onnistui." Ilmoitus poistuu automaattisesti hetken kuluttua.

### Asemointi

- Alert aukeaa kiinnittyneenä sivun ylälaitaan
- Alert asettuu kaiken muun sisällön päälle
- Alert ei poistu näkyvistä vaikka käyttäjä vaihtaisi näkymää
- Alert ulottuu aina koko näytön leveydelle
- Alertit lisätään kronologisessa järjestyksessä (uusin alimmaiseksi)

#### Useampi alert

Jos alertteja aukeaa yhtä aikaa useampi kuin yksi, asettuvat ne alekkain niin, että viimeisimmäksi auennut aukeaa alimmaksi.

---

## Dialog (fudis-dialog)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1622-18476

Dialogeja on kahta päätyyppi: Choises ja Info.

### Käyttö yleisesti

Käytetään pääsasiassa lomakkeissa ja toimintojen vahvistuksiin.

#### Rakenne

- H2-otsikko dialogin alussa ensimmäisenä otsikkona. (Fudis ei määritä dialogin otsikkotasoa)
- Päätoiminnot dialogin oikeassa alakulmassa
- Sulje-painike dialogin oikeassa yläkulmassa
- Dialogia ei voi sulkea klikkaamalla sen ulkopuolelta
- Dialogin toimintoihin oikeassa alakulmassa (fudis-dialog-actions) ei lähtökohtaisesti voi lisätä enempää toimintoja kuin variaatiossa on oletuksena
- Huom! On suositeltavaa käyttää vain yhtä dialogia kerrallaan. Päällekkäisten dialogien käyttöä ei suositella, mutta se on kuitenkin mahdollista ja joskus ns. "vähiten huonoin" ratkaisu. Alle jääviin dialogeihin on mahdollista tallentaa käyttäjän syöttämää tietoa.

### Variaatiot

#### Choises

Käytetään pääsasiassa lomakkeissa ja toimintojen vahvistuksiin.

Dialogissa on oletuksena kaksi (2) painiketta oikeassa alakulmassa:

- Peruuta toiminto ja sulje dialogi: "Eiku"-painike
- Vahvista toiminto, esim. Vahvista/Tallenna/lähetä (teksti määritetään tapauskohtaisesti)

#### Info

Käytetään mm. lisätietojen ja joidenkin virheilmoitusten esittämiseen.

- Voi sisältää pelkästään tarkasteltavaa (read only) tietoa
- Dialogissa on oletuksena yksi painike oikeassa alakulmassa: Vahvista toiminto joka sulkee dialogin, esim. Kyllä/Ok/Ymmärsin/Jatka (teksti määritetään tapauskohtaisesti)
- Sulje-painike dialogin oikeassa yläkulmassa
- Dialogia ei voi sulkea klikkaamalla sen ulkopuolelta
- Kun dialogin max-height on saavutettu, dialogin ylimenevä sisältö jää piiloon. Sisältö on scrollattavissa.

### Kokovariaatiot

Fudis dialogista löytyy kokovariaatiot: xs, sm, md, lg, xl.

Kokovariaatio määrittelee dialogin maksimileveyden. Näyttökoon pienentyessä dialogi skaalautuu näyttökoon mukaan. Dialogin otsikoiden tai tekstien koot eivät kuitenkaan muutu näyttökoon pienentyessä.

#### xs: 480 px

Käytettäväksi esim. vahvistusdialogeissa tai info-dialogeissa, missä tekstiä ei ole odoteta olevan kovin paljon. Sisältö kannattaa sijoittaa yhteen sarakkeeseen.

#### sm: 704 px

Käytettäväksi esimerkiksi:

- Pienet lomakkeet: esim. yhden rajatun kohteen muokkaustoiminnot
- Vahvistusdialogeissa, missä tilaa sisällölle tarvitaan enemmän
- Info-dialogeissa, missä tekstiä odotetaan olevan maltillisesti.

Sisältö kannattaa sijoittaa yhteen sarakkeeseen.

#### md: 880 px

Käytettäväksi suuremmissa lomakkeissa: esim. monen tieto/valintakentän täyttäminen tai muokkaustoiminnot. Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

#### lg: 1120 px

Käytettäväksi esimerkiksi:

- Erittäin suuret lomakkeet/muokkaustoiminnot
- Kun tietoa pitää näyttää paljon, esim. taulukot

Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

#### xl: 1440 px

Käytettäväksi esim. kun tietoa pitää näyttää erittäin paljon: suuria taulukoita tai tekstirikkaita description listejä. Esim. opintojaksoesite. Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

### Responsiivisuus

#### Horisontaalinen

Ruutukoon pienetessä ja mentäessä pienimpään breakpointiin, muuttuu dialogi mobiili-optimoiduksi. Otsikon koko ja marginit pienenevät, jotta sisältö mahtuisi mahdollisimman hyvin pieneen kokoon.

Mobiili-optimoidussa dialogissa sisältö latoutuu lähtökohtaisesti päällekkäin.

Suunnittelun apuna on Figmassa erillinen mobiili-kokovariantti dialogista. Huom. tämä ei ole virallinen dialogin kokovariantti.

#### Vertikaalinen

- Dialogin enimmäiskorkeus määrittyy käyttäjän ruutukoon mukaan, max-height: 65vh
- Jos dialogissa kerralla näytettävän sisällön enimmäismäärä ylittyy, sisällöstä tulee vertikaalisesti vieritettävä (vertical scrolling)
- Dialogin header ja toiminnot (painikkeet dialogin ala-laidassa) ovat aina näkyvissä

### Asemointi

- Dialogin toimintoihin (fudis-dialog-actions) ei lähtökohtaisesti voi lisätä uusia painikkeita (vain submit ja cancel)
- Dialogi sijoitetaan 100px sivun ylälaidasta ja keskitetään horisontaalisesti
- Dialogi aukeaa aina whitelayerin päälle (kts. fudis-dimmer)
- Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations.

### Tietojen muokkaus

- Muokkausta aloittaessa pyritään käyttämään muokkauksen avaavasta painikkeesta tekstiversiota eli "muokkaa"-sanaa. Kynä-ikonia voidaan käyttää vaihtoehtoisesti, jos teksti ei mahdu (huom. ikonin minimikoko 32px\*32px ja sen yhteydessä tulee esittää alt-teksti).
- Jos on yksittäinen muokattava kenttä, avataan muokkaus dialogissa.
- Avataan muokattavia tietoja sisältävät kokonaisuudet suoraan dialogissa, jos mukana on yksikin tietoja sisältävä kenttä. (Voi olla sekaisin read-only ja muokattavia kenttiä, mutta vältetään että aukeaisi tietojen tarkasteluun modaali ja siitä vielä jokin uusi näkymä.)
- Näytetään vihreä success alert onnistuneista tallennuksista.

---

## Wizard

### Käyttö yleisesti

- Wizardeja käytetään tiedon vaiheistettua lisäämistä/muokkaamista/käsittelyä varten
- Wizardeja käytetään pidemmissä prosesseissa, joissa käsitellään paljon tietoa ja, jota monessa tapauksessa joudutaan tarkastamaan/validoimaan suhteessa toisiinsa (edeltävässä vaiheessa annetut tiedot vaikuttavat seuraavan vaiheen tietoihin)
- Pystytään vaiheistamaan tarkastuksia ja etenemistä, jolloin käyttökokemus ei ole niin kuormittava
- Pystytään välttämään valtavan pitkät formit
- Pystytään välttämään lomakkeen muutoksia sen täyttämisen aikana

### Asemointi ja sisältö

- Wizardeja käytetään focused modessa
- Murupolkua ei näytetä
- Toiminnot alaoikealla
- Pyritään siihen, että painikkeita ei koskaan disabloida > nappia painaessa validaatiovirheet
- Pyritään siihen, että ei tabeja eikä expandableja wizardien sisälle
- Mikäli wizardin stepin sisältö on pitkä, mieti voisiko tilanteen jäsentää useampaan eri steppiin

### Wizarding vaiheet

#### Ensimmäinen vaihe (start)

Toiminnot: Jatka

#### Keskivaiheet (middle)

Toiminnot: Edellinen, Jatka

#### Viimeinen vaihe (End)

- Wizarding viimeinen vaihe on esikatselu ja vahvistus, jossa esitetään tehtävät muutokset, sekä mihin muutokset vaikuttavat ja missä on virheitä
- Vaiheen oletusnimi on "Esikatsele ja vahvista"
- Vaihe ei sisällä toimintoja tai valintoja.
- Toiminnot: Edellinen, Vahvista (Vahvista -termiä voi muuttaa käyttökontekstin mukaan)

### Toiminnon vahvistus

Kun käyttäjä vahvistaa tiedot, näytetään alert toiminnon onnistumisesta/epäonnistumisesta.

### fudis-wizard-progress (aka. stepper)

### Toiminnon virheistä ilmoittaminen

#### Virheilmoitus-notifikaatio

- Wizardin toiminnon virheistä pyritään kertomaan viimeisessä "Esikatsele ja vahvista" -vaiheessa
- Sivulla näytetään contextual notifikaatio, jossa on tieto toiminnon suorittamisessa ilmenneistä virheistä ja linkiksi tyylitelty painike josta aukeavassa dialogissa on tarkempia tietoja toiminnon virheistä

#### Virheiden tiedot dialogissa

Virherivit näytetään info-dialogissa olevassa taulussa.

### Empty state

Näytetään empty-state -teksti kun wizardissa ei ole mitään valittavaa.

Jos käyttäjä yrittää jatkaa wizardissa eteenpäin siitä huolimatta, että ei voida tarjota mitään valittavaa, näytetään empty state -tekstin yläpuolella punainen contextual notifikaatio, jossa kerrotaan tilanteesta.

Esimerkki notifikaation tekstistä: "Valituilla opintojaksoilla ei ole kopioitavia tuotepaketteja. Palaa edelliseen näkymään ja tee uudet valinnat."

### Poistu tallentamatta muutoksia

Jos käyttäjä yrittää poistua, näytetään käyttäjälle vahvistusdialogi ja varoitetaan tallentamattomista muutoksista.

### Saavutettavuus

- Komponenttia käytetään vain wizardissa
- Vaiheen edessä on numerointi 1, 2, 3
- Aktiivinen vaihe on alleviivattu ja font-weight: 600
- Komponentilla on oletuksena aria-label: "Toiminnon vaiheet".
- Aria-label on muokattavissa käyttökontekstin mukaan esim. "Hakemuksen tekeminen – toiminnon vaiheet"
- Komponentin jokaisella vaiheella on aria-label: Vaihe 1/5 Wizard, Vaihe 2/5 Wizard
- Huomioi sivun title (kts. kohta Saavutettavuus, Sivun title)

---

## Tabs (fudis-tab-navigation)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=6017-1066

### Käyttö yleisesti

- Figmaan rakennettu kaksi eri variantia suunnittelua varten: primary ja secondary, ja lisäksi karuselli-variantit molemmille.
- Karuselli-variantia käytetään silloin kun tabeja on enemmän eivätkä ne mahdu koko leveydelle.
- Tabeissa lukumäärä näytetään tabin otsikon jälkeen suluissa.

### Otsikoinnista

- Huomioitava, että tabien alla tulee esittää otsikko. Tabissa esitetty otsikko ei riitä saavutettavuuden näkökulmasta.
- Tabin alla voi olla useampi saman heading-tason otsikko.
- Otsikon tulee olla sama tai tarkempi kuin tabin oma label.

### Etäisyyksistä

- Tabien välinen etäisyys: 8 px
- Tilaa ennen ensimmäistä tabia (tab-rivin vasemmassa reunassa): 16 px
- Etäisyys primary- ja secondary-tabrivien välillä: 16 px
- Primaryn korkeus on 40px (4 rem) kun luetaan mukaan viiva.
- Secondaryn korkeus on 32px.

### Esimerkkejä ja ohjeistuksia tabien jäsentymisestä

#### Jäsentyminen isompaan, esim. desktop-leveyteen

Sivuilla olevat chevron-painikkeet eivät tällöin näy.

#### Jäsentyminen pienempään, esim. mobiilileveyteen

Käytetään esim mobiilinäkymissä tai tilanteissa, kun kaikki tabit eivät mahdu samalle riville koko näkymän leveydelle.

Huom! Chevron-painikkeet tulevat näkyviin silloin, kun jommalla kummalla sivulla karusellia on näytettävää tavaraa. Jos jommalla kummalla puolella karusellia ei ole näytettävää, chevron-painike ei silloin näy.

### Typografia

Fudiksen tabeissa käytetään kaikilla tabline-tasoilla (primary&secondary) samaa suunniteltua m-koon tekstityyliä. Katso Foundations > Typography > Other UI text styles / Muut kälissä käytetyt tekstityylit.

---

## Table (fudis-table)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=6223-203

### Käyttö yleisesti

- Taulukkoa käytetään tiedon järjestämiseen ja esittämiseen.
- Taulukko on kokonaisuus joka koostuu useammasta komponentista (kts. yksittäiset komponentit).
- Harkitse toista esitystapaa (esim. fudis-dl) kun esitettävää tietoa on vain vähän, ja sarakkeita/rivejä on alle 3 kpl.
- Vältä yhdistämästä soluja (merge).

### Variaatiot

#### Mobile

- Taulukosta on olemassa mobile-variaatio, jossa fontti ja välistykset ovat pienemmät.
- Näytetään variaatio kun ruudun leveys on alle 767 px.

### Yksittäiset komponentit

Taulukko on kokonaisuus joka koostuu useasta komponentista.

#### fudis-table-caption

- Taulukolla tulee olla aina sen sisältöä kuvaava otsikko (caption).
- Näkyvän ja ruudunlukijalle tarkoitetun captionin tulisi olla sama.
- Font: Heading - s (small)

#### fudis-table-header

- Jokaisella taulukon sarakkeella on table-header (th) joka kuvaa sarakkeen soluissa olevaa sisältöä.
- Pyri pitämään header lyhyenä ja helposti ymmärrettävä.
- Komponentista on mobile-variaatio.
- Komponentti tukee sarakkeen sisällön järjestämistä (sorting).

##### Järjestäminen

- Fudis-table-header tukee sarakkeen sisällön järjestämistä. Käytä sarakkeen järjestämistä vain kun se on välttämätöntä, tai muuten hyödyllistä käyttäjälle.
- Kun sarake on järjestettävissä (sortable): Table-header labelin yhteydessä näytetään sorter-ikoni (väri: primary). Label ja ikoni toimivat painikkeena.
- Kun käyttäjä järjestää sarakkeen:
  - **Laskevasti**: sorter-ikoni osoittaa alaspäin, label alleviivataan, aria-sort: descending, aria-live: "Table header järjestetty laskevasti"
  - **Nousevasti**: sorter-ikoni osoittaa ylöspäin, label alleviivataan, aria-sort: ascending, aria-live: "Table header järjestetty nousevasti"

#### fudis-table-cell

Komponentista on mobile-variaatio, jonka välistykset ja fonttikoko on pienemmät.

- Default: solun sisäinen täyte (padding) on 16px vasemmalla ja 16px alareunassa (tekstin alla).
- Mobile: täyte on 8px sekä vasemmalla että alareunassa.

### Tiedon esittäminen

#### Taulukon solu (table cell)

Jos taulukon solussa ei ole esitettävää tietoa, näytetään empty state -teksti, esim.:

- "Tietoa ei saatavilla"
- "Ei lisätty ..."
- "Ei määritelty ..."

#### Koko taulukko

Mikäli koko taulukossa ei ole esitettävää tietoa, näytetään käyttäjälle tyhjän taulukon sijaan empty state -teksti, joka kuvaa käyttäjälle syyn miksi näytettävää tietoa ei ole.

#### Koodit

- Pyritään siihen, että koodi näytetään aina (esim. opintojakso, koulutus, tutkinto-ohjelma).
- Pyritään siihen, että koodi tulee aina ensin.
- Koodi erotetaan muusta tiedosta pilkulla.
- HUOM! Opintolaatikossa koodilla oma paikka.

Esimerkki: "HIS1234, Antiikin historian perusteet"

### Sisältöjen asemointi ja linjaus

Pyritään siihen, että sisältö linjataan samalla tavalla soluissa. Esim. kokonaisluvut voidaan linjata vasempaan reunaan, vaikka yleinen tapa laskentataulukoissa ja tilastoissa olisikin tasata ne oikeaan reunaan.

### Asemointi

- Taulukko tasataan lähtökohtaisesti sivun vasempaan ylälaitaan.
- Taulukon kokonaisleveys määräytyy lähtökohtaisesti sitä ympäröivän osion mukaan (width: 100%). Esimerkiksi luettavuuden helpottamiseksi taulukon leveyttä voidaan säätää, asettamalla se parent-elementin sisään.

### Responsiivisuus

- Ruutukoon pienentyessä: Taulukosta näytetään mobile-variaatio. Breakpoint: <767 px.
- Mahdollistetaan taulukon vaakavieritys (horizontal scrolling). Huom. Muun näkymän vaakavieritystä on vältettävä.
- Taulukkoa suunnitellessa, pyri pitämään taulukossa näytettävä tieto tiiviinä ja vältä pitkiä sarakkeen otsikoita (table-header). Harkitse taulukon sijaan myös muista tapoja tiedon esittämiseen.

---

## Section (fudis-section)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3278-1049

### Käyttö yleisesti

- Section on html-semanttinen ryhmä joka ryhmittää sisältöä.
- Section-elementtejä voi asettaa sisäkkäin (nested).
- Sectionilla on aina oltava kuvaava otsikko (heading). Otsikon tyyli voi vaihdella ja se määräytyy pitkälti sivuston muun otsikkorakenteen mukaan.
- Kuten muillekin otsikoille, myös sectionin otsikolle tulee määritellä otsikkotaso.
- Myös expandable on html-semanttisesti section.

### Tilat ja lisäosat

- Vähimmillään visuaalisesti section on vain otsikko (heading).
- Tarvittaessa headingin perään voidaan lisätä info(-ikoni).
- Tarvittaessa sectionin oikeaan yläkulmaan voidaan lisätä painikkeita.
- Mahdollinen sectionin ohjeteksti.
- Mahdollinen sectionin notifikaatio (ei virhevalidaatio).

### Käyttötapauksia

#### Lukutilainen näkymä

Esimerkki sectionista lukutilaisen (read-only) tiedon esittämiseen, muokkauspainikkeella varustettuna.

#### Section ja fieldset -lomakkeessa

Esimerkki siitä, miten section ja fieldset asettuvat osaksi lomaketta.

### Expandablen section -rakenne

Kun expandable on osa isompaa sectionia, sectionin otsikko on esim. H2-tasoa, ja haitarien (expandablejen) omat otsikot ovat seuraavaa tasoa, esim. H3.

---

## Expandable (fudis-expandable)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1582%3A18934

### Regular

#### Käyttö yleisesti

Harkitse käyttöä jos:

- Jos sivulla on paljon näytettävää tietoa.
- Tiedon voi pilkkoa tai jäsentää useampaan selkeään osaan tai kategoriaan. Nämä kategoriat voivat tarvittaessa olla toisistaan riippumattomia (esim. opiskeluoikeudet).
- Käyttäjän näkökulmasta voi hyötyä että pystyy piilottamaan osan sivulla esitettävistä tiedoista.

Vältä käyttöä jos:

- Jos tieto on käyttäjälle tärkeää tai välttämätöntä toiminnon kannalta. Tällöin voi olla parempi että tieto pysyy koko ajan näkyvillä.
- Jos sivun tiedot ovat niin vähäiset että ne ovat kerralla silmäiltävissä. Tällöin yksittäisen tiedon piilottaminen ei oikein ole perusteltua.
- Vältä tämän haitari-tyypin sisäkkäistä käyttöä. Käytä kevyempiä haitareita jos tarvitsee sisäkkäisiä haitareita.

- Expandable näytetään lähtökohtaisesti kiinni - tilanteesta riippuen haitarit voidaan näyttää myös oletuksena auki (esim. opintojen rakenne, viestit). Pyritään kirjaamaan suunnitelmille miten kyseisessä tilanteessa haitarit oletuksena toimivat.
- Expandable on section jolloin sillä on aina oltava kuvaava otsikko (heading). Huomioi tämä annotoidessa otsikkojärjestystä.

#### Mitat

- Default: vasemmalla 40px, ylhäällä ja alhaalla 24px, oikealla 24px.
- Default (mobiili, 320 px): kaikilla puolilla 24px.

#### Default (closed)

Esimerkki suljetusta haitarista, jossa näkyy vain otsikko.

#### Haitarin vaihtoehtoisia tiloja & liitännäisiä

- Haitarin oikeaan laitaan voi tarvittaessa lisätä valikon (button ja pudotusvalikko).
- Haitarin otsikon perään voi tarvittaessa lisätä badge.
- Vaihtoehtoinen tekstirivi otsikon alle: `[additionalTitle]`.

### Lite

#### Käyttö yleisesti

- Alimman tietotason haitari.
- Kevyin haitari-variantti.
- Käytä esim. tilanteissa missä on jotain ei niin tärkeää sivu- tai ohjetietoa jota käyttäjä voi halutessaan lukea.

Vältä haitarin käyttöä:

- Jos tieto on käyttäjälle tärkeää tai välttämätöntä toiminnon kannalta. Tällöin voi olla parempi että tieto pysyy koko ajan näkyvillä.
- Jos sivun tiedot ovat niin vähäiset että ne ovat kerralla silmäiltävissä. Tällöin yksittäisen tiedon piilottaminen ei oikein ole perusteltua.

- Haitarit näytetään lähtökohtaisesti kiinni - tilanteesta riippuen haitarit voidaan näyttää myös oletuksena auki (esim. opintojen rakenne, viestit). Pyritään kirjaamaan suunnitelmille miten kyseisessä tilanteessa haitarit oletuksena toimivat.
- Haitari on lähtökohtaisesti otsikkotaso. Huomioi tämä annotoidessa otsikkojärjestystä.

#### Mitat

- Default: kaikilla puolilla 24px.
- Sivu-marginaalit on tapauskohtaisesti mahdollista poistaa.

#### Default (closed)

Esimerkki suljetusta haitarista, jossa näkyy vain otsikko.

---

## Description List (fudis-dl)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=754-550

### Regular

#### Käyttö yleisesti

Description list (regular) -komponenttia käytetään ns. lomakkeiden lukutilassa, ja kun halutaan esittää tietoa tilavammassa muodossa.

#### Käyttötapauksia ja liitännäisiä

Description list -komponenttiin on mahdollista lisätä painike. Termiin voidaan tarvittaessa yhdistää myös info-ikoni, käännökset (kielipallurat) ja väliotsikko.

##### Väliotsikko

Labelin alle voidaan lisätä tarvittaessa väliotsikko.

##### Muokkaus (edit-painike)

Muokkaa-painikkeen aria-label esim.: "Muokkaa [kentän label] tietoja".

#### Tiedon esittäminen

##### Lista

Arvo voi olla yksi paragrafi mutta myös esim. lista arvoja.

##### Ei annettua arvoa (sisältö puuttuu)

Mikäli tekstikentässä ei ole mitään arvoa, näytetään empty state -teksti, esim. "Ei arvoa".

##### Koodit

- Pyritään siihen, että koodi näytetään aina (esim. opintojakso, koulutus, tutkinto-ohjelma).
- Pyritään siihen, että koodi tulee aina ensin.
- Koodi erotetaan muusta tiedosta pilkulla.
- HUOM! Opintolaatikossa koodilla oma paikka.

Esimerkki: "HIS1234, Antiikin historian perusteet"

##### Opintopisteet

Pyritään siihen, että opintopisteet tulevat aina lopussa.

##### Numeeriset arvot

- **Yksikkö**: Kun esitetään numeerisia arvoja, näytetään yksikkö aina arvon perässä (ei labelissä kuten lomakekentissä). Esimerkki: "5 op"
- **Vaihteluvälillinen arvo**: Mikäli käytetään tekstikentässä arvoa tulee käyttää jotain seuraavista esitystavoista: "väh. 5 op", "5–10 op", "maks. 10 op"

#### Asemointi

Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations.

##### Sisällytty description list (nested)

Description list -komponentit voi tarvittaessa sisällyttää toistensa sisälle. Tämä mahdollistaa description list -ryhmän "otsikoinnin" ilman heading-komponenttia.

Description list -compact-elementtien väliin ei lisätä erillistä marginaalia kun niitä on sisällytetty toistensa sisälle (0px) — välistys toteutuu komponenttien sisällä.

#### Responsiivisuus

Description listin tekstit pysyvät aina saman kokoisina eli näyttökoon pienentyessä description listin tekstit eivät pienene.

#### Käännökset (kielipallurat)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1694%3A18982

Description list -komponenttien sisällön käännösten valitseminen ja tilat.

##### Variaatiot

- **Active**: Aina kun käännös on valittu, myös silloin kun sisältö puuttuu.
- **Inactive**: sisältö ei puutu.
- **Missing + inactive**: sisältö puuttuu.
- **Focus**

##### Käyttötapaukset

Aktiivinen kielipallura on aika samanlainen, vaikka sisältöä ko. kielellä ei olisikaan.

##### Saavutettavuus

- Kielipallura-ryhmän aria-label esim.: "Käännöskielet".
- Muokkaa-painikkeen aria-label esim.: "Muokkaa [kentän label] tietoja".

##### Käännökset (label+tooltip)

Kielipalluran aria-label muodostuu mallilla: "Vaihda käännöskieleksi [Kieli]", täydennettynä tarvittaessa "(Käännös puuttuu)" jos käännöstä ei ole kyseisellä kielellä, ja "(Valittuna)" jos kieli on parhaillaan valittuna.

### Compact

#### Käyttö yleisesti

Description list (compact) -komponenttia käytetään kun halutaan esittää tietoa tiiviimmässä muodossa, esimerkiksi hakemuksen meta-tietojen esittämiseen.

#### Käyttötapauksia ja liitännäisiä

##### Muokkaus

Description list -komponenttiin on mahdollista lisätä painike (esim. muokkaa).

##### Valikko

Valikkopainikkeen aria-label esim.: "Lisävalinnat".

#### Asemointi

##### Sisäkkäinen description list (nested)

Description list -komponentit voi tarvittaessa sisällyttää toistensa sisälle. Tämä mahdollistaa ikäänkuin description list -ryhmän otsikoinnin ilman heading-komponentteja. Huomioi, että sisäkkäistä description listaa tulee käyttää harkiten. Huomioi aina, että description list sisältää termi + arvo -pareja. Sisäkkäisestä description lististä osoitetietojen täyttäminen on hyvä esimerkki.

HUOM! Description list -compact -variantille ei saa asettaa erillisiä ikoneita (esim. infopallura) toisin kuin tavalliselle description listille. Ikonin asemointi description listin compactin osalta labelin kanssa aiheuttaa haasteita. Mikäli on tarve käyttää description listin labelille ikonia (esim. infopallo), käytä silloin tavallista description list -varianttia.

#### Saavutettavuus

---

## Text Input (fudis-text-input)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=442%3A135

### Käyttö yleisesti

- Käytetään lomakkeella kun sisällöksi odotetaan korkeintaan lyhyttä lausetta/lauseita.
- Jos odotettu sisältö ei mahdu kokonaan kentän sisään, voi olla syytä käyttää text-area-komponenttia.

---

## Text Area (fudis-text-area)

Storybook: https://fudis.funidata.fi/v/2.0.1/index.html?path=/docs/components-form-text-area--documentation

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=442%3A135

### Käyttö yleisesti

Käytetään lomakkeella kun sisällöksi odotetaan täysiä lauseita tai pidempää tekstiä, käytetään text-area-komponenttia.

### Koko ja sisältö

- Text arealle voi olla määriteltynä max-merkkimäärä (esim. "0/500"). Oletuksena sinne voi lisätä loputtomasti tekstiä.
- Ikonista käyttäjä voi vaikuttaa kentän korkeuteen ja nähdä enemmän sisältöä kerralla. Leveyteen ei fudis-gridin puitteissa voi vaikuttaa.

---

## Localized Text Group (fudis-localized-text-group)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=442-135

### Käyttö yleisesti

- Käytetään lomakkeella kun tekstisisältö voidaan syöttää useammalla kielellä (fi, sv, en).
- Tekstikentän tyyppi (Input type) voi olla tarpeen mukaan fudis-text-input tai fudis-text-area.
- Kieli valitaan puolella olevasta pudotusvalikosta.
- Jos lomakekenttä on pakollinen, sisältö on tyypillisesti pakollinen vain yhdellä kielellä.

### Huomioitavaa

Localized text group -komponentti on rakennettu siten, että siinä olevat molemmat input-kentät ovat semanttisesti saman groupin sisällä. Tällä groupilla on ruudunlukijoille luettava oma erillinen group label, jolla kuvataan että kentät ovat samaa ryhmää. Tämä ruudunlukijoille luettava otsikko ei ole näkyvissä näkevälle käyttäjälle. Näkevälle käyttäjälle kentät ovat visuaalisesti niin sidoksissa toisiinsa, että otsikolle ei nähty olevan tarvetta. Näin ollen kuitenkin on hyvä huomioida että ohjetekstien on oltava erityisen selkeät.

Localized text group -komponentin valintaosiota voidaan hyödyntää myös muuhun tarkoitukseen kuin kielen valitsemiseen.

### Puuttuva käännös (text-input)

Puuttuvan käännöksen perään lisätään "(puuttuu)"-label kielivalinnassa. Esimerkki: "sv (puuttuu)".

### Kielivalinnan variaatiot (fudis-language-options)

Kielivalinnan oma label ("Kieli") käännetään käyttöliittymän kielen mukaan: "Kieli" (fi) / "Language" (en) / "språk" (sv).

---

## Checkbox (fudis-checkbox)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1276-13572

### Käyttö yleisesti

- Käytetään silloin kun on tarve vain yhdelle valinnalle.
- Huom! Checkbox on oma checkbox-groupista erillinen itsenäinen komponenttinsa. Se ei siis ole checkbox groupin osa tai variant.
- Komponentilla ei ole erillistä näkyvää legendiä/otsikkoa.
- Pakollisuutta esitetään option-tekstin perässä seuraavalla syntaksilla: (pakollinen). Tämä on huomioitava case-by-case suunnittelussa ja viestittävä kehittävälle päälle. Tyyli on sama kuin muillakin inputien pakollisuusmerkinnöillä.
- Checkboxin klikkausalue on checkbox input -alue (valintaruutu) + teksti. Mahdollisella linkillä on oma klikkausalueensa.
- Option-teksti ei ole pakollinen (esimerkiksi taulukoissa voi esiintyä pelkkä valintaruutu). Jos option-tekstiä ei ole, on tarjottava ruudunlukijakäyttäjälle aria-labelled by -tieto (huomioitava suunnittelussa että mikä teksti!).
- Loppukäyttäjän on mahdollista aina poistaa valinta.
- Huom! Toisin kuin groupilla, itsenäisen checkboxin sisään on mahdollista laittaa linkki. Linkki voi esiintyä missä kohtaa vain optionin tekstissä.
- Virhesanomien osalta vastuu käyttävällä päällä. Tämä on mahdollisuuksien mukaan huomioitava case-by-case suunnittelussa ja viestittävä kehittävälle päälle.

### Checkbox tilat

Tyylillisesti samat kuin groupin osalla (yksittäinen checkbox). Kts. guidelines Fudis-checkbox-group → Tilat.

### Käyttötapaukset

#### Boolean valinta "toggle"

Komponenttia voidaan käyttää boolean arvon valintaan yksistään (valittu/ei valittu).

Esimerkkejä:

- Käyttöliittymässä kun on tarve korvata esim. vanhoja toggle-switchejä saavutettaviksi. Valinta tuo näkymään esille/piilottaa asioita.
- Taulukot.
- Valintatilanteeseen, kun ei ole tarvetta pakollisuudelle.

HUOM! Jos on tarve pakollisuudelle yksittäisen checkboxin osalta, käytä silloin groupia jossa pakollisuutta ilmaistaan legendin yhteydessä.

#### Esimerkkejä

- Käyttöliittymästä esim. piilotetaan tai näytetään jotain valinnan mukaan. Ao. esimerkki: Opettajan Opetukseni -näkymä.
- Erilaisten ehtojen hyväksymiseen. Huomioi inputien leveyden maksimimitat.
- Tentit ja kokeet.

---

## Checkbox Group (fudis-checkbox-group)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1276%3A13572

### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan useampi arvo (group) tai boolean arvon valintaan yksistään (valittu/ei valittu).
- Suositellaan käyttöä jos alle 5 valittavaa arvoa (https://www.nngroup.com/articles/listbox-dropdown/).
- Voidaan halutessa sisällyttää myös vain 1 kpl valintaoption (kts. kuitenkin myös standalone-checkbox).
- Ensisijaisesti valinta on oletuksena tyhjä.
- Loppukäyttäjän on mahdollista aina poistaa valinta.
- Komponentilla on oltava aina erillinen, näkyvä legend.
- Checkbox-group on semanttisesti fieldset, mutta se käyttäytyy samoin kuin yksittäinen lomakekomponentti.
- HUOM! Checkbox groupin sisään ei ole mahdollista laittaa muuta sisältöä kuin checkbox (ei esim. linkkejä tms.).
- Checkboxin klikkausalue kattaa sekä valintaruudun että option-tekstin (Huom! Toisin kuin standalone-checkboxilla).
- Leveys tulee groupia ympäröivältä fieldsetiltä. Groupeissa on fieldset.
- CheckboxGroupissa käytettävän checkboxin selector: fudis-checkbox-group-option.

### Checkbox-group tilat

Virheviesti seuraa ulkoisesti lomakekenttien toteutusta.

#### Tilat

Yksittäisen option-checkboxin mahdolliset tilat: Default, Focus, Error, Selected, Disabled.

---

## Datepicker (fudis-date-picker)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2844%3A22892

### Käyttö yleisesti

- Käytetään päivämäärän valintaan.
- Huom! Placeholder-tekstin järjestys aina suomenkielen mallilla (dd.mm.yyyy), eli ei esim. tarjota tukea englanninkieliselle järjestykselle. Huomioidaan kuitenkin kielistys eli että käytetään oikeaa kieltä.
- Date picker avataan kalenteri-ikonista.
- Kenttää kohdistettaessa voidaan päivämäärä kirjoittaa suoraan kenttään.

---

## Date Range (fudis-date-range)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2844%3A22892

### Käyttö yleisesti

- Käytetään ajanjakson valintaan (alku- ja päätöspäivä).
- HUOM! Date range -valinnan ei ole pakko olla fieldset-elementin sisällä jos konteksti ja kenttien labelit ovat riittävän selkeät, vaikka kyseessä onkin fieldset.
- HUOM! On päätetty että kenttien välillä ei ole viivaa.

### Käyttötapaukset

#### Lopetuspäivä määräytyy erillisen valinnan mukaan

- Disabloidaan kenttä ja lisätään ohjetekstiin pakollinen selite miksi kenttä on disabloitu.
- Disabloidaan kenttä vain jos kentän arvo määräytyy erillisestä valinnasta.
- Ohjeteksti esim.: "Määräytyy opintojakson voimassaolon mukaan."

#### Aloituspäivä määräytyy erillisen valinnan mukaan

Aloituspäivä määräytyy erillisen valinnan mukaan ja päivämäärän tieto on lisätty kenttään jos tieto on teknisesti saatavilla.

### Date range ja virhevalidaatiot

Molemmilla inputeilla on omat kontrollit joille voidaan antaa min- ja max-arvoja. Date rangen osalta molemmille input-kentille (fudis-datepicker) tehdään omat validaationsa eli validaatio tapahtuu lomakekentän tasolla (ei siis ns. fieldsetin tasolla). Validoidaan käyttäjän tekemät virhevalinnat aina input-tasolla ja kerrotaan virheistä inputin alla.

#### Virheviestien esimerkkejä

- **Pakollinen arvo valitsematta**: "Aloituspäivä puuttuu" / "Lopetuspäivä puuttuu"
- **Lopetuspäivä on ennen aloituspäivää**: "Aloituspäivä ei voi olla lopetuspäivän jälkeen" / "Lopetuspäivä ei voi olla ennen aloituspäivää"
- **Aloituspäivä ennen sallittua aikaa**: "Aloituspäivä voi olla aikaisintaan 5.9.2024"
- **Lopetuspäivä sallitun ajan jälkeen**: "Lopetuspäivä voi olla myöhäisintään 5.9.2024"

### Date range ja otsikointi (legend)

Date rangella ei ole välttämätöntä olla otsikkoa (legendiä). Riittää että input-kentillä on labelit. Huom! Koska date-range koostuu kahdesta erillisestä datepickeristä, niin silloin molemmilla inputeilla on oltava labelit, toinen ei voi jäädä ilman sitä. Suunnittelussa arvioidaan tapauskohtaisesti onko tarvetta otsikolle (esim. voimassaoloaika tmv.) ja tällöin date range asetetaan Fieldsetin sisään. Näissä tapauksissa fieldsetille tulee aina myös legend. Legendillä on tällä hetkellä oletustyyli jota ei voi muuttaa.

### Date range ja responsiivisuus

Sijoitetaan input-kentät aina vierekkäin myös mobiilissa, koska kentät liittyvät toisiinsa.

---

## Calendar Popup (fudis-calendar-popup)

Storybook: https://funidata.github.io/fudis/main/?path=/docs/components-form-date-datepicker--documentation

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2844%3A22892

### Käyttö yleisesti

Käytetään fudis-date ja fudis-date-range -kentissä päivämäärän valintaan.

Kalenterissa on kaksi näkymää: Date (päivät) ja Year (vuodet).

### Date range ja Calendar-popupit

Käyttäjää voidaan ohjata Calendar-popupin valinnoissa.

Esimerkki: Estetään jälkimmäisessä input-kentästä avautuvasta popupista käyttäjää valitsemasta esimerkiksi aikaisempia päivämääriä kuin ensimmäiseen input-kenttään on valittuna, jos lopetuspäivä ei voi olla ennen aloituspäivää.

HUOM! Tämä toimintalogiikka ei tule automaattisesti Fudiksesta. Toiminto täytyy lisätä tai kehittää erikseen Sisun/Inton puolella.

---

## Radio Button (fudis-radio-button)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1276%3A13572

### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Suositellaan käyttöä jos alle 5 valittavaa arvoa (https://www.nngroup.com/articles/listbox-dropdown/).
- Ensisijaisesti valinta on oletuksena tyhjä.
- Valintaa ei voi poistaa.
- Komponentilla on oltava aina erillinen, näkyvä legend.
- Radio button groupissa pitää olla vähintään kaksi valintaa.
- Radio button group on semanttisesti fieldset, mutta se käyttäytyy samoin kuin yksittäinen lomakekomponentti.
- Leveys tulee groupia ympäröivältä fieldsetiltä. Groupeissa on fieldset.

### Radio-button tilat

Yksittäisen radio-buttonin mahdolliset tilat: Default, Focus, Error, Selected, Disabled.

### Radio-button-group tilat

- Tilat: Default, Error.
- Virheviesti seuraa ulkoisesti lomakekenttien toteutusta.

---

## Select (fudis-select)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3506-21730

### Pudotusvalikoiden sisältö

- Tuetaan käyttäjää laittamalla valinnat aakkosjärjestykseen. Valintoja voidaan jäsentää väliotsikoiden avulla.
- Käyttäjälle on mahdollisuus tarjota valinnan lisätietoa eli main- ja sub-sisältö.
- Tietyn tyyppisten pudotusvalikoiden sisältö ja järjestys määrittyy kuitenkin automaattisesti koodistoista. Esimerkiksi opiskelijoiden tiedoissa kotikunta, kansalaisuus ja sukupuoli saadaan koodiston kautta, joten pudotusvalikon sisältöön ei ole mahdollista vaikuttaa.
- Myös koodistojen sisällön järjestys on korkeakoulujen itse muokattavissa, joten senkään osalta suunnittelussa ei ole mahdollista ottaa kantaa missä järjestyksessä vaihtoehtojen tulisi olla.

### Pudotusvalikoiden leveys

Pudotusvalikoiden leveyksissä noudatetaan samoja leveys-vaihtoehtoja kuin lomakkeen inputeissa (kts. guidelinesin kohta fudis inputs (general) -> Form komponentin enimmäisleveydet). Leveydet ovat siten nämä kolme:

- large: 368px (default)
- medium: 224px
- small: 160px

### Option-rakenne (main + sub label)

Optionilla voi olla pääsisältö (`fudis-select-option_label_main`) ja lisätietoa antava alalabel (`fudis-select-option_label_sub`).

SubLabelin voi lisätä sekä tavalliseen selectiin että multiselectiin. SubLabelia voi käyttää myös disabloiduissa optioneissa.

### Dropdown

#### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Sisältää erikseen avattavan pudotusvalikon.
- Ei hakurajausta.

#### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Tilat: Default, Focus, Hover, Disabled (ei valittavissa).

##### Selected (with/without clear button)

- Tehty valinta näytetään input-kentän sisällä, mukana on tyhjennä valinta -painike.
- Tarvittaessa tyhjennä valinta -painiketta ei näytetä, jos ei haluta mahdollistaa ns. tyhjää valintaa.

### AutocompleteDropdown

#### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Sisältää erikseen avattavan pudotusvalikon, sekä hakurajauksen.

#### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Input-kenttään voi syöttää hakurajauksen.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus, Hover, Selected, Disabled (ei valittavissa).

##### Selected (with/without clear button)

- Tehty valinta näytetään input-kentän sisällä, mukana on tyhjennä valinta -painike.
- Tarvittaessa tyhjennä valinta -painiketta ei näytetä, jos ei haluta mahdollistaa ns. tyhjää valintaa.

### AutocompleteType

#### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Sisältää hakurajauksen.

#### Tilat

- Hakutulokset listautuvat pudotusvalikkoon.
- Input-kenttään syötetään haku.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus, Selected.

##### Selected (with/without clear button)

- Tehty valinta näytetään input-kentän sisällä, mukana on tyhjennä valinta -painike.
- Tarvittaessa tyhjennä valinta -painiketta ei näytetä, jos ei haluta mahdollistaa ns. tyhjää valintaa.

---

## Multiselect (fudis-multiselect)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1287-9389

### Pudotusvalikoiden sisältö

- Tuetaan käyttäjää laittamalla valinnat aakkosjärjestykseen. Valintoja voidaan jäsentää väliotsikoiden avulla.
- Käyttäjälle on mahdollisuus tarjota valinnan lisätietoa eli main- ja sub-sisältö.
- Tietyn tyyppisten pudotusvalikoiden sisältö ja järjestys määrittyy kuitenkin automaattisesti koodistoista. Esimerkiksi opiskelijoiden tiedoissa kotikunta, kansalaisuus ja sukupuoli saadaan koodiston kautta, joten pudotusvalikon sisältöön ei ole mahdollista vaikuttaa.
- Myös koodistojen sisällön järjestys on korkeakoulujen itse muokattavissa, joten senkään osalta suunnittelussa ei ole mahdollista ottaa kantaa missä järjestyksessä vaihtoehtojen tulisi olla.

### Pudotusvalikoiden leveys

Pudotusvalikoiden leveyksissä noudatetaan samoja leveys-vaihtoehtoja kuin lomakkeen inputeissa (kts. guidelinesin kohta fudis inputs (general) -> Form komponentin enimmäisleveydet). Leveydet ovat siten nämä kolme:

- large: 368px (default)
- medium: 224px
- small: 160px

### Option-rakenne (main + sub label)

Optionilla voi olla pääsisältö (`fudis-select-option_label_main`) ja lisätietoa antava alalabel (`fudis-select-option_label_sub`).

SubLabelin voi lisätä sekä tavalliseen selectiin että multiselectiin. SubLabelia voi käyttää myös disabloiduissa optioneissa.

### Dropdown

#### Käyttö yleisesti

- Käytetään lomakkeessa kun voidaan valita useampi arvo (yli 5 valittavaa arvoa).
- Sisältää erikseen avattavan pudotusvalikon.
- Ei hakurajausta.
- Jos valittavien vaihtoehtojen määrä on pieni, voidaan käyttää myös checkbox-group-elementtiä. HUOM! Käytä harkiten, koska ei voi käyttää hakua hyödyntävissä dropdowneissa.
- Huom! Valintojen osalta multiselectissä on käytetty natiivia input-elementtiä (type="checkbox"), eli se ei ole mitenkään yhteydessä Fudiksen Checkbox- tai CheckboxGroup-komponentteihin.

#### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Tilat: Default, Focus, Hover, Active, Disabled (ei valittavissa).

##### Selected (with/without clear button)

- Tyhjennä valinta -painike on mahdollistettu, mutta multiselect-komponentissa sen käyttö on riskialtista, eikä siksi suositeltavaa.
- Tehdyt valinnat listataan input-kentän alapuolella.

##### Selected (valinnat kentän sisällä)

- Tehdyt valinnat on mahdollista näyttää myös input-kentän sisällä.
- HUOM! Varmista, että käyttäjän on mahdollista nähdä kaikki valinnat. Ei voi käyttää hakua hyödyntävissä dropdowneissa.

### AutocompleteDropdown

#### Käyttö yleisesti

- Sisältää erikseen avattavan pudotusvalikon, sekä hakurajauksen.
- Sisältää aina listatut valinnat input-kentän alapuolella ("chipsit").

#### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Input-kenttään voi syöttää hakurajauksen.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus (open dropdown), Disabled (ei valittavissa).

##### Selected (with/without clear button)

- Tyhjennä valinta -painike on mahdollistettu, mutta multiselect-komponentissa sen käyttö on riskialtista, eikä siksi suositeltavaa.
- Tehdyt valinnat listataan kentän alapuolelle.

### AutocompleteType

#### Käyttö yleisesti

- Sisältää hakurajauksen.
- Sisältää aina listatut valinnat input-kentän alapuolella ("chipsit").

#### Tilat

- Hakutulokset listautuvat pudotusvalikkoon.
- Input-kenttään syötetään haku.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus.

##### Selected (with/without clear button)

- Tyhjennä valinta -painike on mahdollistettu, mutta multiselect-komponentissa sen käyttö on riskialtista, eikä siksi suositeltavaa.
- Tehdyt valinnat listataan kentän alapuolelle.

### Chipsit

Chipsien tekstit linjataan alkamaan aina vasempaan laitaan (ei siis esim. keskitetysti). Poistoruksi säilyy aina samassa kohdassa chippiä vasemmassa yläkulmassa.

---

## Fieldset (fudis-fieldset)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3490-3608

### Käyttö yleisesti

- Fieldset on alimman tason html-semanttinen ryhmä joka ryhmittää toisiinsa liittyvät lomakekentät.
- Fieldsetillä on aina sen sisältöä kuvaava legend (ei heading).
- Legend oletuskoot: sm ja md. Figma-komponentissa oletuskoko on sm.
- Fieldset-elementtejä ei voi asettaa sisäkkäin (nested).
- Fieldsetillä voi tarpeen ja tilanteen mukaan olla info-ikoni, ohjeteksti, painike ja/tai notifikaatio.
- Fieldsettiä ei html-semanttisesti käytetä lukutilaisessa lomakkeessa, vaikka ulkoisesti rakenteet muokattavan lomakkeen ja read only -lomakkeen välillä voivat muistuttaa toisiaan.
- Max-width on 368px (23 remiä).

### Tilat ja lisäosat

- Vähimmillään fieldset on vain otsikko (legend).
- Tarvittaessa legendin perään voidaan lisätä info(-ikoni).
- Tarvittaessa fieldsetin oikeaan yläkulmaan voidaan lisätä painike.
- Tarvittaessa fieldsetin alle voidaan lisätä ohjeteksti.
- Mahdollinen fieldsetin notifikaatio (ei virhevalidaatio).

### Käyttötapaukset

#### Date-range

Esimerkki fieldsetistä date-range-kenttäparin ympärillä.

#### Lisää/poista sisältöä jossa useampi input (case: Into vastuuorganisaatiot)

Fieldsetiä voidaan käyttää toistuvan, lisättävän/poistettavan sisällön ryhmittämiseen, jossa jokaisella rivillä on useampi input (esim. Into: vastuuorganisaatiot).

### Asemointi

- HUOM! Fieldsettiä EI sisennetä.
- Fieldsetin sisällä olevaa sisältöä EI sisennetä.
- Etäisyys fieldsetin ohjetekstin ja ensimmäisen kentän (esim. select) otsikon välillä: 16px.

### Virhevalidaatiot

#### Kenttäkohtaiset virheviestit

Fieldsetissä on lomakekenttiä joilla on omat virheviestit. Esimerkki virheviestistä: "Päättymispäivä ei voi olla ennen alkamispäivää."

#### Fieldsetin oma virheviesti

Fieldsetissä voidaan näyttää notifikaatio.

HUOM. Kyseessä ei ole fieldsetin virhevalidaatio. Lomakkeen validaatio tehdään -ja virheviestit näytetään lomakekentissä.

### Fieldset ja pakollisuuden merkintä

Fieldset ei voi semanttisesti olla pakollinen, joten ilmaistaan pakollisuutta input-kentän labelin yhteydessä. (Huom. Checkbox- / Radio button -groupien / fieldsettien pakollisuus merkitään myös labelin yhteydessä)

---

## Form (fudis-form)

### Käyttö yleisesti

Fudis Form is a layout component which enables semantically coherent and easy flow for building forms. It constructs from three main sections: header content, header actions and main content.

### Otsikko

- Lomakkeen otsikko on pakollinen.
- Otsikkotyyli määräytyy oletuksena otsikkotason mukaan (H1, H2...).
- Otsikkotyyli on yliajettavissa.

### Lomakekomponenttien tasautuminen

Fudiksen input-komponenttien keskinäinen tasaus toimii siten että fudis-gridin sisällä, samalla rivillä olevat komponentit tasautuvat inputin tekstilaatikon mukaisesti linjaan.

Tasautuminen perustuu LabelHeightServiceen, joka on käytössä kaikissa Fudis-komponenteissa, joissa on käytössä fudiksen Label-komponentti tai Fieldset-komponentti. Käytännössä tämä tarkoittaa sitä, että kaikki Fudiksen lomakekomponentit ovat "tasauksen" piirissä.

Tasaus toimii myös esim. haussa käytettävissä multiselecteissä, eli lomakekomponentin ei ole pakko olla lomakkeen sisällä, jotta tasaus toimii.

Huom! Suunnitellessa muistettava tasata komponentit laatikon mukaisesti.

---

## Link (fudisLink)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2859%3A27010

### Käyttö yleisesti

- Käytetään, kun halutaan ohjata käyttäjä toiselle sivulle.
- Koko määräytyy parentin tekstikoon mukaan. Voidaan määritellä joko koko 'md' (14px) tai 'lg' (16px).

### Koot

- **fudisLink-lg**: fonttikoko 16px, Regular 400. Käyttö: linkki, tekstikoko lg.
- **fudisLink-md**: fonttikoko 14px, Regular 400. Käyttö: linkki, tekstikoko md.

### External-ikoni

External-ikoni lisätään uuteen välilehteen avattavalle linkille. Huom! Järjestelmän ulkopuolelle vievät linkit avataan aina uuteen välilehteen.

---

## Horizontal Rule (fudis-hr)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=2341-2193

### Käyttö yleisesti

Käytetään jakamaan osioita samassa näkymässä, esim. Wizard-näkymässä jakamassa sisältö toiminnoista.

### Käyttötapauksia

#### Wizard

Horizontal rule jakaa esitettävän sisällön toiminnoista.

---

## Popover (fudisPopover)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2859%3A27010

### Käyttö yleisesti

Käytetään tarvittaessa:

- avautumaan input-kentän info-ikonista, ja esittämään input-kenttään liittyvien lisätietojen esittämiseen.
- selittämään ikonin merkitystä jos näkyvää selitettä ei ole muutoin mahdollista käyttää.

- Aktivoituu käyttäjän klikatessa tietyn elementin päällä.
- Saa pois näkyviltä painamalla esc-näppäintä, klikkaamalla popoverin ulkopuolista aluetta, klikkaamalla popoverin triggeröivää ikonia tai siirtymällä tabilla muualle, tai klikkaamalla muualle.
- Popoverin selitteen tulee olla lyhyt.
- Ruudunlukija lukee popoverin tilasta käyttäjälle siten että se on joko "expanded" tai "collapsed" -tilassa, eli ruudunlukuohjelmaa käyttävä ymmärtää näin myös onko popover näkyvillä vai ei. (Aiemmin ruudunlukija luki koko popoverin sisällön vaikka se ei ollut aktiivisena, eli nyt käyttökokemukset näkevän ja ruudunlukuohjelmaa käyttävän käyttäjän osalta on jatkossa yhdenmukaisemmat.)
- Kehittäjä (eli fudiksen käyttäjä) voi itse määrittää popoverin (mustan tekstilaatikon) sijaintitoiveen. Sijainti kuitenkin käyttäytyy siten, että popover pyrkii aina hakeutumaan näkymään siten että se mahtuu järkevästi sisältöön. Eli popoverin sijainti voi siis elää näytön leveyden mukaan. Defaultina sijainti on aina "bottom" jos käyttäjä ei määritä sitä.

---

## Breadcrumbs (fudis-breadcrumb)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2860%3A2367

### Käyttö yleisesti

- Käytetään viestimään sivun rakenteesta.
- Murupolussa listataan sivuston rakenteen mukaiset sivut ja välilehdet.
- Murupolku on aina sivun vasemmassa ylälaidassa, heti navigaation alla.
- Murupolku ei ole käytössä focus-mode:ssa (kts. focus-mode).

### Rakenne

- Murupolun tasot ovat linkkejä, paitsi viimeinen taso, joka esittää sivua jolla käyttäjä parhaillaan on (ei linkki).
- Fonttikoko: MD.
- Murupolun kohteiden välinen välistys tulee komponentista.

### Asemointi

- Padding murupolun yläpuolella: 32px.
- Murupolku sijoitetaan sivun otsikon (heading) yläpuolelle.

---

## UI Patterns

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=442-134

Figmaan on koottu kokoelma komponentteja joita hyödynnetään suunnitelmia tehtäessä. Niissä on tyypillisesti yhdistetty useampi fudis-komponentti yhdeksi kokonaisuudeksi.

Kyseisiä komponentteja ei kuitenkaan löydy sellaisenaan fudiksen storybookista.

### Dropdown Menu (UI pattern)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=2042-24755

#### Käyttö yleisesti

- Käytetään tarjoamaan erilaisia toimintoja jotka liittyvät ko. näkymään/toimintoon.
- Komponentti on niin sanottu pattern-komponentti, joka koostuu useammasta muusta fudis-komponentista.
- Koostuu komponenteista: fudis-button, fudis-dropdown-menu*, fudis-dropdown-menu-item*
  - \* = komponentti on piilotettu hakemistosta, eli ei ole käytettävissä muussa yhteydessä.

#### Käyttötapaukset

- Tyypillisesti pudotusvalikko avautuu ns. kolmen pisteen valikko -painikkeesta (fudis-button + fudis-options-ikoni).
- Painikkeen kokovariaatio määräytyy sitä ympäröivien painikkeiden koon mukaan.
- Pudotusvalikossa voidaan käyttää väliotsikkoa.
- Valinta voi olla disabloitu (ei valittavissa).
- Painikkeella voi olla tyypillisesti secondary tai tertiary -tyyli.

---

## Loading Spinner (fudis-loading-spinner)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=5432-51

### Käyttö yleisesti

Käytetään viestimään viiveestä yksittäisen osion -tai koko sivun sisällön latauksessa. Kehitys määrittää latausindikaattorin käytön tapauskohtaisesti.

Komponenttiin kuuluu:

- Ikoni (sama svg-ikoni molemmissa variaatioissa)
- Label, joka on muokattavissa tarpeen mukaan. Oletuksena "Ladataan".

### sm (small)

Käytetään viestimään viiveestä yksittäisen osion sisällön latauksessa.

Tyyli ja koko:

- Ikoni: 24px × 24px, #1076DB
- Label: 14px regular, #484848
- Max-width: 256px
- Margin top: 24px
- Keskitetty (horizontal)

### Koko sivun lataus - lg (large)

Päätetty poistaa (Dev Des Sync 29.9.2025) koska haasteita saada toimimaan Sisun päässä.

### Käyttötapaukset

#### Osion lataus - sm (small)

Kun järjestelmä lataa yksittäisen osion sisältöä.

Toiminta:

- Kun osion latausaika on ylittänyt 2 sekuntia: Näytetään fudis-loading-spinner. Ei kohdisteta elementtiin. Label: "Ladataan".
- Kun osion lataus on valmis: Jos kohdistus on latausindikaattorissa kun sisällön lataus on valmis, siirretään kohdistus sisällön ensimmäiseen elementtiin.

#### Käynnistetään hitaasti valmistuva toiminto käyttöliittymästä - lg (large)

Käyttöliittymästä käynnistetään painiketta klikkaamalla toiminto, jonka valmistumisessa odotetaan kestävän vähintään yli 1 sekunti. Selvitetään ja arvioidaan kehityksen kanssa käyttö tapauskohtaisesti.

Toiminta:

- Kun painiketta on klikattu: Näytetään fudis-loading-spinner. Ei kohdisteta elementtiin. Label ja status-role: esim. "Hyväksytään opintojaksoa". Oletuksena "Ladataan".
- Kun painikkeen klikkauksesta on kulunut 5 sekuntia: Label ja status-role: esim. "Pahoittelut, opintojakson hyväksyminen kestää odotettua kauemmin." Oletuksena "Pahoittelut, lataus kestää odotettua kauemmin."
- Kun painikkeen klikkauksesta käynnistetty toiminto on valmis: Status-role: esim. "Opintojakso hyväksytty". Oletuksena "Lataus valmis".
- Näppäinkohdistus H1-elementtiin tai sivun alkuun.

Mikäli toiminnon käynnistämisessä odotetaan kestävän kymmeniä sekunteja, pyritään antamaan käyttäjälle jokin arvio latausajan kestosta. Esim. "Ladataan. Tässä voi kestää joitakin minuutteja."

Soveltamisen kannalta huomioitavaa:

- Loading-spinnerin näyttämisen valmius on tehtävä jokaisen toiminnon yhteyteen manuaalisesti. Priorisoidaan loading-spinnerin käyttöä sellaisten toimintojen yhteydessä, joissa toiminnon valmistumisen odotetaan kestävän vähintään yli 1 sekunnin.
- Kun painiketta on klikattu, uusien pyyntöjen lähettäminen painiketta klikkaamalla on teknisesti estettävä kunnes toiminto on valmis.

---

## Pagination (fudis-pagination)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2382%3A2609

### Käyttö yleisesti

- Käytetään sivuilla ja elementeissä joissa sisältö jakautuu useammalle sivulle.
- Käytetään vain sisällössä jonka rakenne ei muutu sivujen välillä (listat ja taulukot).
- Käyttötapauksia mm. Hallinnon asiointi -näkymä ja Opiskelijan haku -näkymä.

### Sivu-elementtien tilat

Tilat: Default, Current, Focus (Default), Focus (Current).

Kolmea pistettä käytetään merkitsemään listassa piilotettuja sivuja (ei kohdistusta).

### Käyttötapaukset

#### 10 tai enemmän sivuja

Kun listattuja sivuja on 10 tai enemmän, näytetään listan viimeinen sivu ja piilotetaan osa sivuista.

##### Ensimmäinen sivu

Ensimmäisen sivun ollessa aktiivinen, piilotetaan "edellinen sivu" -painike.

##### "Keskimmäinen" sivu

Kun sivuja selataan eteenpäin, aktiivinen sivu pidetään näkyvän listan keskellä.

##### Viimeinen sivu

Viimeisen sivun ollessa aktiivinen, piilotetaan "seuraava sivu" -painike.

### Responsiivisuus

#### Mobiili (XS) <576px / 36em

Pienellä ruutukoolla piilotetaan näkyvät "edellinen" ja "seuraava" labelit. Breakpoint 576px.

#### "XXS", responsiivinen tai <465px

Yhä pienemmällä ruutukoolla vähennetään listassa näkyvien sivujen määrää. Jos onnistuu niin responsiivisesti, mutta jos ei niin breakpoint 465px näytetään 5 sivua (tai sivuelementtiä).

### Asemointi

- Sijoitetaan komponentti sivutettavan sisällön alle keskitetysti.
- Käytetään 40px välistystä sivutettavaan sisältöön (taulukko/lista).

### Saavutettavuus

- Näppäinkohdistus pyritään siirtämään selattavia sivuja kuvaavaan otsikkoon käyttäjän navigoidessa sivujen välillä. Käyttävän pään on määritettävä kohdistus tapauskohtaisesti. Oletuksena näppäinkohdistus säilyy paginaatio-komponentissa.
- Label-esimerkkejä: "2, nykyinen sivu", "Seuraava, sivu 3", "Edellinen, sivu 1", "Sivunumerointi", "12, viimeinen sivu".
- Aria-live esim.: "Avattu, sivu 2" (luetaan aria-live kun käyttäjä avaa sivun).
- Kohdistus: Sivuja valittaessa, kohdistus pidetään paginaatio-elementissä.

### Brändi

Painikkeiden värit yhtenäistetään tuotekohtaisesti (esim. Sisu, Into).

---

## Footer (fudis-footer)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2861%3A3265

### Käyttö yleisesti

- Käytetään Funidatan kaikkien tuotteiden sivun alalaidassa, kaikissa näkymissä.
- Fudis määrittelee footerin taustan sekä logon paikan. Oranssilla katkoviivalla merkitty alue on se, jonka sisällöstä kukin sovellus vastaa itse.
- Huomiona, että suuremmalla näytöllä logon oikealle puolelle jää tilaa (margin-right) ja pienemmällä näytöllä vastaava tila jää logon alle (margin-bottom).

### Linkit

- **Promo-linkki**: Mahdollista hyödyntää esim. rekrytoinnissa. Avataan uuteen välilehteen. Käyttö vain tarpeen mukaan ja voidaan määrittää tuotekohtaisesti. Promo-linkin jälkeen väli ennen muita linkkejä.
- **Funidatan logo (linkki)**: Linkki funidata.fi:hin. Avataan uuteen välilehteen. Käytössä kaikissa tuotteissa.
- Muut linkit (esim. Tietosuojaseloste, Saavutettavuusseloste, Järjestelmätiedot) ja niiden järjestys määritellään tuotekohtaisesti.

### Asemointi ja koot

Footerilla on kaksi breakpointia, joissa sisällön rakenne muuttuu. Funidatan logo ja linkkien tekstikoko pysyvät samana näytön koosta riippumatta.

#### lg: >1200px (1440px)

- 64px marginaali ennen footeria.
- 24px footerin sisällä ylhäällä ennen sisältöä.
- 28px logon ja promo-linkin alla.
- 64px footerin alareunassa sekä oikealla ja vasemmalla reunalla.

#### sm: <576px (320px)

- 24px footerin sisällä ylhäällä.
- 28px logon alla.
- 28px promo-linkin alla.
- 16px footerin sisällä molemmilla sivuilla.
- 64px footerin alareunassa.

### Brändi

Linkkien värit yhtenäistetään tuotekohtaisesti käyttämällä tuotekohtaista väriä linkissä.

---

## Inputs (general) (fudis inputs (general))

### Käyttö yleisesti

Tämän osion linjaukset ovat yleispäteviä kaikkiin lomakkeen (fudis-form) sisällä käytettäviin komponentteihin (paitsi niiltä osin kun ko. komponentissa ei ole osiossa mainittuja elementtejä).

### Tilat & yleiset liitännäiset

#### Default

- Tarvittaessa voidaan lisätä info-ikoni, jota klikkaamalla avataan popover (ei tooltip).
- Tarvittaessa kentän alle voidaan lisätä ohjeteksti.

##### Validaatiovirhe

- Validaatiovirheessä inputille tulee punainen border (border: 1px solid #B83C2E).
- Validaatiovirheessä inputin alle tulee punainen error-ikoni + virheviesti, jossa kuvaillaan validaatiovirhettä.
- Jos kentälle tulee useampi validaatiovirhe, näytetään kaikille oma virheviesti.

#### Focus

Kohdistettaessa kentälle tulee primary-sininen border (outline: 2px solid #1076db).

#### Disabled

- Pyritään yleisesti välttämään disabloitujen kenttien käyttöä, mutta niitä voi kuitenkin tarvittaessa käyttää.
- Disabloidulle inputille tulee harmaa katkoviiva-border (border: 1px dotted #727272) ja extra-light-gray-taustaväri (background-color: #F1F1F1).
- Kentän oikeassa laidassa oleva ikoni on dark gray #484848, jos sellainen on.

### Pakollisuuden merkitseminen

Pakollisen kentän labelin perään lisätään "(Pakollinen)"-label.

### Asemointi ja koko

- Fudis-grid ja lomake-elementtien leveydet määrittävät komponenttien väliset etäisyydet.
- Form-komponenteille on määritelty enimmäisleveys (max-width). Fudis-gridin ansiosta form-komponentti voi olla leveydeltään myös pienempi.
- Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations.

#### Form-komponenttien enimmäisleveydet

Fudiksen lomakekomponenteille on määritelty neljä variaatiota, jotka määrittelevät niiden enimmäisleveyden. Size property -muuttuja → sm/md/lg/full-width. Fieldsetillä on käytössä sama size property -muuttuja kuin muillakin lomakekomponenteilla. Maksimileveys periytyy alemmille elementeille fieldsetiltä jos se on käytössä.

- **full-width, esim. 650px**: Soveltuu käyttötarpeisiin jossa odotetaan suurempaa sisältömäärää. Variaatiota käytettäessä lomakekomponentin enimmäisleveys voidaan määrittää kehityksessä käyttötarpeen vaatimalla tavalla. Suositeltu lomakekomponentin enimmäisleveys on noin 650px.
- **lg: 368px** (oletusleveys): Soveltuu suurimpaan osaan käyttötarpeista.
- **md: 224px**: Soveltuu käyttötarpeisiin jossa odotetaan lyhyempää sisältöä, kuten käyttäjän puhelinnumero tai postinumero.
- **sm: 160px**: Soveltuu käyttötarpeisiin jossa lyhyttä sisältöä kuten päivämäärä (variaatio käytössä mm. date-range-komponentissa).

### Numeerinen arvo ja yksikkö

Labelin yhteyteen lisätään lyhenteenä yksikkö jos haluttu arvo on numeerinen, esim. "LAAJUUS (OP)" tai "HINTA (€)". Poisluettuna päivämäärät ja vuodet.

#### Hinta/summa valuutassa

Kun kyseessä on hinta, annetaan placeholder muodossa "0,00". Esimerkki: "summa (€)" / "0,00".

#### Koodit

- Pyritään siihen, että koodi näytetään aina (esim. opintojakso, koulutus, tutkinto-ohjelma).
- Pyritään siihen, että koodi tulee aina ensin.
- Koodi erotetaan muusta tiedosta pilkulla.
- HUOM! Opintolaatikossa koodilla oma paikka.

Esimerkki: "HIS1234, Antiikin historian perusteet"

---

## Error Message

### Lomakekentän virheviesti

#### Case: Pakollinen tieto

Käyttäjän poistuessa pakollisesta lomakekentästä täyttämättä sitä (validaatiovirhe).

#### Case: Puhelinnumero

Käyttäjän poistuessa lomakekentästä kun kentässä on teknisesti virheellistä tietoa (validaatiovirhe).

### Custom validaatio

Lomakekentästä ei haluta piilottaa valintoja käyttäjältä, vaan ensisijaisesti näyttää kaikki mahdolliset valinnat ja antaa virheilmoitus jos käyttäjä tekee valinnan jota ei voi suorittaa/ei läpäise validaatiota.

Lomakekentän ulkopuolisen validaation virhe näytetään lomakekentän virheviestinä ja virhe lisätään myös error summaryyn, ts. virhe näytetään normaalin lomakekentän virheviestin tavoin.

#### Case esimerkki: virheellinen opiskeluoikeus

Jos lomakekentässä tehdään valinta joka ei läpäise custom-validaatiota (esim. opiskeluoikeudessa on virheitä), näytetään virheviesti inputin alla, normaalin virhevalidaation tavoin.

Esimerkki virheviestistä: "Valitussa opiskeluoikeudessa on virheitä, eikä se ole valittavissa. Tarkista opiskeluoikeutesi opintotietojärjestelmästä."

Kun lomaketta jossa virhe on yritetään lähettää, näytetään virhe myös error summaryssä (normaalin virhevalidaation tavoin). Esimerkki error summaryn rivistä: "Opiskeluoikeus: Valitussa opiskeluoikeudessa on virheitä. Tarkista opiskeluoikeutesi opintotietojärjestelmästä."

### Search error messages

Hakukenttä näyttää virhetilan jos käyttäjä ei syötä riittävästi merkkejä (vähintään kolme).

Esimerkki virheviestistä: "Syötä vielä kaksi merkkiä"

---

## Error Summary (fudis-error-summary)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3488-934

### Käyttö yleisesti

- Error summary sijaitsee aina lomakkeen alussa ja siinä listataan kaikkien lomakekenttien validaatiovirheet.
- Komponentti näytetään ja se päivitetään lomakkeen lähettämisen (submit) yhteydessä.
- Error summaryn virheet voidaan asettaa poistuvaksi joko kyseisen virheen korjauksen yhteydessä (dynaamisesti) tai vasta seuraavan submitin yhteydessä.
- Komponenttia ei voi käyttää itsenäisesti, irrallaan fudis-form-komponentista.
- Kohdistus siirretään komponenttiin lomakkeen lähettämisen (submit) jälkeen.
- Listatuissa virheviesteissä on ankkurilinkit ko. lomakekenttään.
- Linkin breadcrumb-polkuun voi tarvittaessa lisätä sectionin tai fieldsetin otsikot (esimerkkitoteutus Intossa). Automaattisesti linkkiin tulee lomakekentän label ja virheviesti (sama kuin lomakekentässä).
- Error summary tulee, vaikka olisi vain yksi kenttä.

### Default

Otsikko esim.: "Tiedoissa on puutteita tai virheitä. Korjaa seuraavat kohdat:"

Listan rivit muotoa: "Fieldset legend / Kentän label: Virheviesti"

### Käyttötapaus: Pakollinen tieto

#### Lomakekentän virheviesti

Käyttäjän poistuessa pakollisesta lomakekentästä täyttämättä sitä (validaatiovirhe).

#### Error summary

Käyttäjän lähettäessä (submit) lomaketta kun lomakkeella on virhe (tyhjä pakollinen kenttä), näytetään lomakkeen alussa error summary.

Esimerkki: "Tiedoissa on puutteita tai virheitä. Korjaa seuraavat kohdat: Kentän nimilappu: Tieto on pakollinen"

### Lomakkeiden välinen konflikti

Kahden eri lomakkeen väliset validaatiovirheet (konfliktit) esitetään lähtökohtaisesti työstettävän lomakkeen lomakekentän omassa virheviesti-kentässä.

### Case: Päivämäärä ei ole date-rangen sisällä

- Lomakkeen teknisessä alustuksessa asetetaan kalenterin min-max-päivämäärät.
- Jos päivämäärä yritetään asettaa suoraan, näytetään virheviesti lomakekentän alla + error summary jos lomake yritetään lähettää (submit).

Esimerkki virheviestistä: "Päivämäärä: Päivämäärän tulee olla toteutuksen opetusajan sisällä"
