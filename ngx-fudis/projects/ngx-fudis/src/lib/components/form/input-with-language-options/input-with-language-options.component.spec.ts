import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FormGroup, FormControl } from '@angular/forms';
import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { FudisLangSelectOptions } from '../../../types/forms';
import { TextInputComponent } from '../text-input/text-input.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { SelectComponent } from '../select/select/select.component';

const testFormGroup: FormGroup = new FormGroup({
  finnish: new FormControl('', FudisValidators.required('Required in Finnish')),
  swedish: new FormControl(''),
  english: new FormControl('', FudisValidators.required('Required in English')),
});

const languageOptions: FudisLangSelectOptions[] = [
  { controlName: 'finnish', label: 'Fi' },
  { controlName: 'swedish', label: 'Sv' },
  { controlName: 'english', label: 'En' },
];

// TODO: Write tests
describe('InputWithLanguageOptionsComponent', () => {
  let component: InputWithLanguageOptionsComponent;
  let fixture: ComponentFixture<InputWithLanguageOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InputWithLanguageOptionsComponent,
        MockComponent(FieldSetComponent),
        MockComponent(TextInputComponent),
        MockComponent(SelectComponent),
        MockComponent(GuidanceComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputWithLanguageOptionsComponent);
    component = fixture.componentInstance;
    component.label = 'Label for testing purposes';
    component.formGroup = testFormGroup;
    component.options = languageOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
