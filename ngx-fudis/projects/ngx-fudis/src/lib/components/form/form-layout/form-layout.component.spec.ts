import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayoutComponent } from './form-layout.component';

describe('FormSpacerComponent', () => {
	let component: FormLayoutComponent;
	let fixture: ComponentFixture<FormLayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FormLayoutComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FormLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
