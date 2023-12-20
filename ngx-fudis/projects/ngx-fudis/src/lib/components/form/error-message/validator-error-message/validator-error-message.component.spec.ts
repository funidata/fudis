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
});
