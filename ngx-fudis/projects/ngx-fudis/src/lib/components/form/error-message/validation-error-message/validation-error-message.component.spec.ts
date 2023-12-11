import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorMessageComponent } from './validation-error-message.component';
import { FudisErrorSummaryService } from '../../../../services/form/error-summary/error-summary.service';

describe('ErrorMessageComponent', () => {
	let component: ValidationErrorMessageComponent;
	let fixture: ComponentFixture<ValidationErrorMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ValidationErrorMessageComponent],
			providers: [FudisErrorSummaryService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ValidationErrorMessageComponent);
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
});
