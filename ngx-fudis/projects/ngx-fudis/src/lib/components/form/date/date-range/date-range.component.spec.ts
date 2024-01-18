import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockComponent } from 'ng-mocks';
import { DateRangeComponent } from './date-range.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { LabelComponent } from '../../label/label.component';
import { IconComponent } from '../../../icon/icon.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { ButtonComponent } from '../../../button/button.component';
import { ValidatorErrorMessageComponent } from '../../error-message/validator-error-message/validator-error-message.component';
import { FudisValidators, TooltipDirective } from '../../../../../public-api';
import { FudisIdService } from '../../../../services/id/id.service';

// TODO: write tests
describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateRangeComponent,
        DatepickerComponent,
        LabelComponent,
        GuidanceComponent,
        ValidatorErrorMessageComponent,
        ButtonComponent,
        TooltipDirective,
        MockComponent(IconComponent),
      ],
      providers: [FudisIdService],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatTooltipModule,
      ],
    });
    fixture = TestBed.createComponent(DateRangeComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.startDate = {
      label: 'Start date',
      helpText: 'Select start date',
      tooltip: 'Tooltip for first',
      control: new FormControl<Date | null>(null, [
        FudisValidators.required('Start date is required'),
        FudisValidators.datepickerMin({
          value: new Date(2023, 5, 15),
          message: 'Start date cannot be earlier than 15.6.2023',
        }),
        FudisValidators.datepickerMax({
          value: new Date(2023, 6, 25),
          message: 'Start date cannot be later than 25.7.2023',
        }),
      ]),
    };
    component.endDate = {
      label: 'End date',
      helpText: 'Select end date',
      control: new FormControl<Date | null>(null, [
        FudisValidators.required('End date is required'),
        FudisValidators.datepickerMin({
          value: new Date(2023, 6, 15),
          message: 'End date cannot be earlier than 15.7.2023',
        }),
        FudisValidators.datepickerMax({
          value: new Date(2023, 7, 25),
          message: 'End date cannot be later than 25.8.2023',
        }),
      ]),
    };
    fixture.detectChanges();
    component.ngOnInit();

    expect(component).toBeTruthy();
  });
});
