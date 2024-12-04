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
          [title]="'Dialog with Form and some random text'"
          [level]="2"
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
            <fudis-body-text>
              Her companions instrument set estimating sex remarkably solicitude motionless.
              Property men the why smallest graceful day insisted required. Inquiry justice country
              old placing sitting any ten age. Looking venture justice in evident in totally he do
              ability. Be is lose girl long of up give. Trifling wondered unpacked ye at he. In
              household certainty an on tolerably smallness difficult. Many no each like up be is
              next neat. Put not enjoyment behaviour her supposing. At he pulled object others.
              Endeavor bachelor but add eat pleasure doubtful sociable. Age forming covered you
              entered the examine. Blessing scarcely confined her contempt wondered shy. Dashwoods
              contented sportsmen at up no convinced cordially affection. Am so continued resembled
              frankness disposing engrossed dashwoods. Earnest greater on no observe fortune
              norland. Hunted mrs ham wishes stairs. Continued he as so breakfast shameless. All men
              drew its post knew. Of talking of calling however civilly wishing resolve. Mr do
              raising article general norland my hastily. Its companions say uncommonly pianoforte
              favourable. Education affection consulted by mr attending he therefore on forfeited.
              High way more far feet kind evil play led. Sometimes furnished collected add for
              resources attention. Norland an by minuter enquire it general on towards forming.
              Adapted mrs totally company two yet conduct men. Months on ye at by esteem desire
              warmth former. Sure that that way gave any fond now. His boy middleton sir nor
              engrossed affection excellent. Dissimilar compliment cultivated preference eat
              sufficient may. Well next door soon we mr he four. Assistance impression set
              insipidity now connection off you solicitude. Under as seems we me stuff those style
              at. Listening shameless by abilities pronounce oh suspected is affection. Next it draw
              in draw much bred.
            </fudis-body-text>
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
