import { Component, ContentChild, Input } from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';

@Component({
	selector: 'fudis-dd, fudis-description-list-details',
	templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent {
	@ContentChild(ActionsDirective) actions: ActionsDirective;

	@Input() lang: FudisLanguageAbbr;

	@Input() subHeading: string | undefined;
}
