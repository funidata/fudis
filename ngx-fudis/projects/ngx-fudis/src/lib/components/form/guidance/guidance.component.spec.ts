import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';

import { GuidanceComponent } from './guidance.component';

const testControl = new UntypedFormControl('');

describe('GuidanceComponent', () => {
	let component: GuidanceComponent;
	let fixture: ComponentFixture<GuidanceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GuidanceComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(GuidanceComponent);
		component = fixture.componentInstance;
		component.control = testControl;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
