import { Component, Input } from '@angular/core';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent {
	@Input() legend: string;
}
