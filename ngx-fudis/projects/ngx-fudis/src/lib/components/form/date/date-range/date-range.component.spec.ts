import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { DateRangeComponent } from './date-range.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { LabelComponent } from '../../label/label.component';
import { IconComponent } from '../../../icon/icon.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { ValidatorErrorMessageComponent } from '../../error-message/validator-error-message/validator-error-message.component';
import { FudisIdService } from '../../../../services/id/id.service';
import { getElement, sortClasses } from '../../../../utilities/tests/utilities';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;
  let wrapperElement: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateRangeComponent,
        DatepickerComponent,
        LabelComponent,
        GuidanceComponent,
        ValidatorErrorMessageComponent,
        MockComponent(IconComponent),
      ],
      providers: [FudisIdService],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    component.startDate = {
      label: 'Start date',
      control: new FormControl<Date | null>(null, []),
    };
    component.endDate = {
      label: 'End date',
      control: new FormControl<Date | null>(null, []),
    };
    fixture.detectChanges();
  });

  describe('Wrapper element', () => {
    beforeEach(() => {
      wrapperElement = getElement(fixture, '.fudis-daterange') as HTMLDivElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should always have default CSS class and generated id', () => {
      expect(sortClasses(wrapperElement.className)).toEqual(sortClasses('fudis-daterange'));

      expect(wrapperElement.getAttribute('id')).toEqual('fudis-daterange-1');
    });

    it('should have two child datepicker components present', () => {
      const datepickerELement = fixture.debugElement.queryAll(By.css('fudis-datepicker'));

      expect(datepickerELement.length).toEqual(2);
    });
  });

  describe('Control', () => {
    it('should update validity according to given dates when compared to each other', () => {
      component.startDate.control.patchValue(new Date('01-10-2024'));
      component.endDate.control.patchValue(new Date('01-05-2024'));
      fixture.detectChanges();

      expect(component.startDate.control.valid).toEqual(false);
      expect(component.endDate.control.valid).toEqual(false);

      expect(component.startDate.control.errors?.['datepickerStartDateInvalid']).toEqual({
        message: 'Start date cannot be after end date',
      });
      expect(component.endDate.control.errors?.['datepickerEndDateInvalid']).toEqual({
        message: 'End date cannot be before start date',
      });

      component.startDate.control.patchValue(new Date('01-10-2024'));
      component.endDate.control.patchValue(new Date('01-15-2024'));
      fixture.detectChanges();

      expect(component.startDate.control.valid).toEqual(true);
      expect(component.endDate.control.valid).toEqual(true);

      expect(component.startDate.control.errors?.['datepickerStartDateInvalid']).toBe(undefined);
      expect(component.endDate.control.errors?.['datepickerEndDateInvalid']).toBe(undefined);
    });
  });
});
