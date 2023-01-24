import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<!--The content below is only a placeholder and can be replaced.-->
		<div style="text-align:center" class="content">
			<h1>Welcome to {{ title }}!</h1>
		</div>
		<form class="basic-flex-box">
			<h2>Text input ja checbox</h2>
			<fudis-text-input [required]="true" label="Fudis text input"></fudis-text-input>
			<fudis-checkbox data-theme="sisu" label="Checkboxin label" [required]="true"></fudis-checkbox>
			<fudis-text-input label="Fudis text input 2"></fudis-text-input>
		</form>
		<form class="basic-flex-box">
			<h2>Textarea ja button</h2>
			<fudis-text-area
				label="Pakollinen textarea, tällä on myös aika pitkä label"
				[maxLength]="20"
				helpText="Voit kirjoittaa tähän monia kivoja juttuja, mutta max 20 kirjainta"
				[required]="true">
			</fudis-text-area>
			<fudis-text-area label="Fudis textarea, basic" size="m"> </fudis-text-area>
			<fudis-grid columns="1fr 1fr">
				<fudis-button data-theme="sisu" type="submit" label="Lähetä"></fudis-button>
				<fudis-button data-theme="sisu" label="Eiku" variant="secondary"></fudis-button>
				<fudis-button data-theme="sisu" label="Poista" variant="tertiary">
					<fudis-icon icon="delete"></fudis-icon>
				</fudis-button>
				<fudis-button data-theme="sisu" label="Poista" [disabled]="true">
					<fudis-icon icon="delete"></fudis-icon>
				</fudis-button>
			</fudis-grid>
		</form>
		<form class="basic-flex-box">
			<h2>Dropdown</h2>
			<fudis-dropdown [multipleOption]="true" label="Multi select"></fudis-dropdown>
			<fudis-dropdown
				[required]="true"
				label="Single select"
				helpText="Tästä pitäisi valita kiinnostavin kurssi, ole hyvä"></fudis-dropdown>
		</form>
		<div class="basic-flex-box2">
			<fudis-icon icon="chevron" rotate="cw-90"></fudis-icon>
			<fudis-icon icon="achievement" color="success"></fudis-icon>
		</div>

		<!-- <div class="basic-flex-box2">
			<fudis-badge variant="accent" content="accent"></fudis-badge>
			<fudis-badge variant="danger">danger</fudis-badge>
			<fudis-badge data-theme="sisu" variant="primary" content="sisu primary"></fudis-badge>
			<fudis-badge data-theme="into" variant="primary" content="into primary"></fudis-badge>
			<fudis-badge variant="secondary" content="secondary"></fudis-badge>
			<fudis-badge variant="success" content="success"></fudis-badge>
		</div> -->
	`,
	styleUrls: ['./app.scss'],
})
export class AppComponent {
	title = 'dev';
}
