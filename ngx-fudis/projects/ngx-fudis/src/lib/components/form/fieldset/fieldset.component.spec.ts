import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { FieldSetComponent } from './fieldset.component';
import { GridComponent } from '../../grid/grid/grid.component';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { FudisGridService } from '../../../directives/grid/grid-service/grid.service';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';

describe('FieldSetComponent', () => {
	let component: FieldSetComponent;
	let fixture: ComponentFixture<FieldSetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FieldSetComponent, MockComponent(GridComponent), GridApiDirective, GridDirective],
			providers: [FudisGridService, FudisErrorSummaryService],
		}).compileComponents();

		fixture = TestBed.createComponent(FieldSetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
