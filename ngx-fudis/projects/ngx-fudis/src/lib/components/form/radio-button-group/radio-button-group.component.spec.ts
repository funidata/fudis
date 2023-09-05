import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { GuidanceComponent } from '../guidance/guidance.component';

const testFormControl: FormControl = new FormControl('capybara');

const petOptions: FudisRadioButtonOption[] = [
	{ value: 'platypus', viewValue: 'Platypus', id: 'test-1', name: 'animal' },
	{ value: 'otter', viewValue: 'Otter', id: 'test-2', name: 'animal' },
	{ value: 'capybara', viewValue: 'Capybara', id: 'test-3', name: 'animal' },
];

const truthOption: FudisRadioButtonOption[] = [{ value: true, viewValue: 'true', id: 'test-truth', name: 'truth' }];

const fruitOptions: FudisRadioButtonOption[] = [
	{ value: 'apple', viewValue: 'Apple', id: 'fruit-1', name: 'fruit' },
	{ value: 'fair-trade-banana', viewValue: 'Fair Trade Banana', id: 'fruit-2', name: 'fruit' },
	{ value: 'cherry', viewValue: 'Cherry', id: 'fruit-3', name: 'berry' },
];

describe('RadioButtonGroupComponent', () => {
	let component: RadioButtonGroupComponent;
	let fixture: ComponentFixture<RadioButtonGroupComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				RadioButtonGroupComponent,
				MockComponent(RadioButtonComponent),
				MockComponent(FieldSetComponent),
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
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Initialization', () => {
		it('should throw an error if there is only one radio-button option available', () => {
			component.options = truthOption;
			fixture.detectChanges();
			const length = component.options.length as Number;

			expect(() => {
				component.ngOnInit();
			}).toThrow(
				new Error(
					`Fudis-radio-button-group should have minimum of two options for radio buttons, but it only got ${length} option.`
				)
			);
		});

		it('should throw an error if radio-button option name attributes does not match', () => {
			component.options = fruitOptions;
			fixture.detectChanges();

			expect(() => {
				component.ngOnInit();
			}).toThrow(
				new Error(
					`In fudis-radio-button-group options array, each object's 'name' value should be identical for all options, but name mismatch was detected.`
				)
			);
		});
	});
});
