import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FudisIdService } from 'projects/ngx-fudis/src/lib/services/id/id.service';
import { TooltipDirective } from 'projects/ngx-fudis/src/public-api';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockComponent } from 'ng-mocks';
import { FudisValidators } from 'projects/ngx-fudis/src/lib/utilities/form/validators';
import { DateRangeComponent } from './date-range.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { LabelComponent } from '../../label/label.component';
import { IconComponent } from '../../../icon/icon.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { ButtonComponent } from '../../../button/button.component';
import { FudisDropdownMenuItemService } from '../../../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { ValidationErrorMessageComponent } from '../../error-message/validation-error-message/validation-error-message.component';

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
				ValidationErrorMessageComponent,
				ButtonComponent,
				TooltipDirective,
				MockComponent(IconComponent),
			],
			providers: [FudisIdService, FudisDropdownMenuItemService],
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
		fixture.detectChanges();
	});

	it('should create', () => {
		component.startDate = {
			label: 'Start date',
			helpText: 'Select start date',
			tooltip: 'Tooltip for first',
			minDate: new Date('2023-05-01'),
			maxDate: new Date('2023-05-07'),
			errorMsg: {
				matDatepickerParse: 'Start date is not a proper date',
				matDatepickerMin: 'Start date cannot be earlier than 5.5.2023',
				matDatepickerMax: 'Start date cannot be later than 22.6.2023',
				matStartDateInvalid: 'Start date cannot be after end date',
			},
			control: new FormControl<Date | null>(null, FudisValidators.required('Start date is required')),
		};
		component.endDate = {
			label: 'End date',
			helpText: 'Select end date',
			minDate: new Date('2023-05-15'),
			maxDate: new Date('2023-05-25'),
			errorMsg: {
				matDatepickerParse: 'End date is not a proper date',
				matDatepickerMin: 'End date cannot be earlier than 5.5.2023',
				matDatepickerMax: 'End date cannot be later than 22.6.2023',
				matEndDateInvalid: 'End date cannot be before start date',
			},
			control: new FormControl<Date | null>(null, FudisValidators.required('End date is required')),
		};
		fixture.detectChanges();
		component.ngOnInit();

		expect(component).toBeTruthy();
	});
});
