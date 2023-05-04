import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FieldsetComponent } from './fieldset.component';
import { GuidanceComponent } from '../guidance/guidance.component';

describe('FieldsetComponent', () => {
	let component: FieldsetComponent;
	let fixture: ComponentFixture<FieldsetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FieldsetComponent, MockComponent(GuidanceComponent)],
		}).compileComponents();

		fixture = TestBed.createComponent(FieldsetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
