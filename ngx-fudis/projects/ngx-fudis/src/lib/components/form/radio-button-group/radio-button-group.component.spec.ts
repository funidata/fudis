import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { LegendComponent } from '../legend/legend.component';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonOption } from '../../../types/forms';
import { RadioButtonComponent } from './radio-button/radio-button.component';

const testFormControl: UntypedFormControl = new UntypedFormControl('capybara');

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
			declarations: [RadioButtonGroupComponent, MockComponent(LegendComponent), MockComponent(RadioButtonComponent)],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioButtonGroupComponent);
		component = fixture.componentInstance;
		component.control = testFormControl;
		component.options = petOptions;
		component.legend = 'Choose a pet';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
