import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from 'ngx-fudis';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
	let component: DatepickerComponent;
	let fixture: ComponentFixture<DatepickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				DatepickerComponent,
				MockComponent(LabelComponent),
				MockComponent(IconComponent),
				MockComponent(GuidanceComponent),
			],
			imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
		}).compileComponents();

		fixture = TestBed.createComponent(DatepickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
