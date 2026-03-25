import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRangeComponent } from './date-range.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { getElement, sortClasses } from '../../../../utilities/tests/utilities';
import { FudisValidators } from '../../../../utilities/form/validators';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FudisDialogService } from '../../../../services/dialog/dialog.service';
import {
  DateEndDirective,
  DateStartDirective,
} from '../../../../directives/form/datepicker/datepicker.directive';

@Component({
  selector: 'fudis-mock-date-range',
  imports: [DateRangeComponent, DatepickerComponent, DateStartDirective, DateEndDirective],
  template: `<fudis-date-range [dateComparisonParse]="comparisonParse">
    <p class="do-not-find-me">This should not be shown</p>
    <fudis-datepicker fudisDateStart [label]="'start date'" [control]="startDateControl" />
    <fudis-datepicker fudisDateEnd [label]="'End date'" [control]="endDateControl" />
  </fudis-date-range>`,
})
class MockDateRangeComponent {
  public comparisonParse: boolean = true;
  public startDateControl = new FormControl<Date | null>(null, [
    FudisValidators.required('Start date is required'),
    FudisValidators.datepickerMin({
      value: new Date(2024, 6, 10),
      message: 'Selected date is not valid',
    }),
  ]);
  public endDateControl = new FormControl<Date | null>(null, [
    FudisValidators.required('End date is required'),
    FudisValidators.datepickerMax({
      value: new Date(2024, 7, 21),
      message: 'Selected date is not valid',
    }),
  ]);
}

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  let mockComponent: MockDateRangeComponent;
  let mockFixture: ComponentFixture<MockDateRangeComponent>;
  let wrapperElement: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateRangeComponent, MockDateRangeComponent],
      providers: [FudisDialogService, FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  describe('Wrapper element', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DateRangeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      wrapperElement = getElement(fixture, '.fudis-date-range') as HTMLDivElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Mock component', () => {
    beforeEach(() => {
      mockFixture = TestBed.createComponent(MockDateRangeComponent);
      mockComponent = mockFixture.componentInstance;
      mockFixture.detectChanges();

      wrapperElement = getElement(mockFixture, '.fudis-date-range') as HTMLDivElement;
    });

    it('should create', () => {
      expect(mockComponent).toBeTruthy();
    });

    it('should have default CSS clas', () => {
      expect(sortClasses(wrapperElement.className)).toEqual(sortClasses('fudis-date-range'));
    });

    it('should have two child Datepickers', () => {
      const datepickerElements = wrapperElement.querySelectorAll('fudis-datepicker');

      expect(datepickerElements.length).toEqual(2);
    });

    it('should not render other than Datepicker elements', () => {
      const extraTag = wrapperElement.querySelector('.do-not-find-me');

      expect(extraTag).toBeNull();
    });
  });
});
