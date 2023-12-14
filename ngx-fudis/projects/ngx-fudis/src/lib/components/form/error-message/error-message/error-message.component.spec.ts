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
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { ValidatorErrorMessageComponent } from '../validator-error-message/validator-error-message.component';

@Component({
	selector: 'fudis-mock-test-error',
	template: `
		<fudis-text-input [control]="errorMessageControl" [label]="'Test label'">
			<fudis-error-message
				#testError
				*ngIf="errorMessageExists"
				[message]="'Test error message'"
				[visible]="errorMessageControl.touched && errorMessageControl.invalid" />
		</fudis-text-input>
	`,
})
class MockTestErrorComponent {
	constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

	@ViewChild('testError') testError: ErrorMessageComponent;

	errorMessageExists: boolean;

	errorMessageControl: FormControl = new FormControl('', FudisValidators.required('This is required'));
}

describe('ErrorMessageComponent', () => {
	let component: MockTestErrorComponent;
	let fixture: ComponentFixture<MockTestErrorComponent>;
	let errorSummaryService: FudisInternalErrorSummaryService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				ErrorMessageComponent,
				IconComponent,
				MockTestErrorComponent,
				MockComponent(LabelComponent),
				TextInputComponent,
				MockComponent(GuidanceComponent),
				ValidatorErrorMessageComponent,
			],
			imports: [ReactiveFormsModule],
			providers: [FudisInternalErrorSummaryService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MockTestErrorComponent);
		component = fixture.componentInstance;
		component.errorMessageExists = true;
		fixture.detectChanges();
	});

	function showErrorMessage() {
		component.errorMessageControl.markAsTouched();
		fixture.detectChanges();
	}

	function hideErrorMessage() {
		component.errorMessageExists = false;
		component.errorMessageControl.markAsUntouched();
		fixture.detectChanges();
	}

	describe('send message to error summary service ', () => {
		beforeEach(() => {
			errorSummaryService = TestBed.inject(
				FudisInternalErrorSummaryService
			) as jasmine.SpyObj<FudisInternalErrorSummaryService>;
			spyOn(errorSummaryService, 'addNewError');

			fixture.detectChanges();
		});

		it('should send error message when component is rendered', () => {
			spyOn(component.testError, 'createCustomError');
			component.testError.visible = false;
			component.testError.ngOnInit();
			fixture.detectChanges();

			expect(component.testError.createCustomError).toHaveBeenCalledWith();
		});

		it('should remove error message when component is destroyed', () => {
			spyOn(component.testError, 'removeCustomError');
			component.testError.visible = false;
			component.testError.ngOnDestroy();
			fixture.detectChanges();

			expect(component.testError.removeCustomError).toHaveBeenCalledWith();
		});
	});

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
