import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import {
  hasAtLeastOneRequiredOrMinValidator,
  // getMaxLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';

import { FudisComponentChanges } from '../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisDOMUtilitiesService } from '../../../services/dom/dom-utilities.service';

import { InputApiDirective } from '../../../directives/form/input-api/input-api.directive';

// TODO: Write Storybook documentation and add missing internal documentation for the functions (add public/private)
@Component({
  selector: 'fudis-input-with-language-options',
  templateUrl: './input-with-language-options.component.html',
  styleUrls: ['./input-with-language-options.component.scss'],
  providers: [FudisDOMUtilitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWithLanguageOptionsComponent
  extends InputApiDirective
  implements OnInit, OnChanges, AfterViewInit
{
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    protected _DOMUtilitiesService: FudisDOMUtilitiesService,
  ) {
    super();
    effect(() => {
      const translations = _translationService.getTranslations()();

      this._languageLabel = translations.INPUT_WITH_LANGUAGE_OPTIONS.LANGUAGE;
      this._missingLanguage = translations.INPUT_WITH_LANGUAGE_OPTIONS.MISSING;
      if (this.options) {
        this._updateSelectOptions();
      }
    });

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.formGroup) {
        this._required = hasAtLeastOneRequiredOrMinValidator(this.formGroup);
      }
    });
  }

  /**
   * FormGroup including controls.
   */
  @Input({ required: true }) formGroup: FormGroup<FudisInputWithLanguageOptionsFormGroup<object>>;

  /**
   * Option list for language Select Dropdown. To pair controls with corresponding Select option, FormControl's name must match with the controlName defined here. E.g. "{controlName: 'english', label: 'EN'}" pairs with Form Group's "english: new FormControl('')"
   */
  @Input() options: FudisDropdownLanguageOption[] = [
    { controlName: 'finnish', label: 'FI' },
    { controlName: 'swedish', label: 'SV' },
    { controlName: 'english', label: 'EN' },
  ];

  /**
   * Available sizes for the input - defaults to large.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Form element to display. Defaults to text-input
   */
  @Input() variant: 'text-input' | 'text-area' = 'text-input';

  /**
   * Min length for HTML attribute and for character indicator in guidance
   */
  protected _minLength: number | null = null;

  /**
   * Handle blur event
   */
  public onBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  /**
   * Update value and validity for FormGroup
   */
  protected _applyControlUpdateCheck(): void {
    const original = this.formGroup.updateValueAndValidity;

    this.formGroup.updateValueAndValidity = () => {
      original.apply(this.formGroup);
      this._updateValueAndValidityTrigger.next();
    };
  }

  /**
   * Control for language option Select
   */
  protected _selectControl: FormControl<FudisSelectOption<object>>;

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

  protected _updateSelectOptions(): void {
    const newOptions: FudisSelectOption<object>[] = [];

    this.options.forEach((option) => {
      let newOption: FudisSelectOption<object> | null = null;

      if (
        this.formGroup.controls[option.controlName].invalid ||
        !this.formGroup.controls[option.controlName].value
      ) {
        newOption = {
          value: option.controlName,
          label: `${option.label} (${this._missingLanguage})`,
        };
      } else {
        newOption = { value: option.controlName, label: option.label };
      }
      newOptions.push(newOption);
      if (option.controlName === this._selectControl?.value.value) {
        this._selectControl.patchValue(newOption);
      }
    });

    this._updatedOptions = newOptions;
  }

  /**
   * On init and when Select option changes, check if now visible input should be marked as required.
   */
  isInputRequired(controlKey: string): void {
    const groupRequiredError = this.formGroup?.errors?.['atLeastOneRequired'];

    const controlRequiredValidator = hasRequiredValidator(this.formGroup.controls[controlKey]);

    const groupRequiredValidator = hasAtLeastOneRequiredOrMinValidator(this.formGroup);

    const controlValue = this.formGroup.controls[controlKey].value;

    const nonEmptyControls = Object.keys(this.formGroup.controls).filter((control) => {
      return this.formGroup.controls[control].value;
    });

    if (
      controlRequiredValidator ||
      groupRequiredError ||
      (nonEmptyControls.length === 1 && controlValue && groupRequiredValidator)
    ) {
      this._required = true;
    } else {
      this._required = false;
    }
  }

  ngOnInit(): void {
    /**
     * Add given id to Id Service or generate unique id
     */
    if (this.id) {
      this._idService.addNewId('input-with-language-options', this.id);
    } else {
      this.id = this._idService.getNewId('input-with-language-options');
    }
  }

  ngOnChanges(changes: FudisComponentChanges<InputWithLanguageOptionsComponent>): void {
    if (changes.formGroup?.currentValue !== changes.formGroup?.previousValue) {
      this._updateSelectOptions();
      this._selectControl = new FormControl(this._updatedOptions[0]);
      this.isInputRequired(this._selectControl.value.value);
    }
  }

  ngAfterViewInit(): void {
    if (this.initialFocus) {
      this._inputRef.nativeElement.focus();
    }

    this._DOMUtilitiesService.setLabelHeight(true);
  }
}
