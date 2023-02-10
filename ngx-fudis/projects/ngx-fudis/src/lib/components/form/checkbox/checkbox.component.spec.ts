import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { CheckboxComponent } from './checkbox.component';
import { GuidanceComponent } from '../guidance/guidance.component';

const uncheckedCheckbox: UntypedFormControl = new UntypedFormControl('false');

describe('CheckboxComponent', () => {
	let component: CheckboxComponent;
	let fixture: ComponentFixture<CheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CheckboxComponent, MockComponent(GuidanceComponent)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckboxComponent);
		component = fixture.componentInstance;
		component.control = uncheckedCheckbox;
		component.errorMessage = 'Error message to appear!';
		component.label = 'Please check me.';

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
