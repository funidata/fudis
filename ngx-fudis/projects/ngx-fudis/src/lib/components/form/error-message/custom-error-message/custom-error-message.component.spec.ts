import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomErrorMessageComponent } from './custom-error-message.component';

describe('CustomErrorMessageComponent', () => {
	let component: CustomErrorMessageComponent;
	let fixture: ComponentFixture<CustomErrorMessageComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CustomErrorMessageComponent],
		});
		fixture = TestBed.createComponent(CustomErrorMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
