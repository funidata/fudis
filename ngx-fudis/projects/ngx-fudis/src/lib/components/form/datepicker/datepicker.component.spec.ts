import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '../../icon/icon.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';

import { DatepickerComponent } from './datepicker.component';

const datepickerControl: FormControl = new FormControl('');

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
			imports: [ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, BrowserAnimationsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DatepickerComponent);
		component = fixture.componentInstance;
		component.control = datepickerControl;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
