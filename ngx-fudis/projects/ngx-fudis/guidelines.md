# Fudis Design System — AI Implementation Guide

This guide is created as reference for AI coding tools implementing [Fudis](https://fudis.funidata.fi) components.
It combines design intent (from Figma guidelines, in Finnish) with technical API documentation (from Storybook MDX sources, in English).

**Important!**

- This document is composed using generative AI (Claude), and should be taken with a grain of salt. The documentation is based on reliable material and has been spot checked, but due to the extensive size of this document, there is no guarantee that it is completely free of errors.

**How to read this guide:**

- _Design Guidelines_ sections explain when and why to use a component (UX rules, variants, use cases). Written in Finnish.
- _Technical Implementation_ sections explain how to use it in code (selectors, inputs, services, validators, accessibility). Written in English.

---

# Components

## Button

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=19%3A28

#### Käyttö yleisesti

Käytetään aktivoimaan toiminto (esim. avaa dialogi, tallenna lomake tms.)

##### Painikkeen piilottaminen

Pyritään siihen, että nappeja ei piiloteta. Ensisijaisesti näytetään kaikki painikkeet ja annetaan virhe/info -alert/dialogi -ilmoitus jos käyttäjä klikkaa painiketta, miksi toimintoa ei voitu suorittaa.

#### Variaatiot

##### Tyypit

Painikkeiden tyypit (Primary, secondary, tertiary) kertovat käyttäjälle painikkeiden oletetusta tärkeydestä. Käytettävät tyyppi on päätettävä tapauskohtaisesti, eikä tarkkaa linjausta ole.

- **Primary**: Käytetään ensisijaiseen toimintoon jonka käyttäjän uskotaan tai toivotaan suorittavan
- **Secondary**: Käytetään toissijaiseen toimintoon jonka käyttäjä voi suorittaa mutta joka ei ole odotettua tai toivottua ensisijaisen toiminnon suorittamisen kannalta
- **Tertiary**: Käytetään toimintoon joka on mahdollinen, mutta jota useimpien käyttäjien ei odoteta tai toivota suorittavan. Voidaan käyttää myös vähentämään näkymän hälyä jos toistuvia, toissijaisia toimintoja on paljon.

##### Disabloitu

- **Disabled**: Disabloitu painike viestii ettei toimintoa voida suorittaa, eikä painikkeeseen ei voi kohdistaa. HUOM! Painikkeen disablointia tulee välttää saavutettavuussyistä. Mikäli painike kuitenkin disabloidaan, tulee syy kertoa käyttäjälle selkeästi.

##### Koko

Valikkopainikkeen koko määräytyy sitä ympäröivien painikkeiden koon mukaan, tai toimintojen prioriteetin mukaan näkymäkohtaisesti.

- **Medium**: Ensisijaisesti käytetty koko
- **Small**: Käytetään variaatiota valikoidusti matalan prioriteetin toiminnoissa tai kun painike on liitetty toiseen komponenttiin (kts. description list)
- **Icon only**: Voidaan käyttää kun normaalille painikkeelle ei ole näkymässä tilaa (esim. muokkaa toiminto taulukossa) tai mobiilissa kun tilaa on rajallisesti. Pyritään käyttämään painikkeita, joissa on näkyvä label. Tällöin sekä näkevä että lukuohjelmiakäyttävä saa saman informaation.

##### Ikoni (show/hide)

- **Medium (show icon)**: Käytetään toimintojen yhteydessä lisäämään silmäiltävyyttä ja erottamaan muiden painikkeiden joukosta joitakin toimintoja joilla voi olla suuret seuraukset (Esim. poista)
- **Small (show icon)**: Käytetään toimintojen yhteydessä lisäämään silmäiltävyyttä ja erottamaan muiden painikkeiden joukosta joitakin toimintoja joilla voi olla suuret seuraukset (Esim. poista). Small variaatiota käytetään valikoidusti matalan prioriteetin toiminnoissa tai kun painike on liitetty toiseen komponenttiin (kts. description list)

##### Label (show/hide)

- **Medium (show icon, hide label)**: Käytetään tällä hetkellä vain valikkopainikkeena (kolmen pisteen valikko)
- **Small (show icon, hide label)**: Käytetään tällä hetkellä vain valikkopainikkeena (kolmen pisteen valikko)

#### Efektit

- **Hover**: Ei hover -tilan efektiä. Hoveroitaessa interaktiivisen elementin päällä (case: button) kursori vaihtuu => pointer
- **Active**: Ei active -tilan efektiä
- **Focus**: Ei active -tilan efektiä

#### Käyttötapaukset

- **Lisää uusi**: Käytössä, kun näkymään tulee klikkauksella modaali tms, jonka kautta lisätään elementti listaan syötettäviä tietoja. (Esim. lisää vastuuhenkilö)
- **Muokkaa**: Käytössä yleensä lomakkeiden yhteydessä joissa halutaan avata niiden muokkausmahdollisuus. Medium (primary) -painiketta on käytetty koko sivun lomakkeiden muokkauspainikkeena. Small with icon (tertiary) -painiketta käytetään kun sivulla on paljon toistoa tai yksittäisen tietokenttien muokkaukseen (katso: description list -komponentti). Icon only -painiketta käytetään vastaavissa tilanteissa kuin small with icon (tertiary) -painiketta, kun tilaa on rajallisesti ja/tai mobiilissa.
- **Valikko (ns. kolmen pisteen valikko)**: Painikkeesta avataan tyypillisesti pudotusvalikko jossa on listattu matalan prioriteetin toimintoja joita käyttäjä voi valita mutta joita useimmat käyttäjät eivät tarvitse. Käytetään usein muiden painikkeiden kanssa ns. sarjassa jossa on muita ensisijaisia ja toissijaisia toimintoja. On käytetty myös avaamaan muita toimintoja (esim. Toteutuksen arviointi -näkymässä avataan Lisätiedot -toiminto)

#### Muut painikkeet

- **Linkin näköinen painike** (Käytettävissä Sisussa, mutta ei sisälly Fudikseen): Pyritään käyttämään normaalia painiketta, mutta tarpeen tullen voidaan käyttää linkin näköistä painiketta esim. avaamaan modaali/dialogi. Erityisesti toimintoihin jotka eivät vaihda käyttäjän näkymää, pyritään suosimaan normaalia painiketta. Link-button komponenttia ei ole lisätty fudikseen, mutta se on silti käytettävissä Sisussa vanhastaan.
- **Milloin linkki? Milloin button?**: Lähtökohtaisesti painike on painikkeen näköinen ja ohjelmallisesti button, ja linkki on linkin näköinen ja ohjelmallisesti link, mutta jos on selkeä tarve niin tästä linjauksesti voidaan poiketa. Huomioitava tämä käyttäjille kerrotussa ohjetekstissä. Ei viitata painikkeen ohjelmallisuuteen (button vs. link) vaan sen sisältöön:
  - KÄYTÄ OHJETEKSTISSÄ: esim. "Paina Tallenna"
  - ÄLÄ KÄYTÄ OHJETEKSTISSÄ: esim. "Paina linkkiä"

#### Asettelu

- Jos painikkeen yhteydessä on otsikko, ne lisätään samalle riville (esim. case: muokkaa-toiminto)
- Painikkeet sijoitetaan ensisijaisesti sitä ympäröivän elementin (container) oikeaan laitaan

### Technical Implementation

Interactive Button Component can be used whenever there is need for user to perform some clickable action, e. g. to submit a form.

#### Label (mandatory)

Button has a visible label that is the only required input attribute.

#### Variant

Buttons are categorized based on their importance and functionality. It is **important** to use the correct variant of the button for the intended action and not to overuse them to avoid overwhelming the user.

Button has three variants: `primary` (default), `secondary` and `tertiary`.

#### Type

Type has to two possible values: `button` (default) and `submit`.

For HTML semantics, if Button is a form submit button, `submit` attribute value for `type` should be used.

#### Button with Icon

Button has option for displaying Icon component alongside the label. Icon color is automatically set according to which button variant is in use.
For situations where only visible icon is preferred, use [IconButton](/docs/components-iconbutton--documentation) instead.

Icon is only a visual indicator and is always hidden from screen readers.

Icon can be configured with `icon` and `iconRotate` properties.

#### Accessibility

- Button uses primary-color variable (`--fudis-color-primary`) which is set in the root of the application. Make sure the application's primary-color contrast ratio meets WCAG AA and AAA levels.
  - Disabled button has static colors `#484848` and `#D4D4D4` with contrast ratio 6.2:1
- Button has visible focus state
- Disabled buttons do not receive keyboard focus, but their state is communicated for assistive technology.
- Button click can be triggered with keyboard `enter` and `space` key
- Label is a required property.

#### Related components

- [Icon](/docs/components-icon--documentation)
- [IconButton](/docs/components-iconbutton--documentation)

---

## Notification

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3235-3759

#### Käyttö yleisesti

- Fudis-notification on staattisempia kuin fudis-alert
- Notifikaatiot kertovat tietoa, joka on tiedossa ilman käyttäjän aktiivista toimintaakin, eli ovat usein näkyvissä jo käyttäjän saapuessa näkymään
- Notifikaatio voi myös ilmestyä toiminnan seurauksena mm. tapauksissa, joissa käyttäjä tekee valinnan, joka vaikuttaa formin tietojen antamiseen.

#### Variaatiot

Notifikaatioita on 4 eri väriä/käyttötarkoitusta varten:

- **Sininen / Info**: Antaa neutraalia tietoa
- **Vihreä / Success**: Antaa positiivisen palautteen, esim. admin -> uusien opiskelijoiden vahvistus -> kun odottamassa ei ole yhtään opiskelijaa, vaan kaikki on käsitelty tai student: kun kaikki opinnot on tehty ja opiskelija voi hakea tutkinnon koostamista.
- **Keltainen / Warning**: Varoittaminen esim. olennaisen tiedon puuttumisesta tai asiasta, joka voi myöhemmin kostautua / josta käyttäjän olisi hyvä olla tietoinen. Ei kuitenkaan estä käyttäjää etenemästä.
- **Punainen / Error**: Virheestä tai virhetilanteesta informoiminen. Tilanteet, joissa eteneminen estyy (joko heti tai pidemmällä aikavälillä: esim. opiskelijan virhetilassa oleva suunnitelma saattaa vaikuttaa opintojen etenemiseen ja mm. estää myöhemmin valmistumisen)

#### Käyttötapaukset

Listataan yleisiä käyttötapauksia ja notifikaation mahdollistamia sisältöjä.

Teksti voidaan tarvittaessa jäsentää halutulla tavalla ja linkkejä/painikkeita voidaan lisätä notifikaation sisälle. Notifikaation sisällölle ei ole teknisiä rajoitteita.

##### Linkki

Notifikaatioon voi lisätä linkin. Jos notifikaatiossa on useampi asia ja linkki, ne voidaan jäsentää rivinvaihdolla niin, että kukin asia kuvataan omalla tekstillään ja sen alla on oma linkkinsä.

##### Painike (link-button)

Notifikaatiossa on mahdollistettu linkin näköinen painike. Muutoin fudis ei tue ko. painike -tyyliä.

#### Asemointi

- Notifikaatiot sijoittuvat sivulla sisällön sekaan ja lähelle tietoa/osiota, johon ne viittaavat.
- Notifikaatiot voivat koskea jotain tiettyä sisältöä, jolloin ne sijoitellaan sen yhteyteen.
- Huomioi lukujärjestys jotta kokonaisuus on käyttäjälle selkeä.
- Notifikaatio voi myös viitata näkymään tai muuhun olennaiseen tietoon yleisemmin.
- Notifikaation leveys ja korkeus määritetään tilannekohtaisesti.
- Leveys notifikaation yhteydessä olevan sisällön tai elementin rajojen mukaan.
- Notifikaatioita voidaan käyttää sekä ns. varsinaisissa näkymissä, että dialogeissa.

### Technical Implementation

Notifications are often informative contextual notifications that cannot be clicked away. Input property `variant` can have following values:

- Yellow `warning` notification is used in notes
- Red `danger` notification describes an error situation
- Green `success` indicates the possibility or success of some function
- Blue `info`, on the other hand, is a neutral guideline

#### Content Guidelines

For basic text content it is recommended to use [Body Text Components](/docs/components-typography-body-text--documentation),
however Notification Component can contain any kind of Fudis components, text or html content if needed.

If using [Button Component](/docs/components-button--documentation) or button element they will be transformed to look like
[Link Component](/docs/components-link--documentation). Otherwise Notification does not interfere with the content styling.

There is also the possibility to add a more detailed description of the Notification for screen readers. When HTML element is described by another element, it must be linked using the other element's id.
Add `ariaDescribedby` input, using the id of the linked content. See the example implementation in the Notification with Button code.

Please see code examples for recommended usage patterns.

#### Accessibility

- Notification background and text color contrast ratio meets AA and AAA levels
- Notification content is accessible by screen readers
- Notification component is native `article` element
- External link is communicated to screen reader with assistive aria-label
- Possibility to add additional aria-describedby attribute if necessary

#### Related components

- [Icon](/docs/components-icon--documentation)
- [Link](/docs/components-link--documentation)
- [Button](/docs/components-button--documentation)
- [BodyText](/docs/components-typography-body-text--documentation)

---

## Alert

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1284-9399

#### Käyttö yleisesti

- Alerteilla voidaan mm. kertoa toiminnon onnistumisesta/epäonnistumisesta tai antaa ohjeita käyttäjältä edellyteistä jatkotoimista.
- HUOM! Fudis-alert on tällä hetkellä käytössä vain Intossa!
- Alert ei ole näkymäsidonnainen, vaan se jää käyttäjän selainsivun ylälaitaan näkyviin, vaikka käyttäjä siirtyisi järjestelmässä näkymästä toiseen.
- Alerttiin ei voi laittaa linkkiä (Ei saavutettava).
- Käyttäjän täytyy sulkea alert, jotta se häviää näkyvistä.
- Kun alert suljetaan/siitä poistutaan, siirretään kohdistus siihen elementtiin missä käyttäjä oli ennen kuin kohdistus siirtyi alerttiin.

#### Variaatiot

Alertteja on 4 eri tyyppiä, eri käyttötapauksia varten:

- **Sininen / Info**: Antaa vinkkejä, ohjeita ja infoa
- **Vihreä / Success**: Kertoo toiminnon onnistumisesta
- **Keltainen / Warning**: Varoittaminen esim. olennaisen tiedon puuttumisesta tai asiasta, joka voi myöhemmin kostautua / josta käyttäjän olisi hyvä olla tietoinen. Ei kuitenkaan estä käyttäjää etenemästä. Käytetään myös pdf-tiedostojen muodostuksessa latauksen aikana kertomassa toiminnon olevan kesken.
- **Punainen / Error**: Virheestä tai virhetilanteesta informoiminen jossa käyttäjän toiminta on estynyt. Tilanteet, joissa eteneminen estyy, esim. käyttäjän käyttöoikeudet eivät riitä tai kaikkia formissa ei ole annettu kaikkia pakollisia tietoja.

#### Käyttötapaukset

Listataan yleisiä käyttötapauksia ja niissä käytettyjä alertteja teksteineen.

##### Tallennus onnistui (quick alert)

Tallennus onnistui.

Aria live: "Info, Tallennus onnistui." Ilmoitus poistuu automaattisesti hetken kuluttua.

#### Asemointi

- Alert aukeaa kiinnittyneenä sivun ylälaitaan
- Alert asettuu kaiken muun sisällön päälle
- Alert ei poistu näkyvistä vaikka käyttäjä vaihtaisi näkymää
- Alert ulottuu aina koko näytön leveydelle
- Alertit lisätään kronologisessa järjestyksessä (uusin alimmaiseksi)

##### Useampi alert

Jos alertteja aukeaa yhtä aikaa useampi kuin yksi, asettuvat ne alekkain niin, että viimeisimmäksi auennut aukeaa alimmaksi.

### Technical Implementation

**Please note, that Alert Group is not compatible with Sisu alert logic.**

Alert Group Component displays list of toaster-like Alert Components with four variants: `success`, `info`, `warning` and `danger.` These variants are the same ones as with [Notification Component](/docs/components-notification--documentation).

#### Usage Guidelines

First, add `HTML` tag in the application template, preferably as the bottom element in `app.component.html`.
Note that Alerts will position themselves at the very top of their container, meaning they might overlap the application navigation element, which should be fixed manually by setting custom CSS `top` value as needed in the application side.
Also, make sure that the custom CSS does not affect Alerts in Dialogs, where they should always be on top because Dialogs have backdrop.

##### Adding and Dismissing Alerts

Alert Group listens to `FudisAlertService` where application or UI sends information about adding or dismissing alerts.

##### Add New Alert

To add new alert, send an object of type `FudisAlert` to `FudisAlertService` using `addAlert()`.

Note that `id` doesn't need to be unique for AlertService.

```ts
constructor(
	private _alertService: FudisAlertService
	) {
		const newAlert: FudisAlert = {
			message: 'Well done, a new alert is displayed!',
			type: 'success',
			id: 'well-done-identifier',
		};

    	_alertService.addAlert(newAlert);
    }
```

##### Dismiss By Id

Previously sent alert can be dismissed with `dismissAlert()`. If multiple alerts with the same `id` is sent, all of them will be dismissed.

```ts
_alertService.dismissAlert("well-done-identifier");
```

##### Dismiss All

All alerts can be dismissed by calling `dismissAll()`.

```ts
_alertService.dismissAll();
```

##### Dismiss From UI

When user clicks alert's close button, it will dismiss that single alert from the service. But it will not affect the other alerts with the same `id`.

##### Positioning

Usually Alert Group is positioned to the top of the screen, right after navigation.

CSS position of Alert Group can be set using `position` attribute with three currently provided options. By default it is `fixed` but can be set to `static` or `absolute` as well.

##### With Fudis Dialog

Fudis automatically embeddes Alert Group inside [Dialog Component](/docs/components-dialog--documentation), so that new and existing alerts are visible and available for keyboard users when dialog is open.
Alerts are reloaded to the DOM each time dialog is opened and closed.

##### Alert Variants

All Alerts are communicated to screen readers when appearing for the first time, but with different roles. `danger` and `warning` variants have html attribute of `role='alert'`, other variants have `role='status'`. Focus does not change even if new alert appears.

##### Closing Alert

When user closes an alert, focus will move automatically to the last alert in the list. If there are no alerts left, Alert Group tries to return focus to that UI element where focus was before focusing on the alert.

##### With Fudis Dialog Open

[Dialog Component](/docs/components-dialog--documentation) has a focus trap, and navigating outside of the dialog is not possible until the dialog is closed. If there are visible alerts, those are included as focusable elements inside the dialog's focus trap. If user closes all the alerts when dialog is open, focus returns to dialog's close button.

#### Accessibility

- Danger and warning alerts will interrupt the user's current activity
- Alert Group is wrapped inside a `section` element which has an automatic `aria-label` describing its content, e.g. _'Notifications - Number of notifications: 5'_

---

## Dialog

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1622-18476

Dialogeja on kahta päätyyppi: Choises ja Info.

#### Käyttö yleisesti

Käytetään pääsasiassa lomakkeissa ja toimintojen vahvistuksiin.

##### Rakenne

- H2-otsikko dialogin alussa ensimmäisenä otsikkona. (Fudis ei määritä dialogin otsikkotasoa)
- Päätoiminnot dialogin oikeassa alakulmassa
- Sulje-painike dialogin oikeassa yläkulmassa
- Dialogia ei voi sulkea klikkaamalla sen ulkopuolelta
- Dialogin toimintoihin oikeassa alakulmassa (fudis-dialog-actions) ei lähtökohtaisesti voi lisätä enempää toimintoja kuin variaatiossa on oletuksena
- Huom! On suositeltavaa käyttää vain yhtä dialogia kerrallaan. Päällekkäisten dialogien käyttöä ei suositella, mutta se on kuitenkin mahdollista ja joskus ns. "vähiten huonoin" ratkaisu. Alle jääviin dialogeihin on mahdollista tallentaa käyttäjän syöttämää tietoa.

#### Variaatiot

##### Choises

Käytetään pääsasiassa lomakkeissa ja toimintojen vahvistuksiin.

Dialogissa on oletuksena kaksi (2) painiketta oikeassa alakulmassa:

- Peruuta toiminto ja sulje dialogi: "Eiku"-painike
- Vahvista toiminto, esim. Vahvista/Tallenna/lähetä (teksti määritetään tapauskohtaisesti)

##### Info

Käytetään mm. lisätietojen ja joidenkin virheilmoitusten esittämiseen.

- Voi sisältää pelkästään tarkasteltavaa (read only) tietoa
- Dialogissa on oletuksena yksi painike oikeassa alakulmassa: Vahvista toiminto joka sulkee dialogin, esim. Kyllä/Ok/Ymmärsin/Jatka (teksti määritetään tapauskohtaisesti)
- Sulje-painike dialogin oikeassa yläkulmassa
- Dialogia ei voi sulkea klikkaamalla sen ulkopuolelta
- Kun dialogin max-height on saavutettu, dialogin ylimenevä sisältö jää piiloon. Sisältö on scrollattavissa.

#### Kokovariaatiot

Fudis dialogista löytyy kokovariaatiot: xs, sm, md, lg, xl.

Kokovariaatio määrittelee dialogin maksimileveyden. Näyttökoon pienentyessä dialogi skaalautuu näyttökoon mukaan. Dialogin otsikoiden tai tekstien koot eivät kuitenkaan muutu näyttökoon pienentyessä.

##### xs: 480 px

Käytettäväksi esim. vahvistusdialogeissa tai info-dialogeissa, missä tekstiä ei ole odoteta olevan kovin paljon. Sisältö kannattaa sijoittaa yhteen sarakkeeseen.

##### sm: 704 px

Käytettäväksi esimerkiksi:

- Pienet lomakkeet: esim. yhden rajatun kohteen muokkaustoiminnot
- Vahvistusdialogeissa, missä tilaa sisällölle tarvitaan enemmän
- Info-dialogeissa, missä tekstiä odotetaan olevan maltillisesti.

Sisältö kannattaa sijoittaa yhteen sarakkeeseen.

##### md: 880 px

Käytettäväksi suuremmissa lomakkeissa: esim. monen tieto/valintakentän täyttäminen tai muokkaustoiminnot. Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

##### lg: 1120 px

Käytettäväksi esimerkiksi:

- Erittäin suuret lomakkeet/muokkaustoiminnot
- Kun tietoa pitää näyttää paljon, esim. taulukot

Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

##### xl: 1440 px

Käytettäväksi esim. kun tietoa pitää näyttää erittäin paljon: suuria taulukoita tai tekstirikkaita description listejä. Esim. opintojaksoesite. Sisältö kannattaa sijoittaa yhteen tai max. kahteen sarakkeeseen. Suunnittelun apuna voi Figmassa käyttää fudis-dialog-grid-double-column -layout gridiä.

#### Responsiivisuus

##### Horisontaalinen

Ruutukoon pienetessä ja mentäessä pienimpään breakpointiin, muuttuu dialogi mobiili-optimoiduksi. Otsikon koko ja marginit pienenevät, jotta sisältö mahtuisi mahdollisimman hyvin pieneen kokoon.

Mobiili-optimoidussa dialogissa sisältö latoutuu lähtökohtaisesti päällekkäin.

Suunnittelun apuna on Figmassa erillinen mobiili-kokovariantti dialogista. Huom. tämä ei ole virallinen dialogin kokovariantti.

##### Vertikaalinen

- Dialogin enimmäiskorkeus määrittyy käyttäjän ruutukoon mukaan, max-height: 65vh
- Jos dialogissa kerralla näytettävän sisällön enimmäismäärä ylittyy, sisällöstä tulee vertikaalisesti vieritettävä (vertical scrolling)
- Dialogin header ja toiminnot (painikkeet dialogin ala-laidassa) ovat aina näkyvissä

#### Asemointi

- Dialogin toimintoihin (fudis-dialog-actions) ei lähtökohtaisesti voi lisätä uusia painikkeita (vain submit ja cancel)
- Dialogi sijoitetaan 100px sivun ylälaidasta ja keskitetään horisontaalisesti
- Dialogi aukeaa aina whitelayerin päälle (kts. fudis-dimmer)
- Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations.

#### Tietojen muokkaus

- Muokkausta aloittaessa pyritään käyttämään muokkauksen avaavasta painikkeesta tekstiversiota eli "muokkaa"-sanaa. Kynä-ikonia voidaan käyttää vaihtoehtoisesti, jos teksti ei mahdu (huom. ikonin minimikoko 32px\*32px ja sen yhteydessä tulee esittää alt-teksti).
- Jos on yksittäinen muokattava kenttä, avataan muokkaus dialogissa.
- Avataan muokattavia tietoja sisältävät kokonaisuudet suoraan dialogissa, jos mukana on yksikin tietoja sisältävä kenttä. (Voi olla sekaisin read-only ja muokattavia kenttiä, mutta vältetään että aukeaisi tietojen tarkasteluun modaali ja siitä vielä jokin uusi näkymä.)
- Näytetään vihreä success alert onnistuneista tallennuksista.

### Technical Implementation

Fudis Dialog is based on Angular Material Dialog. Dialog opens on top of any content with a backdrop. It consists of three parts: Service, Component and Directives.

The first heading of the dialog should be either level 1 or 2. Dialog heading levels should be used consistently throughout the application.
It is recommended to have only one dialog open at a time.
Also, pay attention to accessibility when using dialog with read-only content.

**Table of Contents**

1. [Service](#service)
2. [Component](#component)
3. [Content Directives](#content-directives)
4. [Form inside Dialog](#form-inside-dialog)
5. [Focus Management](#focus-management)
6. [Examples](#examples)
7. [Accessibility](#accessibility)
8. [Related components](#related-components)
9. [Properties](#properties)

#### Service

Dialog Service provides tools for opening and closing a dialog. Service accepts both Angular components and templates to be passed as an argument.

Dialog is opened with `dialogService.open()` which takes either an Angular component or reference to a template as an argument. Dialog is closed with `dialogService.close()`.
As a feature, dialog has close icon button on the right corner of the dialog which cannot be removed.

Sending and receiving data between opened Dialog and Component which opened it, is achieved using Dialog Service.

It is not recommended to have multiple dialogs open simultaneously, but sometimes it is the least worse solution.
Dialog can transfer data between nested dialogs. With multiple open dialogs, `dialogService.close()` closes the top dialog.
`dialogService.closeAll()` closes all the open dialogs, but won't pass any data from any dialog to the launcher component.

##### From Component to Dialog

`dialogService.open()` can be called with optional `config` parameter (in addition to component or template reference) which is extension from `MatDialogConfig`. It can be used to alter some Dialog configs but most importantly config's property `data` can be used to inject properties for the component to be opened.

```
dialogService.open(ComponentOpenedAsDialog, { data: { greeting: 'Hello from the opening component!' } });
```

The component which this `data` is sent to, needs to inject `MAT_DIALOG_DATA` to itself in the constructor.

```
export class ComponentOpenedAsDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { greeting: string }
  ) {
    this.greetingFromOpeningComponent = this.data.greeting;
    // Now this class variable has the value of 'Hello from the opening component!'
  }
  greetingFromOpeningComponent: string;
}

```

##### From Dialog Back to the Component

First in the component, when opening the Dialog, we need to subscribe to an Observable, which is triggered after Dialog is closed. There is no need to any unsubscribing, as the Observable completes itself when Dialog is closed.

```
this.dialogService.open(ComponentOpenedAsDialog)
  .afterClosed()
  .subscribe((response: string) => {
  // Logic here what to do with the response!
  console.log(response)
  });

```

Then in the Dialog Component, when closing the Dialog, we can pass an optional parameter which is sent back to the component through `afterClosed()` Observable.

```
closeDialog(): void {
  const dataSentBack = "Excelsior!"
  this.dialogService.close(dataSentBack)
}

```

#### Component

Dialog component is a wrapper component taking one parameter: `size`.

Size determines the horizontal size of the dialog. Available options are `xs`, `sm`, `md`(default), `lg` and `xl`.

```
<fudis-dialog [size]="'sm'">
  ...
</fudis-dialog>
```

#### Content Directives

Directives written with `camelCase` are meant to be used as inline attribute directives.

Directives written with `kebab-case` are meant to be used as HTML element.

**fudisDialogTitle**: Set title for the dialog, title will stay fixed to the top of the dialog if content is long and when scrolling it down. This directive extends _MatDialogTitle_. Initial focus is set to this heading when opening the dialog.

```
<fudis-dialog>
  <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'">
    Heading for a dialog
  </fudis-heading>
</fudis-dialog>
```

**fudis-dialog-content**: Container for your scrollable dialog content. This directive extends _MatDialogContent_.

> **If dialog consists ONLY text**: Set `contentFocus` input value as true. This will ensure that scrollable content is accessible to keyboard and screen reader users.

```
<fudis-dialog>
  <fudis-dialog-content [contentFocus]="true">
    ...
  </fudis-dialog-content>
</fudis-dialog>
```

**fudis-dialog-actions**: Container for your dialog action buttons which stays fixed to the bottom of the dialog when scrolling. This directive extends _MatDialogActions_.

```
<fudis-dialog>
  <fudis-dialog-actions>
    <fudis-button></fudis-button>
    <fudis-button></fudis-button>
  </fudis-dialog-actions>
</fudis-dialog>
```

**fudisDialogClose**: To set element as close button. This directive extends _MatDialogClose_. With this directive, closing the Dialog will not forward any response data to the `.afterClosed()` observable.

```
<fudis-dialog>
  <fudis-dialog-actions>
    <fudis-button fudisDialogClose [label]="'Cancel'"></fudis-button>
  </fudis-dialog-actions>
</fudis-dialog>
```

##### Full code example

```
@Component({
  selector: 'simple-dialog',
  template: `
    <fudis-button (handleClick)="openDialog(dialogFromTemplate)" [label]="'Open dialog'" />
    <ng-template #dialogFromTemplate>
      <fudis-dialog>
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'">This is Dialog Heading</fudis-heading>
        <fudis-dialog-content>
          <fudis-body-text>Some content for Dialog</fudis-body-text>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Close'" />
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>
  `,
})
class SimpleDialogComponent {
  constructor(private _dialogService: FudisDialogService) {}

  openDialog(dialogToOpen: TemplateRef<any>) {
    this._dialogService.open(dialogToOpen);
  }
}
```

#### Form inside Dialog

When using [Form](/docs/components-form-form--documentation) inside Dialog, wrap the Form inside `fudis-dialog-content` and use it normally adding all required input properties and content projection slots of Form. When nesting Form inside Dialog, Fudis will style the Form to be concise with other Dialogs.

##### Full code example

```
@Component({
  selector: 'form-dialog',
  template: `
    <fudis-button (handleClick)="openDialog(dialogFromTemplate)" [label]="'Open form dialog'" />
    <ng-template #dialogFromTemplate>
      <fudis-dialog>
        <fudis-dialog-content>
          <fudis-form>
            [title]="'Dialog with Form'"
            [level]="2"
            <fudis-form-content>
                          </fudis-form-content>
            <fudis-form-actions>
              <fudis-button fudisFormSubmit [formValid]="exampleDialogFormGroup.valid" (handleClick)="closeDialogWithForm()" [label]="'Submit'" />
              <fudis-button fudisDialogClose [label]="'Cancel'" />
            </fudis-form-actions>
          </fudis-form>
        </fudis-dialog-content>
      </fudis-dialog>
    </ng-template>
  `,
})
class FormDialogComponent {
  constructor(private _dialogService: FudisDialogService) {}

  openDialog(dialogToOpen: TemplateRef<any>) {
    this._dialogService.open(dialogToOpen);
    .afterClosed()
    .subscribe((response: string) => {
      if(response === 'success'){
        // Logic here what to do with the response!
        console.log("Form was valid and Dialog is now closed.")
      }
    });
  }

  closeDialogWithForm(): void {
    if (this.exampleDialogFormGroup.valid) {
      // Close Dialog and forward a response, so observable can trigger additional logic
      this.dialog.close("success")
    }
  }
}
```

#### Focus Management

Focus is mainly handled on the library level, but pay attention to the following when opening dialogs on top of each other.
If another dialog is opened through [DropdownMenu](/docs/components-dropdown-menu--documentation), focus needs to be manually restored to the menu button after closing the top dialog, because the element no longer exists in the DOM which triggered the dialog opening.
For these cases, add handling with `afterClosed()` observable as advised in the example below and in [Angular Material documentation](https://material.angular.dev/components/dialog/overview#focus-restoration).

```
  // HTML template
    <ng-template #dialog>
      <fudis-dialog>
        <fudis-dialog-content>
          <fudis-icon-button
            #menuTrigger
            [ariaLabel]="'Additional menu'"
            [size]="'small'"
            [variant]="'secondary'"
            [icon]="'three-dots'"
            [asMenuButton]="true"
          >
            <fudis-dropdown-menu>
              <fudis-dropdown-menu-item
                [label]="'Open new dialog'"
                (handleClick)="openDialogFromMenu(dialogFromMenu)"
              ></fudis-dropdown-menu-item>
            </fudis-dropdown-menu>
          </fudis-icon-button>
        </fudis-dialog-content>
      </fudis-dialog>
    </ng-template>

    <ng-template #dialogFromMenu>
      <fudis-dialog> ... </fudis-dialog>
    </ng-template>

// Typescript

  @ViewChild('menuTrigger', { static: false, read: ElementRef }) menuTrigger?: ElementRef<HTMLButtonElement>;

  openDialogFromMenu<T = any>(dialogFromMenu: TemplateRef<T>) {
    const dialogRef = this._dialogService.open(dialogFromMenu, { restoreFocus: false });
    const buttonElement = this.menuTrigger?.nativeElement.querySelector('button');
    dialogRef.afterClosed().subscribe(() => {
      buttonElement?.focus();
    });
  }
```

#### Accessibility

- Focus is trapped inside the dialog
- Initial focus is set to heading defined with `fudisDialogTitle` directive, when using keyboard
- Focus returns to dialog launcher when it is closed
  - See exception in [Focus Management](#focus-management) section
- Dialog can't be closed with outside click
- Dialog can be closed with keyboard Escape
- Dialog content is scrollable with keyboard and mouse
- Dialog heading and action buttons are always visible, even if content is scrollable

#### Related components

- [Angular Material Dialog](https://material.angular.io/components/dialog/overview) (opens in new tab)
- [Icon](/docs/components-icon--documentation)
- [Button](/docs/components-button--documentation)
- [Heading](/docs/components-typography-heading--documentation)
- [Form](/docs/components-form-form--documentation)

---

## Wizard

### Design Guidelines

#### Käyttö yleisesti

- Wizardeja käytetään tiedon vaiheistettua lisäämistä/muokkaamista/käsittelyä varten
- Wizardeja käytetään pidemmissä prosesseissa, joissa käsitellään paljon tietoa ja, jota monessa tapauksessa joudutaan tarkastamaan/validoimaan suhteessa toisiinsa (edeltävässä vaiheessa annetut tiedot vaikuttavat seuraavan vaiheen tietoihin)
- Pystytään vaiheistamaan tarkastuksia ja etenemistä, jolloin käyttökokemus ei ole niin kuormittava
- Pystytään välttämään valtavan pitkät formit
- Pystytään välttämään lomakkeen muutoksia sen täyttämisen aikana

#### Asemointi ja sisältö

- Wizardeja käytetään focused modessa
- Murupolkua ei näytetä
- Toiminnot alaoikealla
- Pyritään siihen, että painikkeita ei koskaan disabloida > nappia painaessa validaatiovirheet
- Pyritään siihen, että ei tabeja eikä expandableja wizardien sisälle
- Mikäli wizardin stepin sisältö on pitkä, mieti voisiko tilanteen jäsentää useampaan eri steppiin

#### Wizarding vaiheet

##### Ensimmäinen vaihe (start)

Toiminnot: Jatka

##### Keskivaiheet (middle)

Toiminnot: Edellinen, Jatka

##### Viimeinen vaihe (End)

- Wizarding viimeinen vaihe on esikatselu ja vahvistus, jossa esitetään tehtävät muutokset, sekä mihin muutokset vaikuttavat ja missä on virheitä
- Vaiheen oletusnimi on "Esikatsele ja vahvista"
- Vaihe ei sisällä toimintoja tai valintoja.
- Toiminnot: Edellinen, Vahvista (Vahvista -termiä voi muuttaa käyttökontekstin mukaan)

#### Toiminnon vahvistus

Kun käyttäjä vahvistaa tiedot, näytetään alert toiminnon onnistumisesta/epäonnistumisesta.

#### fudis-wizard-progress (aka. stepper)
ADD MISSING TEXT HERE

#### Toiminnon virheistä ilmoittaminen

##### Virheilmoitus-notifikaatio

- Wizardin toiminnon virheistä pyritään kertomaan viimeisessä "Esikatsele ja vahvista" -vaiheessa
- Sivulla näytetään contextual notifikaatio, jossa on tieto toiminnon suorittamisessa ilmenneistä virheistä ja linkiksi tyylitelty painike josta aukeavassa dialogissa on tarkempia tietoja toiminnon virheistä

##### Virheiden tiedot dialogissa

Virherivit näytetään info-dialogissa olevassa taulussa.

#### Empty state

Näytetään empty-state -teksti kun wizardissa ei ole mitään valittavaa.

Jos käyttäjä yrittää jatkaa wizardissa eteenpäin siitä huolimatta, että ei voida tarjota mitään valittavaa, näytetään empty state -tekstin yläpuolella punainen contextual notifikaatio, jossa kerrotaan tilanteesta.

Esimerkki notifikaation tekstistä: "Valituilla opintojaksoilla ei ole kopioitavia tuotepaketteja. Palaa edelliseen näkymään ja tee uudet valinnat."

#### Poistu tallentamatta muutoksia

Jos käyttäjä yrittää poistua, näytetään käyttäjälle vahvistusdialogi ja varoitetaan tallentamattomista muutoksista.

#### Saavutettavuus

- Komponenttia käytetään vain wizardissa
- Vaiheen edessä on numerointi 1, 2, 3
- Aktiivinen vaihe on alleviivattu ja font-weight: 600
- Komponentilla on oletuksena aria-label: "Toiminnon vaiheet".
- Aria-label on muokattavissa käyttökontekstin mukaan esim. "Hakemuksen tekeminen – toiminnon vaiheet"
- Komponentin jokaisella vaiheella on aria-label: Vaihe 1/5 Wizard, Vaihe 2/5 Wizard
- Huomioi sivun title (kts. kohta Saavutettavuus, Sivun title)

PUUTTUU TECHNICAL IMPLEMENTATION OSIO!!

---

## Tabs

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=6017-1066

#### Käyttö yleisesti

- Figmaan rakennettu kaksi eri variantia suunnittelua varten: primary ja secondary, ja lisäksi karuselli-variantit molemmille.
- Karuselli-variantia käytetään silloin kun tabeja on enemmän eivätkä ne mahdu koko leveydelle.
- Tabeissa lukumäärä näytetään tabin otsikon jälkeen suluissa.

#### Otsikoinnista

- Huomioitava, että tabien alla tulee esittää otsikko. Tabissa esitetty otsikko ei riitä saavutettavuuden näkökulmasta.
- Tabin alla voi olla useampi saman heading-tason otsikko.
- Otsikon tulee olla sama tai tarkempi kuin tabin oma label.

#### Etäisyyksistä

- Tabien välinen etäisyys: 8 px
- Tilaa ennen ensimmäistä tabia (tab-rivin vasemmassa reunassa): 16 px
- Etäisyys primary- ja secondary-tabrivien välillä: 16 px
- Primaryn korkeus on 40px (4 rem) kun luetaan mukaan viiva.
- Secondaryn korkeus on 32px.

#### Esimerkkejä ja ohjeistuksia tabien jäsentymisestä

##### Jäsentyminen isompaan, esim. desktop-leveyteen

Sivuilla olevat chevron-painikkeet eivät tällöin näy.

##### Jäsentyminen pienempään, esim. mobiilileveyteen

Käytetään esim mobiilinäkymissä tai tilanteissa, kun kaikki tabit eivät mahdu samalle riville koko näkymän leveydelle.

Huom! Chevron-painikkeet tulevat näkyviin silloin, kun jommalla kummalla sivulla karusellia on näytettävää tavaraa. Jos jommalla kummalla puolella karusellia ei ole näytettävää, chevron-painike ei silloin näy.

#### Typografia

Fudiksen tabeissa käytetään kaikilla tabline-tasoilla (primary&secondary) samaa suunniteltua m-koon tekstityyliä. Katso Foundations > Typography > Other UI text styles / Muut kälissä käytetyt tekstityylit.

### Technical Implementation

Tab Navigation is a component that provides an easy way to navigate between different sections of your app using routes.

#### Usage Guideline

The Tab Navigation consists of three components, the `TabNavigationBarComponent`, `TabNavigationTabComponent` and `TabNavigationPanelComponent`. It is meant to be used with a router of your choice. You can also use the `TabNavigationBarComponent` and `TabNavigationTabComponent` without the `TabNavigationPanelComponent` but then you have to implement some of the accessibility features yourself. More detailed information is in the Examples-section.

It has two variants, `primary` and `secondary`. Common property that is required by all three, is an unique identifier `id`.

##### Tab Navigation Bar

The `TabNavigationBarComponent` component takes in the `id`, `variant`, `ariaControls` and `panel` props. The `panel` will be a reference to the `TabNavigationPanelComponent` component, that is needed by the Tab Navigation Bar to implement accessibility functionalities. If the `TabNavigationPanelComponent` is not used, `panel` prop is not needed, but then you need to declare the `ariaControls` prop, that is a reference to the element id where the tab panel content is presented.

```
<fudis-tab-navigation-bar
  [id]="'fudis-tab-navigation-1'"
  [variant]="'primary'"
  [panel]="navigationTabPanel">
  ...
</fudis-tab-navigation-bar>
```

##### Tab Navigation Tab

Nested inside the `TabNavigationBarComponent` you have to add content, that are the tabs. You can choose to use `button`- or `a`-tags, mixing them is also acceptable. These require a `fudis-tab-navigation-tab` attribute and two props, `id` and `active`. **You have to provide the event handlers or/and attributes you need to implement the routing logic yourself.**

###### Button

```
<button
  fudis-tab-navigation-tab
  [id]="'some-id-here'"
  [active]="isActive"
  {{ I'm a button! }}
</button>
```

###### Link

```
<a
  fudis-tab-navigation-tab
  [id]="'some-id-here'"
  [active]="isActive"
  {{ I'm a link! }}
</a>
```

##### Tab Navigation Panel

As a sibling you have to add the `TabNavigationPanelComponent` that is for viewing your content by using an router outlet of your choice, that you nest inside the component. You also have to add a reference to the component, as you will have to pass it to the `TabNavigationBarComponent` as a property.

```
<fudis-tab-navigation-panel [id]="'fudis-panel-1'" #navigationTabPanel>
  ...
</fudis-tab-navigation-panel>
```

#### Examples

These examples are written using angular router as an reference. **However, you can use a router of your choice.**

##### Usage with the Tab Navigation Panel (recommended)

This example shows the usage with the `TabNavigationPanel`. Here `ariaControls`-prop is not needed, as the panel id is passed internally to the tabs to create the needed `aria-controls` attribute.

```
<fudis-tab-navigation-bar
  [id]="'fudis-tab-navigation-1'"
  [variant]="'primary'"
  [panel]="navigationTabPanel">
  @for (route of routes; track route.id) {
  <button
    fudis-tab-navigation-tab
    (click)="change(route)"
    [active]="activeLink === route.path"
    [id]="route.id">
    {{ route.label }}
  </button>
  }
</fudis-tab-navigation-bar>
<fudis-tab-navigation-panel [id]="'fudis-panel-1'" #navigationTabPanel>
  <router-outlet />
</fudis-tab-navigation-panel>
```

##### Usage without the Tab Navigation Panel

If however, for some reason you can't use the `TabNavigationPanel` (for example the tab panel container is in a different component than the navigation-bar), you can implement the tab navigation panel yourself. The element needs to have the `role` of `tabpanel`, an `id` and a `aria-labelledby` that references to the current active tab `id`.

First you create a `tab-navigation-bar` with the `aria-controls`-prop and add the `fudis-tab-navigation-tab`s inside it.

```
<fudis-tab-navigation-bar
  [id]="'fudis-tab-navigation-1'"
  [aria-controls]="'tab-panel-1'"
  [variant]="'primary'"
  @for (route of routes; track route.id) {
  <button
    fudis-tab-navigation-tab
    (click)="change(route)"
    [active]="activeLink === route.path"
    [id]="route.id">
    {{ route.label }}
  </button>
  }
</fudis-tab-navigation-bar>
```

Then, in the same or separate component of your choice, you declare a container, where you project the content with your router. In this example we have an active tab with id of `active-tab-1`. The `aria-labelledby` attribute value has to be updated dynamically to correspond the tab `id` that is currently active.

```
<div id="tab-panel-1" role="tabpanel" aria-labelledby="'active-tab-1'">
  <router-outlet />
</div>
```

It is also important, that the navigation bar and the panel are located next to each other as siblings, even if they are in separate components.

#### Accessibility

- The active tab is marked with `aria-selected` and the ones that are inactive, have a tabindex of -1, so the user can skip the tab listing with tab. Navigation between the tabs is done by left- and right arrow keyboard buttons.
- Tabs can be selected with space and enter keyboard buttons.
- The tabs are referencing the tab panel with `aria-controls`.
- Tab panel content is linked to the corresponding tab with `aria-labelledby`.

---

## Section

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3278-1049

#### Käyttö yleisesti

- Section on html-semanttinen ryhmä joka ryhmittää sisältöä.
- Section-elementtejä voi asettaa sisäkkäin (nested).
- Sectionilla on aina oltava kuvaava otsikko (heading). Otsikon tyyli voi vaihdella ja se määräytyy pitkälti sivuston muun otsikkorakenteen mukaan.
- Kuten muillekin otsikoille, myös sectionin otsikolle tulee määritellä otsikkotaso.
- Myös expandable on html-semanttisesti section.

#### Tilat ja lisäosat

- Vähimmillään visuaalisesti section on vain otsikko (heading).
- Tarvittaessa headingin perään voidaan lisätä info(-ikoni).
- Tarvittaessa sectionin oikeaan yläkulmaan voidaan lisätä painikkeita.
- Mahdollinen sectionin ohjeteksti.
- Mahdollinen sectionin notifikaatio (ei virhevalidaatio).

#### Käyttötapauksia

##### Lukutilainen näkymä

Esimerkki sectionista lukutilaisen (read-only) tiedon esittämiseen, muokkauspainikkeella varustettuna.

ESIMERKKI PUUTTUU!

##### Section ja fieldset -lomakkeessa

Esimerkki siitä, miten section ja fieldset asettuvat osaksi lomaketta.

ESIMERKKI PUUTTUU!

#### Expandablen section -rakenne

Kun expandable on osa isompaa sectionia, sectionin otsikko on esim. H2-tasoa, ja haitarien (expandablejen) omat otsikot ovat seuraavaa tasoa, esim. H3.

^ EPÄSELVÄ - PUUTTUUKO TÄSTÄ JOTAIN? 

### Technical Implementation

Section is a semantic wrapper component for grouping elements. Everything within one Section should be related.

#### Usage Guidelines

Section has two main areas: header and content. Inside header, addition to heading title, there can be notifications and buttons.

##### Header

Each Section should be identified, therefore `title` and its `level` are mandatory properties. Title variant can be modified with `titleVariant` property. As in [Heading Component](/docs/components-typography-heading--documentation), title variant is visual and level is semantic adjustment.

Heading can also include `popover` with all the [Popover](/docs/directives-popover--documentation) Inputs available. It also requires an additional label `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information".

##### Content Directives

**fudis-section-content**: The main content of the Section is added through Fudis Section Content directive.

```ts
<fudis-section-content>
  <fudis-body-text>Main content of the section</fudis-body-text>
</fudis-section-content>
```

**fudis-section-actions**: Buttons are added through Fudis Section Actions directive. Buttons have fixed positions and cannot be altered.

```ts
<fudis-section-actions>
  <fudis-button [label]="'Some action'"></fudis-button>
</fudis-section-actions>
```

##### Nesting Sections Inside Sections

Avoiding too complex page structure is recommended, but if you have a need to nest Sections inside Sections, make sure that heading level order is considered for accessibility. Nested Section's `level` input property should be lower than its parent Section's `level`.

```ts
<fudis-section
  [title]="'Parent Section'"
  [titleVariant]="'lg'"
  [level]="2"
  >
  <fudis-section-content>
    <fudis-section
      [title]="'Nested Section'"
      [titleVariant]="'md'"
      [level]="3" >
      <fudis-section-actions>
        <fudis-button [label]="'Nested Action button'"/>
      </fudis-section-actions>
      <fudis-section-content>
        <fudis-body-text>Main content of the section</fudis-body-text>
      </fudis-section-content>
    </fudis-section>
  </fudis-section-content>
</fudis-section>
```

##### Using Section With Form and Error Summary

When using Section inside [Form](/docs/components-form-form--documentation) with [Error Summary](/docs/components-form-error-summary--documentation), you can set Section title to be part of the link titles in the Error Summary by setting `errorSummaryBreadcrumb` to `true`.

**Note!** Similar `errorSummaryBreadcrumb` feature is available in [Fieldset](/docs/components-form-field-set--documentation) and [Expandable](/docs/components-expandable--documentation) components as well. If you are nesting these components, e.g. Section > Expandable > Fieldset, consider enabling breadcrumb in only one of these to avoid excessively long link texts. Usually the lowest level element is the safe choise.

#### Accessibility

- Section Component uses native `` element <-- NATIVE WHAT ELEMENT?
- Section and its title is linked to its content by aria-describedby
- Section title must be provided with `level` property

#### Related components

- [Button](/docs/components-button--documentation)
- [Heading](/docs/components-typography-heading--documentation)
- [Popover](/docs/directives-popover--documentation)

---

## Expandable

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1582%3A18934

#### Regular

##### Käyttö yleisesti

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

##### Mitat

- Default: vasemmalla 40px, ylhäällä ja alhaalla 24px, oikealla 24px.
- Default (mobiili, 320 px): kaikilla puolilla 24px.

##### Default (closed)

Esimerkki suljetusta haitarista, jossa näkyy vain otsikko.

##### Haitarin vaihtoehtoisia tiloja & liitännäisiä

- Haitarin oikeaan laitaan voi tarvittaessa lisätä valikon (button ja pudotusvalikko).
- Haitarin otsikon perään voi tarvittaessa lisätä badge.
- Vaihtoehtoinen tekstirivi otsikon alle: `[additionalTitle]`.

#### Lite

##### Käyttö yleisesti

- Alimman tietotason haitari.
- Kevyin haitari-variantti.
- Käytä esim. tilanteissa missä on jotain ei niin tärkeää sivu- tai ohjetietoa jota käyttäjä voi halutessaan lukea.

Vältä haitarin käyttöä:

- Jos tieto on käyttäjälle tärkeää tai välttämätöntä toiminnon kannalta. Tällöin voi olla parempi että tieto pysyy koko ajan näkyvillä.
- Jos sivun tiedot ovat niin vähäiset että ne ovat kerralla silmäiltävissä. Tällöin yksittäisen tiedon piilottaminen ei oikein ole perusteltua.

- Haitarit näytetään lähtökohtaisesti kiinni - tilanteesta riippuen haitarit voidaan näyttää myös oletuksena auki (esim. opintojen rakenne, viestit). Pyritään kirjaamaan suunnitelmille miten kyseisessä tilanteessa haitarit oletuksena toimivat.
- Haitari on lähtökohtaisesti otsikkotaso. Huomioi tämä annotoidessa otsikkojärjestystä.

##### Mitat

- Default: kaikilla puolilla 24px.
- Sivu-marginaalit on tapauskohtaisesti mahdollista poistaa.

##### Default (closed)

Esimerkki suljetusta haitarista, jossa näkyy vain otsikko.

### Technical Implementation

Fudis Expandable is an accordion component where its content can be expanded or collapsed to create more compact pages.

**Table of Contents:**

- [Commonly Used Properties](#commonly-used-properties) <-- DOES NOT WORK; TITLE DOES NOT EXIST>
- [Content Projection](#content-projection)
- [Examples](#examples) <-- DOES NOT EXIST>
- [Expandable as Form's Child Component](#expandable-as-forms-child-component) <-- DOES NOT EXIST>
- [Accessibility](#accessibility)
- [Properties](#properties) <-- DOES NOT EXIST>

#### Variant

Fudis Expandable has two variant types: `regular` and `lite`.

#### Opening and Closing Programatically

Expandable is by default closed; this can be programatically controlled with the `closed` input property.

#### Heading Level

To define which h-level the Expandable heading is, provide suitable `level` attribute. E.g. number `1` defines the Expandable as `h1` element, number `2` defines it as `h2` etc.

#### Content Projection

Expandable's content and additional header buttons are provided via content projection by using directive selectors `fudisExpandableContent` and `fudis-expandable-actions`.

Reason why Expandable Content is not used with similar syntax as other content projection, is to enable lazy loading of its contents. Other content slots should be visible right from the start, but closed Expandable content is initialized only after it is opened for the first time.

```
<fudis-expandable [title]="'Some title'" [level]="2">
  <fudis-expandable-actions>
    <fudis-button />
  </fudis-expandable-actions>
  <ng-template fudisExpandableContent>
    <your-body-template />
  </ng-template>
</fudis-expandable>
```

All buttons wrapped in the `` tags will appear to the right side of the header bar and on sm-sized screen they move to their own level.

The content of the Expandable is not initially rendered to the DOM. Content will be initialized when the Expandable is expanded for the first time. This helps to avoid unnecessary requests to the backend (among other expensive operations). Subsequent closing/expanding only hides the content instead of removing it from the DOM, for the same reason.

About using lazy initalisation with content projection, see [Angular example of conditional content projection](https://angular.io/guide/content-projection#conditional-content-projection) for more background.

#### Property `openOnErrorSummaryReload`

If Expandable has any form field components, e. g. Text Input as its child content, they are not loaded to HTML DOM until Expandable is opened for the first time.

This can cause syncing issues with Form and Error Summary, because Text Input and other form field components send data to Error Summary only after they are loaded to the DOM.

To ease this issue, property `openOnErrorSummaryReload` is by default `true`: If Expandable is a child component of [Form Component](/docs/components-form-form--documentation), the Expandable will open itself whenever [Error Summary Service's reloadFormErrors()](/docs/services-error-summary--documentation#reloadformerrors) is called.

#### Property `errorSummaryBreadcrumb`

Input `errorSummaryBreadcrumb` is a boolean that determines whether the Expandable title is shown in the breadcrumb of Error Summary. This can be useful if Form structure is nested where there is a validatable forms in the contents of the Expandable.

Note: If there is Fudis Form components, such as Fudis Text Input, as Expandable's content, the Expandable must be first opened (and loaded to the DOM) before Error Summary gets information about invalid Form components.

#### Accessibility

- Variant regular's heading background and text color contrast ratio meets AA and AAA levels.
- Variant lite's heading uses primary-color variable (`--fudis-color-primary`) which is set in the root of the application. Make sure the application's primary-color contrast ratio meets WCAG AA and AAA levels.
- Expandable title is a required property.
- Header buttons and the Expandable content are semantically correct and accessible by screen readers.
- Information about the Expandable's closed state is conveyed to screen readers.
- Header expanding block and the additional buttons have a visible focus state
- Header expanding block and the additional buttons' click can be triggered with keyboard `enter` and `space` key
- Support for semantic heading aria-level for screen reader users. The Expandable semantic level can be changed via the level input. Changing the level does not affect to the appearance of the component.

##### Related components

- [Button](/docs/components-icon--documentation)
- [Icon](/docs/components-icon--documentation)

---

## Description List

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=754-550

#### Regular

##### Käyttö yleisesti

Description list (regular) -komponenttia käytetään ns. lomakkeiden lukutilassa, ja kun halutaan esittää tietoa tilavammassa muodossa.

##### Käyttötapauksia ja liitännäisiä

Description list -komponenttiin on mahdollista lisätä painike. Termiin voidaan tarvittaessa yhdistää myös info-ikoni, käännökset (kielipallurat) ja väliotsikko.

###### Väliotsikko

Labelin alle voidaan lisätä tarvittaessa väliotsikko.

###### Muokkaus (edit-painike)

Muokkaa-painikkeen aria-label esim.: "Muokkaa [kentän label] tietoja".

##### Tiedon esittäminen

###### Lista

Arvo voi olla yksi paragrafi mutta myös esim. lista arvoja.

###### Ei annettua arvoa (sisältö puuttuu)

Mikäli tekstikentässä ei ole mitään arvoa, näytetään empty state -teksti, esim. "Ei arvoa".

###### Koodit

- Pyritään siihen, että koodi näytetään aina (esim. opintojakso, koulutus, tutkinto-ohjelma).
- Pyritään siihen, että koodi tulee aina ensin.
- Koodi erotetaan muusta tiedosta pilkulla.
- HUOM! Opintolaatikossa koodilla oma paikka.

Esimerkki: "HIS1234, Antiikin historian perusteet"

###### Opintopisteet

Pyritään siihen, että opintopisteet tulevat aina lopussa.

###### Numeeriset arvot

- **Yksikkö**: Kun esitetään numeerisia arvoja, näytetään yksikkö aina arvon perässä (ei labelissä kuten lomakekentissä). Esimerkki: "5 op"
- **Vaihteluvälillinen arvo**: Mikäli käytetään tekstikentässä arvoa tulee käyttää jotain seuraavista esitystavoista: "väh. 5 op", "5–10 op", "maks. 10 op"

##### Asemointi

Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations.

###### Sisällytty description list (nested)

Description list -komponentit voi tarvittaessa sisällyttää toistensa sisälle. Tämä mahdollistaa description list -ryhmän "otsikoinnin" ilman heading-komponenttia.

Description list -compact-elementtien väliin ei lisätä erillistä marginaalia kun niitä on sisällytetty toistensa sisälle (0px) — välistys toteutuu komponenttien sisällä.

##### Responsiivisuus

Description listin tekstit pysyvät aina saman kokoisina eli näyttökoon pienentyessä description listin tekstit eivät pienene.

##### Käännökset (kielipallurat)

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1694%3A18982

Description list -komponenttien sisällön käännösten valitseminen ja tilat.

###### Variaatiot

- **Active**: Aina kun käännös on valittu, myös silloin kun sisältö puuttuu.
- **Inactive**: sisältö ei puutu.
- **Missing + inactive**: sisältö puuttuu.
- **Focus**

###### Käyttötapaukset

Aktiivinen kielipallura on aika samanlainen, vaikka sisältöä ko. kielellä ei olisikaan.

###### Saavutettavuus

- Kielipallura-ryhmän aria-label esim.: "Käännöskielet".
- Muokkaa-painikkeen aria-label esim.: "Muokkaa [kentän label] tietoja".

###### Käännökset (label+tooltip)

Kielipalluran aria-label muodostuu mallilla: "Vaihda käännöskieleksi [Kieli]", täydennettynä tarvittaessa "(Käännös puuttuu)" jos käännöstä ei ole kyseisellä kielellä, ja "(Valittuna)" jos kieli on parhaillaan valittuna.

#### Compact

##### Käyttö yleisesti

Description list (compact) -komponenttia käytetään kun halutaan esittää tietoa tiiviimmässä muodossa, esimerkiksi hakemuksen meta-tietojen esittämiseen.

##### Käyttötapauksia ja liitännäisiä

###### Muokkaus

Description list -komponenttiin on mahdollista lisätä painike (esim. muokkaa).

###### Valikko

Valikkopainikkeen aria-label esim.: "Lisävalinnat".

##### Asemointi

###### Sisäkkäinen description list (nested)

Description list -komponentit voi tarvittaessa sisällyttää toistensa sisälle. Tämä mahdollistaa ikäänkuin description list -ryhmän otsikoinnin ilman heading-komponentteja. Huomioi, että sisäkkäistä description listaa tulee käyttää harkiten. Huomioi aina, että description list sisältää termi + arvo -pareja. Sisäkkäisestä description lististä osoitetietojen täyttäminen on hyvä esimerkki.

HUOM! Description list -compact -variantille ei saa asettaa erillisiä ikoneita (esim. infopallura) toisin kuin tavalliselle description listille. Ikonin asemointi description listin compactin osalta labelin kanssa aiheuttaa haasteita. Mikäli on tarve käyttää description listin labelille ikonia (esim. infopallo), käytä silloin tavallista description list -varianttia.

##### Saavutettavuus

### Technical Implementation

Description List displays a list of key value pairs and has two different list variants: `regular` and `compact`.

##### Text Content

Term and Details content is passed through `contentText` Input property.

```ts
<fudis-dt [contentText]="'This is Term element text'" />
<fudis-dd [contentText]="'Here is the Details element text'" />
```

**Note!** Although with Details element it also works, that content is just passed between `` tags, it is primarily used for nesting additional content e.g. another list or a button.

##### Details Subheading

Details element has also `subHeading` Input for adding optional sub-heading between Term and Details elements. Single Description List Item can have multiple Details elements if necessary.

```ts
<fudis-dl>
  <fudis-dl-item>
  <fudis-dt [contentText]="'I am the main Term text content'" />
  <fudis-dd [subHeading]="'I am Details Sub heading'" [contentText]="'I am first Details element'" />
  <fudis-dd [contentText]="'I am second Details element'" />
</fudis-dl-item>
</fudis-dl>
```

##### Tag Selection

By default Description List Component, as its name suggests, renders a `tag with child` and ``tags. If you have only one item in your list, it is adviced to change`tag`property to`p`. When set, the component will render a paragraph element instead of a list.

```ts
<fudis-dl [tag]="'p'">
  <fudis-dl-item>
    <fudis-dt [contentText]="'Single Item Key'"/>
    <fudis-dd [contentText]="'And value for that'"/>
  </fudis-dl-item>
</fudis-dl>
```

#### Managing Layout

By default Description List uses Grid Directive under the hood and the component accepts multiple inputs from Grid API. For full list see [Properties](#description-list-properties) table. Grid can be disabled in Description List by setting `disableGrid` as true.

Add margins and paddings to the dl element by adding `classes` with desired Core spacing helper classes, e.g.

```ts
<fudis-dl [classes]="'fudis-mt-xl fudis-pl-md'">...</fudis-dl>
```

##### Empty State

When Details has no relevant data, set `emptyState` to `true` in order to display visually different content with default text. The text can be altered via `emptyStateContentText` if needed.

##### Nesting Lists and Sub-Components

When nesting Description List as sublist, the nested one should have `variant` set to `compact`.

[Popover](/docs/directives-popover--documentation) can be added to Description List Item Term (``) element by using `popoverText`and`popoverPosition`(optional) properties. It also requires an additional label`popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information". While it works on both Description List variants, it is designed to be used only with **regular** variant.

Also, it is possible to incluce e.g. [Button Component](/docs/components-button--documentation) or other interactive elements inside Description List Item Details (``). The following example displays, how button is used inside the Description List in various ways.
Description List Item Details has `ariaLabel` input which is recommended to apply when using classified/hidden content.

##### With Language Badge Group

Description List with [Language Badge Group](/docs/components-language-badge-group--documentation) displays Term element with clickable language badges. Clicking a badge sets Details content visible, which have corresponding language set. While it works on both Description List variants, Language Badge Group is designed to be used only with **regular** variant.

By default Language Badge Group always displays badges for Finnish, Swedish and English, in this order. To define different config to Application's Language Badges, use `FudisTranslationService` function `setSelectableLanguages()`.
Check documentation at [FudisTranslationService](/docs/services-translation--documentation#translation-service).

Set ``element's`lang` attribute to tell which translation it represents.

```ts
<fudis-dl>
  <fudis-dl-item>
    <fudis-dt [contentText]="'Example Languages'" />
    <fudis-dd [lang]="'en'" [contentText]="'This is in English'" />
    <fudis-dd [lang]="'fi'" [contentText]="'Tämä on suomeksi'" />
    <fudis-dd [lang]="'sv'" [contentText]="'Den här är på Svenska'" />
  </fudis-dl-item>
</fudis-dl>
```

Description List components communicate with each other and automatically define Language Badge Group visibility. Each button, for each of the languages set in `setSelectableLanguages()`, is themed properly according to provided languages in Details components.

##### Accessibility

- Description List component wraps list content into `dl` element
- Each description term is contained within a `dt` element
- Each description details is contained in one or more `dd` element
- `dd` elements are placed directly after `dt` element
- Translated `dd` content is marked with a correct language attribute

##### Related components / directives / services

- [Grid](/docs/components-grid-grid--example)
- [Icon](/docs/components-icon--icon)
- [Button](/docs/components-button--button)
- [Language Badge Group](/docs/components-language-badge-group--documentation)
- [FudisTranslationService](/docs/services-translation--documentation#translation-service)

---

## Text Input

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=442%3A135

#### Käyttö yleisesti

- Käytetään lomakkeella kun sisällöksi odotetaan korkeintaan lyhyttä lausetta/lauseita.
- Jos odotettu sisältö ei mahdu kokonaan kentän sisään, voi olla syytä käyttää text-area-komponenttia.

### Technical Implementation

Text Input is a form field element, which renders HTML element `` with associated label and other guidance texts.

Text Input type options are `text` (default), `email`, `number`, `password`, `tel` and `url`.

##### Mandatory Properties

Necessary properties for Text Input are `label` and `control`.

##### Autocomplete

`autocomplete` will add native HTML autocomplete attribute to the input which will then provide automated assistance in filling out form field values.
Accepted values are:

- off
- on
- autofill detail tokens (list can be found from different accessibility resources outside of Fudis)

NOTE: When using `autocomplete`, one must also provide HTML `name` attribute in order the filling assistance to work properly.

##### Popover

Popover can be added to the label with [Popover](/docs/directives-popover--documentation) properties. It also requires an additional label `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information".

##### Validators and Error Handling

Text Input uses Fudis Validators. See the full documentation on [how to use Fudis Validators](/docs/utilities-validators--documentation).

If a custom validation is needed, read [how to add Error message](/docs/components-form-error-message--documentation).

#### Accessibility

- Label and guidance are linked to the text-input via id
- Screen reader is informed when maximum character length has 5 characters left and when maximum character count is reached
- Possibility to add HTML autocomplete attribute to help filling out form field values

#### Related Directives

- [Popover](/docs/directives-popover--documentation)

---

## Text Area

### Design Guidelines

Storybook: https://fudis.funidata.fi/v/2.0.1/index.html?path=/docs/components-form-text-area--documentation

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=442%3A135

#### Käyttö yleisesti

Käytetään lomakkeella kun sisällöksi odotetaan täysiä lauseita tai pidempää tekstiä, käytetään text-area-komponenttia.

#### Koko ja sisältö

- Text arealle voi olla määriteltynä max-merkkimäärä (esim. "0/500"). Oletuksena sinne voi lisätä loputtomasti tekstiä.
- Ikonista käyttäjä voi vaikuttaa kentän korkeuteen ja nähdä enemmän sisältöä kerralla. Leveyteen ei fudis-gridin puitteissa voi vaikuttaa.

### Technical Implementation

Text Area Component is a form field input element rendering a HTML `textarea` element with associated label and other guidance texts.

#### Usage Guidelines

Text Area can only be resized vertically, horizontal resizing is disabled to avoid layout breaking.

##### Mandatory Properties

Necessary properties for Text Area are `label` and `control`.

##### Popover

Popover can be added to the label with [Popover](/docs/directives-popover--documentation) properties. It also requires an additional label `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information".

##### Validators and Error Handling

Text Area uses Fudis Validators. See the full documentation on [how to use Fudis Validators](/docs/utilities-validators--documentation).

If a custom validation is needed, read [how to add Error message](/docs/components-form-error-message--documentation).

#### Accessibility

- Label and guidance are linked to the `textarea` HTML element via id
- Screen reader is informed when maximum character length has 5 characters left and when maximum character count is reached

#### Related Directives

- [Popover](/docs/directives-popover--documentation)

---

## Localized Text Group

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=442-135

#### Käyttö yleisesti

- Käytetään lomakkeella kun tekstisisältö voidaan syöttää useammalla kielellä (fi, sv, en).
- Tekstikentän tyyppi (Input type) voi olla tarpeen mukaan fudis-text-input tai fudis-text-area.
- Kieli valitaan puolella olevasta pudotusvalikosta.
- Jos lomakekenttä on pakollinen, sisältö on tyypillisesti pakollinen vain yhdellä kielellä.

#### Huomioitavaa

Localized text group -komponentti on rakennettu siten, että siinä olevat molemmat input-kentät ovat semanttisesti saman groupin sisällä. Tällä groupilla on ruudunlukijoille luettava oma erillinen group label, jolla kuvataan että kentät ovat samaa ryhmää. Tämä ruudunlukijoille luettava otsikko ei ole näkyvissä näkevälle käyttäjälle. Näkevälle käyttäjälle kentät ovat visuaalisesti niin sidoksissa toisiinsa, että otsikolle ei nähty olevan tarvetta. Näin ollen kuitenkin on hyvä huomioida että ohjetekstien on oltava erityisen selkeät.

Localized text group -komponentin valintaosiota voidaan hyödyntää myös muuhun tarkoitukseen kuin kielen valitsemiseen.

#### Puuttuva käännös (text-input)

Puuttuvan käännöksen perään lisätään "(puuttuu)"-label kielivalinnassa. Esimerkki: "sv (puuttuu)".

#### Kielivalinnan variaatiot (fudis-language-options)

Kielivalinnan oma label ("Kieli") käännetään käyttöliittymän kielen mukaan: "Kieli" (fi) / "Language" (en) / "språk" (sv).

### Technical Implementation

Localized Text Group is a form component, where a text form field (left side) is paired with selected dropdown option (right side).

Its primary use is to provide an editor tool, where user can type same content in different languages. E.g. some description text or content title needs to be in all application languages.

#### Key Properties

Its API and functionality is very similar to other basic form components, e. g. [Text Input Component](/docs/components-form-text-input--documentation) and [Text Area Component](/docs/components-form-text-area--documentation).

Most important input properties are:

- `label`: Mandatory visible label text
- `variant`: By default `text-input` which renders an input HTML element. For longer texts variant `text-area` can be used to render a `textarea` element.
- `formGroup`: Mandatory Angular Form Control, described in the next section
- `options`: Option list paired with Form Controls, described in the next section

##### Pairing Form Group with Selectable Dropdown Options

Component requires an Angular FormGroup as `formGroup` property. Each control in this `formGroup` represents one selectable option from the Select dropdown.

###### Default Options

Selectable options is defined by an array property `options`, which has a **default value** of:

```
options = [
  { controlName: 'fi', label: 'FI' },
  { controlName: 'sv', label: 'SV' },
  { controlName: 'en', label: 'EN' },
]
```

With this default value, the FormGroup should have a following structure:

```
formGroup = new FormGroup<FudisLocalizedTextGroupDefaultFormGroup>({
  fi: new FormControl<string | null>(null),
  sv: new FormControl<string | null>(null),
  en: new FormControl<string | null>(null),
}),
```

This way the `options` property `controlName: 'fi'` is paired with the FormGroup's control with key `fi`.

###### Customised Options

In similar fashion, if `options` array is defined like this:

```
options = [
  { controlName: 'klingon', label: 'KLI' },
  { controlName: 'elvish', label: 'ELV' },
  { controlName: 'dothraki', label: 'DOT' },
]
```

Then the FormGroup should look like this to match with each selectable option:

```
interface MyCustomType {
  klingon: FormControl<string | null>;
  elvish: FormControl<string | null>;
  dothraki: FormControl<string | null>;
}

formGroup = new FormGroup<MyCustomType>({
  klingon: new FormControl<string | null>(null),
  elvish: new FormControl<string | null>(null),
  dothraki: new FormControl<string | null>(null),
}),
```

#### Error Validation

As expected, the component's `formGroup` and / or its child controls can have validators. The component will show and list all the validation errors it recognizes even if the invalid option is not currently selected.

To make sure component displays validation error messages correctly, check [Fudis Validator](/docs/utilities-validators--documentation) guidelines for instructions.

##### Popover

Popover can be included in the checkbox group fieldset with properties from [Popover Directive](/docs/directives-popover--documentation). It also requires an additional label `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information".

##### With at least One Required

The `formGroup` property of this example is defined like this:

```ts
formGroup = new FormGroup<T>(
  {
    fi: new FormControl<string | null>(null, [
      FudisValidators.maxLength(15, "Too long Finnish name"),
    ]),
    sv: new FormControl<string | null>(null, [
      FudisValidators.maxLength(20, "Too long Swedish name"),
    ]),
    en: new FormControl<string | null>(null, [
      FudisValidators.maxLength(25, "Too long English name"),
    ]),
  },
  [FudisGroupValidators.oneRequired("Give name in at least in one language")],
);
```

##### With All Required

The `formGroup` property of this example is defined like this:

```ts
formGroup = new FormGroup<T>({
  fi: new FormControl<string | null>(null, [
    FudisValidators.required("Missing superhero name on Finnish."),
    FudisValidators.minLength(5, "Too short Finnish name"),
    FudisValidators.maxLength(10, "Too long Finnish name"),
  ]),
  sv: new FormControl<string | null>(null, [
    FudisValidators.required("Missing superhero name on Swedish."),
    FudisValidators.minLength(5, "Too short Swedish name"),
    FudisValidators.maxLength(15, "Too long Swedish name"),
  ]),
  en: new FormControl<string | null>(null, [
    FudisValidators.required("Missing superhero name on English."),
    FudisValidators.minLength(5, "Too short English name"),
    FudisValidators.maxLength(20, "Too long English name"),
  ]),
});
```

#### Accessibility

- Label text above and Guidance texts below the input field are connected to the form field.
- Currently selected option is communicated with aria-label of the text input field
- Component and Select dropdown can be navigated and interacted with keyboard
- All validation errors are listed below the input field, even if invalid option is not currently selected from the dropdown
- The Select dropdown labels have an additional 'Missing' text, if that option is required or it has invalid value

#### Related Components, Directives and Utilities

- [Text Input Component](/docs/components-form-text-input--documentation)
- [Text Area Component](/docs/components-form-text-area--documentation)
- [Select Component](/docs/components-form-select-select--documentation)
- [Popover Directive](/docs/directives-popover--documentation)
- [Validators](/docs/utilities-validators--documentation)

---

## Checkbox

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1276-13572

#### Käyttö yleisesti

- Käytetään silloin kun on tarve vain yhdelle valinnalle.
- Huom! Checkbox on oma checkbox-groupista erillinen itsenäinen komponenttinsa. Se ei siis ole checkbox groupin osa tai variant.
- Komponentilla ei ole erillistä näkyvää legendiä/otsikkoa.
- Pakollisuutta esitetään option-tekstin perässä seuraavalla syntaksilla: (pakollinen). Tämä on huomioitava case-by-case suunnittelussa ja viestittävä kehittävälle päälle. Tyyli on sama kuin muillakin inputien pakollisuusmerkinnöillä.
- Checkboxin klikkausalue on checkbox input -alue (valintaruutu) + teksti. Mahdollisella linkillä on oma klikkausalueensa.
- Option-teksti ei ole pakollinen (esimerkiksi taulukoissa voi esiintyä pelkkä valintaruutu). Jos option-tekstiä ei ole, on tarjottava ruudunlukijakäyttäjälle aria-labelled by -tieto (huomioitava suunnittelussa että mikä teksti!).
- Loppukäyttäjän on mahdollista aina poistaa valinta.
- Huom! Toisin kuin groupilla, itsenäisen checkboxin sisään on mahdollista laittaa linkki. Linkki voi esiintyä missä kohtaa vain optionin tekstissä.
- Virhesanomien osalta vastuu käyttävällä päällä. Tämä on mahdollisuuksien mukaan huomioitava case-by-case suunnittelussa ja viestittävä kehittävälle päälle.

#### Checkbox tilat

Tyylillisesti samat kuin groupin osalla (yksittäinen checkbox). Kts. guidelines Fudis-checkbox-group → Tilat.

#### Käyttötapaukset

##### Boolean valinta "toggle"

Komponenttia voidaan käyttää boolean arvon valintaan yksistään (valittu/ei valittu).

Esimerkkejä:

- Käyttöliittymässä kun on tarve korvata esim. vanhoja toggle-switchejä saavutettaviksi. Valinta tuo näkymään esille/piilottaa asioita.
- Taulukot.
- Valintatilanteeseen, kun ei ole tarvetta pakollisuudelle.

HUOM! Jos on tarve pakollisuudelle yksittäisen checkboxin osalta, käytä silloin groupia jossa pakollisuutta ilmaistaan legendin yhteydessä.

##### Esimerkkejä

- Käyttöliittymästä esim. piilotetaan tai näytetään jotain valinnan mukaan. Ao. esimerkki: Opettajan Opetukseni -näkymä.
- Erilaisten ehtojen hyväksymiseen. Huomioi inputien leveyden maksimimitat.
- Tentit ja kokeet.

### Technical Implementation

Single **Checkbox** is designed for binary (yes/no) decisions. It is suitable when there is only **one option to select**. For scenarios requiring multiple selections, use the [CheckboxGroupComponent](/docs/components-form-checkbox-group--documentation) instead.

Unlike `CheckboxGroupComponent`, Checkbox component allows custom content (such as links) and does not require a label. However, to ensure accessibility, you must provide an `ariaLabelledBy` attribute if a visible label is not used.

> **Note!** Checkbox does **not display error messages** automatically. FudisValidators are used for validation purposes but it's end users responsibility to handle and display validation messages externally if needed. Therefore `FudisValidators.required(' ')` does not require any validation message.

When creating a custom error message use `ariaDescribedBy` attribute for linking error message with a Checkbox input.

##### Code Example

```

// In TypesScript

  myFormGroup = new FormGroup(
    {
      required: new FormControl<boolean | null>(null, FudisValidators.required('This error message will not show'))
    }
  );

// HTML template

  <form [formGroup]="myFormGroup">
    <fudis-checkbox
      [label]="'Yes, I accept terms.'"
      [ariaDescribedBy]="'description-id'"
      [control]="myFormGroup.get('required')">
      <a fudisLink href="https://www.example.com" [title]="'Terms descriptions'" [external]="true"></a>
    </fudis-checkbox>

    @if (myFormGroup.get('required')?.invalid && myFormGroup.get('required')?.touched) {
      <p id="description-id">
        "This is a custom error message, linked with ariaDescribedBy attribute."
      </p>
    }
  </form>

```

##### Code Example without visible label

This Checkbox does not have a visible label, but instead it has passed id in `ariaLabelledBy` pointing to the 'Hidden label' text.

```
      <fudis-checkbox
        [control]="control"
        [ariaLabelledBy]="'id-label'"
          <p class="fudis-visually-hidden" id="id-label">Hidden label</p>
      </fudis-checkbox>

```

#### Accessibility

- Checkbox has associated label
- When label is not provided, aria-labelledby is provided for linking associated label to input
- All displayed custom error messages are linked with aria-describedby to checkbox input

---

## Checkbox Group

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1276%3A13572

#### Käyttö yleisesti

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

#### Checkbox-group tilat

Virheviesti seuraa ulkoisesti lomakekenttien toteutusta.

##### Tilat

Yksittäisen option-checkboxin mahdolliset tilat: Default, Focus, Error, Selected, Disabled.

### Technical Implementation

CheckboxGroup is a form fieldset element constructing from `fieldset`, `legend` and `` elements.

It is built by using parent wrapper of CheckboxGroupComponent and adding CheckboxGroupOptionComponents as its children.

#### Parent CheckboxGroup

CheckboxGroup's **required properties** are `formGroup` which is an Angular FormGroup typed object and `label` which is set as the fieldset legend.

FormGroup must be built with Angular FormControls, which can have a type of `FormControl`.

Providing `formGroup` for the parent allows including [validators for the CheckboxGroup](#validators-with-form-group).

#### Child Checkbox

Child checkbox's **required properties** are `controlName` and `label`. Checkbox's `controlName` must match with the corresponding control in the main `formGroup`.

##### Code Example

```
// In TypeScript file

interface MyCheckboxGroup {
  email: FormControl<boolean | null>;
  sms: FormControl<boolean | null>;
  phoneCall: FormControl<boolean | null>;
}

myFormGroup = new FormGroup<MyCheckboxGroup>(
  {
    email: new FormControl<boolean | null>(null),
    sms: new FormControl<boolean | null>(null),
    phoneCall: new FormControl<boolean | null>(null),
  }
);

myOptions = [
  {label: 'Email', controlName: 'email'},
  {label: 'SMS', controlName: 'sms'},
  {label: 'Phone call', controlName: 'phoneCall'},
]

// HTML template

<fudis-checkbox-group
  [formGroup]="myFormGroup"
  [label]="'Select contact method'"
  (handleChange)="handleChange($event)">
  @for (option of myOptions; track option.controlName) {
    <fudis-checkbox-group-option
      [controlName]="option.controlName"
      [label]="option.label"
      (handleChange)="checkboxChange($event)" />
    }
</fudis-checkbox-group>
```

#### Validators with Form Group

To use validators with CheckboxGroup, please provide `formGroup` property to it.

When FormGroup has validation errors, the visual and screen reader attributes about invalid state is triggered when user blurs out first time outside of focusable options.

##### Required Validator

To mark CheckboxGroup as a required field, include validator `FudisGroupValidators.oneRequired()` or `FudisGroupValidators.min()` in the validators array of `formGroup`.

```
// In TypeScript file

myFormGroup = new FormGroup(
  {
  // controls
  },
  [FudisGroupValidators.oneRequired('At least one option must be selected.')]
);

// In HTML template

<fudis-checkbox-group
  [formGroup]="myFormGroup"
  [label]="'Choose one option'"
  >
  // Checkboxes
</fudis-checkbox-group>

```

##### Minimum and Maximum Selection Validators

If CheckboxGroup has minimum and/or maximum options to be selected, include `FudisGroupValidators.min` and/or `FudisGroupValidators.max` in the group validators.

```
// In TypeScript file

myFormGroup = new FormGroup(
  {
    // controls
  },
  [
    FudisGroupValidators.min({value: 2, message: 'Select at least two.'}),
    FudisGroupValidators.max({value: 3, message: 'Too many selected. Three is the maximum.'})
  ]
);
```

#### Handling Changes

Both CheckboxGroup and Checkbox have `handleChange` output property.

##### Output for CheckboxGroup

When clicking any of the child Checkboxes, the parent's property `handleChange` will emit an object with properties:

- changedControlName: Name of the checkbox's control, which was clicked
- formGroup: Current state of the Form Group

##### Output for Checkbox

When clicking Checkbox, property `handleChange` will emit an object with properties:

- checkbox: `FudisCheckboxGroupOption` typed object consisting of various data
- control: Current Form Control of the Checkbox

##### Popover

Popover can be included in the checkbox group fieldset with properties from [Popover Directive](/docs/directives-popover--documentation). It also requires an additional label `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information".

#### Accessibility

- Fieldset has a legend as its first child element
- When selection is mandatory, it is communicated with 'Required' text using validators
- Checkbox options are grouped by name attribute
- Guidance help text has been added to the Checkbox Group's legend element and made accessible to screen readers
  > **Note! Help text should be brief**
- Possible error messages are displayed after user blurs out from the whole checkbox group

---

## Datepicker

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2844%3A22892

#### Käyttö yleisesti

- Käytetään päivämäärän valintaan.
- Huom! Placeholder-tekstin järjestys aina suomenkielen mallilla (dd.mm.yyyy), eli ei esim. tarjota tukea englanninkieliselle järjestykselle. Huomioidaan kuitenkin kielistys eli että käytetään oikeaa kieltä.
- Date picker avataan kalenteri-ikonista.
- Kenttää kohdistettaessa voidaan päivämäärä kirjoittaa suoraan kenttään.

### Technical Implementation

Datepicker allows user to select a date either from calendar pop-up or by typing it to the text input.

Datepicker is built with the help of [Angular Material's Datepicker](https://material.angular.io/components/datepicker/overview).

##### Mandatory Properties

Datepicker requires `control` and `label` properties.

```
<fudis-datepicker
	[label]="'Select a date'"
	[control]="control" />
```

##### Optional properties

Popover can be included in the datepicker fieldset with properties from [Popover Directive](/docs/directives-popover--documentation). It also requires an additional label `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information".

##### Validators and Error Handling

Fudis form components use Fudis Validators. See the full documentation on [how to use Fudis Validators](/docs/utilities-validators--documentation).

**Datepicker validators**

- required
- datepickerMin
- datepickerMax

If a custom validation is used, read [how to add Error message](/docs/components-form-error-message--documentation).

In addition Datepicker has internal **date format validator** which prompts error message if Fudis is not satisfied with given date's format. This validator can be turned off by setting `dateParse` to `false`.

**Datepicker with Date filter**

DateFilter takes in a function for controlling selectable dates in the calendar.
DateFilter works the same way as Angular Material's `matDatepickerFilter`.

The function receives a date and must return:

- `true` → the date is allowed and remains enabled in the calendar
- `false` → the date is not allowed and will be disabled in the calendar

DateFilter allows you to implement custom validation logic such as disabling weekends, holidays, or any dates that don't meet application-specific rules.
Custom validations always requires the use of a custom error messages. Read [how to add Error message](/docs/components-form-error-message--documentation).

Unlike using simple `datepickerMin` or `datepickerMax` restrictions, using a filter function does _not_ stop users from navigating the calendar past filtered-out dates.
It only controls which dates can be selected, not which months or years can be viewed.

```
// In TypeScript file

weekendFilter: (d: Date | null): boolean => {
	const day = (d || new Date()).getDay();
	// Prevent Saturday and Sunday from being selected.
	return day !== 0 && day !== 6;
	},

// HTML template

<fudis-datepicker
	[label]="'Select a date'"
	[control]="control"
	[dateFilter]="weekendFilter" />

```

#### Localization

Currently datepicker parses the display date to Finnish format of `DD.MM.YYYY` and calendar's first day of the week is Monday by default.

The language of the calendar listens to `lang` attribute value of `html` element, e.g. ``. This localizes date picker calendar to respective supported language.

Current list of languages supported are:

- English, `lang="en"` which translates to ISO language value of 'en-GB'
- Finnish, `lang="fi"` which translates to ISO language value of 'fi-FI'
- Swedish, `lang="sv"` which translates to ISO language value of 'sv-SE'

#### Accessibility

- Datepicker has label and id connected to the input
- Guidance and error messages are connected to the input via id
- Datepicker has a visible focus state both on input and calendar icon
- Calendar dialog can be triggered from the calendar icon with keyboard `enter` and `space` key
- User can navigate inside the calendar dialog with keyboard `arrow` keys
- User can type the date directly to the input without opening the calendar dialog

#### Related components

[Icon](/docs/components-icon--documentation)

[Date Range](/docs/components-form-date-date-range--documentation)

[Angular Material Datepicker](https://material.angular.io/components/datepicker/overview)

#### Related directives

[Popover](/docs/directives-popover--documentation)

---

## Date Range

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2844%3A22892

#### Käyttö yleisesti

- Käytetään ajanjakson valintaan (alku- ja päätöspäivä).
- HUOM! Date range -valinnan ei ole pakko olla fieldset-elementin sisällä jos konteksti ja kenttien labelit ovat riittävän selkeät, vaikka kyseessä onkin fieldset.
- HUOM! On päätetty että kenttien välillä ei ole viivaa.

#### Käyttötapaukset

##### Lopetuspäivä määräytyy erillisen valinnan mukaan

- Disabloidaan kenttä ja lisätään ohjetekstiin pakollinen selite miksi kenttä on disabloitu.
- Disabloidaan kenttä vain jos kentän arvo määräytyy erillisestä valinnasta.
- Ohjeteksti esim.: "Määräytyy opintojakson voimassaolon mukaan."

##### Aloituspäivä määräytyy erillisen valinnan mukaan

Aloituspäivä määräytyy erillisen valinnan mukaan ja päivämäärän tieto on lisätty kenttään jos tieto on teknisesti saatavilla.

#### Date range ja virhevalidaatiot

Molemmilla inputeilla on omat kontrollit joille voidaan antaa min- ja max-arvoja. Date rangen osalta molemmille input-kentille (fudis-datepicker) tehdään omat validaationsa eli validaatio tapahtuu lomakekentän tasolla (ei siis ns. fieldsetin tasolla). Validoidaan käyttäjän tekemät virhevalinnat aina input-tasolla ja kerrotaan virheistä inputin alla.

##### Virheviestien esimerkkejä

- **Pakollinen arvo valitsematta**: "Aloituspäivä puuttuu" / "Lopetuspäivä puuttuu"
- **Lopetuspäivä on ennen aloituspäivää**: "Aloituspäivä ei voi olla lopetuspäivän jälkeen" / "Lopetuspäivä ei voi olla ennen aloituspäivää"
- **Aloituspäivä ennen sallittua aikaa**: "Aloituspäivä voi olla aikaisintaan 5.9.2024"
- **Lopetuspäivä sallitun ajan jälkeen**: "Lopetuspäivä voi olla myöhäisintään 5.9.2024"

#### Date range ja otsikointi (legend)

Date rangella ei ole välttämätöntä olla otsikkoa (legendiä). Riittää että input-kentillä on labelit. Huom! Koska date-range koostuu kahdesta erillisestä datepickeristä, niin silloin molemmilla inputeilla on oltava labelit, toinen ei voi jäädä ilman sitä. Suunnittelussa arvioidaan tapauskohtaisesti onko tarvetta otsikolle (esim. voimassaoloaika tmv.) ja tällöin date range asetetaan Fieldsetin sisään. Näissä tapauksissa fieldsetille tulee aina myös legend. Legendillä on tällä hetkellä oletustyyli jota ei voi muuttaa.

#### Date range ja responsiivisuus

Sijoitetaan input-kentät aina vierekkäin myös mobiilissa, koska kentät liittyvät toisiinsa.

### Technical Implementation

Fudis Date Range is component combination of two [Datepickers](/docs/components-form-date-datepicker--documentation).

#### Usage Guidelines

Wrap two Datepickers inside ``selector with respective directives`fudisDateStart`and`fudisDateEnd`. Please see code example above for usage pattern.

Provide mandatory `label` and `control` properties for both Datepickers.

##### Validators

Fudis has two internal validators for dates. First, **date format validator** which prompts error message if Fudis is not satisfied with the given date's format.
Second, **date comparison validator** which prompts error message if start date is after end date. These validators can be turned off if wanted.

Set `dateParse` to `false` for Datepicker Component to disable date format errors.

Set `dateComparisonParse` to `false` for parent Date Range Component to disable date comparison errors.

#### Related components

[Datepicker](/docs/components-form-date-datepicker--documentation)

---

## Calendar Popup

### Design Guidelines

Storybook: https://funidata.github.io/fudis/main/?path=/docs/components-form-date-datepicker--documentation

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2844%3A22892

#### Käyttö yleisesti

Käytetään fudis-date ja fudis-date-range -kentissä päivämäärän valintaan.

Kalenterissa on kaksi näkymää: Date (päivät) ja Year (vuodet).

#### Date range ja Calendar-popupit

Käyttäjää voidaan ohjata Calendar-popupin valinnoissa.

Esimerkki: Estetään jälkimmäisessä input-kentästä avautuvasta popupista käyttäjää valitsemasta esimerkiksi aikaisempia päivämääriä kuin ensimmäiseen input-kenttään on valittuna, jos lopetuspäivä ei voi olla ennen aloituspäivää.

HUOM! Tämä toimintalogiikka ei tule automaattisesti Fudiksesta. Toiminto täytyy lisätä tai kehittää erikseen Sisun/Inton puolella.

---

## Radio Button

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=1276%3A13572

#### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Suositellaan käyttöä jos alle 5 valittavaa arvoa (https://www.nngroup.com/articles/listbox-dropdown/).
- Ensisijaisesti valinta on oletuksena tyhjä.
- Valintaa ei voi poistaa.
- Komponentilla on oltava aina erillinen, näkyvä legend.
- Radio button groupissa pitää olla vähintään kaksi valintaa.
- Radio button group on semanttisesti fieldset, mutta se käyttäytyy samoin kuin yksittäinen lomakekomponentti.
- Leveys tulee groupia ympäröivältä fieldsetiltä. Groupeissa on fieldset.

#### Radio-button tilat

Yksittäisen radio-buttonin mahdolliset tilat: Default, Focus, Error, Selected, Disabled.

#### Radio-button-group tilat

- Tilat: Default, Error.
- Virheviesti seuraa ulkoisesti lomakekenttien toteutusta.

### Technical Implementation

Radio Button Group is a form fieldset element constructing from `fieldset`, `legend` and `` elements.

It is built using parent wrapper of Radio Button Group Component and adding Radio Button Components as its children.

##### Parent Radio Button Group

Mandatory properties for Radio Button Group are `label` and `control`. Radio Button Group has to have **at least** two Radio Buttons and should **not be used** with only one option available.

##### Child Radio Button

Radio Buttons can be provided as an array of `FudisRadioButtonOption` objects.

Radio Button component's mandatory properties are `label` and `value`.

##### Code Example

```
// In TypeScript file

const control: FormControl = new FormControl(null, FudisValidators.required('You must choose a fruit'));

const fruitOptions: FudisRadioButtonOption<object>[] = [
  { value: 'apple', label: 'Apple' },
  {
    value: 'fair-trade-banana',
    label: 'Fair Trade Banana',
  },
  { value: 'cherry', label: 'Cherry' },
];

// HTML template

<fudis-radio-button-group
    [control]="control"
    [label]="'Pick a fruit'"
    (handleChange)="handleChange($event)"
  >
    @if (option of fruitOptions; track option.value) {
      <fudis-radio-button [label]="option.label" [value]="option.value" />
    }
  </fudis-radio-button-group>

```

#### Handling Changes

Radio Button Group has `handleChange` output property.

##### Output for Radio Button Group

When clicking any of the child Radio Buttons, the parent's property `handleChange` will emit an object with properties:

- option: `FudisRadioButtonOption` typed object consisting of id, value and label data of the Radio Button
- control: Current FormControl of the Radio Button Group

#### Accessibility

- Fieldset has a legend as its first child element
- When selection is mandatory, it is communicated with 'Required' text using validators
- Radio Button options are grouped by name attribute
- Guidance help text has been added to the Radio Button Group's legend element and made accessible to screen readers
  > **Note! Help text should be brief**
- Possible error messages are displayed after user blurs out from the first Radio Button option

---

## Select

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3506-21730

#### Pudotusvalikoiden sisältö

- Tuetaan käyttäjää laittamalla valinnat aakkosjärjestykseen. Valintoja voidaan jäsentää väliotsikoiden avulla.
- Käyttäjälle on mahdollisuus tarjota valinnan lisätietoa eli main- ja sub-sisältö.
- Tietyn tyyppisten pudotusvalikoiden sisältö ja järjestys määrittyy kuitenkin automaattisesti koodistoista. Esimerkiksi opiskelijoiden tiedoissa kotikunta, kansalaisuus ja sukupuoli saadaan koodiston kautta, joten pudotusvalikon sisältöön ei ole mahdollista vaikuttaa.
- Myös koodistojen sisällön järjestys on korkeakoulujen itse muokattavissa, joten senkään osalta suunnittelussa ei ole mahdollista ottaa kantaa missä järjestyksessä vaihtoehtojen tulisi olla.

#### Pudotusvalikoiden leveys

Pudotusvalikoiden leveyksissä noudatetaan samoja leveys-vaihtoehtoja kuin lomakkeen inputeissa (kts. guidelinesin kohta fudis inputs (general) -> Form komponentin enimmäisleveydet). Leveydet ovat siten nämä kolme:

- large: 368px (default)
- medium: 224px
- small: 160px

#### Option-rakenne (main + sub label)

Optionilla voi olla pääsisältö (`fudis-select-option_label_main`) ja lisätietoa antava alalabel (`fudis-select-option_label_sub`).

SubLabelin voi lisätä sekä tavalliseen selectiin että multiselectiin. SubLabelia voi käyttää myös disabloiduissa optioneissa.

#### Dropdown

##### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Sisältää erikseen avattavan pudotusvalikon.
- Ei hakurajausta.

##### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Tilat: Default, Focus, Hover, Disabled (ei valittavissa).

###### Selected (with/without clear button)

- Tehty valinta näytetään input-kentän sisällä, mukana on tyhjennä valinta -painike.
- Tarvittaessa tyhjennä valinta -painiketta ei näytetä, jos ei haluta mahdollistaa ns. tyhjää valintaa.

#### AutocompleteDropdown

##### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Sisältää erikseen avattavan pudotusvalikon, sekä hakurajauksen.

##### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Input-kenttään voi syöttää hakurajauksen.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus, Hover, Selected, Disabled (ei valittavissa).

###### Selected (with/without clear button)

- Tehty valinta näytetään input-kentän sisällä, mukana on tyhjennä valinta -painike.
- Tarvittaessa tyhjennä valinta -painiketta ei näytetä, jos ei haluta mahdollistaa ns. tyhjää valintaa.

#### AutocompleteType

##### Käyttö yleisesti

- Käytetään lomakkeessa kun valitaan vain yksi arvo.
- Sisältää hakurajauksen.

##### Tilat

- Hakutulokset listautuvat pudotusvalikkoon.
- Input-kenttään syötetään haku.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus, Selected.

###### Selected (with/without clear button)

- Tehty valinta näytetään input-kentän sisällä, mukana on tyhjennä valinta -painike.
- Tarvittaessa tyhjennä valinta -painiketta ei näytetä, jos ei haluta mahdollistaa ns. tyhjää valintaa.

### Technical Implementation

Select Component is a form component displaying a dropdown list of selectable options to choose a single value.

#### Common Properties and Features

Select Component shares multiple common features with Multiselect Component, such as labels, popover, autocompletion and grouping of options.

Therefore please check also [Common Features](/docs/components-form-select-common-features--documentation) documentation.

#### Form Control

Select Component requires Angular Form Control. Type and value of control can be either `null` or `FudisSelectOption`.

```
// TypeScript

defaultOption: FudisSelectOption<string> = {value: 'default-option-id', label: 'Default Option'}

myControl: new FormControl<FudisSelectOption<string> | null>(defaultOption)

// HTML Template

<fudis-select [control]="myControl">
  ...
</fudis-select>

```

---

Select and Multiselect components share multiple common features.

Most notable common API feature is grouping options and choosing if component is either a regular dropdown or an autocomplete component filtering dropdown options according to user's text input.

**List of Contents**

- [Basic Form Component Attributes](#basic-form-component-attributes)
- [Variants with Autocomplete Features](#variants-with-autocomplete-features)
- [Adding Options](#adding-options)
- [Grouping Options](#grouping-options)

##### Label (Mandatory)

Input label, describing selection to be made from the select dropdown options.

##### Help Text

Additional help text to provide description or instructions what user is expected to choose from the select's options.

##### Size

Width of the component. Accepted values are `lg`, `md` or `sm`. By default the size is `lg`.

##### Placeholder

Placeholder text shown in the component, when it has no chosen value.

##### Popover

Popover can be included with properties from [Popover Directive](/docs/directives-popover--documentation). It also requires an additional `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains only an icon, so it is required to inform the user what it is for, for example _"Additional information"_.

##### Selection Update

Select and Multiselect Components provide `@Output` event emitter `selectionUpdate` for cases if application needs to do something special if the form control value changes. Output of the event emitter in Select is either `null` or `FudisSelectOption` and for Multiselect `null` or an array `FudisSelectOption[]`.

```
// TypeScript

mySelectionUpdate(option: FudisSelectOption<T> | null):void {
  console.log(option)
}

// HTML Template

<fudis-select (selectionUpdate)="mySelectionUpdate($event)">
  ...
</fudis-select>

```

##### Usage Example

Example using Select component. Same input attributes work as well with Multiselect Component using `` selector.

```
<fudis-select
  [label]="'Your favorite day of the week'"
  [helpText]="'Choose one of the seven available options.'"
  [size]="'md'"
  [placeholder]="'Your favorite day'"
>
...
</fudis-select>
```

##### Validators and Error Handling

It is recommended to use Fudis Validators with Fudis form components. See the full documentation on [how to use Fudis Validators](/docs/utilities-validators--documentation).

If a custom validation is required, read [how to add Error message](/docs/components-form-error-message--documentation).

#### Variants with Autocomplete Features

Both Select and Multiselect have three variants:

- dropdown:
  - Default basic select dropdown
  - Opens on focus
  - Chevron icon is visible
- autocompleteDropdown:
  - The input field of the component changes into a text input, where user can type to filter selectable results by their visible label
  - Opens on focus
  - Chevron icon is visible
- autocompleteType
  - Similar to autocompleteDropdown
  - User must type 3 letters before any selectable results are shown
  - Initially a search icon is visible and after typing 3 letters, it changes to a button which can be used to clear the typed text

##### Default Filtering Logic and Manually Filtering Options e.g. from Backend

By default, Select with Autocomplete assumes, that all available options are always loaded to the DOM and from user input it will hide or show matching options.

In real world applications there are cases, that for performance, it is unfeasible to always load all options to the DOM. Select and Multiselect has a property `autocompleteFilter`, when set to `false`, it disables default filtering logic.

This combined with Output property `filterTextUpdate` application can listen to user's input, do their own filtering logic and then load options to the DOM.

Example Stories for manual autocomplete filtering:

- [Select](/story/components-form-select-select--backend-simulation)
- [Multiselect](/story/components-form-select-multiselect--backend-simulation)

##### Selection Clear Button Boolean

By default `selectionClearButton` is set to boolean `true`. Whenever user has made a valid selection from the options, the clear button can be clicked to clear the selection. This will set the component's `FormControl` to `null`.

When `selectionClearButton` is set to `false`, the clear button is not visible.

##### Autocomplete Help Text

By default autocomplete variants, when user has typed anything, display a help text "Showing X results". This can be disabled by setting `autocompleteHelpText` property to boolean `false`. Or by overriding it with your own string help text.

##### Example Usage

```
<fudis-select
  [variant]="autocompleteDropdown"
  [autocompleteHelpText]="'Hello from autocompleteHelpText'"
  [selectionClearButton]="false"
  ...
>
...
</fudis-select>
```

#### Adding Options

Documentation for including selectable options for both Select and Multiselect can be found from [Select and Multiselect Option documentation](/docs/components-form-select-select-and-multiselect-option--documentation).

#### Grouping Options

Sometimes there is need to categorize and group options. Especially if list of options is long and might have options which are nearly identical but are under different sub-category.

To group options, wrap them using `SelectGroupComponent`. It has two possible HTML selectors: `fudis-select-group` and `fudis-multiselect-group`.

Select Group Component **requires** `label` string property.

```
<fudis-select>
  <ng-template fudisSelectOptions>
    <fudis-select-group [label]="'First Group'">
      <fudis-select-option />
      ... and rest of the options for the First Group
    </fudis-select-group>
    <fudis-select-group [label]="'Last Group'">
      <fudis-select-option />
      ... and rest of the options for the Last Group
    </fudis-select-group>
  </ng-template>
</fudis-select>
```

The exactly same component can be used as well with Multiselect Component. Although the component is exactly the same as with Select Component, we recommend to use `` selector.

```
<fudis-multiselect>
  <ng-template fudisSelectOptions>
    <fudis-multiselect-group [label]="'First Group'">
      <fudis-multiselect-option/>
      ... and rest of the options for the First Group
    </fudis-multiselect-group>
    <fudis-multiselect-group [label]="'Last Group'">
      <fudis-multiselect-option/>
      ... and rest of the options for the Last Group
    </fudis-multiselect-group>
  </ng-template>
</fudis-multiselect>
```

---

Select components provide Select and Multiselect form components, where user can make a selection from a dropdown listing all the options.

Both components have their own rules, but share the same API for few features.

#### Common Features

Read about features like autocompletion, and API both Select and Multiselect share.

[Common Features](/docs/components-form-select-common-features--documentation)

#### Select (Single Select)

Examples and documentation for Select Component.

[Select Component](/docs/components-form-select-select--documentation)

#### Multiselect

Examples and documentation for Multiselect Component.

[Multiselect Component](/docs/components-form-select-multiselect--documentation)

#### Select Option & Multiselect Option

Documentation for including selectable options for both Select and Multiselect.

[Select Option & Multiselect Option](/docs/components-form-select-select-and-multiselect-option--documentation)

#### Accessibility

- Components and sub-components have visible focus state
- Disabled state of component and sub-components are communicated both visually and programatically
- Unlike other input elements, disabled select options receive keyboard focus, making them accessible to screen reader users
- Icon buttons have descriptive aria-labels
- Component and sub-components can be navigated and interacted with keyboard and mouse
- Main input is linked with dropdown element and its options

#### Related Components

- [Button](/docs/components-button--documentation)
- [Icon](/docs/components-icon--documentation)

---

Select Option and Multiselect Option Components are separate but really similar components used as child component of Select or Multiselect Components to display a selectable option in the dropdown.

#### Content Directive Properties

To include Select or Multiselect options, you need to wrap them with directive selector **fudisSelectOptions**. This enables lazy loading of options only after dropdown has been opened for the first time.

```
<fudis-select>
  <ng-template fudisSelectOptions>
    ...
    options here
    ...
  </ng-template>
</fudis-select>
```

#### Input Attributes

Select Option and Multiselect Option **require** `data` object property which follows `FudisSelectOption` type. Mandatory entries for data object are `label` and `value`.

```
type FudisSelectOption<T = string> = {
  /** Underlying value of the option */
  value: T;
  /** Value that is shown in the UI */
  label: string;
  /** Secondary, optional label for the option */
  subLabel?: string;
  /** Is option disabled in the dropdown */
  disabled?: boolean;
}
```

##### Select Option

```ts
<fudis-select>
  <ng-template fudisSelectOptions>
    <fudis-select-option
      [data]="{
        value: 'unique-option-value',
        label: 'Visible Label For the Option'
        subLabel: 'Optional secondary label'
      }"
    />
  </ng-template>
</fudis-select>
```

##### Multiselect Option

```ts
<fudis-multiselect>
  <ng-template fudisSelectOptions>
    <fudis-multiselect-option
      [data]="{
        value: 'unique-option-value',
        label: 'Visible Label For the Option',
        subLabel: 'Optional secondary label'
      }"
    />
  </ng-template>
</fudis-multiselect>
```

---

## Multiselect

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=1287-9389

#### Pudotusvalikoiden sisältö

- Tuetaan käyttäjää laittamalla valinnat aakkosjärjestykseen. Valintoja voidaan jäsentää väliotsikoiden avulla.
- Käyttäjälle on mahdollisuus tarjota valinnan lisätietoa eli main- ja sub-sisältö.
- Tietyn tyyppisten pudotusvalikoiden sisältö ja järjestys määrittyy kuitenkin automaattisesti koodistoista. Esimerkiksi opiskelijoiden tiedoissa kotikunta, kansalaisuus ja sukupuoli saadaan koodiston kautta, joten pudotusvalikon sisältöön ei ole mahdollista vaikuttaa.
- Myös koodistojen sisällön järjestys on korkeakoulujen itse muokattavissa, joten senkään osalta suunnittelussa ei ole mahdollista ottaa kantaa missä järjestyksessä vaihtoehtojen tulisi olla.

#### Pudotusvalikoiden leveys

Pudotusvalikoiden leveyksissä noudatetaan samoja leveys-vaihtoehtoja kuin lomakkeen inputeissa (kts. guidelinesin kohta fudis inputs (general) -> Form komponentin enimmäisleveydet). Leveydet ovat siten nämä kolme:

- large: 368px (default)
- medium: 224px
- small: 160px

#### Option-rakenne (main + sub label)

Optionilla voi olla pääsisältö (`fudis-select-option_label_main`) ja lisätietoa antava alalabel (`fudis-select-option_label_sub`).

SubLabelin voi lisätä sekä tavalliseen selectiin että multiselectiin. SubLabelia voi käyttää myös disabloiduissa optioneissa.

#### Dropdown

##### Käyttö yleisesti

- Käytetään lomakkeessa kun voidaan valita useampi arvo (yli 5 valittavaa arvoa).
- Sisältää erikseen avattavan pudotusvalikon.
- Ei hakurajausta.
- Jos valittavien vaihtoehtojen määrä on pieni, voidaan käyttää myös checkbox-group-elementtiä. HUOM! Käytä harkiten, koska ei voi käyttää hakua hyödyntävissä dropdowneissa.
- Huom! Valintojen osalta multiselectissä on käytetty natiivia input-elementtiä (type="checkbox"), eli se ei ole mitenkään yhteydessä Fudiksen Checkbox- tai CheckboxGroup-komponentteihin.

##### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Tilat: Default, Focus, Hover, Active, Disabled (ei valittavissa).

###### Selected (with/without clear button)

- Tyhjennä valinta -painike on mahdollistettu, mutta multiselect-komponentissa sen käyttö on riskialtista, eikä siksi suositeltavaa.
- Tehdyt valinnat listataan input-kentän alapuolella.

###### Selected (valinnat kentän sisällä)

- Tehdyt valinnat on mahdollista näyttää myös input-kentän sisällä.
- HUOM! Varmista, että käyttäjän on mahdollista nähdä kaikki valinnat. Ei voi käyttää hakua hyödyntävissä dropdowneissa.

#### AutocompleteDropdown

##### Käyttö yleisesti

- Sisältää erikseen avattavan pudotusvalikon, sekä hakurajauksen.
- Sisältää aina listatut valinnat input-kentän alapuolella ("chipsit").

##### Tilat

- Pudotusvalikko aukeaa chevronia klikkaamalla.
- Input-kenttään voi syöttää hakurajauksen.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus (open dropdown), Disabled (ei valittavissa).

###### Selected (with/without clear button)

- Tyhjennä valinta -painike on mahdollistettu, mutta multiselect-komponentissa sen käyttö on riskialtista, eikä siksi suositeltavaa.
- Tehdyt valinnat listataan kentän alapuolelle.

#### AutocompleteType

##### Käyttö yleisesti

- Sisältää hakurajauksen.
- Sisältää aina listatut valinnat input-kentän alapuolella ("chipsit").

##### Tilat

- Hakutulokset listautuvat pudotusvalikkoon.
- Input-kenttään syötetään haku.
- Jos väliotsikoita on käytössä, hakurajauksen tulokset näytetään niiden alla.
- Tilat: Default, Focus.

###### Selected (with/without clear button)

- Tyhjennä valinta -painike on mahdollistettu, mutta multiselect-komponentissa sen käyttö on riskialtista, eikä siksi suositeltavaa.
- Tehdyt valinnat listataan kentän alapuolelle.

#### Chipsit

Chipsien tekstit linjataan alkamaan aina vasempaan laitaan (ei siis esim. keskitetysti). Poistoruksi säilyy aina samassa kohdassa chippiä vasemmassa yläkulmassa.

### Technical Implementation

Multiselect Component is a form component displaying a dropdown list of selectable options to choose one or multiple values.

#### Common Properties and Features

Multiselect Component shares multiple common features with Select Component, such as labels, popover, autocompletion and grouping of options.

Therefore please check also [Common Features](/docs/components-form-select-common-features--documentation) documentation.

#### Form Control

Multiselect Component requires Angular Form Control. Type and value of control can be either `null` or `FudisSelectOption[]` array consisting of options.

```
// TypeScript

defaultOptions: FudisSelectOption<string>[] = [{value: 'default-option-id', label: 'Default Option'}]

myControl: new FormControl<FudisSelectOption<string>[] | null>(defaultOptions)

// HTML Template

<fudis-multiselect [control]="myControl">
  ...
</fudis-multiselect>

```

#### Show Selection Chips

By default, Multiselect Component displays a list of selected options as chip buttons under the form field input. This feature is controlled by boolean `showSelectionChips`. Setting it to `false` hides the chip buttons.

> **Note!** There is accessibility concern when Selection Chips are hidden and Multiselect is used with `autocompleteType` or `autocompleteDropdown` variant. Because input field is reserved for typing, user doesn't have indicator for selected options. With these variants, the use of Selection Chips is mandatory.

> Multiselect shares most of its technical implementation with Select — see [Select's Technical Implementation](#select) for Common Features, shared Select/Multiselect behavior, and the Select Option / Multiselect Option directive.

---

## Fieldset

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3490-3608

#### Käyttö yleisesti

- Fieldset on alimman tason html-semanttinen ryhmä joka ryhmittää toisiinsa liittyvät lomakekentät.
- Fieldsetillä on aina sen sisältöä kuvaava legend (ei heading).
- Legend oletuskoot: sm ja md. Figma-komponentissa oletuskoko on sm.
- Fieldset-elementtejä ei voi asettaa sisäkkäin (nested).
- Fieldsetillä voi tarpeen ja tilanteen mukaan olla info-ikoni, ohjeteksti, painike ja/tai notifikaatio.
- Fieldsettiä ei html-semanttisesti käytetä lukutilaisessa lomakkeessa, vaikka ulkoisesti rakenteet muokattavan lomakkeen ja read only -lomakkeen välillä voivat muistuttaa toisiaan.
- Max-width on 368px (23 remiä).

#### Tilat ja lisäosat

- Vähimmillään fieldset on vain otsikko (legend).
- Tarvittaessa legendin perään voidaan lisätä info(-ikoni).
- Tarvittaessa fieldsetin oikeaan yläkulmaan voidaan lisätä painike.
- Tarvittaessa fieldsetin alle voidaan lisätä ohjeteksti.
- Mahdollinen fieldsetin notifikaatio (ei virhevalidaatio).

#### Käyttötapaukset

##### Date-range

Esimerkki fieldsetistä date-range-kenttäparin ympärillä.

##### Lisää/poista sisältöä jossa useampi input (case: Into vastuuorganisaatiot)

Fieldsetiä voidaan käyttää toistuvan, lisättävän/poistettavan sisällön ryhmittämiseen, jossa jokaisella rivillä on useampi input (esim. Into: vastuuorganisaatiot).

#### Asemointi

- HUOM! Fieldsettiä EI sisennetä.
- Fieldsetin sisällä olevaa sisältöä EI sisennetä.
- Etäisyys fieldsetin ohjetekstin ja ensimmäisen kentän (esim. select) otsikon välillä: 16px.

#### Virhevalidaatiot

##### Kenttäkohtaiset virheviestit

Fieldsetissä on lomakekenttiä joilla on omat virheviestit. Esimerkki virheviestistä: "Päättymispäivä ei voi olla ennen alkamispäivää."

##### Fieldsetin oma virheviesti

Fieldsetissä voidaan näyttää notifikaatio.

HUOM. Kyseessä ei ole fieldsetin virhevalidaatio. Lomakkeen validaatio tehdään -ja virheviestit näytetään lomakekentissä.

#### Fieldset ja pakollisuuden merkintä

Fieldset ei voi semanttisesti olla pakollinen, joten ilmaistaan pakollisuutta input-kentän labelin yhteydessä. (Huom. Checkbox- / Radio button -groupien / fieldsettien pakollisuus merkitään myös labelin yhteydessä)

### Technical Implementation

Fieldset is a grouping tool for Form Components. There are two directives to project content: header actions and main content.

#### Content Directives

**fudis-fieldset-content**: Fieldset Content Directive is the wrapper element for the Fieldset main content where all form components live.
There are no restrictions on main content but it is advised to use form field components provided by Fudis to use Form's Error Summary features with less effort.

```
<fudis-fieldset-content>
  <your-content-here />
</fudis-fieldset-content>
```

**fudis-fieldset-actions**: Fieldset Actions Directive is used for positioning buttons next to the Fieldset label.
There are no restrictions on Fieldset Actions content but it is advised to use Buttons only.
**Note!** Fieldset Actions has an `align` property that can be used to determine the positions of Fieldset Actions. By default `align` has value `start`.

```
<fudis-fieldset-actions [align]="'below'">
  <your-action-buttons-here />
</fudis-fieldset-actions>
```

#### Fieldset Inputs

Aside from content projection Fieldset will create a legend with optional popover and help text based on given properties.

##### Legend

Fieldset is not valid without a **mandatory** `label` property which is semantically legend element for the HTML fieldset.

##### Required

If the whole Fieldset is required, it can be set through `required` boolean property which will add '_(Required)_' text after the legend.
Note that this has no other logic and is not concerned about validation of the components used inside the Fieldset.

##### Help Text

Fieldset help text is displayed under legend and can be added through `helpText` property.

##### Popover

Popover can be included in legend with properties from [Popover Directive](/docs/directives-popover--documentation). It also requires an additional label `popoverTriggerLabel` for the button that triggers the popover. This label is only visible for the screen readers. The popover button contains an icon only, so it is required to inform the user what it is for, for example: "Additional information".

##### Error Summary Breadcrumb

Boolean property `errorSummaryBreadcrumb` adds Fieldset label to the clickable link in Error Symmary when used inside Form with visible Error Summary. Set `false` by default.

##### Grid Properties

Fieldset can use some of the Grid properties, including `width` and `align`.

##### Input Size

This can be used to set Checkbox Group and Radio Button Group as wide as other form components by overriding `width` input.

##### Initial Focus

Visible focus can be set with `initialFocus` boolean property. It will add focus for the whole fieldset element when the component is initialized and appears for the first time.

##### Align (Fieldset Actions)

Fieldset Action's `align` is used for positioning Fieldset's Actions Directive flow to `below`, `end` or `start`. By default has value of `start`.

#### Code Example

```
HTML Template

    <fudis-fieldset
      [label]="'Fieldset Legend Label'"
      [helpText]="'Some help text for the Fieldset'"
    >
      <fudis-fieldset-actions [align]="'end'">
        <fudis-button [variant]="'tertiary'" [icon]="'plus'" [label]="'Some action'" />
      </fudis-fieldset-actions>
      <fudis-fieldset-content>
                </fudis-fieldset-content>
    </fudis-fieldset>
```

---

## Form

### Design Guidelines

#### Käyttö yleisesti

Fudis Form is a layout component which enables semantically coherent and easy flow for building forms. It constructs from three main sections: header content, header actions and main content.

#### Otsikko

- Lomakkeen otsikko on pakollinen.
- Otsikkotyyli määräytyy oletuksena otsikkotason mukaan (H1, H2...).
- Otsikkotyyli on yliajettavissa.

#### Lomakekomponenttien tasautuminen

Fudiksen input-komponenttien keskinäinen tasaus toimii siten että fudis-gridin sisällä, samalla rivillä olevat komponentit tasautuvat inputin tekstilaatikon mukaisesti linjaan.

Tasautuminen perustuu LabelHeightServiceen, joka on käytössä kaikissa Fudis-komponenteissa, joissa on käytössä fudiksen Label-komponentti tai Fieldset-komponentti. Käytännössä tämä tarkoittaa sitä, että kaikki Fudiksen lomakekomponentit ovat "tasauksen" piirissä.

Tasaus toimii myös esim. haussa käytettävissä multiselecteissä, eli lomakekomponentin ei ole pakko olla lomakkeen sisällä, jotta tasaus toimii.

Huom! Suunnitellessa muistettava tasata komponentit laatikon mukaisesti.

### Technical Implementation

Form Component is a layout component which enables semantically coherent and easy flow for building forms. It constructs from three main sections: header content, header actions and main content.

##### Heading

Form is not valid without a heading.

Mandatory properties are `title` (visual heading) and `level` (semantic heading level), additionally it is possible to change the variant (visual size) of the heading with `titleVariant`, which otherwise defaults to corresponding level value.

See possible heading levels and variants from [Heading Documentation](/docs/components-typography-heading--documentation).

###### Badge

Badge can be attached to form heading by adding `badge` (variant) and `badgeText` (text content) properties.
See badge variants from [Badge Documentation](/docs/components-badge--documentation).

##### Error Summary

`errorSummaryVisible`: Boolean property controlling the visibility of the Error Summary. This is automatically managed if your Form has Button with `fudisFormSubmit` directive with boolean property `formValid`. Further documentation of [Form Submit Directive](/docs/directives-form-actions--documentation).

`errorSummaryTitle`: Title displayed as describing guidance text for the Error Summary.

More about [Error Summary](/docs/components-form-error-summary--documentation) and [Error Summary Service](/docs/services-error-summary--documentation).

##### Layout

Form Component extends Grid Api Directive which allows the modification and usage of most of the [Grid properties](/docs/directives-grid-grid--documentation).
The complete list of allowed properties can be found from Properties table at the bottom of this page.

#### Content Directives

**fudis-form-header**: Header content is optional information displayed under the actual form heading.
There are no restrictions on content, but it is adviced to only add instructions and other non-interactive content to the header.

```
<fudis-form-header>
  <your-content-here />
</fudis-form-header>
```

**fudis-form-actions**: Form Actions are buttons positioned on top of the form.
There are no restrictions on Form Actions content, but it is advised to use interactive button elements only, e.g. Button Component with [Form Submit directive](/docs/directives-form-actions--documentation#form-submit-with-button) makes it easier to control visibility of Form's Error Summary.

```
<fudis-form-actions>
  <fudis-button fudisFormSubmit [formValid]="myForm.valid" [label]="'Submit form'" (handleClick)="myFormSubmit()" />
  ...other content
</fudis-form-actions>
```

**fudis-form-content**: Form main content is where the form components live.
There are no restrictions on main content but it is advised to use Form Components provided by Fudis as this enables [Error Summary](/docs/components-form-error-summary--documentation) logic with less effort.

```
<fudis-form-content>
  <your-content-here />
</fudis-form-content>
```

#### Code Example

This is a simple example on how to use Form Component.

```
// HTML Template

<fudis-form
  [title]="'Example form heading'"
  [level]="2"
  [helpText]="'Here is some more information about this form'"
>
  <fudis-form-header>
    <fudis-body-text>Even more additional Form information</fudis-body-text>
  </fudis-form-header>
  <fudis-form-actions>
    <fudis-button fudisFormSubmit [formValid]="formExample.valid" [label]="'Submit'" (handleClick)="submitForm()" />
  </fudis-form-actions>
  <fudis-form-content>
    <fudis-text-input
      [label]="'Example text-input'"
      [control]="formExample.controls.exampleTextInput"
    />
  </fudis-form-content>
</fudis-form>

// TypeScript

formExample = new FormGroup({
  exampleTextInput: new FormControl(null, FudisValidators.required('This field is required')),
});

submitForm(): void {
 // Other logic you need to do on submit
}
```

---

## Link

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2859%3A27010

#### Käyttö yleisesti

- Käytetään, kun halutaan ohjata käyttäjä toiselle sivulle.
- Koko määräytyy parentin tekstikoon mukaan. Voidaan määritellä joko koko 'md' (14px) tai 'lg' (16px).

#### Koot

- **fudisLink-lg**: fonttikoko 16px, Regular 400. Käyttö: linkki, tekstikoko lg.
- **fudisLink-md**: fonttikoko 14px, Regular 400. Käyttö: linkki, tekstikoko md.

#### External-ikoni

External-ikoni lisätään uuteen välilehteen avattavalle linkille. Huom! Järjestelmän ulkopuolelle vievät linkit avataan aina uuteen välilehteen.

### Technical Implementation

Link Directive adjusts styles and HTML attributes of any native anchor element with tag ``. The directive allows application to use its own routing solutions, as Link Directive does not take any opinion in this. It only tweaks styling of binded anchor element.

#### Usage Guidelines

To bind anchor element with Link Directive, include `fudisLink` directive selector to it. Directive also requires `title` string property. If your anchor element directs to an external site, add `external` boolean property to it. This will adjust HTML attributes and semantics including a 'new-tab' [Icon Component](/docs/components-icon--documentation).

```ts
<a fudisLink href="https://www.example.com" [title]="'This is external link'" [external]="true"></a>
```

**Note!**

Although inserting text content between ``tags can be done, it is highly recommended only to use`title`property for the text content of the link. With`title`property we can be sure, that only`string`type text is used and Angular change detection can be triggered more reliably with the`title` property.

#### Accessibility

- Link has visible focus
- When Link Directive is set external, an icon indicates new tab for visible users but is hidden from screen readers
- When Link Directive is set external, aria-label has an additional info text about this
- When Link Directive is set external, HTML attributes `rel` and `target` are set properly

---

## Horizontal Rule

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=2341-2193

#### Käyttö yleisesti

Käytetään jakamaan osioita samassa näkymässä, esim. Wizard-näkymässä jakamassa sisältö toiminnoista.

#### Käyttötapauksia

##### Wizard

Horizontal rule jakaa esitettävän sisällön toiminnoista.

### Technical Implementation

Horizontal Rule implies a thematic break between HTML paragraph-level elements.

#### Usage Guidelines

Use `` on your template when you need to visually separate page content. Note that the Horizontal Rule is
hidden from screen readers, so for semantic division accessible to screen readers you need to use a semantic wrapper
like [Section](/docs/components-section--documentation).

#### Accessibility

- Color contrast meets WCAG AA minimum contrast ratio against white `#FFFFFF` background
  - Contrast ratio 4.81:1
  - **NOTE**: When using Horizontal Rule on backgrounds other than white, make sure the color contrast is adequate
- As a purely visual element, Horizontal Rule is hidden from screen readers

---

## Popover

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2859%3A27010

#### Käyttö yleisesti

Käytetään tarvittaessa:

- avautumaan input-kentän info-ikonista, ja esittämään input-kenttään liittyvien lisätietojen esittämiseen.
- selittämään ikonin merkitystä jos näkyvää selitettä ei ole muutoin mahdollista käyttää.

- Aktivoituu käyttäjän klikatessa tietyn elementin päällä.
- Saa pois näkyviltä painamalla esc-näppäintä, klikkaamalla popoverin ulkopuolista aluetta, klikkaamalla popoverin triggeröivää ikonia tai siirtymällä tabilla muualle, tai klikkaamalla muualle.
- Popoverin selitteen tulee olla lyhyt.
- Ruudunlukija lukee popoverin tilasta käyttäjälle siten että se on joko "expanded" tai "collapsed" -tilassa, eli ruudunlukuohjelmaa käyttävä ymmärtää näin myös onko popover näkyvillä vai ei. (Aiemmin ruudunlukija luki koko popoverin sisällön vaikka se ei ollut aktiivisena, eli nyt käyttökokemukset näkevän ja ruudunlukuohjelmaa käyttävän käyttäjän osalta on jatkossa yhdenmukaisemmat.)
- Kehittäjä (eli fudiksen käyttäjä) voi itse määrittää popoverin (mustan tekstilaatikon) sijaintitoiveen. Sijainti kuitenkin käyttäytyy siten, että popover pyrkii aina hakeutumaan näkymään siten että se mahtuu järkevästi sisältöön. Eli popoverin sijainti voi siis elää näytön leveyden mukaan. Defaultina sijainti on aina "bottom" jos käyttäjä ei määritä sitä.

### Technical Implementation

Popover shows contextual help or information about specific element when user clicks on it or presses enter/space key.

#### Usage Guideline

To add popover to any HTML element, add `fudisPopover` directive to it with a string text property `popoverText`. You can also specify a desired position for the popover with optional property `popoverPosition`. The default value is `below`. If the popover does not have enough space in the viewport, it will fallback to a position where is enough space.

Popover is triggered on mouse click and on keyboard enter or space press. Popover content is announced for screen reader users when the element where the popover is anchored is triggered. Popover content is hidden only when the anchored element is triggered again, page content is scrolled or when focus is moved outside the popover with mouse click or keypress.

##### Fudis Components Using Popover Directive

Following components implement Popover Directive to apply popover in semantically correct place.

- [Button](/docs/components-button--documentation)
- [Checkbox Group](/docs/components-form-checkbox-group--documentation)
- [Datepicker](/docs/components-form-date-datepicker--documentation)
- [Description List Item Term](/docs/components-description-list--documentation)
- [FieldSet](/docs/components-form-fieldset--documentation)
- [IconButton](/docs/components-iconbutton--documentation)
- [Localized Text Group](/docs/components-form-localized-text-group--documentation)
- [MultiSelect](/docs/components-form-select-multiselect--documentation)
- [Radio Button Group](/docs/components-form-radio-button-group--documentation)
- [Section](/docs/components-section--documentation)
- [Select](/docs/components-form-select-select--documentation)
- [Text Area](/docs/components-form-text-area--documentation)
- [Text Input](/docs/components-form-text-input--documentation)

##### Accessibility

- Element where popover is binded should always be an interactive element e. g. button.
- Popover content is read to screen readers when the element where the popover is anchored is triggered by key press or mouse click.
- The triggering element relays the information whether the popover content is hidden or visible. This alone is not enough, so the when implementing this popover, it's important to add a describing label, that informs the user what the button is for, for example: "Additional information"

---

## Breadcrumbs

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2860%3A2367

#### Käyttö yleisesti

- Käytetään viestimään sivun rakenteesta.
- Murupolussa listataan sivuston rakenteen mukaiset sivut ja välilehdet.
- Murupolku on aina sivun vasemmassa ylälaidassa, heti navigaation alla.
- Murupolku ei ole käytössä focus-mode:ssa (kts. focus-mode).

#### Rakenne

- Murupolun tasot ovat linkkejä, paitsi viimeinen taso, joka esittää sivua jolla käyttäjä parhaillaan on (ei linkki).
- Fonttikoko: MD.
- Murupolun kohteiden välinen välistys tulee komponentista.

#### Asemointi

- Padding murupolun yläpuolella: 32px.
- Murupolku sijoitetaan sivun otsikon (heading) yläpuolelle.

### Technical Implementation

Breadcrumbs is essentially a navigation element.

#### Usage Guidelines

Breadcrumbs organism is built using parent wrapper of Breadcrumbs Component and adding Breadcrumbs Item Components as its children.

##### Breadcrumbs - Parent Component

Necessary property for Breadcrumbs Component is `label`.

`label` is used as aria-label and it should describe the name of the section breadcrumbs consists from, e.g. _"My profile"_. Aria-label will automatically have a prefix _"Breadcrumbs: "_ which will be followed by the given label.

##### Breadcrumbs Item - Child Component

Breadcrumbs Item has content slots for `and` elements. Existing array of link objects with `label` and `url` properties should be looped through with index. See the code example in the example below.
[BodyText](/docs/components-typography-body-text--documentation) is meant to be rendered for the last link, so it is presented as plain text. It will automatically have `aria-current="page"`.

#### Accessibility

- Breadcrumbs is a `nav` element containing `ul` list of Breadcrumbs Items
- Fudis automatically adds an aria-label to parent to provide additional information about the breadcrumbs
- Each visible Breadcrumbs Item, except the last one, is a link
- The last visible list item has `aria-current="page"` attribute

---

## UI Patterns

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=442-134

Figmaan on koottu kokoelma komponentteja joita hyödynnetään suunnitelmia tehtäessä. Niissä on tyypillisesti yhdistetty useampi fudis-komponentti yhdeksi kokonaisuudeksi.

Kyseisiä komponentteja ei kuitenkaan löydy sellaisenaan fudiksen storybookista.

#### Dropdown Menu (UI pattern)

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=2042-24755

##### Käyttö yleisesti

- Käytetään tarjoamaan erilaisia toimintoja jotka liittyvät ko. näkymään/toimintoon.
- Komponentti on niin sanottu pattern-komponentti, joka koostuu useammasta muusta fudis-komponentista.
- Koostuu komponenteista: fudis-button, fudis-dropdown-menu*, fudis-dropdown-menu-item*
  - \* = komponentti on piilotettu hakemistosta, eli ei ole käytettävissä muussa yhteydessä.

##### Käyttötapaukset

- Tyypillisesti pudotusvalikko avautuu ns. kolmen pisteen valikko -painikkeesta (fudis-button + fudis-options-ikoni).
- Painikkeen kokovariaatio määräytyy sitä ympäröivien painikkeiden koon mukaan.
- Pudotusvalikossa voidaan käyttää väliotsikkoa.
- Valinta voi olla disabloitu (ei valittavissa).
- Painikkeella voi olla tyypillisesti secondary tai tertiary -tyyli.

### Technical Implementation

Dropdown Menu is used to offer various functions related to the current view.

#### Usage Guidelines

Dropdown Menu is assembled with [IconButton](/docs/components-iconbutton--documentation), DropdownMenu and DropdownMenuItem components and it has certain guidelines and pattern to follow in order to work as designed.

Dropdown opening alignment can be altered with `align` property. Default value is `center` where the dropdown tries to find the optimal place for opening.
Fixed opening positions can be assigned to `left` or `right`.

Size (i.e. width) of the dropdown can be adjusted with `size` property with available options of `sm`, `md`, `lg`.

##### Grouped Items

Dropdown Menu Items can be grouped under different sub-categories if needed. The same functionality can be found from [Select Component](/docs/components-form-select-common-features--documentation#grouping-options) family.

To group items, wrap them using `DropdownMenuGroupComponent` with `fudis-dropdown-menu-group` selector, it requires `label` property.

##### Code Example For Basic Dropdown Menu

```ts
<fudis-icon-button
 [ariaLabel]="'Basic menu'"
 [size]="'small'"
 [variant]="'secondary'"
 [icon]="'three-dots'"
 [asMenuButton]="true">
  <fudis-dropdown-menu>
    @for (item of menuItems; track item.label) {
    <fudis-dropdown-menu-item
      [label]="item.label"
      [disabled]="item.disabled"
      (handleClick)="clickOption($event)">
    </fudis-dropdown-menu-item>
    }
  </fudis-dropdown-menu>
</fudis-icon-button>
```

##### Code Example For Grouped Items Dropdown Menu

```ts
<fudis-icon-button
 [ariaLabel]="'Grouped items menu'"
 [size]="'small'"
 [variant]="'secondary'"
 [icon]="'three-dots'"
 [asMenuButton]="true">
 <fudis-dropdown-menu [align]="'left'" [size]="'md'">
  @for (group of groupedMenuItems; track group.label) {
  <fudis-dropdown-menu-group
    [label]="group.label">
      @for (groupedItem of group.items; track groupedItem.label) {
      <fudis-dropdown-menu-item
        [label]="groupedItem.label"
        [disabled]="groupedItem.disabled"
        (handleClick)="clickOption($event)">
      </fudis-dropdown-menu-item>
      }
  </fudis-dropdown-menu-group>
  }
 </fudis-dropdown-menu>
</fudis-icon-button>
```

##### Accessibility

- Button has visible focus state
- Button click can be triggered with mouse as well as keyboard `enter` and `space` keys
- Dropdown menu items can be toggled with `arrow down` and `arrow up` keys
  - Dropdown menu item click can be triggered with mouse as well as keyboard `enter` and `space` key
- Dropdown menu can be closed with `escape` key

##### Related components

- [IconButton](/docs/components-iconbutton--documentation)
- [Icon](/docs/components-icon--documentation)

---

## Loading Spinner

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=5432-51

#### Käyttö yleisesti

Käytetään viestimään viiveestä yksittäisen osion -tai koko sivun sisällön latauksessa. Kehitys määrittää latausindikaattorin käytön tapauskohtaisesti.

Komponenttiin kuuluu:

- Ikoni (sama svg-ikoni molemmissa variaatioissa)
- Label, joka on muokattavissa tarpeen mukaan. Oletuksena "Ladataan".

#### sm (small)

Käytetään viestimään viiveestä yksittäisen osion sisällön latauksessa.

Tyyli ja koko:

- Ikoni: 24px × 24px, #1076DB
- Label: 14px regular, #484848
- Max-width: 256px
- Margin top: 24px
- Keskitetty (horizontal)

#### Koko sivun lataus - lg (large)

Päätetty poistaa (Dev Des Sync 29.9.2025) koska haasteita saada toimimaan Sisun päässä.

#### Käyttötapaukset

##### Osion lataus - sm (small)

Kun järjestelmä lataa yksittäisen osion sisältöä.

Toiminta:

- Kun osion latausaika on ylittänyt 2 sekuntia: Näytetään fudis-loading-spinner. Ei kohdisteta elementtiin. Label: "Ladataan".
- Kun osion lataus on valmis: Jos kohdistus on latausindikaattorissa kun sisällön lataus on valmis, siirretään kohdistus sisällön ensimmäiseen elementtiin.

##### Käynnistetään hitaasti valmistuva toiminto käyttöliittymästä - lg (large)

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

### Technical Implementation

Loading Spinner Component is used to communicate about delayed application loading state of the full page, or part of the viewed page.

Component consists of:

- Icon SVG
- Customisable label text, where Fudis will provide default '_Loading_' text for English, Finnish and Swedish.

#### Usage Guidelines

Application should determine case by case, if use of Loading Spinner would make sense.

##### General Guidelines

- Loading Spinner should be displayed, if loading takes longer than 2 seconds.
- When loading is in progress, user focus should not be automatically moved to loadable section during loading.
- Component has default '_Loading_' text provided, which can be overriden through `label` input property.

##### Section or Other Smaller Part of the Page

- Use smaller `variant` of `sm`.
- Necessary margins can be added through Core Spacing helper classes
- If user focus is in the Loading Spinner, focus should be moved to the first meaningful element after loading is finished.

##### Full Page

- **IMPORTANT**: Instead of using `@if (appLoading) {  }` use ``. This will help screen reader users, as component exists in DOM although it is not visually visible.
- Use larger `variant` of `lg`
- Component communicates its loading status for screen reader. With variant `lg` component automatically communicates status messages '_Page is loading_' and '_Page load finished_'. This can be overriden by app using `statusMessage` property.
- After loading is finished, user focus should be where initially intended after page load, e. g. in the `h1` title element. If focus is manually changed by the Application, there should be small delay before focus, so that screen reader has time to announce '_Page load finished_' status.
- For code example, check repository's `StorybookExampleLoadingSpinnerComponent` example, seen below as well. Located `./ngx-fudis/projects/ngx-fudis/src/lib/components/loading-spinner/examples`.

##### Code Example

```ts
<fudis-loading-spinner
  [variant]="'lg'" // default 'sm'
  [label]="'Page loading is in progress'" // Overrides default value
  [statusRole]="'Screen reader can see this message'" // Overrides default value
  [visible]="true" // Set this false, when loading is finished
/>
```

---

## Pagination

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2382%3A2609

#### Käyttö yleisesti

- Käytetään sivuilla ja elementeissä joissa sisältö jakautuu useammalle sivulle.
- Käytetään vain sisällössä jonka rakenne ei muutu sivujen välillä (listat ja taulukot).
- Käyttötapauksia mm. Hallinnon asiointi -näkymä ja Opiskelijan haku -näkymä.

#### Sivu-elementtien tilat

Tilat: Default, Current, Focus (Default), Focus (Current).

Kolmea pistettä käytetään merkitsemään listassa piilotettuja sivuja (ei kohdistusta).

#### Käyttötapaukset

##### 10 tai enemmän sivuja

Kun listattuja sivuja on 10 tai enemmän, näytetään listan viimeinen sivu ja piilotetaan osa sivuista.

###### Ensimmäinen sivu

Ensimmäisen sivun ollessa aktiivinen, piilotetaan "edellinen sivu" -painike.

###### "Keskimmäinen" sivu

Kun sivuja selataan eteenpäin, aktiivinen sivu pidetään näkyvän listan keskellä.

###### Viimeinen sivu

Viimeisen sivun ollessa aktiivinen, piilotetaan "seuraava sivu" -painike.

#### Responsiivisuus

##### Mobiili (XS) <576px / 36em

Pienellä ruutukoolla piilotetaan näkyvät "edellinen" ja "seuraava" labelit. Breakpoint 576px.

##### "XXS", responsiivinen tai <465px

Yhä pienemmällä ruutukoolla vähennetään listassa näkyvien sivujen määrää. Jos onnistuu niin responsiivisesti, mutta jos ei niin breakpoint 465px näytetään 5 sivua (tai sivuelementtiä).

#### Asemointi

- Sijoitetaan komponentti sivutettavan sisällön alle keskitetysti.
- Käytetään 40px välistystä sivutettavaan sisältöön (taulukko/lista).

#### Saavutettavuus

- Näppäinkohdistus pyritään siirtämään selattavia sivuja kuvaavaan otsikkoon käyttäjän navigoidessa sivujen välillä. Käyttävän pään on määritettävä kohdistus tapauskohtaisesti. Oletuksena näppäinkohdistus säilyy paginaatio-komponentissa.
- Label-esimerkkejä: "2, nykyinen sivu", "Seuraava, sivu 3", "Edellinen, sivu 1", "Sivunumerointi", "12, viimeinen sivu".
- Aria-live esim.: "Avattu, sivu 2" (luetaan aria-live kun käyttäjä avaa sivun).
- Kohdistus: Sivuja valittaessa, kohdistus pidetään paginaatio-elementissä.

#### Brändi

Painikkeiden värit yhtenäistetään tuotekohtaisesti (esim. Sisu, Into).

### Technical Implementation

Pagination is a navigation element that can be used on pages or elements. It provides controls for switching content across multiple pages.
Use Pagination only for content which structure does not change between pages eg. tables and lists.

#### Usage Guidelines

```
<fudis-pagination
  [pageCount]="20"
  [pageIndex]="0"
  [paginationAriaLabel]="'Example navigation'"
  (pageChange)="onPageChange($event)">
</fudis-pagination>

```

##### Properties

Pagination requires `pageCount` in order to generate total amount of pages. Mandatory
`paginationAriaLabel` input is used for differentiating pagination from other site navigational elements.

`pageIndex` input defines the currently active page, starting from 0 for the first page. This value controls which page number is visually highlighted and determines the current focus and navigation state.
If given pageIndex is outside of given pageCount scope, pageIndex will be reset to either first or last item index.

##### Focus management

By default, the focus is preserved on the active pagination page item after a page change. This can be turned off by setting `autoFocusOnPageChange` input to false.
By doing this, the application takes the full responsibility of moving the focus somewhere else where it best supports accessibility and consistent user experience.
The recommended place to move the focus is on a new page heading or in the beginning of freshly loaded content.

> Note! Moving the focus to the desired location may require timing adjustments so that pagination page change aria-live accouncements do not prevent assistive technology users from being notified of the focus shift.

##### Accessibility

- Pagination has `aria-live: polite` announcement for informing when page have been changed.
- Aria-labels are used for describing current, previous and next page number.
- Keyboard navigation:
  - `Tab`/ `Shift + Tab` move focus between pagination links.
  - `Enter` is used for selecting key.
  - Focus is preserved on the active element after a page change by default.

---

## Footer

### Design Guidelines

Figma: https://www.figma.com/file/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?type=design&node-id=2861%3A3265

#### Käyttö yleisesti

- Käytetään Funidatan kaikkien tuotteiden sivun alalaidassa, kaikissa näkymissä.
- Fudis määrittelee footerin taustan sekä logon paikan. Oranssilla katkoviivalla merkitty alue on se, jonka sisällöstä kukin sovellus vastaa itse.
- Huomiona, että suuremmalla näytöllä logon oikealle puolelle jää tilaa (margin-right) ja pienemmällä näytöllä vastaava tila jää logon alle (margin-bottom).

#### Linkit

- **Promo-linkki**: Mahdollista hyödyntää esim. rekrytoinnissa. Avataan uuteen välilehteen. Käyttö vain tarpeen mukaan ja voidaan määrittää tuotekohtaisesti. Promo-linkin jälkeen väli ennen muita linkkejä.
- **Funidatan logo (linkki)**: Linkki funidata.fi:hin. Avataan uuteen välilehteen. Käytössä kaikissa tuotteissa.
- Muut linkit (esim. Tietosuojaseloste, Saavutettavuusseloste, Järjestelmätiedot) ja niiden järjestys määritellään tuotekohtaisesti.

#### Asemointi ja koot

Footerilla on kaksi breakpointia, joissa sisällön rakenne muuttuu. Funidatan logo ja linkkien tekstikoko pysyvät samana näytön koosta riippumatta.

##### lg: >1200px (1440px)

- 64px marginaali ennen footeria.
- 24px footerin sisällä ylhäällä ennen sisältöä.
- 28px logon ja promo-linkin alla.
- 64px footerin alareunassa sekä oikealla ja vasemmalla reunalla.

##### sm: <576px (320px)

- 24px footerin sisällä ylhäällä.
- 28px logon alla.
- 28px promo-linkin alla.
- 16px footerin sisällä molemmilla sivuilla.
- 64px footerin alareunassa.

#### Brändi

Linkkien värit yhtenäistetään tuotekohtaisesti käyttämällä tuotekohtaista väriä linkissä.

### Technical Implementation

Footer is a static component to be used as application's footer in the bottom of the page.

#### Usage Guidelines

Footer is designed to be used with [Link Directives](/docs/directives-link--documentation).
The only fixed element is Funidata logo with a link to Funidata's homepage and translated alternative text for screen readers.
All footer content is added through content projection and it is displayed on the right side of footer. Please add additional styling to refine your preferred footer layout.

#### Accessibility

- Footer contains native HTML footer element
- Funidata logo has descriptive alt text

#### Related directives

- [Link](/docs/directives-link--documentation)

---

## Inputs (general)

### Design Guidelines

#### Käyttö yleisesti

Tämän osion linjaukset ovat yleispäteviä kaikkiin lomakkeen (fudis-form) sisällä käytettäviin komponentteihin (paitsi niiltä osin kun ko. komponentissa ei ole osiossa mainittuja elementtejä).

#### Tilat & yleiset liitännäiset

##### Default

- Tarvittaessa voidaan lisätä info-ikoni, jota klikkaamalla avataan popover (ei tooltip).
- Tarvittaessa kentän alle voidaan lisätä ohjeteksti.

###### Validaatiovirhe

- Validaatiovirheessä inputille tulee punainen border (border: 1px solid #B83C2E).
- Validaatiovirheessä inputin alle tulee punainen error-ikoni + virheviesti, jossa kuvaillaan validaatiovirhettä.
- Jos kentälle tulee useampi validaatiovirhe, näytetään kaikille oma virheviesti.

##### Focus

Kohdistettaessa kentälle tulee primary-sininen border (outline: 2px solid #1076db).

##### Disabled

- Pyritään yleisesti välttämään disabloitujen kenttien käyttöä, mutta niitä voi kuitenkin tarvittaessa käyttää.
- Disabloidulle inputille tulee harmaa katkoviiva-border (border: 1px dotted #727272) ja extra-light-gray-taustaväri (background-color: #F1F1F1).
- Kentän oikeassa laidassa oleva ikoni on dark gray #484848, jos sellainen on.

#### Pakollisuuden merkitseminen

Pakollisen kentän labelin perään lisätään "(Pakollinen)"-label.

#### Asemointi ja koko

- Fudis-grid ja lomake-elementtien leveydet määrittävät komponenttien väliset etäisyydet.
- Form-komponenteille on määritelty enimmäisleveys (max-width). Fudis-gridin ansiosta form-komponentti voi olla leveydeltään myös pienempi.
- Dialogin sisällä olevat osiot (mm. section, fieldset, expandable) pidetään allekkain, ei rinnakkain. Osioiden sisällä olevat komponentit voivat olla rinnakkain. Layout ja grid linjaukset: Fudis DS foundations.

##### Form-komponenttien enimmäisleveydet

Fudiksen lomakekomponenteille on määritelty neljä variaatiota, jotka määrittelevät niiden enimmäisleveyden. Size property -muuttuja → sm/md/lg/full-width. Fieldsetillä on käytössä sama size property -muuttuja kuin muillakin lomakekomponenteilla. Maksimileveys periytyy alemmille elementeille fieldsetiltä jos se on käytössä.

- **full-width, esim. 650px**: Soveltuu käyttötarpeisiin jossa odotetaan suurempaa sisältömäärää. Variaatiota käytettäessä lomakekomponentin enimmäisleveys voidaan määrittää kehityksessä käyttötarpeen vaatimalla tavalla. Suositeltu lomakekomponentin enimmäisleveys on noin 650px.
- **lg: 368px** (oletusleveys): Soveltuu suurimpaan osaan käyttötarpeista.
- **md: 224px**: Soveltuu käyttötarpeisiin jossa odotetaan lyhyempää sisältöä, kuten käyttäjän puhelinnumero tai postinumero.
- **sm: 160px**: Soveltuu käyttötarpeisiin jossa lyhyttä sisältöä kuten päivämäärä (variaatio käytössä mm. date-range-komponentissa).

#### Numeerinen arvo ja yksikkö

Labelin yhteyteen lisätään lyhenteenä yksikkö jos haluttu arvo on numeerinen, esim. "LAAJUUS (OP)" tai "HINTA (€)". Poisluettuna päivämäärät ja vuodet.

##### Hinta/summa valuutassa

Kun kyseessä on hinta, annetaan placeholder muodossa "0,00". Esimerkki: "summa (€)" / "0,00".

##### Koodit

- Pyritään siihen, että koodi näytetään aina (esim. opintojakso, koulutus, tutkinto-ohjelma).
- Pyritään siihen, että koodi tulee aina ensin.
- Koodi erotetaan muusta tiedosta pilkulla.
- HUOM! Opintolaatikossa koodilla oma paikka.

Esimerkki: "HIS1234, Antiikin historian perusteet"

---

## Error Message

### Design Guidelines

#### Lomakekentän virheviesti

##### Case: Pakollinen tieto

Käyttäjän poistuessa pakollisesta lomakekentästä täyttämättä sitä (validaatiovirhe).

##### Case: Puhelinnumero

Käyttäjän poistuessa lomakekentästä kun kentässä on teknisesti virheellistä tietoa (validaatiovirhe).

#### Custom validaatio

Lomakekentästä ei haluta piilottaa valintoja käyttäjältä, vaan ensisijaisesti näyttää kaikki mahdolliset valinnat ja antaa virheilmoitus jos käyttäjä tekee valinnan jota ei voi suorittaa/ei läpäise validaatiota.

Lomakekentän ulkopuolisen validaation virhe näytetään lomakekentän virheviestinä ja virhe lisätään myös error summaryyn, ts. virhe näytetään normaalin lomakekentän virheviestin tavoin.

##### Case esimerkki: virheellinen opiskeluoikeus

Jos lomakekentässä tehdään valinta joka ei läpäise custom-validaatiota (esim. opiskeluoikeudessa on virheitä), näytetään virheviesti inputin alla, normaalin virhevalidaation tavoin.

Esimerkki virheviestistä: "Valitussa opiskeluoikeudessa on virheitä, eikä se ole valittavissa. Tarkista opiskeluoikeutesi opintotietojärjestelmästä."

Kun lomaketta jossa virhe on yritetään lähettää, näytetään virhe myös error summaryssä (normaalin virhevalidaation tavoin). Esimerkki error summaryn rivistä: "Opiskeluoikeus: Valitussa opiskeluoikeudessa on virheitä. Tarkista opiskeluoikeutesi opintotietojärjestelmästä."

#### Search error messages

Hakukenttä näyttää virhetilan jos käyttäjä ei syötä riittävästi merkkejä (vähintään kolme).

Esimerkki virheviestistä: "Syötä vielä kaksi merkkiä"

### Technical Implementation

Form field components' errors can be achieved in two ways:

- Through Form Control's validators: [Fudis Validators](/docs/utilities-validators--documentation).
- As an Error Message Directive, for cases when using a validator or creating a custom one can be tricky.

If your error message repeats multiple times across your form or application, it is recommended to create your own [Fudis Validator](/docs/utilities-validators--documentation).

This page is documentation for the latter Error Message Directive, which binds custom error message to form field components through content projection.

This requires the use of selector `fudis-error-message`. Both Error Message and Fudis Validator errors create the same UI result and renders errors under the Guidance Component.

##### Mandatory Properties

The mandatory property for Error Message is `message`. Visibility of the error is handled by Angular `@if (condition)` control flow.

When `@if` is true, it will adjust the parent's form control by binding a custom validator to it. This will trigger creation of `FudisValidatorErrorMessage` instance, which also sends error data to the Error Summary. If `@if` is set to false again, this will remove the added validator and also remove error from Error Summary.

Message parameter can be passed either as a string or as an observable string.

```
<fudis-text-input
	[control]="control"
	[label]="'Required text input'">
  @if (errorExistsCondition) {
    <fudis-error-message
      [message]="'This is a custom error message which has been added with content projection'"
    />
  }
</fudis-text-input>
```

#### Example

The following example demostrates how custom error message can be used along with Fudis Validator error messages. By toggling 'Switch Message Content' button will dynamically update error message content.

#### Accessibility

- Related form field label and id are linked to error message
- Error Message is correctly passed to [Error Summary](/docs/components-form-error-summary--documentation)

#### Currently Supported Form Components

- [Text Input](/docs/components-form-text-input--documentation)
- [Text Area](/docs/components-form-text-area--documentation)
- [Select](/docs/components-form-select--documentation)
- [Checkbox Group](/docs/components-form-checkbox-group--documentation)
- [Date Picker](/docs/components-form-date-datepicker--documentation)
- [Radio Button Group](/docs/components-form-radio-button-group--documentation)
- [Localized Text Group](/docs/components-form-localized-text-group--documentation)

#### Related Components

- [Error Summary](/docs/components-form-error-summary--documentation)

---

## Error Summary

### Design Guidelines

Figma: https://www.figma.com/design/GMg40yu5t2Y2kQtF9Vw3Cp/Fudis-DS-Components?node-id=3488-934

#### Käyttö yleisesti

- Error summary sijaitsee aina lomakkeen alussa ja siinä listataan kaikkien lomakekenttien validaatiovirheet.
- Komponentti näytetään ja se päivitetään lomakkeen lähettämisen (submit) yhteydessä.
- Error summaryn virheet voidaan asettaa poistuvaksi joko kyseisen virheen korjauksen yhteydessä (dynaamisesti) tai vasta seuraavan submitin yhteydessä.
- Komponenttia ei voi käyttää itsenäisesti, irrallaan fudis-form-komponentista.
- Kohdistus siirretään komponenttiin lomakkeen lähettämisen (submit) jälkeen.
- Listatuissa virheviesteissä on ankkurilinkit ko. lomakekenttään.
- Linkin breadcrumb-polkuun voi tarvittaessa lisätä sectionin tai fieldsetin otsikot (esimerkkitoteutus Intossa). Automaattisesti linkkiin tulee lomakekentän label ja virheviesti (sama kuin lomakekentässä).
- Error summary tulee, vaikka olisi vain yksi kenttä.

#### Default

Otsikko esim.: "Tiedoissa on puutteita tai virheitä. Korjaa seuraavat kohdat:"

Listan rivit muotoa: "Fieldset legend / Kentän label: Virheviesti"

#### Käyttötapaus: Pakollinen tieto

##### Lomakekentän virheviesti

Käyttäjän poistuessa pakollisesta lomakekentästä täyttämättä sitä (validaatiovirhe).

##### Error summary

Käyttäjän lähettäessä (submit) lomaketta kun lomakkeella on virhe (tyhjä pakollinen kenttä), näytetään lomakkeen alussa error summary.

Esimerkki: "Tiedoissa on puutteita tai virheitä. Korjaa seuraavat kohdat: Kentän nimilappu: Tieto on pakollinen"

#### Lomakkeiden välinen konflikti

Kahden eri lomakkeen väliset validaatiovirheet (konfliktit) esitetään lähtökohtaisesti työstettävän lomakkeen lomakekentän omassa virheviesti-kentässä.

#### Case: Päivämäärä ei ole date-rangen sisällä

- Lomakkeen teknisessä alustuksessa asetetaan kalenterin min-max-päivämäärät.
- Jos päivämäärä yritetään asettaa suoraan, näytetään virheviesti lomakekentän alla + error summary jos lomake yritetään lähettää (submit).

Esimerkki virheviestistä: "Päivämäärä: Päivämäärän tulee olla toteutuksen opetusajan sisällä"

### Technical Implementation

Error Summary is a list of all validation errors it has received from child form field components, e. g. from Text Input. Error Summary is internally bundled with Fudis Form. It will appear as Notification with links in the header section of Fudis Form when invalid form is submitted.

#### Triggering Error Summary on Form Submit

[Using Form Submit Directive with Button](/docs/directives-form-actions--documentation)

#### Properties Through Form Component

All the necessary properties are given through [Fudis Form](/docs/components-form-form--documentation#error-summary) `@Input` directives.

#### Service

Configuration and triggering Error Summary reload are managed with [Error Summary Service](/docs/services-error-summary--documentation).

#### Related Services and Directives

- [Error Summary Service](/docs/services-error-summary--documentation)
- [Form Submit Action](/docs/directives-form-actions--documentation#form-submit-with-button)

#### Related Components and Directives

- [Notification](/docs/components-notification--documentation)
- [Form](/docs/components-form-form--documentation)
- [Link](/docs/directives-link--documentation)

---

Error Summary Service provides tools to load and display validation errors for [Form](/docs/components-form-form--documentation) and its [Error Summary Component](/docs/components-form-error-summary--documentation).

**Table of Contents:**

- [Features](#features)
  - [Reload Form Errors](#reloadformerrors)
  - [Reload All Errors](#reloadallerrors)
  - [Add Error](#add-error)
  - [Remove Error](#remove-error)
  - [Update Strategy](#update-strategy)
- [Related Components](#related-components)
- [Related Directive](#related-directives)

##### reloadFormErrors()

When given parameter of Form's id, function reloads Error Summary list of this Form.

**Recommendation!** Similar feature described here can be achieved with [Button binded with Form Submit directive](/docs/directives-form-actions--documentation#form-submit-with-button).

If the mentioned Form Submit directive does not fit your needs, you can achieve this manually calling Error Summary Service.

Import `FudisErrorSummaryService` and add the parameter to constructor:

```

...

constructor(
  private _service: FudisErrorSummaryService
) {}
```

Call `reloadFormErrors()` with form id as parameter when user clicks form's submit button, which also sets Error Summary as visible in Fudis Form.

```
protected _submitButtonClick():void {
	if(this.form.invalid){
		// @Input property of Form
		this._errorSummaryVisible = true;
		// Reload errors of the specific Form
		this._service.reloadFormErrors("id-of-my-form");
	} else {
		this._errorSummaryVisible = false;
		// Other success and profit!
	}
}

```

##### reloadAllErrors()

If reloading single Form and its Error Summary one at the time is not enough, the Service has function `reloadAllErrors()` which will then reload all Forms and their Error Summaries.

##### Add Error

Application can manually send message to be displayed in Form's Error Summary with `addError()` method. It requires four parameters:

- id: Identifier of the message, eg. 'app-custom-error-abc123'
- formId: Id of Form component and Error Summary this error is linked to
- focusId: HTML element's id, where user focus should be moved when user clicks the message.
- message: Visible message to the user. It can either be a static `string`, or an `Observable` for e. g. if message should be different in different application language.

```
this._service.addError('app-custom-error-abc123', 'app-create-user-form', 'app-username-input', 'This is message!')
```

_Note!_ Adding errors manually does not affect any FormControl's validity. It is app's responsibility to make sure that Form's Controls and FormGroups are properly set invalid, if these messages are set visible.

##### Remove Error

To remove previously added error, three parameters described above, need to be specified: `id`, `formId` and `focusId`

```
this._service.removeError('app-custom-error-abc123', 'app-create-user-form', 'app-username-input')
```

##### Update Strategy

By default Error Summary updates only when calling Reload Errors function. All options are:

- `reloadOnly` (default): Error Summary list updates only when calling
- `onRemove`: Updates Error Summary on reload and removes errors when user corrects one of the visibile errors.
- `all`: Updates Error Summary dynamically when errors are added, removed or when reload is called

To set Update Strategy, call service's setter function. E. g. to `all` with:

```
this._service.setUpdateStrategy('all')
```

#### Related Components

- [Error Summary](/docs/components-form-error-summary--documentation)
- [Form](/docs/components-form-form--documentation)

#### Related Directives

- [Form Submit](/docs/directives-form-actions--documentation)

---

# Foundations & Utilities (Technical Implementation only)

## Badge

### Technical Implementation

Badge is a colored text element. It is used to indicate a certain state of a process or to highlight some information.

Badge has five variants which determines the color: `accent`, `danger`, `primary`, `secondary` and `success`.

#### Usage Guidelines

Text for the badge can be passed through `content` Input or by content projection. The content should be **clear and concise**, bearing in mind that screen readers do not get any additional information about the badge but only the text content it has.

Badge stretches with its content, but other than that it does not have any size options. Font-size and paddings are fixed.

#### Accessibility

- Color contrast inside different badge colors meets WCAG AA minimum contrast ratio
  - **NOTE**: When using badges on backgrounds other than white, make sure the color contrast is adequate
- Screen readers do not get any addtional information about badge color, text is read as is

---

## Grid Item

### Technical Implementation

Grid Item Component is a wrapper component which implements automatically the features of the [Grid Item Directive](/docs/directives-grid-grid-item--documentation).

Grid Item is meant to be used as first level child component under [Grid Component](/docs/components-grid-grid--documentation).

By default, all first level child Grid Items behave exactly in a way their parent has been configured.

Using Grid Item Component or Directive, you can define individual alignment behavior for each Grid Item.

#### Horizontal and Vertical Alignment

Grid Item has properties of `alignSelfX` for horizontal and `alignSelfY` for vertical alignment which makes the Grid Item align itself inside its container boundaries.

```
<fudis-grid [alignItemsX]="'center'">
  <fudis-grid-item>This item is centered by its parent</fudis-grid-item>
  <fudis-grid-item>This item is centered by its parent</fudis-grid-item>
  <fudis-grid-item [alignSelfX]="'end'">This item overrides parent's configs
  and aligns itself differently</fudis-grid-item>
<fudis-grid>
```

#### Defining Columns Expansion and Position

When defining the parent Grid Component's `columns` property, by default all Grid Items follow that specified rule. The same `columns` property is available to a single Grid Item, which will override parent's rules. The given value is converted or used as it is to a native CSS Grid `grid-columns` attribute.

- [Setting Grid Item To Stretch Whole Width](#setting-grid-item-to-stretch-whole-width)
- [Using A Number Value For Columns](#using-a-number-value-for-columns)
- [Native CSS Grid Column Values](#native-css-grid-column-values)
- [Responsive Columns For Each Breakpoint](#responsive-columns-for-each-breakpoint)

##### Setting Grid Item To Stretch Whole Width

Fudis Grid Item has a shorthand `[columns]="'stretch'"`for making a Grid Item stretch the whole horizontal width of Grid container.

##### Using A Number Value For Columns

When `columns` value is a number, e. g. `[columns]="2`, it will be converted to CSS `grid-columns` attribute value of string `span 2` meaning Grid Item will span across two columns from the point it starts.

##### Native CSS Grid Column Values

The values Grid Item's `columns` can be the same as native CSS Grid item's `grid-column` property. By default the value is `auto`.

Quoting from [MDN's grid-column page](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column):

> The `grid-column` CSS shorthand property specifies a grid item's size and location within a grid column by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area.

##### Responsive Columns For Each Breakpoint

As with Grid Component, Grid Item's `columns` value can be an object, where behavior in each breakpoint can be defined.

---

## Introduction to Grid and Grid Item Components

### Technical Implementation

Fudis provides an extensive Grid and Grid Item layout components and directives with many possibilities to adjust its attributes to cater most layout cases.

Grid and Grid Item use now widely browser supported native CSS Grid properties as its base and implementes CSS properties like `grid-template-columns`, `column-gap` and `row-gap` through its API.

Although Usage Guidelines and Examples are located here in the Storybook's Components section, both Grid Component and Grid Item Component are just wrapper HTML tags which implement behind the scenes Grid Directive and Grid Item Directives.

- [Documentation for Grid and Grid Item Directives](/docs/directives-grid-introduction--documentation)
- [Documentation for Grid Component](/docs/components-grid-grid--documentation)
- [Documentation for Grid Item Component](/docs/components-grid-grid-item--documentation)

---

## Grid Component

### Technical Implementation

Grid Component is a wrapper element, which implements all the features specified in [Grid Directive](/docs/directives-grid-grid--documentation).

Essentially it is an HTML element which has CSS property `display` set to `grid`.

This page contains documentation on how to align and set **all** first level child elements inside one Grid element. If you are interested in customising each child element individually, please look at documentation of [Grid Item Directive](/docs/directives-grid-grid-item--documentation) or [Grid Item Component](/docs/components-grid-grid-item--documentation).

**Table of Contents:**

- [Basic Usage](#basic-usage)
- [Defining Columns](#defining-columns)
- [Default Gutters](#default-gutters)
- [Usage with Flexbox](#usage-with-flexbox)
- [Universal Configuration of All Grid Components](#universal-configuration-of-all-grid-components)
- [Properties Table](#properties)

### Basic Usage

The HTML selector of Grid Component is `fudis-grid`.

Grid Component has multiple properties to define how itself or its content should be aligned. Rules that affect child elements are applied to every first level children Grid Component has.

```
<fudis-grid [alignItemsX]="'center'">
  <fudis-grid-item>
    This will be centered
  </fudis-grid-item>
  <fudis-grid-item>
    This will be centered
  </fudis-grid-item>
  <fudis-grid-item>
    This will be centered
    <p>But this will not be affected, as this p-element is not first level child element</p>
  </fudis-grid-item>
</fudis-grid>
```

#### Heading Components Inside Grid

By default, if Heading Component is first level child of the Grid Component, the Heading will spread and take 100% width. This can be disabled with the use of [Grid Item Directive](/docs/directives-grid-grid-item--documentation).

### Defining Columns

Most notable property of Grid Component is `columns` property. This defines in how many columns the children elements should be split. Underneath `columns` attribute transforms to CSS property `grid-template-columns`.

The property `columns` accept three different types of values: number, strings and objects.

**Examples of different ways how to use `columns`:**

- [Equally Wide Columns with Numbers](#equally-wide-columns-with-numbers)
- [Form Input Widths](#form-input-widths)
- [Native CSS Grid Units](#native-css-grid-units)
- [Responsive Colums For Different Breakpoints](#responsive-columns-for-different-breakpoints)

#### Equally Wide Columns with Numbers

When just a number is provided for `columns`, Grid Component will be split to equally wide columns. E. g. `` will set child elements in three equally wide columns.

#### Form Input Widths

If your Grid consists of Fudis Form components, e. g. Text Input or Datepicker, it might make sense to set your Grid column width to follow width of these form components. Substrings which will be converted to actual CSS values are: `inputSm`, `inputMd` and `inputLg`.

```
<fudis-grid [columns]="'inputSm inputMd'">
  <fudis-text-input [label]="'This is now width of small'"/>
  <fudis-text-input [label]="'This is now width of medium'"/>
</fudis-grid-item>
```

#### Native CSS Grid Units

As Grid's `columns` property is eventually added to Grid HTML element as CSS property `grid-template-columns`, it accepts all native CSS values. This gives lots of flexibility in proportions each column will take in width.

Common grid-template-columns keyword values we introduce here are:

- [FR Fraction Units](#fr-fraction-units)
- [Auto, Auto-Fill and Auto-Fit](#auto-and-minmax-with-auto-fill-and-auto-fit)
- [Min-Content](#min-content)
- [Max-Content](#max-content)

For more examples and documentation on how to apply other combinations or values to be transformed native CSS `grid-template-columns` property, look at these articles:

- [An Introduction to the `fr` CSS unit](https://css-tricks.com/introduction-fr-css-unit/)
- [Understanding min-content, max-content, and fit-content in CSS](https://blog.logrocket.com/understanding-min-content-max-content-fit-content-css/)
- [grid-template-columns in MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)

##### FR Fraction Units

One of the most useful native CSS Grid units are `fr` units. The `fr` stands for 'fraction' unit represeting the leftover space in the grid container. This enables an easy way to define columns which are not equally wide. Take a loot at the examples below.

###### Example: 6 columns with 3/6, 1/6 and 2/6 ratio

```
<fudis-grid [columns]="'3fr 1fr 2fr'">
  <fudis-grid-item>
    This is 3fr wide, so it takes 3/6 of whole width
  </fudis-grid-item>
  <fudis-grid-item>
    This is 1fr wide, so it takes 1/6 of whole width
  </fudis-grid-item>
  <fudis-grid-item>
    This is 2fr wide, so it takes 2/6 of whole width
  </fudis-grid-item>
</fudis-grid-item>
```

Fraction units transform easily to percentages as well if needed. If we want to set a Grid with four columns with ratio of 50%, 10%, 20% and 20% wide columns, we can just set `[colums]="'50fr 10fr 20fr 20fr'"`. When reduced it is equal to `[colums]="'5fr 1fr 2fr 2fr'"`.

##### Auto and MinMax with Auto-Fill and Auto-Fit

Native Grid CSS `grid-columns-template` values of `auto`, `auto-fill` and `auto-fit` as their name describes tries to automatically define the width of each column.

###### Auto

Value `auto` can be useful, when you have items which do not take too much space in your Grid: it will shrink itself "as small as possible". But if your child element is really wide, value `auto` can break the layout as it takes the minimum width it has, which can be really wide.

###### MinMax with Auto-Fill and Auto-Fit

Quoting from blog post of [Auto-Sizing Columns in CSS Grid](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/):

> `auto-fill` FILLS the row with as many columns as it can fit. So it creates implicit columns whenever a new column can fit, because it's trying to FILL the row with as many columns as it can. The newly added columns can and may be empty, but they will still occupy a designated space in the row.

> `auto-fit` FITS the CURRENTLY AVAILABLE columns into the space by expanding them so that they take up any available space. The browser does that after FILLING that extra space with extra columns (as with auto-fill ) and then collapsing the empty ones.

So if you do not have many Grid child elements, this might lead to that `auto-fit` stretches grid items to be really wide.

To enable auto-filling or auto-fitting your Grid's content, you must use `repeat()` function as value with `minmax`.

To read more about using `repeat()`, check this blog post: [How to Use the CSS Grid repeat() Function](https://www.sitepoint.com/css-grid-repeat-function)

Especially the part with `minmax` explained might be useful: [Using the minmax() Function with repeat()](https://www.sitepoint.com/css-grid-repeat-function#usingtheminmaxfunctionwithrepeat)

##### Min-Content

The `min-content` is **the smallest** size a box can take without overflowing its content.

This might be useful in cases, where we want to avoid the column to expand wider than it actually needs to be.

When combined with fr units, the fr columns occupy the rest of the available space after min-content columns have taken their space.

##### Max Content

Not too surprisingly when compared to previous, `max-content` is **the largest** size a box can take.

But pay attention when using `max-content` because it will not wrap even if it causes overflow.

When combined with fr units, the fr columns occupy the rest of the available space after max-content columns have taken their space.

#### Responsive Columns For Different Breakpoints

Previously introduced `columns` values stay static and unchanged in all browser viewport widths. Most of the time it is necessary to define different column rules for different breakpoints. This can be achieved providing a settings object to `columns` property.

**Note!** All previously introduced value types can be used to define each breakpoint, so it is not just restricted to numbers of `fr` units.

##### Example 1: Equally Wide Columns in Different Breakpoints

With `[columns]="{sm: 2, lg: 3, xl: 4}"` In following example:

- Before `sm`: Before screen size of `sm` (there is `xs` before `sm`), Grid will have the default of 1 column.
- `sm` to `lg`: Through `sm`, `md` and before hitting `lg` breakpoint, Grid will be in 2 equally wide columns
- `lg` to `xl`: From `lg` and before hitting `xl`, Grid has 3 equal columns
- `xl` and up: Grid has 4 columns

```
<fudis-grid [columns]="{sm: 2, lg: 3, xl: 4}">
  <div>Item 1</div>
  <div>Item 2</div>
  ...
  <div>Item n-1</div>
  <div>Item n</div>
</fudis-grid-item>
```

##### Example 2: Combining Values

With `[columns]="{xs: 2, sm: '1fr 2fr', md: '1fr 2fr 1fr', lg: 4}"` In following example:

- From `xs` to `sm`: Before hitting `sm`, Grid has 2 equally wide columns.
- From `sm` to `md`: From `sm` before hitting `md`, Grid has 2 columns, where 1st takes 1/3 of width and 2nd 2/3 of whole width.
- From `md` to `lg`: From `md` before hitting `lg`, Grid has 3 columns, where 1st column takes 1/4, 2nd 2/4 and 3rd column again 1/4 of whole width.
- From `lg` and up: When hitting breakpoint `lg`, Grid will have 4 equally wide columns.

```
<fudis-grid [columns]="{xs: 2, sm: '1fr 2fr', md: '1fr 2fr 1fr', lg: 4}">
  <div>Item 1</div>
  <div>Item 2</div>
  ...
  <div>Item n-1</div>
  <div>Item n</div>
</fudis-grid-item>
```

### Default Gutters

By default, Grid has predefined gutters between columns and rows. These gutters are always customizable through `columnGap` and `rowGap` Input properties.
Grids with `initial` or `full-width` widths do not have these predefined gutters and should be added manually as needed.

### Usage with Flexbox

For some cases you might want to overwrite grid with flexbox, which is ideal especially for aligning content either horizontally or vertically.
Flexbox can also be used inside individual grid items to make them behave as a flex container, using `display: flex`.

Consider also opting-out of Fudis Grid and using plain Flexbox if you don't need the columns to be equally sized, but rather want to give the content the freedom to take as much or little space it needs.

### Universal Configuration of All Grid Components

To apply default values to all of applications Grid Components and elements with Grid Directive, use [Grid Service to set default configurations.](/docs/services-grid--documentation)

---

## Icon Button

### Technical Implementation

In addition to regular [Button](/docs/components-button--documentation), Icon Button is designed to be used with icon and without visible label.
Note that it's encouraged to use Icon Button **only in situation where the action is evident and commonly recognized**. These include using icons `search`, `delete`, `close` and `zoom` for these related actions.

#### AriaLabel (mandatory)

Since Icon Button does not have a visible label, it is mandatory to provide aria-label attribute to describe button action for assistive technology.

#### Icon (mandatory)

Icon input accepts any [Icon](/docs/components-icon--documentation).

#### Size

Icon Button has three different sizes `medium` (default), `small` and `extra-small`.

#### Variant

Icon Buttons are categorized based on their importance and functionality. It is **important** to use the correct variant of the button for the intended action and not to overuse them to avoid overwhelming the user.

Icon Button has three variants: `primary` (default), `secondary` and `tertiary`.

#### Accessibility

- Button uses primary-color variable (`--fudis-color-primary`) which is set in the root of the application. Make sure the application's primary-color contrast ratio meets WCAG AA and AAA levels.
  - Disabled button has static colors `#484848` and `#D4D4D4` with contrast ratio 6.2:1
- Button has visible focus state
- Disabled buttons do not receive keyboard focus, but their state is communicated for assistive technology.
- Button click can be triggered with keyboard `enter` and `space` key
- Aria-label is a required property.

#### Related components

- [Button](/docs/components-button--documentation)
- [Icon](/docs/components-icon--documentation)

---

## Icon

### Technical Implementation

Icon Component is a SVG image element.

#### Usage Guidelines

All icons have default size of 32 x 32 pixels, except icons with suffix **-small** (e. g. `alert-small`, `info-circle-small`) which are scaled to 16x16px.

Icons with suffix **-fill** (e. g. `alert-fill`, `info-circle-fill`) have their default style with white background. These icons **cannot** be colored with the `color` property.

##### Properties

Icon has one **mandatory** property: `icon`. All available icons can be seen in _All Icons_ story page.

Icon color can be changed with `color` property.

Available color values are: `primary`, `primary-dark`, `gray-dark`, `gray-light`, `red`, `yellow`, `green` or `white`.

Flip and rotate the icon with `rotate` property: `flip-180`, `cw-90`, or `ccw-90`.

#### Accessibility

- Icons are always hidden from screen readers
  - Be cautious that no information is communicated only with icons

---

## Language Badge Group Component

### Technical Implementation

Language Badge Group is a language selector component designed to use with specific translatable text and string input elements.
The component helps to change the selected translation and notes if the content has missing translation in any selectable language.

#### Usage Guidelines

By default Language Badge Group always display Badges for Finnish, Swedish and English in this order.
To define different config to Application's Language Badges, use `FudisTranslationService` function `setSelectableLanguages()` to define a new config.
Check documentation at [FudisTranslationService](/docs/services-translation--documentation#translation-service).

##### Properties

Language badge group has one mandatory input property `translatedLanguages` with `FudisLanguageAbbr[]` type.
The property is a list that tells for which of the selectable languages translations are provided for.

##### Handling changes

Language badge group has `handleClick` output property. When clicking the language badge, the property handleClick will emit a selected language string.

##### Interactive example along with app language and badge language options change

If the current app language is among the selectable and provided languages, it will be selected as a default.
Otherwise the first selectable language with provided translation will be the default selected.

##### Accessibility concern

If parts of the text are changed to another language, it is important to address this to assistive technology so that they can correctly pronounce foreign language.
When Language Badge Group is combined with [Body Text](/docs/components-typography-body-text--documentation) component, use body text's `lang` attribute to define parts of text in a different language.

##### Accessibility

- Language badge has visible focus state
- Badge group can be navigated with keyboard tab key
- Badge click can be triggered with keyboard enter and space key
- Each badge has an aria-label informing the full language name and possible missing and selected states
- Lang attribute is used with parts of text that are in a different language

##### Related services

- [FudisTranslationService](/docs/services-translation--documentation#translation-service)

---

## Body Text

### Technical Implementation

Body Text Component is essentially a paragraph element which inherits Fudis font-family.

#### Usage Guidelines

There are five `variant` options available: `lg-regular`, `lg-light`, `md-regular`, `md-light` and `sm-regular`.
Body text variants are responsive and on mobile devices, if screen size is less than `breakpoint('sm')"`, `lg` variants will scale down to `md`.

In addition to paragraph variant, Body Text can be modified through `align` property.

```
<fudis-body-text [align]="'center'" />
```

##### Accessibility

- Text color `#484848` passes WCAG AAA requirement against white `#FFFFFF` background
  - Contrast ratio 9.1:1
- The `lang` attribute is used for defining language for a different parts of text that differ from the current language of the page. This helps assistive technology such as screen readers to use correct pronunciation.

---

## Heading Component

### Technical Implementation

Heading Component is essentially a heading HTML element which inherits Fudis font-family.

##### Semantic HTML Heading Level and Visible Variant

There are six heading options available from `1` to `6` and seven variant options from `xxs` to `xxl`.

The `level` input property determines which HTML element component renders. With `level=1` component renders a `h1` element and with `level=2` a `h2` element and so on.

When no `variant` input value is provided, all of the heading levels have default variants, where heading level `1` defaults to variant `xxl`, heading level `2` defaults to variant `xl` etc. However, heading variants are responsive and on mobile devices where screen size is less than breakpoint('sm') all of the headings are converted to a smaller heading variant.

#### Examples

Note! When heading `variant` is set, heading `level` does not have any effect to the variant property, i.e `level` is only essential for screen readers and other assistive technologies.

Variant is opted to be modified as wanted with `variant` property as follows.

##### Accessibility

- Heading color `#484848` passes WCAG AAA requirement against white `#FFFFFF` background
  - Contrast ratio 9.1:1
- Semantically it is important to use correct heading level respective to the context
  - Header variant can be visually modified

---

## Grid Item Directive

### Technical Implementation

Grid Item Directive enables to binded element different layout properties for native CSS Grid and alignment properties.

Together with a parent element implementing [Grid Directive](/docs/directives-grid-grid--documentation) responsive layouts can be tailored.

#### Examples and Usage Guidelines

More throughout examples and guidelines can be found in documentation of [Grid Item Component](/docs/components-grid-grid-item--documentation)

##### With Fudis Grid Item Component

For readibility it is recommended to use [Fudis Grid Item Component](/docs/components-grid-grid-item--documentation), which already implements Grid Item Directive.

```
<fudis-grid>
  <fudis-grid-item>
    // item content here
  </fudis-grid-item>
</fudis-grid-item>
```

##### With Any Other Element or Component

Add `fudisGridItem` directive selector to your element to enable Grid Item Directive features.

```
<fudis-grid>
  <div fudisGridItem>
    // item content here
  </div>
</fudis-grid>
```

---

## Grid Directive

### Technical Implementation

Grid Directive enables to binded element different layout properties for native CSS Grid and alignment properties.

Together with child components implementing [Grid Item Directive](/docs/directives-grid-grid-item--documentation) responsive layouts can be tailored.

#### Examples and Usage Guidelines

More throughout examples can be found in documentation of [Grid Component](/docs/components-grid-grid--documentation)

##### With Fudis Grid Component

For readibility it is recommended to use [Fudis Grid Component](/docs/components-grid-grid--documentation), which already implements Grid Directive.

```
<fudis-grid>
 // child elements here
</fudis-grid>
```

##### With Any Other Element or Component

Add `fudisGrid` directive selector to your element to enable Grid Directive API features.

```
<div fudisGrid>
 // content here
</div>
```

##### Adding Default Values to all Grids in Application

To read more about configuring default property values to all application's Grid Components and Grid Directive elements, check [Grid Service documentation](/docs/services-grid--documentation).

---

## Breakpoint Service

### Technical Implementation

Breakpoint Service is used by [Grid Component](/docs/components-grid-grid--documentation) in adding responsive CSS styling in various breakpoints.

#### How to Use

Breakpoint Service uses Angular Material [BreakpointObserver](https://v6.material.angular.io/cdk/layout/overview) in detecting application media widths.

##### getBreakpointState()

`FudisBreakpointService.getBreakpointState()` returns BreakpointState object, with booleans for all currently matching breakpoints.

```

interface BreakpointState = {
    /** Whether the breakpoint is currently matching. */
      matches: true,

    /**
     * A key boolean pair for each query provided to the observe method,
     * with its current matched state.
     */
      breakpoints: {
        '(min-width: 100em)': false,
        '(min-width: 75em)': false,
        '(min-width: 62em)': false,
        '(min-width: 48em)': false,
        '(min-width: 36em)': false,
        '(min-width: 0)': true,
      },
    };

```

---

## Grid Service

### Technical Implementation

Grid Service provides tools to apply default property values to all Grid Components and Grid Directive elements application has. These default values can be overwritten or totally ignored for each grid if needed.

#### How To Use

Grid Service has getter and setter functions for default Grid properties.

##### getDefaultValues()

`FudisGridService.getDefaultValues()` returns a signal function. So when these default values change, there is an option to trigger Angular's `effect()` hook.

###### Function and its Typing

`FudisGridService.setDefaultValues()` requires an object paremeter of type `FudisDefaultGridProperties`.

```ts
interface FudisDefaultGridProperties {
  align?: FudisGridAlign;
  alignItemsY?: FudisGridAlignItems;
  alignItemsX?: FudisGridAlignItems;
  classes?: string[];
  columns?: FudisBreakpointValueResponsive;
  columnGap?: FudisGridGap;
  rowGap?: FudisGridGap;
  width?: FudisGridWidth;
}
```

###### Combining Values from Grid Service and Individual Properties of Single Grid Component

If Grid Component has an individually specified properties, these Grid Service's defaults **will not** be applied.

Only exceptions is `columns` property. Just like the Grid Component, Grid Service's column attribute accepts an object where `grid-template-columns` rule can be defined per each breakpoint.

Actually applied `columns` is a combination from both Grid Service and Grid Component.

```ts
// HTML Template

<fudis-grid [columns]={xs: 2, md: 3, xl: 6} />

// Configuration set in Fudis Grid Service

defaultGridValues = {xs: 1, sm: 2};

// Actually applied values to Grid Component would be then

<fudis-grid [columns]={xs: 2, sm: 2, md: 3, xl: 6} />
```

So individually set breakpoint column values override those set in configuration.

---

## Translation Service

### Technical Implementation

Translation Service consists of two parts:

- Functions for selecting translated language in several repeated texts in various Fudis components
- Functions for setting selectable languages in components, which manage multiple languages either for display or user input. Currently this is available in Description List component using Language Badges.

#### Including Service

Use Translation Service by importing and adding it to constructor.

```

  constructor(
    fudisTranslationService: FudisTranslationService,
  ) {}
```

#### Component Translation Related Features

Several Fudis component has static text associated with the component logic. Most common example is form components' required indicator which is visible text next to the form field label.
Also, some of the helper texts for screen readers are set automatically.
All the translation keys for static texts come from Fudis translations and it is not possible to modify them from the application side.

Currently supported languages in Fudis components are English, Finnish and Swedish. Default language of Fudis components is English.

##### Set Language

`setLanguage` sets the language of above-mentioned repeated texts of Fudis components. Function takes language abbreviation argument of either `en`, `fi` or `sv`.

```
fudisTranslationService.setLanguage('fi');
```

##### Get Language

Get current language of Fudis configuration with `getLanguage`.

```
this.currentLanguage = fudisTranslationService.getLanguage();
```

#### Selectable Languages in Components

Currently only Language Badge Group has this feature enabled, but with Translation Service it is possible to determine which languages are displayed as selectable badges.

By default set languages is an array of `['fi', 'sv', 'en']`.

Check an [example under Language Badge Group](/story/components-language-badge-group--documentation#interactive-example-along-with-app-language-and-badge-language-options-change) how badges behave when different language settings is set.

##### Set Selectable Translations

`setSelectableLanguages()` sets the settings for which languages / translations are selectable in components used to display multiple languages. It takes an array of language abbreviation as its argument. The order of abbreviation also determines the order of display in the components.

```
fudisTranslationService.setSelectableLanguages(['en','sv']);
```

##### Get Selectable Translations

`getSelectableLanguages()` returns a signal which is invoked each time selectable languages is updated.

---

## Validators & Validator Utilities

### Technical Implementation

Fudis Form components use two set of validators; **FudisValidators** and **FudisGroupValidators**.
For custom application specific validator, please check [Custom Validators and Error Messages](#custom-validators-and-error-messages) section on this page.

Basic validators (FudisValidators) have the following types: `required`, `email`, `minLength`, `maxLength`,`min`, `max`, `pattern`, `datepickerMin` and `datepickerMax`.

Group validators (FudisGroupValidators) have the following types: `oneRequired`, `min` and `max`.

**Table of Contents:**

- [Single Form Control Validators with FudisValidators](#single-form-control-validators-with-fudisvalidators)
- [Form Group Validators with FudisGroupValidators](#form-group-validators-with-fudisgroupvalidators)
- [Custom Validators and Error Messages](#custom-validators-and-error-messages)
- [Validator Utilities](#validator-utilities)

#### Single Form Control Validators with FudisValidators

These validators are used with Form Control.

##### Required Validator

For required form field, include `FudisValidators.required()` in the form control validator with message parameter either as a string or as an observable string.

```
FudisValidators.required('This is required field')
```

---

##### Email Validator

Email validator expects that the related form field type is set to `[type]="'email'"`. Validator checks that the given input corresponds to the set email type of the form field. Validator takes a message parameter either as a string or as an observable string.

```
FudisValidators.email('Input must be an email address.')
```

---

##### MinLength and MaxLength Validators

For minLength and maxLength, include `FudisValidators.minLength()` and `FudisValidators.maxLength()` in the form control validator with preferred input length as number and a message parameter as a string or as an observable string. When maxLength validation is used, [Text Input](/docs/components-form-text-input--documentation) and [Text Area](/docs/components-form-text-area--documentation) components disable user from inputing more than allowed length of characters and will have additional maxLength indicator.

Setting minLength does not make the control required. By setting `valueRequired` property to `true`, validator won't accept empty or falsy value.

```
FudisValidators.maxLength(20, 'Too long input text.')
FudisValidators.minLength(10, 'You should write a little bit more.', true)

```

---

##### Min and Max Validators

Min and Max validators are used with Text Input `[type]="'number'"` and with Multiselect Component. Error message is prompt when user inputs lower or higher value than the allowed value.
Form components that include min/max validation require a validation number and message parameter as a string or as an observable string.

```
FudisValidators.max(10, 'Number cannot exceed 10.')
FudisValidators.min(3, 'Choose at least 3 options.')

```

---

##### Pattern Validator

Pattern validator receives a Regex pattern and makes input comparison with the given pattern. Validator takes in a pattern as a string or with a type definition of Regex. Error message parameter is given as a string or as an observable string.

```
FudisValidators.pattern(/^[A-Z \d\W]+$/, 'PLEASE USE ONLY LOW CAPS!')

```

---

##### DatepickerMin and DatepickerMax Validators

DatepickerMin and DatepickerMax validators can be used with Datepicker and Date Range components. These validators disable dates from the calendar pop-up if they fall outside of given date range.
Needed parameters for both validator objects are `value` as Date object and `message` as a string or as an observable string.

Validators can be used individually or together to validate single date.

```
FudisValidators.datepickerMin({ value: new Date(2024,0,1), message: 'Start date cannot be before 1.1.2024' })
FudisValidators.datepickerMax({ value: new Date(2024,9,1), message: 'End date cannot be after 1.10.2024' })
```

#### Form Group Validators with FudisGroupValidators

These validators are used with Form Group.

##### OneRequired Validator

OneRequired validator can be used with Checkbox Group and Localized Text Group, cases where at least one option needs to be selected. When using this validator, the input has to be set as required. Error message parameter is given as a string or as an observable string

```
FudisGroupValidators.oneRequired('At least one selection has to be made')

```

##### Min and Max Validators

Min and Max validators can be used with Checkbox Group, cases where it is necessary to limit user selections. Validators take in value as a number which corresponds to the wanted min or max value. Error message parameter is given as a string or as an observable string.

```
FudisGroupValidators.min({ value: 2, message: 'Pick at least two' })
FudisGroupValidators.max({ value: 4, message: 'Four is the maximun amount of allowed picks' })

```

#### Custom Validators and Error Messages

If your form component and form control need some other validation, which is not provided by Fudis. You can either:

- Repeating cases: Create a custom validator function
- Single uses: [Error Message Component](/docs/components-form-error-message--documentation)

If your custom validator logic repeats multiple times, it is recommended to create your own custom validator. If your need is more like an exception of exception, you can just use [Error Message Component](/docs/components-form-error-message--documentation).

##### Custom Validator Guidelines

Here is example code of Fudis Required Validator.

```
type FudisValidatorMessage = Observable<string> | string;

interface FudisValidationErrors extends ValidationErrors {
  [key: string]: { message: FudisValidatorMessage } | null;
}

interface FudisValidatorFn extends ValidatorFn {
  (control: AbstractControl): FudisValidationErrors | null;
}

function required(message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.required(control)) {
      return null;
    }
    // Most important line below!
    return { required: { message } };
  };
}
```

Main principle of Fudis Validators is, that when validator state is invalid, it returns on object which contains a `message` property.

```
{yourValidatorKey: {message: 'This is your custom error message as a string.'}}
```

The value type of message can be either a string or an observable. When 'message' property is provided, internal Fudis components and services reads this and displays it alongside other validator error messages. This `message` property is also sent and updated accordingly by [Error Summary](/docs/components-form-error-summary--documentation) used in [Form](/docs/components-form-form--documentation).

#### Validator Utilities

Fudis has publicly exposed utility functions it uses to determine if given form field component's Form Control or Form Group has validators, which are determined with guidelines described earlier.

These utilities are available as `FudisValidatorUtilities`.

##### FudisValidatorUtilities.required()

Returns boolean for if provided FormControl has `required` validator.

##### FudisValidatorUtilities.oneRequiredOrMin()

Returns boolean for if provided FormControl has `oneRequired` or `min` validator.

##### FudisValidatorUtilities.maxLength()

Returns null or number if provided FormControl has `maxLength` validator and a max length number determined to it.

##### FudisValidatorUtilities.minLength()

Returns null or number if provided FormControl has `minLength` validator and a min length number determined to it.

##### FudisValidatorUtilities.max()

Returns null or number if provided FormControl has `max` validator and a max number determined to it.

##### FudisValidatorUtilities.min()

Returns null or number if provided FormControl has `min` validator and a min number determined to it.

##### FudisValidatorUtilities.minDate()

Returns null or Date if provided FormControl has `datepickerMin` validator and a min date determined to it.

##### FudisValidatorUtilities.maxDate()

Returns null or Date if provided FormControl has `datepickerMax` validator and a max date determined to it.

---
