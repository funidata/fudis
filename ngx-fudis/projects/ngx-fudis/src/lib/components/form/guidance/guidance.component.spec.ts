import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { MockComponent } from 'ng-mocks';
import { GuidanceComponent } from './guidance.component';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { ValidationErrorMessageComponent } from '../error-message/validation-error-message/validation-error-message.component';

const testControl = new FormControl('');

describe('GuidanceComponent', () => {
	let component: GuidanceComponent;
	let fixture: ComponentFixture<GuidanceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GuidanceComponent, MockComponent(ValidationErrorMessageComponent)],
			providers: [FudisErrorSummaryService],
		}).compileComponents();

		fixture = TestBed.createComponent(GuidanceComponent);
		component = fixture.componentInstance;
		component.control = testControl;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
