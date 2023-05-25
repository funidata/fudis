import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '../../icon/icon.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { LabelComponent } from '../label/label.component';
import { DatepickerComponent } from './datepicker.component';

const datepickerControl: FormControl = new FormControl('');
const requiredDatepickerControl: FormControl = new FormControl('', Validators.required);

describe('DatepickerComponent', () => {
	let component: DatepickerComponent;
	let fixture: ComponentFixture<DatepickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				DatepickerComponent,
				LabelComponent,
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
		component.id = 'fudis-dp-unique-id-3';
		component.label = 'Select a date';
		fixture.detectChanges();
	});

	function getDatepickerTopWrapperDiv(): HTMLElement {
		return fixture.nativeElement.querySelector('.fudis-datepicker') as HTMLElement;
	}

	function assertDatepickerTopWrapperDivHasClasses(...classes: string[]): void {
		const datepickerTopDivClasses = getDatepickerTopWrapperDiv()?.className ?? '';
		expect(datepickerTopDivClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	describe('Top wrapper div', () => {
		it('should always have default CSS classes: fudis-datepicker and fudis-datepicker__m', () => {
			assertDatepickerTopWrapperDivHasClasses('fudis-datepicker', 'fudis-datepicker__m');
		});

		it('should have respective CSS class indicating the datepicker size of small', () => {
			component.size = 's';
			fixture.detectChanges();

			assertDatepickerTopWrapperDivHasClasses('fudis-datepicker', 'fudis-datepicker__s');
		});

		it('should have respective CSS class indicating the datepicker size of large', () => {
			component.size = 'l';
			fixture.detectChanges();

			assertDatepickerTopWrapperDivHasClasses('fudis-datepicker', 'fudis-datepicker__l');
		});

		it('should have fudis-label component present with given id', () => {
			const childLabelComponent = fixture.debugElement.query(By.css('fudis-label'));
			expect(childLabelComponent).toBeTruthy();
			expect(childLabelComponent.attributes['ng-reflect-id']).toEqual('label_fudis-dp-unique-id-3');
			expect(childLabelComponent.attributes['ng-reflect-for']).toEqual('fudis-dp-unique-id-3');
		});

		it('should have fudis-guidance component present with given id and helpText', () => {
			const childGuidanceComponent = fixture.debugElement.query(By.css('fudis-guidance'));
			expect(childGuidanceComponent).toBeTruthy();
			expect(childGuidanceComponent.attributes['ng-reflect-for']).toEqual('fudis-dp-unique-id-3');

			component.helpText = 'Select your favourite date';
			fixture.detectChanges();
			expect(childGuidanceComponent.attributes['ng-reflect-help-text'])
				.withContext(component.helpText)
				.toEqual('Select your favourite date');
		});
	});

	describe('Input', () => {
		it('should have focus when input is focused', () => {
			const datepickerInput = fixture.nativeElement.querySelector('input');
			datepickerInput.dispatchEvent(new Event('focus'));
			fixture.detectChanges();

			expect(datepickerInput.focus).toBeTruthy();
		});

		it('should show requiredText in label if input is required and requiredText is given', () => {
			component.control = requiredDatepickerControl;
			component.requiredText = 'Required';
			fixture.detectChanges();

			const labelComponent = fixture.nativeElement.querySelector('fudis-label');
			const requiredLabel = labelComponent.querySelector('.fudis-label__content__required');
			expect(requiredLabel.innerHTML).toContain(component.requiredText);
		});

		it('should have invalid class if datepicker is required, input is touched and no date has been chosen', () => {
			const datepickerInput = fixture.nativeElement.querySelector('input');
			const requiredControl = new FormControl(null, Validators.required);
			component.control = requiredControl;
			fixture.detectChanges();

			datepickerInput.dispatchEvent(new Event('focus'));
			fixture.detectChanges();

			datepickerInput.dispatchEvent(new Event('blur'));
			fixture.detectChanges();

			expect(datepickerInput.className).toContain('fudis-datepicker__input--invalid');
		});

		it('should have calendar icon from fudis-icon component', () => {
			const datepickerIcon = fixture.nativeElement.querySelector('fudis-icon');
			expect(datepickerIcon.attributes.icon.value).toEqual('calendar');
		});

		it('should have fudis-datepicker__input--disabled class if input has been disabled', () => {
			const datepickerInput = fixture.nativeElement.querySelector('input');
			component.disabled = true;
			fixture.detectChanges();

			expect(datepickerInput.className).toContain('fudis-datepicker__input--disabled');
		});
	});
});
