import { Component, Input, OnChanges } from '@angular/core';
import { FudisIdService } from '../../../../services/id/id.service';
import { BehaviorSubject } from 'rxjs';
import { FudisComponentChanges } from '../../../../types/miscellaneous';

/**
 * Allows selection of a start and end date.
 *
 * Use this component when user need to define a time interval.
 */
@Component({
  selector: 'fudis-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  standalone: false,
})
export class DateRangeComponent implements OnChanges {
  constructor(private _idService: FudisIdService) {}

  /**
   * Internal date comparison parse. By setting to false date comparison parsing is not executed and
   * comparison errors are not shown.
   */
  @Input() dateComparisonParse: boolean = true;

  /**
   * Show date comparison errors
   */
  public showDateComparisonErrors: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Date value for start date
   */
  private _startDateValue: Date | null;

  /**
   * Date value for end date
   */
  private _endDateValue: Date | null;

  ngOnChanges(changes: FudisComponentChanges<DateRangeComponent>): void {
    const dateComparisonParse = changes.dateComparisonParse?.currentValue;
    const dateComparisonParseChanged =
      changes.dateComparisonParse?.currentValue !== changes.dateComparisonParse?.previousValue;

    if (dateComparisonParseChanged) {
      if (dateComparisonParse) {
        this.checkDateCrossings();
      } else if (dateComparisonParse === false) {
        this.showDateComparisonErrors.next(false);
      }
    }
  }

  /**
   * Check if start date is set to after end date
   */
  public checkDateCrossings(value?: Date | null, type?: 'start' | 'end'): void {
    if (value && type === 'start') {
      this._startDateValue = value;
    } else if (value && type === 'end') {
      this._endDateValue = value;
    }

    /* Show date comparison errors only if there are both date values and comparison is allowed.
     * Compare only dates, do not take hours into account.
     */
    if (
      this._startDateValue &&
      this._endDateValue &&
      this._startDateValue.setHours(0, 0, 0, 0) > this._endDateValue.setHours(0, 0, 0, 0) &&
      this.dateComparisonParse
    ) {
      this.showDateComparisonErrors.next(true);
    } else if (this.showDateComparisonErrors.value !== false) {
      this.showDateComparisonErrors.next(false);
    }
  }
}
