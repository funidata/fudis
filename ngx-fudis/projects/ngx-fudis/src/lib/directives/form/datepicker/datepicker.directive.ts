import { Directive, Host } from '@angular/core';
import { DatepickerComponent } from '../../../components/form/date/datepicker/datepicker.component';

@Directive({ selector: '[fudisDateStart]' })
export class DateStartDirective {
  constructor(@Host() private _datepicker: DatepickerComponent) {
    _datepicker.dateRangeType = 'start';
  }
}

@Directive({ selector: '[fudisDateEnd]' })
export class DateEndDirective {
  constructor(@Host() private _datepicker: DatepickerComponent) {
    _datepicker.dateRangeType = 'end';
  }
}
