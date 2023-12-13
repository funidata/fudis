import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectComponent } from './multiselect.component';

describe('MultiselectComponent', () => {
	let component: MultiselectComponent;
	let fixture: ComponentFixture<MultiselectComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MultiselectComponent],
		});
		fixture = TestBed.createComponent(MultiselectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
