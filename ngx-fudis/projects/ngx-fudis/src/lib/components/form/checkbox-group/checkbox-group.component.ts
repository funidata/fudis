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
import { FormGroup, Validators } from '@angular/forms';
import { FudisCheckboxOption, FudisFormGroupErrors } from '../../../types/forms';

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
	@Input({ required: true }) formGroup: FormGroup;

	/*
	 * Array of options for group of checkboxes
	 */
	@Input({ required: true }) options: FudisCheckboxOption[];

  /*
   * Object containing error messages for each FormControl and for the FormGroup.
   */
  @Input() groupErrorMsg: FudisFormGroupErrors;

	/**
	 * Set Checkbox Group's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	/**
	 * Set fieldset as required. By default set to 'undefined' and this attribute is determined to true / false depending on if FormControl has Validators.required. This setting will override that.
	 */
	@Input() required: boolean | undefined = undefined;

	/**
	 * Output for option click
	 */
	@Output() optionsChange = new EventEmitter<FudisCheckboxOption[]>();

  /**
   * Updated options array after changes
   */
  protected _updatedOptions: FudisCheckboxOption[] = [];

	ngOnInit() {
		this._id = this.id ?? this._idService.getNewId('checkboxGroup');

    if (this.options.length < 1) {
      throw new Error(
        `Fudis-checkbox-group should have at least one option for checkboxes.`
      );
    }

    const nameMismatch = this.options.filter((optionName) =>
      this.options.some((item) => optionName.name !== item.name)
    );

    if (nameMismatch.length > 0) {
      throw new Error(
        `In fudis-checkbox-group options array, each object's 'name' value should be identical for all options, but name mismatch was detected.`
      );
    }
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.formGroup.hasValidator(Validators.required);
	}

	toggleChecked(id: string): void {

    const newOptions: FudisCheckboxOption[] = [];

    this.options.forEach((option) => {
      if (option.id === id) {
        option.checked = !option.checked;
      }
      newOptions.push(option);
    });

    this._updatedOptions = newOptions;
		this.optionsChange.emit(this._updatedOptions);
	}
}
