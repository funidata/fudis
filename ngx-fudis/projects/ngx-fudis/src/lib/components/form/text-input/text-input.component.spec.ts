// import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TextInputComponent } from './text-input.component';

// TODO: THIS TEST FILE IS UNDER CONSTRUCTION AND NEED TO BE UPDATED

describe('TextInputComponent', () => {
	let component: TextInputComponent;
	let fixture: ComponentFixture<TextInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TextInputComponent],
			imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, FormsModule],
		})
			// .overrideComponent(TextInputComponent, {
			// 	set: { changeDetection: ChangeDetectionStrategy.Default },
			// })
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TextInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// function getInputElement(): HTMLElement {
	// 	return fixture.nativeElement.querySelector('input') as HTMLInputElement;
	// }

	// function assertInputHasClasses(...classes: string[]): void {
	// 	const inputClasses = getInputElement()?.className ?? '';
	// 	expect(inputClasses.split(' ').sort()).toEqual([...classes].sort());
	// }

	// TODO: Input element's focud and blur doesn't seem to affect correctly and classList is not updated as it should

	// describe('check error messages', () => {
	// 	it('should have invalid CSS class', async () => {
	// 		component.required = true;

	// 		const inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;

	// 		inputEl.focus();
	// 		inputEl.blur();

	// 		const control = component.fudisFormControl;
	// 		control.markAsTouched();
	// 		control.markAsDirty();
	// 		fixture.detectChanges();

	// 		// Input should contain 'fudis-text-input--invalid' class
	// 		console.log(component.input.nativeElement.classList.contains('fudis-text-input--invalid'));
	// 	});

	// 	it('should match error message with browser default validation message', () => {
	// 		const validationMsg = component.input.nativeElement.validationMessage;
	// 		const errorElement = fixture.nativeElement.querySelector('mat-error') as HTMLElement;
	// 		// mat-error should contain browser's default validationMessage
	// 	});
	// });
});
