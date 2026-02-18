import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFudisModule } from '../../../ngx-fudis.module';

import { FudisSelectOption } from '../../../types/forms';

type TestForm = {
  topics: FormControl<string | null>;
};

export const gradeOptions: FudisSelectOption[] = [
  { value: '5', label: 'Excellent - 5' },
  { value: '4', label: 'Good - 4' },
  { value: '3', label: 'Neutral - 3' },
  { value: '2', label: 'Not good - 2' },
  { value: '1', label: 'Bad - 1' },
];

@Component({
  imports: [NgxFudisModule],
  selector: 'example-dialog-with-form',
  template: `
    <fudis-dialog [size]="_size">
      <fudis-dialog-content>
        <fudis-form
          [title]="'Form Dialog'"
          [level]="1"
          [titleVariant]="'xl'"
          [errorSummaryTitle]="'You need to fill up the information.'"
          >
          <fudis-form-content>
            <fudis-fieldset [label]="'Course feedback'" [helpText]="_greetingFromOpeningComponent">
              <fudis-fieldset-content>
                <fudis-text-input
                  [id]="'example-input-course-topic'"
                  [label]="'Your favourite course topic'"
                  [control]="exampleDialogFormGroup.controls['topics']"
                  [helpText]="'Please add some topic'"
                  />
              </fudis-fieldset-content>
            </fudis-fieldset>
            <fudis-select
              [className]="'fudis-mt-sm'"
              [size]="'lg'"
              [control]="testControl"
              [label]="'Course grade 1 - 5'"
              [helpText]="'How relevant do you find the course content?'"
              [initialFocus]="false"
              [selectionClearButton]="true"
              [variant]="'dropdown'"
              >
              <ng-template fudisSelectOptions>
                @for (option of gradeOptions; track option) {
                  <fudis-select-option
                    [data]="option"
                  ></fudis-select-option>
                }
              </ng-template>
            </fudis-select>
          </fudis-form-content>
          <fudis-form-actions>
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
          </fudis-form-actions>
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

  gradeOptions = gradeOptions;

  protected _size: FudisDialogSize;

  protected _greetingFromOpeningComponent: string;

  testControl = new FormControl(null);

  exampleDialogFormGroup = new FormGroup<TestForm>({
    topics: new FormControl(null, FudisValidators.required('You need to add a topic')),
  });

  closeDialogWithForm() {
    if (this.exampleDialogFormGroup.valid) {
      const dataToComponentWhichOpenedThisDialog =
        this.exampleDialogFormGroup.controls.topics.value;

      this._dialogService.close(dataToComponentWhichOpenedThisDialog);
    }
  }
}
