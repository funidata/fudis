import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaTextInputComponent } from './vanilla-text-input.component';

describe('VanillaTextInputComponent', () => {
	let component: VanillaTextInputComponent;
	let fixture: ComponentFixture<VanillaTextInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [VanillaTextInputComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(VanillaTextInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
