import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFudisDropdownOption } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-dropdown[id][label]',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent extends InputBaseDirective implements OnInit {
	/**
	 * Dropdown options
	 */
	@Input() options: IFudisDropdownOption[];

	/**
	 * FormControl for the dropdown
	 */
	@Input() control: FormControl;

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
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 * Value output event
	 */
	@Output() selectionUpdate: EventEmitter<IFudisDropdownOption> = new EventEmitter<IFudisDropdownOption>();

	required: boolean = false;

	ngOnInit(): void {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}
	}

	handleSelectionChange(value: IFudisDropdownOption): void {
		this.selectionUpdate.emit(value);
	}
}
