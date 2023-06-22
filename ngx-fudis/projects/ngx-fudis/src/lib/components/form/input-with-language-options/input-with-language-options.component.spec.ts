import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { FudisDropdownOption } from '../../../types/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { GuidanceComponent } from '../guidance/guidance.component';

const testFormGroup: FormGroup = new FormGroup({
	finnish: new FormControl('', Validators.required),
	swedish: new FormControl(''),
	english: new FormControl('', Validators.required),
});

const languageOptions: FudisDropdownOption[] = [
	{ value: 'finnish', viewValue: 'Fi' },
	{ value: 'swedish', viewValue: 'Sv' },
	{ value: 'english', viewValue: 'En' },
];

describe('InputWithLanguageOptionsComponent', () => {
	let component: InputWithLanguageOptionsComponent;
	let fixture: ComponentFixture<InputWithLanguageOptionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				InputWithLanguageOptionsComponent,
				MockComponent(FieldSetComponent),
				MockComponent(DropdownComponent),
				MockComponent(TextInputComponent),
				MockComponent(GuidanceComponent),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(InputWithLanguageOptionsComponent);
		component = fixture.componentInstance;
		component.label = 'Label for testing purposes';
		component.formGroup = testFormGroup;
		component.options = languageOptions;
		component.requiredText = 'Required';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
