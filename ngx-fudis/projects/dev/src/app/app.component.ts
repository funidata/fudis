import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<!--The content below is only a placeholder and can be replaced.-->
		<div style="text-align:center" class="content">
			<h1>Welcome to {{ title }}!</h1>
			<button mat-button>Nappi</button>
			<!-- <app-dialog-test></app-dialog-test> -->
			<fudis-checkbox>Tämä on fudis checkbox</fudis-checkbox>
			<!-- <fudis-heading size="xl" tag="h2"></fudis-heading>
			<fudis-body-text size="l-regular">Haloo</fudis-body-text>
			<fudis-body-text size="m-regular">Haloo</fudis-body-text>
			<fudis-body-text size="s-regular">Haloo</fudis-body-text>
			<fudis-body-text size="l-light">Haloo</fudis-body-text>
			<fudis-body-text size="m-light">Haloo</fudis-body-text> -->
		</div>
	`,
	styles: [],
})
export class AppComponent {
	title = 'dev';
}
