import { Component, ContentChild, ViewEncapsulation } from '@angular/core';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent extends FieldSetBaseDirective {
	@ContentChild(ActionsDirective) headerActions: ActionsDirective | null;
}
