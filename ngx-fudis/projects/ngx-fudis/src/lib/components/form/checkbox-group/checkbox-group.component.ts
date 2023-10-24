import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FudisCheckboxGroupFormGroup, FudisInputSize } from '../../../types/forms';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-checkbox-group',
	templateUrl: './checkbox-group.component.html',
	styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent extends FieldSetBaseDirective implements OnInit {
	/**
	 * FormControl for Checkbox group
	 */
	@Input({ required: true }) formGroup: FormGroup<FudisCheckboxGroupFormGroup>;

	/**
	 * Set fieldset as required. Alternatively provide FormGroup Validators.required to display 'required' text in the legend lable.
	 */
	@Input() required: boolean | undefined = undefined;

	/**
	 * Set Checkbox Group's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	/**
	 * Width size of the group - defaults to large.
	 */
	@Input() size: FudisInputSize = 'lg';

	/**
	 * To determine if focus has been moved out from the whole checkbox group, so possible errors will not show before that.
	 */
	public groupBlurredOut = false;

	public ngOnInit() {
		this.id = this.id ?? this._idService.getNewId('checkboxGroup');
		if (this.formGroup.touched) {
			this.groupBlurredOut = true;
		} else {
			/**
			 * Extend original markAllAsTouched function to change groupBlurredOut value to 'true', so error messages are loaded when e.g. on Submit touched value is changed programatically
			 */
			const originalMarkAllAsTouched = this.formGroup.markAllAsTouched;
			this.formGroup.markAllAsTouched = () => {
				originalMarkAllAsTouched.apply(this.formGroup);
				this.groupBlurredOut = true;
			};
		}
	}

	/**
	 * Used to display possible error messages only when focus has moved out from all the group's checkboxes.
	 */
	public setGroupBlurredOut(value: boolean): void {
		if (value) {
			this.groupBlurredOut = true;
		} else {
			this.groupBlurredOut = false;
		}
	}
}
