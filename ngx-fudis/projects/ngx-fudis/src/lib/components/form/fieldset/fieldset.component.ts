import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FieldsetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent extends FieldsetBaseDirective {
	@Input() control: FormControl;
}
