import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { groupedMockData, defaultOptions, TestAnimalScience, TestAnimalSound } from '../../form/select/common/mock_data';

type TestForm = {
  powerAnimal: FormControl<string | null>;
};

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-dialog-with-form',
  template: `
    <fudis-dialog [size]="_size">
      <fudis-dialog-content>
        <fudis-form
          [title]="'Dialog with Form and some random text'"
          [level]="1"
          [titleVariant]="'xxs'"
          [errorSummaryTitle]="'You need to fill up the information.'"
        >
          <fudis-form-content>
            <fudis-fieldset
              [label]="'Question about your power animal'"
              [helpText]="_greetingFromOpeningComponent"
            >
              <fudis-fieldset-content>
              <div>
                <fudis-select
                  [size]="'lg'"
                  [placeholder]="'Choose a pet'"
                  [control]="control"
                  [label]="'Select a pet'"
                  [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
                  [initialFocus]="false"
                  [selectionClearButton]="true"
                  [variant]="'dropdown'"
                  (selectionUpdate)="selectionUpdate($event)"
                  [popoverText]="''"
                  [popoverPosition]="'right'"
                  [popoverTriggerLabel]="''"
                >
                    <ng-template fudisSelectOptions>
                      <fudis-select-option
                        *ngFor="let option of defaultOptions"
                        [data]="option"
                      ></fudis-select-option>
                      <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
                        <fudis-select-option
                          *ngFor="let groupedOption of group.options"
                          [data]="groupedOption"
                        ></fudis-select-option>
                      </fudis-select-group>
                    </ng-template>
                  </fudis-select>
                </div>
              </fudis-fieldset-content>
            </fudis-fieldset>
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

  protected _size: FudisDialogSize;

  protected _greetingFromOpeningComponent: string;

  groupedMockData = groupedMockData;

  defaultOptions = defaultOptions;

  control = new FormControl<TestAnimalSound | TestAnimalScience | null>(null);

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
