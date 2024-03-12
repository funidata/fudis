import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import {
  FudisCheckboxOption,
  FudisSelectOption,
  FudisRadioButtonOption,
} from 'projects/ngx-fudis/src/lib/types/forms';
import { untilDestroyed } from 'projects/ngx-fudis/src/lib/utilities/untilDestroyed';
import { FudisErrorSummaryService } from 'ngx-fudis';
import { FudisGroupValidators } from 'projects/ngx-fudis/src/lib/utilities/form/groupValidators';
import { FudisValidators } from 'projects/ngx-fudis/src/lib/utilities/form/validators';
import {
  FudisDropdownLanguageOption,
  FudisInputWithLanguageOptionsFormGroup,
} from 'dist/ngx-fudis/lib/types/forms';

type MyForm = {
  dropdown: FormControl<FudisSelectOption | null>;
  dropdownMulti: FormControl<FudisSelectOption[] | null>;
  textArea: FormControl<string | null>;
  textInput: FormControl<string | null | number>;
  truth: FormControl<boolean | null>;
  checkboxFormGroup: FormGroup;
  date: FormControl<Date | null>;
  autocompleteDropdown: FormControl<FudisSelectOption | null>;
  autocompleteSearch: FormControl<FudisSelectOption | null>;
  withLanguages: FormGroup<FudisInputWithLanguageOptionsFormGroup>;
};

@Component({
  selector: 'app-form-examples',
  templateUrl: 'formExamples.component.html',
})
export class AppFormExampleComponent implements OnInit {
  constructor(
    private _translocoService: TranslocoService,
    private _errorSummaryService: FudisErrorSummaryService,
  ) {}

  errorSummaryVisible: boolean = false;

  showSuccessBodyText: boolean = false;

  customError: boolean = true;

  dropdownOptions: FudisSelectOption[] = [
    { value: 'value-1-dog', label: 'Dog' },
    { value: 'value-2-capybara', label: 'Capybara' },
    { value: 'value-3-platypys', label: 'Platypus' },
    { value: 'value-4-cat', label: 'Really dangerous cat', disabled: true },
    { value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
    { value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
  ];

  multipleOptions = Array.from({ length: 1000 }).map((value, i) => {
    return {
      value: i,
      label: `Item number ${i}`,
    };
  });

  testFormGroup = new FormGroup<MyForm>({
    dropdown: new FormControl<FudisSelectOption | null>(this.dropdownOptions[2]),
    dropdownMulti: new FormControl<FudisSelectOption[] | null>([
      this.dropdownOptions[2],
      this.dropdownOptions[4],
    ]),
    textArea: new FormControl<string | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    textInput: new FormControl<string | null | number>(null, [
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
      FudisValidators.minLength(
        5,
        this._translocoService.selectTranslateObject('form_errors.notEnoughCharacters'),
      ),
    ]),
    truth: new FormControl<boolean | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    date: new FormControl<Date | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    checkboxFormGroup: new FormGroup(
      {
        blueberry: new FormControl<FudisCheckboxOption | null>(null),
        cloudberry: new FormControl<FudisCheckboxOption | null>(null),
        raspberry: new FormControl<FudisCheckboxOption | null>(null),
        strawberry: new FormControl<FudisCheckboxOption | null>(null),
      },
      [
        FudisGroupValidators.min({
          value: 2,
          message: this._translocoService.selectTranslate('chooseBerryErrorMin'),
        }),
        FudisGroupValidators.max({
          value: 3,
          message: this._translocoService.selectTranslate('chooseBerryErrorMax'),
        }),
      ],
    ),
    autocompleteDropdown: new FormControl<FudisSelectOption | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    autocompleteSearch: new FormControl<FudisSelectOption | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    withLanguages: new FormGroup<FudisInputWithLanguageOptionsFormGroup>(
      {
        finnish: new FormControl<string | null>(null),
        swedish: new FormControl<string | null>(null),
        english: new FormControl<string | null>(null),
      },
      [
        FudisGroupValidators.atLeastOneRequired(
          this._translocoService.selectTranslate('error_one_required'),
        ),
      ],
    ),
  });

  _languageOptions: FudisDropdownLanguageOption[] = [
    { value: 'finnish', label: 'FI' },
    { value: 'swedish', label: 'SV' },
    { value: 'english', label: 'EN' },
  ];

  radioButtonOptions: FudisRadioButtonOption[] = [];

  checkboxOptions: FudisCheckboxOption[] = [];

  private _untilDestroyed = untilDestroyed();

  ngOnInit(): void {
    this._translocoService
      .selectTranslateObject('options')
      .pipe(this._untilDestroyed())
      .subscribe((value) => {
        this.radioButtonOptions = [
          { value: true, label: value.chooseTruthTrue, id: 'boolean-2' },
          { value: false, label: value.chooseTruthFalse, id: 'boolean-1' },
        ];
        this.checkboxOptions = [
          { controlName: 'blueberry', label: value.blueberry },
          { controlName: 'cloudberry', label: value.cloudberry },
          { controlName: 'raspberry', label: value.raspberry },
          { controlName: 'strawberry', label: value.strawberry },
        ];
      });
  }

  clickSubmit(): void {
    this.testFormGroup.markAllAsTouched();

    if (this.testFormGroup.valid) {
      this.errorSummaryVisible = false;
      this.showSuccessBodyText = true;
    }
  }

  toggleCustomError(): void {
    this.customError = !this.customError;
  }

  // eslint-disable-next-line class-methods-use-this
  handleChange(updatedOptions: FudisCheckboxOption): void {
    // eslint-disable-next-line no-console
    console.log(updatedOptions);
  }
}
