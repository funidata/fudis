import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TFudisFormErrorMessages, IFudisDropdownOption } from '../../../types/forms';
import isRequired from '../../../utilities/errors/errors.utility';
import { GuidanceComponent } from '../guidance/guidance.component';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';

@Component({
	selector: 'fudis-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent extends TooltipApiDirective implements OnInit {
	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/**
	 * Dropdown options
	 */
	@isRequired
	@Input()
	options: IFudisDropdownOption[];

	/**
	 * FormControl for the dropdown
	 */
	@Input() control: FormControl;

	/*
	 * Error message shown below the input
	 */
	@Input() errorMsg: TFudisFormErrorMessages;

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multipleOption = false;

	/**
	 * Label for the dropdown
	 */
	@isRequired
	@Input()
	label: string;

	/**
	 * Unique dropdown id
	 */
	@isRequired
	@Input()
	id: string;

	/**
	 * Custom placeholder text to show when no selection has been made
	 */
	@Input() placeholder: string;

	/**
	 * Help text, aligned underneath the dropdown
	 */
	@Input() helpText: string;

	/**
	 * Text to indicate that input is required, shown above the input with asterisk
	 */
	@Input() requiredText: string;

	/**
	 * Available sizes for the dropdown - defaults to large.
	 */
	@Input() size: 's' | 'm' | 'l' = 'l';

	required: boolean = false;

	ngOnInit(): void {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}
	}

	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}

	handleSelectionChange(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
