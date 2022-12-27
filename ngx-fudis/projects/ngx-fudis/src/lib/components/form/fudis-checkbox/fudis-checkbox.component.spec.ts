import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FudisCheckboxComponent } from './fudis-checkbox.component';

describe('FudisCheckboxComponent', () => {
	let component: FudisCheckboxComponent;
	let fixture: ComponentFixture<FudisCheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FudisCheckboxComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FudisCheckboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
