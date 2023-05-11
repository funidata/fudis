import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSummaryComponent } from './error-summary.component';
import { ErrorSummaryService } from './error-summary.service';

describe('ErrorSummaryComponent', () => {
	let component: ErrorSummaryComponent;
	let fixture: ComponentFixture<ErrorSummaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ErrorSummaryComponent],
			providers: [ErrorSummaryService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ErrorSummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
