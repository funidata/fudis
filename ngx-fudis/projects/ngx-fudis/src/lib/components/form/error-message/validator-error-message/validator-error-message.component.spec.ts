import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FudisValidators } from 'projects/ngx-fudis/src/lib/utilities/form/validators';
import { By } from '@angular/platform-browser';
import { ValidatorErrorMessageComponent } from './validator-error-message.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { TextInputComponent } from '../../text-input/text-input.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { LabelComponent } from '../../label/label.component';

@Component({
	selector: 'fudis-mock-validator-error',
	template: `
		<fudis-text-input [control]="textInputControl" [id]="'test-id'" [label]="'Test Label'"></fudis-text-input>
	`,
})
class MockValidatorErrorMessageComponent {
	constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

	textInputControl: FormControl = new FormControl('', FudisValidators.required('This field is required'));
}

describe('ValidatorErrorMessageComponent', () => {
	let component: MockValidatorErrorMessageComponent;
	let fixture: ComponentFixture<MockValidatorErrorMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				ValidatorErrorMessageComponent,
				MockValidatorErrorMessageComponent,
				TextInputComponent,
				GuidanceComponent,
				LabelComponent,
			],
			imports: [ReactiveFormsModule],
			providers: [FudisInternalErrorSummaryService],
		}).compileComponents();
	});

	function showErrorMessage() {
		component.textInputControl.markAllAsTouched();
	}

	beforeEach(() => {
		fixture = TestBed.createComponent(MockValidatorErrorMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		showErrorMessage();
	});

	describe('validator error message parent components', () => {
		it('should display validator error message, when control is touched', () => {
			const message = fixture.nativeElement.querySelector('fudis-validator-error-message') as HTMLElement;

			expect(message).toBeTruthy();
		});

		it('should have parent id and label', () => {
			const message = fixture.debugElement.query(By.css('fudis-validator-error-message'));

			expect(message.attributes['ng-reflect-focus-id']).toEqual('test-id');
			expect(message.attributes['ng-reflect-label']).toEqual('Test Label');
		});

		it('should have same type and message as in Fudis Validator', () => {
			const message = fixture.debugElement.query(By.css('fudis-validator-error-message'));

			expect(message.attributes['ng-reflect-type']).toEqual('required');
			expect(message.attributes['ng-reflect-message']).toEqual('This field is required');
		});
	});
});
