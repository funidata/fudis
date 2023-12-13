import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { FudisInputSize } from '../../../../types/forms';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';

@Directive({
	selector: '[fudisSelectBase]',
})
export class SelectBaseDirective extends InputBaseDirective {
	@ViewChild('dropdownElement') dropdownElement: ElementRef<HTMLElement>;

	/**
	 * Assign dropdown as single-select or multiselect (with checkboxes)
	 */
	@Input() multiselect: boolean = false;

	/**
	 * Set dropdown size (should follow the given input element size)
	 */
	@Input() size: FudisInputSize | 'xs' = 'lg';

	/**
	 * Set dropdown open
	 */
	@Input() open: boolean = false;
}
