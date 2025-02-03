import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  effect,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FudisLocalizedTextGroupFormGroup,
  FudisSelectOption,
  FudisLocalizedTextGroupFormGroupOptions,
  FudisInputSize,
} from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisValidatorUtilities } from '../../../utilities/form/validator-utilities';

import { FudisComponentChanges } from '../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GroupComponentBaseDirective } from '../../../directives/form/group-component-base/group-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Component({
  selector: 'fudis-localized-text-group',
  templateUrl: './localized-text-group.component.html',
  styleUrls: ['./localized-text-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalizedTextGroupComponent<T extends FudisLocalizedTextGroupFormGroup<T>>
  extends GroupComponentBaseDirective
  implements OnInit, OnChanges, AfterViewInit
{
  constructor(
    private _translationService: FudisTranslationService,
    _idService: FudisIdService,
    _focusService: FudisFocusService,
  ) {
    super(_idService, _focusService);
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
  @Input({ required: true }) override formGroup: FormGroup<T>;

  /**
   * Option list for language Selection. To pair controls with corresponding Select option, FormControl's name must match with the controlName defined here. E.g. by default "{controlName: 'en', label: 'EN'}" pairs with Form Group's "en: new FormControl('')"
   */
  @Input() options: FudisLocalizedTextGroupFormGroupOptions[] = [
    { controlName: 'fi', label: 'FI' },
    { controlName: 'sv', label: 'SV' },
    { controlName: 'en', label: 'EN' },
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
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected _maxLength = new BehaviorSubject<number | null>(null);

  /**
   * Control for language option Select
   */
  protected _selectControl: FormControl<FudisSelectOption<object> | null> = new FormControl(null);

  /**
   * Updated options list after changes
   */
  protected _selectOptions: FudisSelectOption<object>[] = [];

  /**
   * Fudis translation
   */
  protected _missingLanguage: string;

  /**
   * Subscription for handling the valueChanges observable
   */
  private _subscription: Subscription;

  /**
   * Fudis translation
   */
  protected _languageLabel = new BehaviorSubject<string>(
    this._translationService.getTranslations()().INPUT_WITH_LANGUAGE_OPTIONS.LANGUAGE,
  );

  /**
   * When Form Control value changes, update Select Options accordingly with or without Missing text
   */
  protected _updateSelectOptions(): void {
    const newOptions: FudisSelectOption<object>[] = [];

    this.options.forEach((option) => {
      let newOption: FudisSelectOption<object> | null = null;

      if (
        this.formGroup.controls[option.controlName as keyof T].invalid ||
        !this.formGroup.controls[option.controlName as keyof T].value
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

    const controlRequiredValidator = FudisValidatorUtilities.required(control);

    const groupRequiredValidator = FudisValidatorUtilities.oneRequiredOrMin(this.formGroup);

    const nonEmptyControls = Object.keys(this.formGroup.controls).filter((control) => {
      return this.formGroup.controls[control as keyof T].value;
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
    const control = this.formGroup.controls[controlName as keyof T] as FormControl<string | null>;

    this._minLength.next(FudisValidatorUtilities.minLength(control));
    this._maxLength.next(FudisValidatorUtilities.maxLength(control));
    this._required.next(this._isInputRequired(control));
  }

  ngOnInit(): void {
    this._setComponentId('localized-text-group');
  }

  ngOnChanges(changes: FudisComponentChanges<LocalizedTextGroupComponent<T>>): void {
    if (changes.formGroup?.currentValue !== changes.formGroup?.previousValue) {
      this._subscription?.unsubscribe();
      this._subscription = this.formGroup.valueChanges
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this._updateValueAndValidityTrigger.next());
      this._updateSelectOptions();
      this._selectControl.patchValue(this._selectOptions[0]);
      this._checkHtmlAttributes(this._selectOptions[0].value);
    }
  }
}
