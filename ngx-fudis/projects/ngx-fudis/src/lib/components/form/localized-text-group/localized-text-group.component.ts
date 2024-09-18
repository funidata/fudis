import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  effect,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FudisLocalizedTextGroup,
  FudisSelectOption,
  FudisLocalizedTextGroupOptions,
  FudisInputSize,
} from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import {
  getMinLengthFromValidator,
  hasOneRequiredOrMinValidator,
  getMaxLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';

import { FudisComponentChanges } from '../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisDOMUtilitiesService } from '../../../services/dom/dom-utilities.service';

import { BehaviorSubject, Subject } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { GroupComponentBaseDirective } from '../../../directives/form/group-component-base/group-component-base.directive';

@Component({
  selector: 'fudis-localized-text-group',
  templateUrl: './localized-text-group.component.html',
  styleUrls: ['./localized-text-group.component.scss'],
  providers: [FudisDOMUtilitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalizedTextGroupComponent
  extends GroupComponentBaseDirective
  implements OnInit, OnChanges
{
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    private _translationService: FudisTranslationService,
    protected _DOMUtilitiesService: FudisDOMUtilitiesService,
    _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
  ) {
    super(_idService, _changeDetectorRef);
    effect(() => {
      const translations = _translationService.getTranslations()();

      this._languageLabel.next(translations.INPUT_WITH_LANGUAGE_OPTIONS.LANGUAGE);
      this._missingLanguage = translations.INPUT_WITH_LANGUAGE_OPTIONS.MISSING;
      if (this.options) {
        this._updateSelectOptions();
      }
    });

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.formGroup && this._selectControl.value) {
        this._checkHtmlAttributes(this._selectControl.value.value);
        this._updateSelectOptions();
      }
    });
  }

  /**
   * FormGroup including controls.
   */
  @Input({ required: true }) override formGroup: FormGroup<FudisLocalizedTextGroup<object>>;

  /**
   * Option list for language Selection. To pair controls with corresponding Select option, FormControl's name must match with the controlName defined here. E.g. by default "{controlName: 'english', label: 'EN'}" pairs with Form Group's "english: new FormControl('')"
   */
  @Input() options: FudisLocalizedTextGroupOptions[] = [
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
  protected _minLength = new BehaviorSubject<number | null>(null);

  /**
   * Control for language option Select
   */
  protected _selectControl: FormControl<FudisSelectOption<object> | null> = new FormControl(null);

  /**
   * Property to check control values for required language options
   */
  protected _requiredControls: {
    [key: string]: { value?: string | null; required: boolean | undefined };
  } = {};

  /**
   * Updated options list after changes
   */
  protected _selectOptions: FudisSelectOption<object>[] = [];

  /**
   * Fudis translation
   */
  protected _missingLanguage: string;

  /**
   * Fudis translation
   */
  protected _languageLabel = new Subject<string>();

  /**
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected _maxLength = new BehaviorSubject<number | null>(null);

  /**
   * When Form Control value changes, update Select Options accordingly with or without Missing text
   */
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
      if (option.controlName === this._selectControl?.value?.value) {
        this._selectControl.patchValue(newOption);
      }
    });

    this._selectOptions = newOptions;
  }

  /**
   * On init and when Select option changes, check if now visible input should be marked as required.
   */
  private _isInputRequired(control: FormControl<string | null>): boolean {
    const groupRequiredError = this.formGroup?.errors?.['oneRequired'];

    const controlRequiredValidator = hasRequiredValidator(control);

    const groupRequiredValidator = hasOneRequiredOrMinValidator(this.formGroup);

    const nonEmptyControls = Object.keys(this.formGroup.controls).filter((control) => {
      return this.formGroup.controls[control].value;
    });

    if (
      controlRequiredValidator ||
      groupRequiredError ||
      (nonEmptyControls.length === 1 && control.value && groupRequiredValidator)
    ) {
      return true;
    }
    return false;
  }

  protected _checkHtmlAttributes(controlName: string): void {
    const control = this.formGroup.controls[controlName];

    this._minLength.next(getMinLengthFromValidator(control));
    this._maxLength.next(getMaxLengthFromValidator(control));
    this._required.next(this._isInputRequired(control));
  }

  /**
   * TODO: write test check cdr logic
   *
   * Tell Guidance, that this component has errors which were not loaded to Error Summary, if component was initialised after parent's Error Summary was set to visible.
   */

  ngOnInit(): void {
    this._setComponentId('localized-text-group');

    this._triggerErrorSummaryOnInitReload(
      this._parentForm?.errorSummaryVisible,
      this.formGroup.invalid,
    );
  }

  ngOnChanges(changes: FudisComponentChanges<LocalizedTextGroupComponent>): void {
    if (changes.formGroup?.currentValue !== changes.formGroup?.previousValue) {
      this._applyGroupUpdateCheck();
      this._updateSelectOptions();
      this._selectControl.patchValue(this._selectOptions[0]);
      this._checkHtmlAttributes(this._selectOptions[0].value);
    }

    if (
      changes.size?.currentValue !== changes.size?.previousValue &&
      this._DOMUtilitiesService.labelHeightMatched.value
    ) {
      this._DOMUtilitiesService.setLabelHeight(true);
    }
  }
}