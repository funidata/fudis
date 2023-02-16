import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';

const lonelyFormControl = new FormControl();

describe('RadioButtonComponent', () => {
	let component: RadioButtonComponent;
	let fixture: ComponentFixture<RadioButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RadioButtonComponent],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioButtonComponent);
		component = fixture.componentInstance;
		component.viewValue = 'Lonely radio button';
		component.value = 'lonely';
		component.control = lonelyFormControl;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
