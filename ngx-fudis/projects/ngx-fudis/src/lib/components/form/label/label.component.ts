import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';

@Component({
	selector: 'fudis-label',
	templateUrl: './label.component.html',
	styleUrls: ['./label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent extends TooltipApiDirective {
	/**
	 * Id for label, e. g. used in Dropdown to link ngMaterial mat-select with 'aria-labelledby' to fudis-label
	 */
	@Input({ required: true }) id: string;

	/**
	 * Text visible as label
	 */
	@Input({ required: true }) text: string;

	/**
	 * HTML 'for' attribute. E.g. if text-input's id is 'text-input-1', give this id as 'for' attribute to the label
	 */
	@Input() for: string;

	/**
	 * Text indicating if form element associated with the label is required or not
	 */
	@Input() requiredText: string | undefined = undefined;
}
