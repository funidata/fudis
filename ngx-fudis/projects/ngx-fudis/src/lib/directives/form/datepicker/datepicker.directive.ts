import { Directive, Host } from '@angular/core';
import { DatepickerComponent } from '../../../components/form/date/datepicker/datepicker.component';

/**
 * Marks an input as the start date of a date range.
 *
 * Use this directive to associate the control with a date range and enable correct validation
 * behavior.
 */
@Directive({
  selector: '[fudisDateStart]',
  standalone: false,
})
export class DateStartDirective {
  constructor(@Host() private _datepicker: DatepickerComponent) {
    _datepicker.dateRangeType = 'start';
  }
}

/**
 * Marks an input as the end date of a date range.
 *
 * Use this directive to associate the control with a date range and enable correct validation
 * behavior.
 */
@Directive({
  selector: '[fudisDateEnd]',
  standalone: false,
})
export class DateEndDirective {
  constructor(@Host() private _datepicker: DatepickerComponent) {
    _datepicker.dateRangeType = 'end';
  }
}
