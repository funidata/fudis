import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FieldsetComponent } from './fieldset.component';
import { ErrorSummaryComponent } from '../error-summary/error-summary.component';
import { ErrorSummaryService } from '../error-summary/error-summary.service';
import { GridComponent } from '../../grid/grid.component';

describe('FieldsetComponent', () => {
	let component: FieldsetComponent;
	let fixture: ComponentFixture<FieldsetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FieldsetComponent, MockComponent(GridComponent), MockComponent(ErrorSummaryComponent)],
			providers: [ErrorSummaryService],
		}).compileComponents();

		fixture = TestBed.createComponent(FieldsetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
