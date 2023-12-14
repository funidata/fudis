import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '../../../icon/icon.component';
import { FudisValidators } from '../../../../utilities/form/validators';
import { ErrorMessageComponent } from './error-message.component';
import { TextInputComponent } from '../../text-input/text-input.component';
import { LabelComponent } from '../../label/label.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { ValidationErrorMessageComponent } from '../validation-error-message/validation-error-message.component';

@Component({
	selector: 'fudis-mock-test-error',
	template: `
		<fudis-text-input [control]="errorMessageControl" [label]="'Test label'">
			<fudis-error-message
				#testError
				*ngIf="errorMessageIsVisible"
				[message]="'Test error message'"
				[visible]="errorMessageControl.touched && errorMessageControl.invalid" />
		</fudis-text-input>
	`,
})
class MockTestErrorComponent {
	@ViewChild('testError') testError: ErrorMessageComponent;

	errorMessageIsVisible: boolean;

	errorMessageControl: FormControl = new FormControl('', FudisValidators.required('This is required'));
}

describe('ErrorMessageComponent', () => {
	let component: MockTestErrorComponent;
	let fixture: ComponentFixture<MockTestErrorComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				ErrorMessageComponent,
				IconComponent,
				MockTestErrorComponent,
				MockComponent(LabelComponent),
				TextInputComponent,
				MockComponent(GuidanceComponent),
				ValidationErrorMessageComponent,
			],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MockTestErrorComponent);
		component = fixture.componentInstance;
		component.errorMessageIsVisible = true;
		fixture.detectChanges();
	});

	function showErrorMessage() {
		component.errorMessageControl.markAsTouched();
		fixture.detectChanges();
	}

	function hideErrorMessage() {
		component.errorMessageIsVisible = false;
		component.errorMessageControl.markAsUntouched();
		fixture.detectChanges();
	}

	describe('error message parent components', () => {
		it('should display error message, when control is touched', () => {
			showErrorMessage();
			const message = fixture.nativeElement.querySelector('fudis-error-message') as HTMLElement;

			expect(message.innerHTML).toContain('Test error message');
		});

		it('should hide error message when visible property is set to false', () => {
			showErrorMessage();
			const message1 = fixture.nativeElement.querySelector('fudis-error-message') as HTMLElement;

			expect(message1).toBeTruthy();

			hideErrorMessage();
			const message2 = fixture.nativeElement.querySelector('fudis-error-message') as HTMLElement;

			expect(message2).toBeFalsy();
		});

		it('should have parent id and label set', () => {
			showErrorMessage();

			expect(component.testError.parentId).toEqual('fudis-text-input-1');
			expect(component.testError.parentLabel).toEqual('Test label');
		});
	});
});
