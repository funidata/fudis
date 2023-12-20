import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorErrorMessageComponent } from './validator-error-message.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';

describe('ValidatorErrorMessageComponent', () => {
	let component: ValidatorErrorMessageComponent;
	let fixture: ComponentFixture<ValidatorErrorMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ValidatorErrorMessageComponent],
			providers: [FudisInternalErrorSummaryService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ValidatorErrorMessageComponent);
		component = fixture.componentInstance;
		component.focusId = 'some-input-id';
		component.label = 'We have some label as well';
		component.message = 'And error message to display and send to service!';
		component.type = 'required';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// function showErrorMessage() {
	// 	component.errorMessageControl.markAsTouched();
	// 	fixture.detectChanges();
	// }

	// function hideErrorMessage() {
	// 	component.errorMessageExists = false;
	// 	component.errorMessageControl.markAsUntouched();
	// 	fixture.detectChanges();
	// }

	// describe('error message parent components', () => {
	// 	it('should display error message, when control is touched', () => {
	// 		showErrorMessage();
	// 		const message = fixture.nativeElement.querySelector('fudis-error-message') as HTMLElement;

	// 		expect(message.innerHTML).toContain('Test error message');
	// 	});

	// 	it('should hide error message when visible property is set to false', () => {
	// 		showErrorMessage();
	// 		const message1 = fixture.nativeElement.querySelector('fudis-error-message') as HTMLElement;

	// 		expect(message1).toBeTruthy();

	// 		hideErrorMessage();
	// 		const message2 = fixture.nativeElement.querySelector('fudis-error-message') as HTMLElement;

	// 		expect(message2).toBeFalsy();
	// 	});

	// 	it('should have parent id and label set', () => {
	// 		showErrorMessage();
	// 	});
	// });
});
