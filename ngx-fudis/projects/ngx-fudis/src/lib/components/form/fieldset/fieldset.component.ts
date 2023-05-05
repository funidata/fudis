import { Component, ContentChild } from '@angular/core';

import { FieldsetContentDirective, FieldsetGuidanceDirective } from './fieldset-directives';
import { FieldsetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent extends FieldsetBaseDirective {
	@ContentChild(FieldsetGuidanceDirective) fieldsetGuidanceContent: FieldsetGuidanceDirective;

	@ContentChild(FieldsetContentDirective) fieldsetContent: FieldsetContentDirective;
}
