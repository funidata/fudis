import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';

@Component({
	selector: 'fudis-dd, fudis-description-list-details',
	templateUrl: './description-list-item-details.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemDetailsComponent {
	@Input() lang: FudisLanguageAbbr;

	@ContentChild(ActionsDirective) actions: ActionsDirective;

	@Input() subHeading: string | undefined;
}
