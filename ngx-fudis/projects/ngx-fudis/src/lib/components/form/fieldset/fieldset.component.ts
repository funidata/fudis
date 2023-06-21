import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { NotificationsDirective } from '../../../directives/content-projection/notifications/notifications.directive';
import { GridWidth, GridAlign, GridMarginSide } from '../../../types/grid';
import { Spacing } from '../../../types/spacing';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent extends FieldSetBaseDirective {
	@ContentChild(ActionsDirective) headerActions: ActionsDirective | null;

	@ContentChild(NotificationsDirective) notifications: NotificationsDirective;

	@ContentChild(ContentDirective) content: ContentDirective;

	/**
	 * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
	 * xxl = Default value. Viewports of 1600px and larger
	 * xl = Viewports smaller than 1600px
	 * lg = Viewports smaller than 1200px
	 * md = Viewports smaller than 992px
	 * sm = Viewports smaller than 768px
	 * xs = Viewports smaller than 576px
	 */
	@Input() width: GridWidth = 'xxl';

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: GridAlign = 'center';

	/**
	 * Margin top for the Grid
	 */
	@Input() marginTop: Spacing = 'none';

	/**
	 * Margin bottom for the Grid
	 */
	@Input() marginBottom: Spacing = 'none';

	/**
	 * Horizontal margins left and right of the grid
	 */
	@Input() marginSides: GridMarginSide = 'none';
}
