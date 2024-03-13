import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FudisCheckboxOption } from 'dist/ngx-fudis/lib/types/forms';
import { FudisDialogService, FudisErrorSummaryService, FudisGroupValidators, FudisValidators } from 'ngx-fudis';

type MyForm = {
  textInput: FormControl<string | null | number>;
  checkboxFormGroup: FormGroup;
};

@Component({
  selector: 'app-dialog-test-form',
  template: `
    <fudis-dialog [size]="'sm'">
      <fudis-dialog-content>
        <fudis-form
          [errorSummaryLinkType]="'href'"
          [errorSummaryVisible]="errorSummaryVisible"
          [title]="'Dialog with fudis-form'"
          [errorSummaryHelpText]="'You did not fill all the required information'"
          [titleLevel]="2"
        >
          <ng-template fudisContent [type]="'form'">
            <fudis-fieldset [title]="'We need some information'">
              <ng-template fudisContent [type]="'fieldset'">
                <fudis-checkbox-group
                  [title]="'Choose berry'"
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
              </ng-template>
            </fudis-fieldset>
          </ng-template>
          <ng-template fudisActions [type]="'form'">
          <button (click)="submitDialogForm()">Natiivi button</button>
            <fudis-button (handleClick)="submitDialogForm()" [label]="'Submit'"></fudis-button>
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
    @Inject(MAT_DIALOG_DATA) public data: { size: string },
    private _dialogService: FudisDialogService,
    private _errorSummaryService: FudisErrorSummaryService,
  ) {}

  errorSummaryVisible = false;

  checkboxOptions: FudisCheckboxOption[] = [
    { controlName: 'blueberry', label: 'blueberry' },
    { controlName: 'cloudberry', label: 'cloudberry' },
    { controlName: 'raspberry', label: 'raspberry' },
    { controlName: 'strawberry', label: 'strawberry' },
  ];

  testFormGroup = new FormGroup<MyForm>({
    textInput: new FormControl<string | null | number>(null, [
      FudisValidators.required(
        'This is required',
      ),
    ]),
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
          message: 'Too few chosen',
        }),
        FudisGroupValidators.max({
          value: 3,
          message: 'Too many chosen',
        }),
      ],
    ),
  });

  submitDialogForm(): void {
    this.testFormGroup.markAllAsTouched();

    if (this.testFormGroup.invalid) {
      this.errorSummaryVisible = true;
      this._errorSummaryService.reloadErrors();
    } else {
      console.log(this.data);
      this.errorSummaryVisible = false;
      this._dialogService.close(this.data);
    }
  }
}
