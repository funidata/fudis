import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { GridService } from '../../directives/grid/grid-service/grid.service';

describe('GridComponent', () => {
	let component: GridComponent;
	let fixture: ComponentFixture<GridComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GridComponent],
			providers: [GridService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
