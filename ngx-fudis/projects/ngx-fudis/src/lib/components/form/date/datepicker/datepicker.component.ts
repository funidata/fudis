import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import {
  EndDateErrorDirective,
  StartDateErrorDirective,
} from '../../../../directives/content-projection/content/content.directive';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { FUDIS_DATE_FORMATS, FudisInputSize } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { DatepickerCustomDateAdapter } from '../date-common/datepicker-custom-date-adapter';
import { parseDate, updateLocale, updateMatDatePickerTranslations } from '../date-common/utilities';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import {
  getMaxDateFromValidator,
  getMinDateFromValidator,
  hasRequiredValidator,
} from '../../../../utilities/form/getValidators';
import { FudisValidatorFn } from '../../../../utilities/form/validators';

@Component({
  selector: 'fudis-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: DatepickerCustomDateAdapter,
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
    private _changeDetectorRef: ChangeDetectorRef,
    private _datePickerConfigService: FudisTranslationService,
    private _adapter: DateAdapter<Date>,
    private _datepickerIntl: MatDatepickerIntl,
    private _focusService: FudisFocusService,
    _idService: FudisIdService,
  ) {
    super(_datePickerConfigService, _idService);

    effect(() => {
      this._adapter.setLocale(updateLocale(this._translationService.getLanguage()));
      this._dateParseError = this._translations().DATEPICKER.VALIDATION.DATE_PARSE;

      this._datepickerIntl = updateMatDatePickerTranslations(
        this._translations(),
        this._datepickerIntl,
      );
    });
  }

  @ContentChild(StartDateErrorDirective) startDateError: StartDateErrorDirective;

  @ContentChild(EndDateErrorDirective) endDateError: EndDateErrorDirective;

  /**
   * FormControl for the input
   */
  @Input({ required: true }) control: FormControl<Date | null>;

  /**
   * Available sizes for the datepicker
   */
  @Input() size: FudisInputSize = 'md';

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
  private _datepickerParseValidator: FudisValidatorFn;

  // TODO: write test
  private _datepickerParseValidatorFn(): FudisValidatorFn {
    return (control: AbstractControl) => {
      if (!control) {
        return null;
      }

      const inputValue = this._inputRef?.nativeElement?.value;

      const isValidDate = inputValue ? parseDate(inputValue)?.getDate() : false;

      if (inputValue !== '' && !isValidDate) {
        return { datepickerDateParse: { message: this._dateParseError } };
      }

      return null;
    };
  }

  ngOnInit(): void {
    this._setInputId('datepicker');

    this._datepickerParseValidator = this._datepickerParseValidatorFn();

    this.control.addValidators(this._datepickerParseValidator);
    this.control.updateValueAndValidity();
  }

  ngOnChanges(): void {
    this._changeDetectorRef.detectChanges();

    this._required = hasRequiredValidator(this.control);
    this._minDate = getMinDateFromValidator(this.control);
    this._maxDate = getMaxDateFromValidator(this.control);
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
  }

  ngOnDestroy(): void {
    this.control.removeValidators(this._datepickerParseValidator);
    this.control.updateValueAndValidity();
  }
}
