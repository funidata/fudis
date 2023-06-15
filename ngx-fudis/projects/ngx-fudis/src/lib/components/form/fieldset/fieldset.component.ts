import { Component, ViewEncapsulation } from '@angular/core';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent extends FieldSetBaseDirective {}
