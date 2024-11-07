import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';

type TestForm = {
  powerAnimal: FormControl<string | null>;
};

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-dialog-with-form',
  template: `
    <fudis-dialog [size]="_size">
      <fudis-dialog-content>
        <fudis-form
          [title]="'Dialog with Form'"
          [level]="1"
          [titleVariant]="'xl'"
          [errorSummaryHelpText]="'You need to fill up the information.'"
        >
          <ng-template fudisContent [type]="'form'">
            <fudis-fieldset
              [label]="'Question about your power animal'"
              [helpText]="_greetingFromOpeningComponent"
            >
              <ng-template fudisContent [type]="'fieldset'">
                <fudis-text-input
                  [id]="'example-input-power-animal'"
                  [label]="'What is your power animal?'"
                  [control]="exampleDialogFormGroup.controls['powerAnimal']"
                  [helpText]="'Please add some values'"
                />
              </ng-template>
            </fudis-fieldset>
          </ng-template>
          <ng-template fudisActions [type]="'form'">
            <fudis-button
              fudisDialogClose
              [label]="'Cancel'"
              [variant]="'secondary'"
            ></fudis-button>
            <fudis-button
              fudisFormSubmit
              [formValid]="exampleDialogFormGroup.valid"
              (handleClick)="closeDialogWithForm()"
              [label]="'Submit'"
            ></fudis-button>
          </ng-template>
        </fudis-form>
      </fudis-dialog-content>
    </fudis-dialog>
  `,
})
export class ExampleDialogFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { greeting: string; size: FudisDialogSize },
    private _dialogService: FudisDialogService,
  ) {
    this._greetingFromOpeningComponent = this.data.greeting;
    this._size = this.data.size;
  }

  protected _size: FudisDialogSize;

  protected _greetingFromOpeningComponent: string;

  exampleDialogFormGroup = new FormGroup<TestForm>({
    powerAnimal: new FormControl(
      null,
      FudisValidators.required('You need to choose your power animal'),
    ),
  });

  closeDialogWithForm() {
    if (this.exampleDialogFormGroup.valid) {
      const dataToComponentWhichOpenedThisDialog =
        this.exampleDialogFormGroup.controls.powerAnimal.value;

      this._dialogService.close(dataToComponentWhichOpenedThisDialog);
    }
  }
}
