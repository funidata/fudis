import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<!--The content below is only a placeholder and can be replaced.-->
		<div style="text-align:center" class="content">
			<h1>Welcome to {{ title }}!</h1>
			<!-- <app-dialog-test></app-dialog-test> -->
			<fudis-checkbox color="primary" data-theme="sisu">Tämä on fudis checkbox</fudis-checkbox>
			<!-- <fudis-heading size="xl" tag="h2"></fudis-heading>
			<fudis-body-text size="l-regular">Haloo</fudis-body-text>
			<fudis-body-text size="m-regular">Haloo</fudis-body-text>
			<fudis-body-text size="s-regular">Haloo</fudis-body-text>
			<fudis-body-text size="l-light">Haloo</fudis-body-text>
			<fudis-body-text size="m-light">Haloo</fudis-body-text> -->
		</div>
		<form
			class="basic-flex-box"
			action="
		">
			<fudis-text-input
				data-theme="sisu"
				label="ei pakollinen tekstikenttä"
				helpText="Tähän saa kirjoittaa, mutta ei oo pakko"
				characterLimitIndicatorValue="50"
				[maxLength]="50"></fudis-text-input>
			<fudis-text-input
				required
				data-theme="sisu"
				label="pakollinen email"
				helpText="Tähän on pakko kirjoittaa sähköposti"
				type="email"></fudis-text-input>
			<fudis-text-input data-theme="sisu" label="vapaaehtoinen email" type="email"></fudis-text-input>
			<fudis-text-input data-theme="sisu" label="numerot" type="number"></fudis-text-input>
		</form>
		<fudis-icon icon="chevron" rotate="cw-90"></fudis-icon>
		<fudis-icon icon="achievement" color="success"></fudis-icon>

		<form class="basic-flex-box">
			<fudis-vanilla-text-input
				data-theme="sisu"
				label="Vanilla text input"
				[required]="true"
				helpText="Voit kirjoittaa tähän yhden kivan jutun"></fudis-vanilla-text-input>
			<fudis-vanilla-text-area
				label="Pakollinen vanilla textarea, tällä on myös aika pitkä label"
				[maxLength]="20"
				size="m"
				helpText="Voit kirjoittaa tähän monia kivoja juttuja"
				[required]="true">
			</fudis-vanilla-text-area>
			<fudis-vanilla-text-area label="Vanilla textarea, basic"> </fudis-vanilla-text-area>
			<fudis-button data-theme="sisu" type="submit" label="Lähetä"></fudis-button>
		</form>
		<fudis-badge variant="accent" content="accent"></fudis-badge>
		<fudis-badge variant="danger">danger</fudis-badge>
		<fudis-badge data-theme="sisu" variant="primary" content="sisu primary"></fudis-badge>
		<fudis-badge data-theme="into" variant="primary" content="into primary"></fudis-badge>
		<fudis-badge variant="secondary" content="secondary"></fudis-badge>
		<fudis-badge variant="success" content="success"></fudis-badge>
	`,
	styleUrls: ['./app.scss'],
})
export class AppComponent {
	title = 'dev';
}
