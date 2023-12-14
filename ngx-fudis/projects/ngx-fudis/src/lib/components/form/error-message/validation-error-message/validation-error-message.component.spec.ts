import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorMessageComponent } from './validation-error-message.component';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';

describe('ValidationErrorMessageComponent', () => {
	let component: ValidationErrorMessageComponent;
	let fixture: ComponentFixture<ValidationErrorMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ValidationErrorMessageComponent],
			providers: [FudisInternalErrorSummaryService],
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
