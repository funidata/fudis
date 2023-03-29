import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { LegendComponent } from '../legend/legend.component';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { IFudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { GuidanceComponent } from '../guidance/guidance.component';

const testFormControl: FormControl = new FormControl('capybara');

const petOptions: IFudisRadioButtonOption[] = [
	{ value: 'platypus', viewValue: 'Platypus', id: 'test-1', name: 'animal' },
	{ value: 'otter', viewValue: 'Otter', id: 'test-2', name: 'animal' },
	{ value: 'capybara', viewValue: 'Capybara', id: 'test-3', name: 'animal' },
];

describe('RadioButtonGroupComponent', () => {
	let component: RadioButtonGroupComponent;
	let fixture: ComponentFixture<RadioButtonGroupComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				RadioButtonGroupComponent,
				MockComponent(LegendComponent),
				MockComponent(RadioButtonComponent),
				MockComponent(GuidanceComponent),
			],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioButtonGroupComponent);
		component = fixture.componentInstance;
		component.control = testFormControl;
		component.options = petOptions;
		component.legend = 'Choose a pet';
		component.id = 'test-id-radio-button-group';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
