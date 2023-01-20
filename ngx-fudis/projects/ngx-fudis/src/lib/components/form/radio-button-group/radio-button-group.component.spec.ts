import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonOption } from '../../../types/forms';

const testFormControl: FormControl = new FormControl('capybara');

const petOptions: RadioButtonOption[] = [
	{ value: 'platypus', label: 'Platypus', id: '1', name: 'animal' },
	{ value: 'otter', label: 'Otter', id: '2', name: 'animal' },
	{ value: 'capybara', label: 'Capybara', id: '3', name: 'animal' },
];

describe('RadioButtonGroupComponent', () => {
	let component: RadioButtonGroupComponent;
	let fixture: ComponentFixture<RadioButtonGroupComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RadioButtonGroupComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioButtonGroupComponent);
		component = fixture.componentInstance;
		component.radioButtonFormControl = testFormControl;
		component.options = petOptions;
		component.legend = 'Choose a pet';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
