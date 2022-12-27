import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaTextAreaComponent } from './vanilla-text-area.component';

describe('VanillaTextAreaComponent', () => {
	let component: VanillaTextAreaComponent;
	let fixture: ComponentFixture<VanillaTextAreaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [VanillaTextAreaComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(VanillaTextAreaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
