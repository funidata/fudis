import { Component, Input, OnInit } from '@angular/core';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';

@Component({
	selector: 'fudis-label',
	templateUrl: './label.component.html',
	styleUrls: ['./label.component.scss'],
})
export class LabelComponent extends TooltipDirective implements OnInit {
	/**
	 * Text indicating if form element associated with label required or not
	 */
	@Input() requiredText: string | null = null;

	/**
	 * Text visible as label text
	 */
	@Input() text: string;

	/**
	 * HTML 'for' attribute. E.g. if text-input's id is 'text-input-1' give this id as 'for' attribute to label
	 */
	@Input() for: string;

	/**
	 * Id for label, e. g. used in Dropdown to link ngMaterial mat-select with 'aria-labelledby' to fudis-label
	 */
	@Input() id: string;
}
