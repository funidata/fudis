import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FieldSetComponent } from './fieldset.component';
import { ErrorSummaryComponent } from '../error-summary/error-summary.component';
import { ErrorSummaryService } from '../error-summary/error-summary.service';
import { GridComponent } from '../../grid/grid/grid.component';

describe('FieldSetComponent', () => {
	let component: FieldSetComponent;
	let fixture: ComponentFixture<FieldSetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FieldSetComponent, MockComponent(GridComponent), MockComponent(ErrorSummaryComponent)],
			providers: [ErrorSummaryService],
		}).compileComponents();

		fixture = TestBed.createComponent(FieldSetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
