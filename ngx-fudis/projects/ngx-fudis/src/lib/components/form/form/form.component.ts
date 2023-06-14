import { Component, Input } from '@angular/core';
import { HeadingLevel } from '../../../types/typography';

@Component({
	selector: 'fudis-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
})
export class FormComponent {
	@Input({ required: true }) id: string;

	@Input({ required: true }) title: string;

	@Input({ required: true }) titleTag: HeadingLevel;

	@Input() helpText: string;
}
