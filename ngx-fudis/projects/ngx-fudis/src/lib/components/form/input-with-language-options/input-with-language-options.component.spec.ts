import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';
import { FieldsetComponent } from '../fieldset/fieldset.component';
import { IFudisDropdownOption } from '../../../types/forms';

const testFormGroup: FormGroup = new FormGroup({
	finnish: new FormControl('', Validators.required),
	swedish: new FormControl(''),
	english: new FormControl('', Validators.required),
});

const languageOptions: IFudisDropdownOption[] = [
	{ value: 'finnish', viewValue: 'Fi' },
	{ value: 'swedish', viewValue: 'Sv' },
	{ value: 'english', viewValue: 'En' },
];

describe('InputWithLanguageOptionsComponent', () => {
	let component: InputWithLanguageOptionsComponent;
	let fixture: ComponentFixture<InputWithLanguageOptionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InputWithLanguageOptionsComponent, MockComponent(FieldsetComponent)],
		}).compileComponents();

		fixture = TestBed.createComponent(InputWithLanguageOptionsComponent);
		component = fixture.componentInstance;
		component.legend = 'Legend for testing purposes';
		component.formGroup = testFormGroup;
		component.options = languageOptions;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
