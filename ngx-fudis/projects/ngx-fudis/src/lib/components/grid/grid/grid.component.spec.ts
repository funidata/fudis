import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { FudisGridService } from '../../../services/grid/grid.service';

describe('GridComponent', () => {
	let component: GridComponent;
	let fixture: ComponentFixture<GridComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GridComponent],
			providers: [FudisGridService],
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
