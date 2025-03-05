import { Directive, Host } from '@angular/core';
import { DatepickerComponent } from '../../../components/form/date/datepicker/datepicker.component';

@Directive({
    selector: '[fudisDateStart]',
    standalone: false
})
export class DateStartDirective {
  constructor(@Host() private _datepicker: DatepickerComponent) {
    _datepicker.dateRangeType = 'start';
  }
}

@Directive({
    selector: '[fudisDateEnd]',
    standalone: false
})
export class DateEndDirective {
  constructor(@Host() private _datepicker: DatepickerComponent) {
    _datepicker.dateRangeType = 'end';
  }
}
