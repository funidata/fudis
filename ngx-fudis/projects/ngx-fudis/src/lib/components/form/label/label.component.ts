import { Component, Input } from '@angular/core';

@Component({
	selector: 'fudis-label',
	templateUrl: './label.component.html',
	styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
	@Input() requiredText: string | null = null;

	@Input() text: string;

	@Input() for: string;
}
