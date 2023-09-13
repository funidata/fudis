import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FudisCheckboxOption, FudisFormErrors } from '../../../types/forms';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Component({
	selector: 'fudis-checkbox-group',
	templateUrl: './checkbox-group.component.html',
	styleUrls: ['./checkbox-group.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
	constructor(
		private _idService: FudisIdService,
		private _checkboxGroupConfigService: FudisTranslationService
	) {
		super(_checkboxGroupConfigService);
	}

	@HostBinding('class') classes = 'fudis-checkbox-group-host';

	/*
	 * FormControl for Checkbox group
	 */
	@Input({ required: true }) control: FormControl<FudisCheckboxOption[] | null>;

	/*
	 * Array of options for group of radio buttons
	 */
	@Input({ required: true }) options: FudisCheckboxOption[];

	/**
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: FudisFormErrors;

	/**
	 * Set Checkbox Group's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	/**
	 * Set fieldset as required. By default set to 'undefined' and this attribute is determined to true / false depending on if FormControl has Validators.required. This setting will override that.
	 */
	@Input() required: boolean | undefined = undefined;

	/**
	 * Array of selected checkbox options which user is clicking. Can also be used to set preselected options.
	 */
	@Input() selectedOptions: FudisCheckboxOption[] = [];

	/**
	 * Output for option click
	 */
	@Output() optionsChange = new EventEmitter<FudisCheckboxOption[]>();

	ngOnInit() {
		this._id = this.id ?? this._idService.getNewId('checkboxGroup');
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}

	removeItem(id: string): void {
		this.selectedOptions = this.selectedOptions.filter((option) => id !== option.id);
		this.optionsChange.emit(this.selectedOptions);
	}

	isChecked(option: FudisCheckboxOption): boolean {
		return this.selectedOptions.some((e) => e.id === option.id);
	}

	toggleChecked(option: FudisCheckboxOption): void {
		if (this.isChecked(option)) {
			this.removeItem(option.id);
		} else {
			this.selectedOptions.push(option);
		}
		this.optionsChange.emit(this.selectedOptions);
	}
}
