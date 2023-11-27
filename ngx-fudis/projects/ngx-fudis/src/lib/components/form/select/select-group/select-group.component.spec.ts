import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupComponent } from './select-group.component';

describe('SelectGroupComponent', () => {
	let component: SelectGroupComponent;
	let fixture: ComponentFixture<SelectGroupComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SelectGroupComponent],
		});
		fixture = TestBed.createComponent(SelectGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
