import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';

/**
 * NOTE: At the moment this custom header is not in use but left the code here for possible future reference
 *
 * Custom header for datepicker calendar dialog.
 * This creates double-chevron buttons to change the year - instead of default year picker which opens inside the calendar.
 * https://material.angular.io/components/datepicker/overview#datepicker-custom-header
 */

@Component({
  selector: 'fudis-datepicker-custom-header',
  templateUrl: './datepicker-custom-header.component.html',
  styleUrls: ['./datepicker-custom-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerCustomHeaderComponent<D> implements OnInit {
  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges.pipe(takeUntilDestroyed()).subscribe(() => cdr.markForCheck());
  }

  ngOnInit() {
    /**
     * Change the calendar starting day of the week from default Sunday to Monday
     */
    this._dateAdapter.getFirstDayOfWeek = () => {
      return 1;
    };
  }

  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
