import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { FUDIS_DATE_FORMATS, FudisInputSize } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { parseDate, updateLocale, updateMatDatePickerTranslations } from '../date-common/utilities';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import {
  getMaxDateFromValidator,
  getMinDateFromValidator,
  hasRequiredValidator,
} from '../../../../utilities/form/getValidators';
import { FudisValidatorFn } from '../../../../utilities/form/validators';
import { FormComponent } from '../../form/form.component';
import { FudisComponentChanges } from '../../../../types/miscellaneous';
import { FudisDateAdapter } from '../date-common/date-adapter';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateRangeComponent } from '../date-range/date-range.component';

@Component({
  selector: 'fudis-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: FudisDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: FUDIS_DATE_FORMATS },
  ],
})
export class DatepickerComponent
  extends InputBaseDirective
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    @Host() @Optional() protected _parentDateRange: DateRangeComponent | null,
    private _adapter: DateAdapter<Date>,
    private _datePickerConfigService: FudisTranslationService,
    private _datepickerIntl: MatDatepickerIntl,
    private _focusService: FudisFocusService,
    private _translationService: FudisTranslationService,
    _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
  ) {
    super(_idService, _changeDetectorRef);

    /**
     * Set and delete errors from Date Range start and end date inputs
     */
    if (_parentDateRange) {
      _parentDateRange?.showDateComparisonErrors.pipe(takeUntilDestroyed()).subscribe((value) => {
        const currentErrors = this.control?.errors;

        if (value) {
          if (this.dateRangeType === 'start') {
            this.control?.setErrors({
              ...currentErrors,
              datepickerStartDateInvalid: { message: this._startDateInvalidTranslation },
            });
          } else if (this.dateRangeType === 'end') {
            this.control?.setErrors({
              ...currentErrors,
              datepickerEndDateInvalid: { message: this._endDateInvalidTranslation },
            });
          }
        } else {
          if (currentErrors) {
            delete currentErrors['datepickerStartDateInvalid'];
            delete currentErrors['datepickerEndDateInvalid'];

            this.control?.setErrors({ ...currentErrors });
            this.control?.updateValueAndValidity();
          }
        }
      });
    }

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required = hasRequiredValidator(this.control);
        this._minDate = getMinDateFromValidator(this.control);
        this._maxDate = getMaxDateFromValidator(this.control);
      }
    });

    effect(() => {
      _adapter.setLocale(updateLocale(_translationService.getLanguageSignal()()));

      const translations = _translationService.getTranslations()();

      this._dateParseError.next(translations.DATEPICKER.VALIDATION.DATE_PARSE);

      _datepickerIntl = updateMatDatePickerTranslations(translations, _datepickerIntl);

      this._startDateInvalidTranslation =
        this._translationService.getTranslations()().DATEPICKER.VALIDATION.START_DATE_INVALID;
      this._endDateInvalidTranslation =
        this._translationService.getTranslations()().DATEPICKER.VALIDATION.END_DATE_INVALID;

      this._placeholderString = this._translationService.getTranslations()().DATEPICKER.PLACEHOLDER;
    });
  }

  /**
   * FormControl for the input
   */
  @Input({ required: true }) override control: FormControl<Date | null>;

  /**
   * Available sizes for the Datepicker
   */
  @Input() size: FudisInputSize = 'md';

  /**
   * Show internal date parsing validator message. By setting to false date parsing is not executed.
   */
  @Input() dateParse: boolean = true;

  /**
   * Type of the Datepicker in Date Range
   */
  public dateRangeType: 'start' | 'end' | null = null;

  /**
   * Allowed range for minimun date
   */
  protected _minDate: Date | null | undefined;

  /**
   * Allowed range for maximum date
   */
  protected _maxDate: Date | null | undefined;

  /**
   * Fudis translation for invalid start date in Date Range
   */
  protected _startDateInvalidTranslation: string;

  /**
   * Fudis translation for invalid end date in Date Range
   */
  protected _endDateInvalidTranslation: string;

  /**
   * Fudis translation for date parse error message
   */
  protected _dateParseError = new BehaviorSubject<string>('');

  /**
   * Fudis translation for Datepicker placeholder text
   */
  protected _placeholderString: string;

  /**
   * Instance of Datepicker Parse validator
   */
  private _parseValidatorInstance: FudisValidatorFn | null;

  /**
   * Validator reads HTML input field and checks if it can be converted to valid Date object
   */
  private _datepickerParseValidatorFn(): FudisValidatorFn {
    return (control: AbstractControl) => {
      if (!control) {
        return null;
      }

      const inputElValue = this._inputRef?.nativeElement?.value;
      const isValidDate = inputElValue ? parseDate(inputElValue) : false;

      if (!!inputElValue && !isValidDate) {
        return { datepickerDateParse: { message: this._dateParseError } };
      }
      return null;
    };
  }

  private _addParseValidator(): void {
    this._parseValidatorInstance = this._datepickerParseValidatorFn();
    this.control.addValidators(this._parseValidatorInstance);
    this.control.updateValueAndValidity();
  }

  private _removeParseValidator(): void {
    if (this._parseValidatorInstance) {
      this.control.removeValidators(this._parseValidatorInstance);
      this._parseValidatorInstance = null;
      this.control.updateValueAndValidity();
    }
  }

  /**
   * Handle calendar close
   */
  protected _handleCalendarClose(): void {
    this.control.updateValueAndValidity();
  }

  /**
   * Handle input blur
   */
  protected _handleInputBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  /**
   * Handle input key up
   */
  protected _handleKeyUp(event: KeyboardEvent): void {
    this.handleKeyUp.emit(event);
  }

  ngOnInit(): void {
    this._setInputId('datepicker');

    if (!this._parseValidatorInstance && this.dateParse) {
      this._addParseValidator();
    }

    this._reloadErrorSummaryOnInit(this._parentForm?.errorSummaryVisible, this.control);
  }

  ngOnChanges(changes: FudisComponentChanges<DatepickerComponent>): void {
    // If prop dateParse value changes, add or remove validator accordingly
    if (changes.dateParse?.currentValue !== changes.dateParse?.previousValue) {
      if (changes.dateParse?.currentValue && !this._parseValidatorInstance) {
        this._addParseValidator();
      } else if (!changes.dateParse?.currentValue && this._parseValidatorInstance) {
        this._removeParseValidator();
      }
    }

    // Do checks for the control to define attributes used in e.g. HTML
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._applyControlUpdateCheck();

      // Subscribe to control value changes and call parent's date crossing check with current value and Date Range input type
      if (this._parentDateRange && this.dateRangeType) {
        this.control.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((value) =>
            this._parentDateRange?.checkDateCrossings(value, this.dateRangeType!),
          );
      }

      // If control changes and these checks are on, add parseValidator
      if (!this._parseValidatorInstance && this.dateParse) {
        this._addParseValidator();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }

    this._parentDateRange?.setLabelHeight();
  }

  ngOnDestroy(): void {
    this._removeParseValidator();
  }
}
