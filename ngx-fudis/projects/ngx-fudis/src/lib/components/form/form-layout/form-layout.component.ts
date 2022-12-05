import { Component, Input } from '@angular/core';

@Component({
	selector: 'fudis-form-layout',
	templateUrl: './form-layout.component.html',
	styleUrls: ['./form-layout.component.scss'],
})
export class FormLayoutComponent {
	@Input() variant: 'regular' | 'wide' = 'regular';

	@Input() columns: 1 | 2 | 4 = 2;
}
