import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FudisLanguageAbbr } from 'projects/ngx-fudis/src/lib/types/miscellaneous';

@Component({
	selector: 'fudis-dt, fudis-description-list-term',
	templateUrl: './description-list-item-term.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemTermComponent {
	/**
	 * Languages input renders a Fudis language badge component for displaying Description List Item Detail values in given languages.
	 */
	@Input() languages: FudisLanguageAbbr[];
}
