import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldsetWithLanguageOptionsComponent } from './fieldset-with-language-options.component';
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

describe('FieldsetWithLanguageOptionsComponent', () => {
	let component: FieldsetWithLanguageOptionsComponent;
	let fixture: ComponentFixture<FieldsetWithLanguageOptionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FieldsetWithLanguageOptionsComponent, MockComponent(FieldsetComponent)],
		}).compileComponents();

		fixture = TestBed.createComponent(FieldsetWithLanguageOptionsComponent);
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
