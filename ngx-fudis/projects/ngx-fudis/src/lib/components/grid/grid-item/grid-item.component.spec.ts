import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemComponent } from './grid-item.component';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';

describe('GridItemComponent', () => {
	let component: GridItemComponent;
	let fixture: ComponentFixture<GridItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [GridItemComponent],
			providers: [FudisGridService, FudisBreakpointService],
		});
		fixture = TestBed.createComponent(GridItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
