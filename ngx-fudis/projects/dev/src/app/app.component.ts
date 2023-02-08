import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	template: `
		<!--The content below is only a placeholder and can be replaced.-->
		<div style="text-align:center" class="content">
			<h1>Welcome to {{ title }}!</h1>
		</div>
		<form class="basic-flex-box">
			<h2>Textarea ja button</h2>
			<fudis-text-area
				[control]="textAreaControl"
				id="unique-text-area-id-1"
				label="Pakollinen textarea, tällä on myös aika pitkä label"
				[maxLength]="20"
				helpText="Voit kirjoittaa tähän monia kivoja juttuja, mutta max 20 kirjainta">
			</fudis-text-area>
			<fudis-grid columns="1fr 1fr">
				<fudis-button data-theme="sisu" type="submit" label="Lähetä"></fudis-button>
				<fudis-button data-theme="sisu" label="Eiku" variant="secondary"></fudis-button>
				<fudis-button icon="delete" data-theme="sisu" label="Poista" variant="tertiary"> </fudis-button>
				<fudis-button icon="delete" data-theme="sisu" label="Poista" [disabled]="true"> </fudis-button>
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
	`,
	styleUrls: ['./app.scss'],
})
export class AppComponent {
	title = 'dev';

	textAreaControl: UntypedFormControl = new UntypedFormControl('');
}
