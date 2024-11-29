import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FudisDialogService,
  FudisGroupValidators,
  FudisTranslationService,
  FudisValidators,
} from 'ngx-fudis';
import { FudisRadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

type MyCheckboxType = {
  controlName: string;
  label: string;
};

type MyForm = {
  textInput: FormControl<string | null | number>;
  checkboxFormGroup: FormGroup;
  truth: FormControl<boolean | null>;
};

@Component({
  selector: 'app-dialog-test-form',
  template: `
    <fudis-dialog [size]="'sm'">
      <fudis-dialog-content>
        <fudis-form
          [title]="'Dialog with fudis-form'"
          [errorSummaryHelpText]="'You did not fill all the required information'"
          [level]="2"
        >
          <ng-template fudisContent [type]="'form'">
            <fudis-fieldset [label]="'We need some information'" [helpText]="_greetingFromOpener">
              <fudis-fieldset-content>
                <fudis-checkbox-group
                  [label]="'Choose berry'"
                  [helpText]="'Berries are yummy'"
                  [formGroup]="testFormGroup.controls['checkboxFormGroup']"
                >
                  <fudis-checkbox
                    *ngFor="let option of checkboxOptions"
                    [controlName]="option.controlName"
                    [label]="option.label"
                  />
                </fudis-checkbox-group>
                <fudis-text-input
                  [label]="'Is something wrong?'"
                  [helpText]="'I hope everything is OK'"
                  [control]="testFormGroup.controls['textInput']"
                />
                <fudis-radio-button-group
                  [label]="'Choose the truth'"
                  [control]="testFormGroup.controls['truth']"
                >
                  <fudis-radio-button
                    *ngFor="let option of radioButtonOptions"
                    [label]="option.label"
                    [value]="option.value"
                  />
                </fudis-radio-button-group>
              </fudis-fieldset-content>
            </fudis-fieldset>
          </ng-template>
          <ng-template fudisActions [type]="'form'">
            <fudis-button
              fudisFormSubmit
              [formValid]="testFormGroup.valid"
              (handleClick)="submitDialogForm()"
              [label]="'Submit'"
            ></fudis-button>
            <fudis-button fudisDialogClose [label]="'Cancel'"></fudis-button>
          </ng-template>
        </fudis-form>
      </fudis-dialog-content>
    </fudis-dialog>
  `,
  styles: [],
})
export class DialogTestFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { greeting: string },
    @Inject(DOCUMENT) private _document: Document,
    private _dialogService: FudisDialogService,
    private _translocoService: TranslocoService,
    private _fudisLanguage: FudisTranslationService,
  ) {
    this._greetingFromOpener = this.data.greeting;
  }

  protected _greetingFromOpener: string;

  checkboxOptions: MyCheckboxType[] = [
    { controlName: 'blueberry', label: 'blueberry' },
    { controlName: 'cloudberry', label: 'cloudberry' },
    { controlName: 'raspberry', label: 'raspberry' },
    { controlName: 'strawberry', label: 'strawberry' },
  ];

  radioButtonOptions: FudisRadioButtonOption<object>[] = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  testFormGroup = new FormGroup<MyForm>({
    textInput: new FormControl<string | null | number>(null, [
      FudisValidators.required('This is required'),
    ]),
    checkboxFormGroup: new FormGroup(
      {
        blueberry: new FormControl<boolean | undefined | null>(true),
        cloudberry: new FormControl<boolean | undefined | null>(true),
        raspberry: new FormControl<boolean | undefined | null>(true),
        strawberry: new FormControl<boolean | undefined | null>(null),
      },
      [
        FudisGroupValidators.min({
          value: 2,
          message: 'Too few chosen',
        }),
        FudisGroupValidators.max({
          value: 3,
          message: 'Too many chosen',
        }),
      ],
    ),
    truth: new FormControl<boolean | null>(
      null,
      FudisValidators.required(
        this._translocoService.selectTranslateObject('form_errors.required'),
      ),
    ),
  });

  submitDialogForm(): void {
    if (this.testFormGroup.valid) {
      this._dialogService.close(this.testFormGroup.controls.textInput.value);
    }
  }
}
