import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<!--The content below is only a placeholder and can be replaced.-->
		<div style="text-align:center" class="content">
			<h1>Welcome to {{ title }}!</h1>
			<button mat-button>Nappi</button>
			<!-- <app-dialog-test></app-dialog-test> -->
			<fudis-heading size="xl" tag="h2"></fudis-heading>
			<fudis-body-text size="l-regular">Haloo</fudis-body-text>
			<fudis-body-text size="m-regular">Haloo</fudis-body-text>
			<fudis-body-text size="s-regular">Haloo</fudis-body-text>
			<fudis-body-text size="l-light">Haloo</fudis-body-text>
			<fudis-body-text size="m-light">Haloo</fudis-body-text>
		</div>
		<form>
			<fudis-text-input data-theme="sisu" [helpText]="'Lisää infoa'" [label]="'Etunimi'"></fudis-text-input>
			<fudis-text-input data-theme="sisu" [helpText]="'Aputeksti'" label="Etunimi" type="email"></fudis-text-input>
			<p>Tässä jotain välihömppää</p>
			<fudis-text-input data-theme="sisu" helpText="höpöhpö" label="...."></fudis-text-input>
			<fudis-button data-theme="sisu" type="submit">Submittaaa</fudis-button>
		</form>
		<form
			class="basic-flex-box"
			action="
		">
			<fudis-text-input data-theme="sisu" label="eka en oo pakollinen"></fudis-text-input>
			<fudis-text-input required data-theme="sisu" label="pakollinen email" type="email"></fudis-text-input>
			<fudis-text-input data-theme="sisu" label="vapaa ehtoinen email!" type="email"></fudis-text-input>
			<fudis-text-input data-theme="sisu" label="numeroa!!" type="number"></fudis-text-input>
		</form>
	`,
	styleUrls: ['./app.scss'],
})
export class AppComponent {
	title = 'dev';
}
