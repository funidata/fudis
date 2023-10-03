import { Component, Host, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {
	FudisCheckboxGroupFormGroup,
	FudisCheckboxOption,
	FudisFormGroupErrors,
	FudisInputWidth,
} from '../../../types/forms';

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

	/*
	 * Object containing error messages for each FormControl and for the FormGroup.
	 */
	@Input() groupErrorMsg: FudisFormGroupErrors;

	/**
	 * Set fieldset as required. By default set to 'undefined' and this attribute is determined to true / false depending on if FormGroup has Validators.required.
	 */
	@Input() required: boolean | undefined = undefined;

	/**
	 * Set Checkbox Group's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	/**
	 * Width size of the group - defaults to large.
	 */
	@Input() size: FudisInputWidth = 'lg';

	@Host() public groupId: string;

	/**
	 * To determine if focus has been moved out from the whole checkbox group, so possible errors will not show before that.
	 */
	protected _groupBlurredOut = false;

	/**
	 * Updated options array after changes
	 */
	protected _updatedOptions: FudisCheckboxOption[] = [];

	ngOnInit() {
		this.id = this.id ?? this._idService.getNewId('checkboxGroup');
	}

	ngOnChanges() {
		this.required = this.required || this.formGroup.hasValidator(Validators.required);
	}

	handleGroupFocusedOut(value: boolean): void {
		if (value) {
			this._groupBlurredOut = true;
		} else {
			this._groupBlurredOut = false;
		}
	}
}
