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
    private _adapter: DateAdapter<Date>,
    private _datePickerConfigService: FudisTranslationService,
    private _datepickerIntl: MatDatepickerIntl,
    private _focusService: FudisFocusService,
    _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
  ) {
    super(_datePickerConfigService, _idService, _changeDetectorRef);

    effect(() => {
      _adapter.setLocale(updateLocale(this._translationService.getLanguageSignal()()));
      this._dateParseError = this._translations().DATEPICKER.VALIDATION.DATE_PARSE;

      _datepickerIntl = updateMatDatePickerTranslations(this._translations(), _datepickerIntl);
    });
  }

  /**
   * FormControl for the input
   */
  @Input({ required: true }) control: FormControl<Date | null>;

  /**
   * Available sizes for the datepicker
   */
  @Input() size: FudisInputSize = 'md';

  /**
   * Show internal date parsing validator message. By setting to false date parsing is not executed.
   */
  @Input() parseDateValidator: boolean = true;

  /**
   * Allowed range for minimun date
   */
  protected _minDate: Date | null | undefined;

  /**
   * Allowed range for maximum date
   */
  protected _maxDate: Date | null | undefined;

  /**
   * Fudis translation for date parse error message
   */
  protected _dateParseError: string;

  /**
   * Instance of Datepicker Parse validator
   */
  private _parseValidatorInstance: FudisValidatorFn | null;

  /**
   * Validator reads html input field and checks if it can be converted to valid Date object
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
   * Handle date change from calendar pop-up or input
   */
  protected _calendarDateChanges(): void {
    this.control.updateValueAndValidity();
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

    if (!this._parseValidatorInstance && this.parseDateValidator) {
      this._addParseValidator();
    }

    this._reloadErrorSummaryOnInit(this._parentForm?.errorSummaryVisible, this.control);
  }

  ngOnChanges(changes: FudisComponentChanges<DatepickerComponent>): void {
    // If prop parseDateValidator value changes, add or remove validator accordingly
    if (changes.parseDateValidator?.currentValue !== changes.parseDateValidator?.previousValue) {
      if (changes.parseDateValidator?.currentValue && !this._parseValidatorInstance) {
        this._addParseValidator();
      } else if (!changes.parseDateValidator?.currentValue && this._parseValidatorInstance) {
        this._removeParseValidator();
      }
    }

    // Do checks for the control to define attributes used in e.g. HTML
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._required = hasRequiredValidator(this.control);
      this._minDate = getMinDateFromValidator(this.control);
      this._maxDate = getMaxDateFromValidator(this.control);

      // If control changes and these checks are on, add parseValidator
      if (!this._parseValidatorInstance && this.parseDateValidator) {
        this._addParseValidator();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }

    /**
     * If Angular FormControl has 'disabled' property, it will bind this as HTML attribute as well. This prevents user to focus to it. This check removes that attribute making input focusable again.
     */
    if (this.control.disabled) {
      this._inputRef.nativeElement.removeAttribute('disabled');
    }
  }

  override ngOnDestroy(): void {
    this._removeParseValidator();
  }
}
