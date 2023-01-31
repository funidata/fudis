import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';

const uncheckedCheckbox: UntypedFormControl = new UntypedFormControl('false');

describe('CheckboxComponent', () => {
	let component: CheckboxComponent;
	let fixture: ComponentFixture<CheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CheckboxComponent],
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
