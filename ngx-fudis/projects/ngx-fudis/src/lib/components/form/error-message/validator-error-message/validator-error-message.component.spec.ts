/* eslint-disable max-classes-per-file */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FudisValidators } from 'projects/ngx-fudis/src/lib/utilities/form/validators';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { FudisFormErrorSummaryItem } from '../../../../types/forms';
import { ValidatorErrorMessageComponent } from './validator-error-message.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { TextInputComponent } from '../../text-input/text-input.component';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { LabelComponent } from '../../label/label.component';
import { IconComponent } from '../../../icon/icon.component';

@Component({
	selector: 'fudis-text-input-with-validator-error-message',
	template: `
		<fudis-text-input [control]="textInputControl" [id]="'test-id'" [label]="'Test Label'"></fudis-text-input>
	`,
})
class TextInputWithValidatorErrorMessageComponent {
	constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

	textInputControl: FormControl = new FormControl('', FudisValidators.required('This field is required'));
}

describe('TextInputWithValidatorErrorMessageComponent', () => {
	let component: ValidatorErrorMessageComponent;
	let textInputComponent: TextInputWithValidatorErrorMessageComponent;
	let errorSummaryService: FudisInternalErrorSummaryService;
	let fixture:
		| ComponentFixture<TextInputWithValidatorErrorMessageComponent>
		| ComponentFixture<ValidatorErrorMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				ValidatorErrorMessageComponent,
				TextInputWithValidatorErrorMessageComponent,
				TextInputComponent,
				GuidanceComponent,
				LabelComponent,
				MockComponent(IconComponent),
			],
			imports: [ReactiveFormsModule],
			providers: [FudisInternalErrorSummaryService],
		}).compileComponents();
	});

	function showErrorMessage() {
		textInputComponent.textInputControl.markAllAsTouched();
	}

	beforeEach(() => {
		fixture = TestBed.createComponent(TextInputWithValidatorErrorMessageComponent);
		textInputComponent = fixture.componentInstance;
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

	// describe('send message to error summary service', () => {
	// 	beforeEach(() => {
	// 		fixture = TestBed.createComponent(ValidatorErrorMessageComponent);
	// 		component = fixture.componentInstance;
	// 		errorSummaryService = TestBed.inject(
	// 			FudisInternalErrorSummaryService
	// 		) as jasmine.SpyObj<FudisInternalErrorSummaryService>;
	// 		spyOn(errorSummaryService, 'addNewError');

	// 		fixture.detectChanges();
	// 	});

	// 	fit('should send error message when component is rendered', () => {
	// 		component.message = 'Lisää tämä';
	// 		component.focusId = 'test-id';
	// 		component.label = 'Test label';
	// 		component.type = 'required';
	// 		component.controlName = undefined;
	// 		fixture.detectChanges();
	// 		spyOn(component.handleAddError, 'emit');

	// 		const testError: FudisFormErrorSummaryItem = {
	// 			id: 'test-id',
	// 			error: 'Lisää tämä',
	// 			label: 'Test label',
	// 			type: 'required',
	// 			controlName: undefined,
	// 			language: 'en',
	// 		};
	// 		errorSummaryService.addNewError(testError);

	// 		component.ngOnInit();
	// 		fixture.detectChanges();
	// 		console.log('olAAA', component);
	// 		// const message = fixture.debugElement.query(By.css('fudis-validator-error-message'));
	// 		// spyOn(message.attributes['ngOnInit']);

	// 		expect(component.handleAddError.emit).toHaveBeenCalledWith(testError);
	// 	});
	// });
});
