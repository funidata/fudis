import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import {
  FudisCheckboxOption,
  FudisSelectOption,
  FudisRadioButtonOption,
  FudisCheckboxChangeEvent,
} from 'projects/ngx-fudis/src/lib/types/forms';

import { FudisErrorSummaryService } from 'ngx-fudis';
import { FudisGroupValidators } from 'projects/ngx-fudis/src/lib/utilities/form/groupValidators';
import { FudisValidators } from 'projects/ngx-fudis/src/lib/utilities/form/validators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type myLangGroup = {
  finnish: FormControl<string | null>;
  english: FormControl<string | null>;
  swedish: FormControl<string | null>;
};

type MyForm = {
  dropdown: FormControl<FudisSelectOption<object> | null>;
  dropdownMulti: FormControl<FudisSelectOption<object>[] | null>;
  textArea: FormControl<string | null>;
  textInput: FormControl<string | null | number>;
  truth: FormControl<boolean | null>;
  checkboxFormGroup: FormGroup;
  date: FormControl<Date | null>;
  autocompleteDropdown: FormControl<FudisSelectOption<object> | null>;
  autocompleteSearch: FormControl<FudisSelectOption<object> | null>;
  withLanguages: FormGroup<myLangGroup>;
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

  dropdownOptions: FudisSelectOption<object>[] = [
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
    dropdown: new FormControl<FudisSelectOption<object> | null>(this.dropdownOptions[2]),
    dropdownMulti: new FormControl<FudisSelectOption<object>[] | null>([
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
        blueberry: new FormControl<boolean | null | undefined>(null),
        cloudberry: new FormControl<boolean | null | undefined>(null),
        raspberry: new FormControl<boolean | null | undefined>(null),
        strawberry: new FormControl<boolean | null | undefined>(null),
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
    autocompleteDropdown: new FormControl<FudisSelectOption<object> | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    autocompleteSearch: new FormControl<FudisSelectOption<object> | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    withLanguages: new FormGroup({
      finnish: new FormControl<string | null>(null),
      swedish: new FormControl<string | null>(null),
      english: new FormControl<string | null>(null),
    }),
  });

  radioButtonOptions: FudisRadioButtonOption<object>[] = [];

  checkboxOptions: FudisCheckboxOption<object>[] = [];

  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._translocoService
      .selectTranslateObject('options')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {
        this.radioButtonOptions = [
          { value: true, label: value.chooseTruthTrue },
          { value: false, label: value.chooseTruthFalse },
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

    if (this.testFormGroup.invalid) {
      this.errorSummaryVisible = true;
      this.showSuccessBodyText = false;
      this._errorSummaryService.reloadAllErrors();
    } else {
      this.errorSummaryVisible = false;
      this.showSuccessBodyText = true;
    }
  }

  toggleCustomError(): void {
    this.customError = !this.customError;
  }

  // eslint-disable-next-line class-methods-use-this
  handleChange(updatedOptions: FudisCheckboxChangeEvent): void {
    // eslint-disable-next-line no-console
    console.log(updatedOptions);
  }
}
