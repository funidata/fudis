import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<!--The content below is only a placeholder and can be replaced.-->
		<fudis-heading tag="h1" size="xl">Welcome to Fudis sandbox </fudis-heading>

		<form class="basic-flex-box">
			<fudis-heading tag="h2" size="l">Text area and button</fudis-heading>
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
		<fudis-expandable title="Title for expandable">
			<ng-template fudisExpandableContent>
				<fudis-heading tag="h3" size="m">This is heading inside an expandable</fudis-heading>
				<fudis-body-text>This is body text inside an expandable</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`,
	styleUrls: ['./app.scss'],
})
export class AppComponent {
	title = 'dev';
}
