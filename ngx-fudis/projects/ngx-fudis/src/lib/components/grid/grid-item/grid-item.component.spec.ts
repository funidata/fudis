import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemComponent } from './grid-item.component';

describe('GridItemComponent', () => {
	let component: GridItemComponent;
	let fixture: ComponentFixture<GridItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [GridItemComponent],
		});
		fixture = TestBed.createComponent(GridItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
