import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import {
  FudisCheckboxOption,
  FudisSelectOption,
  FudisRadioButtonOption,
  FudisCheckboxChangeEvent,
  FudisInputSize,
} from 'projects/ngx-fudis/src/lib/types/forms';

import { FudisErrorSummaryService } from 'ngx-fudis';
import { FudisGroupValidators } from 'projects/ngx-fudis/src/lib/utilities/form/groupValidators';
import { FudisValidators } from 'projects/ngx-fudis/src/lib/utilities/form/validators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { defaultOptions } from 'projects/ngx-fudis/src/lib/components/form/select/common/mock_data';

type MyForm = {
  textArea: FormControl<string | null>;
  textInput: FormControl<string | null | number>;
  truth: FormControl<boolean | null>;
  checkboxFormGroup: FormGroup;
  date: FormControl<Date | null>;
  withLanguages: FormGroup;
};

type SelectForm = {
  autocompleteSearch: FormControl<FudisSelectOption<object>[] | null>;
  translatedMultiselect: FormControl<FudisSelectOption<object>[] | null>;
  translatedSelect: FormControl<FudisSelectOption<object> | null>;
};

@Component({
  selector: 'app-form-examples',
  templateUrl: 'formExamples.component.html',
})
export class AppFormExampleComponent {
  constructor(
    private _translocoService: TranslocoService,
    private _errorSummaryService: FudisErrorSummaryService,
  ) {
    _translocoService
      .selectTranslateObject('options')
      .pipe(takeUntilDestroyed())
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

    _translocoService
      .selectTranslateObject('selectOptions')
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.translatedSelectOptions = [
          { value: 'dog-id', label: value.dog },
          { value: 'cat-id', label: value.cat },
          { value: 'penguin-id', label: value.penguin },
          { value: 'sheep-id', label: value.sheep },
          { value: 'parrot-id', label: value.parrot },
        ];
      });
  }

  errorSummaryVisible: boolean = false;

  showSuccessBodyText: boolean = false;

  customError: boolean = true;

  selectForm = new FormGroup<SelectForm>({
    autocompleteSearch: new FormControl<FudisSelectOption<object>[] | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    translatedMultiselect: new FormControl<FudisSelectOption<object>[] | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
    translatedSelect: new FormControl<FudisSelectOption<object> | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
  });

  testFormGroup = new FormGroup<MyForm>({
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

    withLanguages: new FormGroup(
      {
        fi: new FormControl<string | null>(null),
        sv: new FormControl<string | null>(null),
        en: new FormControl<string | null>(null),
      },
      FudisGroupValidators.oneRequired(
        this._translocoService.selectTranslateObject('form_errors.one_required'),
      ),
    ),
  });

  selectOptions = defaultOptions;

  translatedSelectOptions: FudisSelectOption<object>[] = [];

  radioButtonOptions: FudisRadioButtonOption<object>[] = [];

  checkboxOptions: FudisCheckboxOption<object>[] = [];

  selectSize: FudisInputSize = 'sm';

  changeSelectSize(): void {
    if (this.selectSize === 'sm') {
      this.selectSize = 'md';
    } else if (this.selectSize === 'md') {
      this.selectSize = 'lg';
    } else {
      this.selectSize = 'sm';
    }
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

  handleChange(updatedOptions: FudisCheckboxChangeEvent): void {
    console.log(updatedOptions);
  }
}
