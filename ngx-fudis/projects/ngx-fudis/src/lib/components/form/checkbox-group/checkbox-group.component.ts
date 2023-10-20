import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FudisCheckboxGroupFormGroup, FudisInputSize } from '../../../types/forms';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-checkbox-group',
	templateUrl: './checkbox-group.component.html',
	styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
	/*
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
	}

	public ngOnChanges() {
		this.required = this.required || this.formGroup.hasValidator(Validators.required);
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
