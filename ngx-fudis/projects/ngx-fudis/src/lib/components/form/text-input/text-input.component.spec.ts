import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { TextInputComponent } from './text-input.component';

const textInputControl: UntypedFormControl = new UntypedFormControl('');

describe('TextInputComponent', () => {
	let component: TextInputComponent;
	let fixture: ComponentFixture<TextInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TextInputComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TextInputComponent);
		component = fixture.componentInstance;
		component.label = 'Label for testing purposes';
		component.control = textInputControl;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
