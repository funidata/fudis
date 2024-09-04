import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  effect,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FudisInputWithLanguageOptionsFormGroup,
  FudisSelectOption,
  FudisDropdownLanguageOption,
  FudisInputSize,
} from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';

// TODO: Write Storybook documentation and add missing internal documentation for the functions (add public/private)
@Component({
  selector: 'fudis-input-with-language-options',
  templateUrl: './input-with-language-options.component.html',
  styleUrls: ['./input-with-language-options.component.scss'],
})
export class InputWithLanguageOptionsComponent
  extends InputBaseDirective
  implements OnInit, OnChanges, AfterViewInit
{
  constructor(
    private _translationService: FudisTranslationService,
    _idService: FudisIdService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _changeDetectorRef);

    effect(() => {
      const translations = _translationService.getTranslations()();

      this._languageLabel = translations.INPUT_WITH_LANGUAGE_OPTIONS.LANGUAGE;
      this._missingLanguage = translations.INPUT_WITH_LANGUAGE_OPTIONS.MISSING;
      if (this.options) {
        this._updatedOptions = this.updateDropdownList();
      }
    });
  }

  /**
   * FormGroup including controls.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) formGroup: FormGroup<FudisInputWithLanguageOptionsFormGroup<object>>;

  /**
   * Option list for language selection Fudis Dropdown. To pair control with corresponding dropdown option Dropdown option "value" must equal to control's name. E.g. "{value: 'english', label: 'EN'}" pairs with "english: New FormControl('')"
   */
  @Input({ required: true }) options: FudisDropdownLanguageOption[];

  /**
   * Available sizes for the input - defaults to large.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Form element to display. Defaults to text-input
   */
  @Input() variant: 'text-input' | 'text-area' = 'text-input';

  /**
   * Maximum length for text area, unset by default.
   */
  @Input() maxLength: number | null = null;

  /**
   * Control for language option dropdown
   */
  protected _dropdownControl: FormControl<FudisSelectOption<object>>;

  /**
   * Property to check control values for required language options
   */
  protected _requiredControls: {
    [key: string]: { value?: string | null; required: boolean | undefined };
  } = {};

  /**
   * Updated options list after changes
   */
  protected _updatedOptions: FudisSelectOption<object>[] = [];

  /**
   * Fudis translation
   */
  protected _missingLanguage: string;

  /**
   * Fudis translation
   */
  protected _languageLabel: string;

  /**
   * If component is loaded for the first time
   */
  protected _firstLoad: boolean = true;

  /**
   * Language option dropdown value
   */
  private _dropdownValue: FudisSelectOption<object>;

  /**
   * For attribute for dropdown value
   */
  private _for: string = '';

  /**
   * At least one language input is required
   */
  private _atLeastOneRequired: boolean = false;

  /**
   * Property to check that control is not empty
   */
  private _nonEmptyControls: string[] = [];

  handleLanguageSelect(value: FudisSelectOption<object> | null): void {
    if (value) {
      this._dropdownValue = value;
      this._for = `${this.id}_${value.value}`;
    }
  }

  handleInputBlur(event: Event, controlKey: string): void {
    this._updatedOptions = this.updateDropdownList();
    this.formGroup.markAllAsTouched();

    this.isControlRequired((event.target as HTMLInputElement).value, controlKey);
  }

  updateDropdownList(): FudisSelectOption<object>[] {
    const newOptions: FudisSelectOption<object>[] = [];

    this.options.forEach((option) => {
      if (
        this.formGroup.controls[option.value].invalid ||
        !this.formGroup.controls[option.value].value
      ) {
        const updatedOption = { ...option, label: `${option.label} (${this._missingLanguage})` };

        newOptions.push(updatedOption);

        if (option.value === this._dropdownControl?.value.value) {
          this._dropdownControl.patchValue(updatedOption);
        }
      } else {
        if (option.value === this._dropdownControl?.value.value) {
          this._dropdownControl.patchValue(option);
        }
        newOptions.push(option);
      }
    });

    return newOptions;
  }

  /**
   * OnInit check to forward necessary "required" attributes to all generated inputs.
   */
  initialRequiredCheck(): void {
    this._requiredControls = {};

    // TODO: change this._atLeastOneRequired to be fetched with getValidators

    if (this.formGroup.errors?.['atLeastOneRequired']) {
      this._atLeastOneRequired = true;

      Object.keys(this.formGroup.controls).forEach((control) => {
        this._requiredControls = {
          ...this._requiredControls,
          [control]: {
            value: this.formGroup.controls[control].value,
            required: this._atLeastOneRequired,
          },
        };
      });
    } else {
      Object.keys(this.formGroup.controls).forEach((control) => {
        const isRequired = hasRequiredValidator(this.formGroup.controls[control]);

        this._requiredControls = {
          ...this._requiredControls,
          [control]: {
            value: this.formGroup.controls[control].value,
            required: isRequired ? true : undefined,
          },
        };
      });
    }
  }

  // TODO: as Required input property has been removed, an alternative logic needs to be implemented

  /**
   * Check onBlur if required is needed to be shown
   */
  isControlRequired(value: string, controlKey: string): void {
    // If all controls are invalid run initialRequiredCheck()
    if (this.formGroup.errors?.['atLeastOneRequired']) {
      this.initialRequiredCheck();
    } else if (this._atLeastOneRequired && controlKey) {
      // Check how many controls are empty
      this._requiredControls[controlKey].value = value;

      this._nonEmptyControls = Object.keys(this._requiredControls).filter((control) => {
        return (
          this._requiredControls[control].value !== '' &&
          this._requiredControls[control].value !== null
        );
      });

      // If only one control is not empty, include required with that
      if (this._nonEmptyControls.length === 1) {
        this._requiredControls = {};
        Object.keys(this.formGroup.controls).forEach((control) => {
          const isRequired = hasRequiredValidator(this.formGroup.controls[control]);

          this._requiredControls = {
            ...this._requiredControls,
            [control]: {
              value: this.formGroup.controls[control].value,
              required: this._nonEmptyControls.includes(control) || isRequired ? true : undefined,
            },
          };
        });
      }

      // If two or more controls have a value, remove visible required text unless control has FudisValidators.required() or Validators.required
      if (this._atLeastOneRequired && this._nonEmptyControls.length > 1) {
        this._requiredControls = {};
        Object.keys(this.formGroup.controls).forEach((control) => {
          const isRequired = hasRequiredValidator(this.formGroup.controls[control]);

          this._requiredControls = {
            ...this._requiredControls,
            [control]: {
              value: this.formGroup.controls[control].value,
              required: isRequired,
            },
          };
        });
      }
    }
  }

  ngOnInit(): void {
    this._setInputId('input-with-language-options');

    this._updatedOptions = this.updateDropdownList();

    this._dropdownControl = new FormControl(this._updatedOptions[0]);
    this._for = `${this.id}_${this.options[0].value}`;

    this.initialRequiredCheck();
  }

  ngOnChanges(): void {
    this._updatedOptions = this.updateDropdownList();
  }

  ngAfterViewInit(): void {
    if (this._firstLoad) {
      this._firstLoad = false;
    }
  }
}
