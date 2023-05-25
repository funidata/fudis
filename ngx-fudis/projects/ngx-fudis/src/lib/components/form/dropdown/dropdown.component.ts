import { Component, Input, ViewEncapsulation, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFudisDropdownOption } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';

@Component({
	selector: 'fudis-dropdown[id][label]',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent extends InputBaseDirective implements OnInit {
	@Input() control: FormControl;

	/**
	 * Dropdown options
	 */
	@Input() options: IFudisDropdownOption[];

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multipleOption = false;

	/**
	 * Custom placeholder text to show when no selection has been made
	 */
	@Input() placeholder: string;

	/**
	 * Available sizes for the dropdown - defaults to large.
	 */
	@Input() size?: 'xs' | 's' | 'm' | 'l' = 'l';

	/**
	 * Hide select option checkmark in option list
	 */

	@Input() hideSingleSelectionIndicator: boolean = false;

	/**
	 * Value output event on selectoion change
	 */
	@Output() selectionUpdate: EventEmitter<IFudisDropdownOption> = new EventEmitter<IFudisDropdownOption>();

	handleSelectionChange(value: IFudisDropdownOption): void {
		this.selectionUpdate.emit(value);
	}

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
