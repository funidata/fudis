import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';

@Component({
	selector: 'fudis-dd, fudis-description-list-details',
	templateUrl: './description-list-item-details.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemDetailsComponent {
	@ContentChild(ActionsDirective) actions: ActionsDirective;

	@Input() subHeading: string | undefined;
}
