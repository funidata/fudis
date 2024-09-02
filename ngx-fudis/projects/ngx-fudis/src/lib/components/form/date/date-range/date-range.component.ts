import {
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisIdService } from '../../../../services/id/id.service';
import { BehaviorSubject, debounceTime, fromEvent } from 'rxjs';
import { FudisComponentChanges } from '../../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateRangeComponent implements OnChanges {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _idService: FudisIdService,
  ) {
    // Check Datepicker label heights also when screen in resized
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(), debounceTime(10))
      .subscribe(() => {
        if (this._heightSet.value) {
          this.setLabelHeight();
        }
      });
  }

  /**
   * Template reference for Date Range wrapper div element
   */
  @ViewChild('dateRangeRef') private _dateRangeRef: ElementRef;

  /**
   * Internal date comparison parse. By setting to false date comparison parsing is not executed and comparison errors are not shown.
   */
  @Input() dateComparisonParse: boolean = true;

  /**
   * Show date comparison errors
   */
  public showDateComparisonErrors: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Is setting Datepicker label heights to equal completed
   */
  protected _heightSet: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    if (dateComparisonParse) {
      this.checkDateCrossings();
    } else if (dateComparisonParse === false) {
      this.showDateComparisonErrors.next(false);
    }
  }

  /**
   * Height of Datepickers might vary if other one has tooltip and other one not, or if other one has longer label. This function sets their label height equal, so they should remain aligned.
   */
  public setLabelHeight(recheck?: boolean): void {
    const labels = (this._dateRangeRef?.nativeElement as HTMLDivElement)?.querySelectorAll(
      '.fudis-label',
    );

    if (labels?.length === 2) {
      const labelOneHeigth = labels[0].clientHeight;
      const labelTwoHeigth = labels[1].clientHeight;

      const fontSize = Number(
        window
          .getComputedStyle(this._document.body)
          .getPropertyValue('font-size')
          .replace('px', ''),
      );

      if (labelOneHeigth > labelTwoHeigth) {
        (labels[1] as HTMLLabelElement).style.height = `${labelOneHeigth / fontSize}rem`;
      } else if (labelTwoHeigth > labelOneHeigth) {
        (labels[0] as HTMLLabelElement).style.height = `${labelTwoHeigth / fontSize}rem`;
      }

      // Recheck is run only when Datepickers are initialized
      if (recheck) {
        setTimeout(() => {
          this.setLabelHeight();
        }, 100);
      } else {
        this._heightSet.next(true);
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
