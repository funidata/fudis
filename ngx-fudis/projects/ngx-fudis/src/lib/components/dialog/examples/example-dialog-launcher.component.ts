import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { ExampleDialogFormComponent } from './example-dialog-form.component';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';

type TestForm = {
  courseTopic: FormControl<string | null>;
};

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-dialog-laucher',
  template: ` <fudis-button
      (handleClick)="openDialogComponent()"
      [label]="'Open dialog with form'"
    ></fudis-button>

    <ng-container *ngIf="this._chosenTopic">
      <fudis-body-text
        >Thank you for the feedback! Your favourite topic was
        {{ this._chosenTopic }}.</fudis-body-text
      >
    </ng-container>`,
})
export class ExampleDialogLaucherComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  protected _chosenTopic: string | null;

  exampleDialogFormGroup = new FormGroup<TestForm>({
    courseTopic: new FormControl(null, FudisValidators.required('You need to add a topic')),
  });

  openDialogComponent() {
    this._dialogService
      .open(ExampleDialogFormComponent, {
        data: {
          greeting: 'This is greeting sent from the component, which opened up this dialog!',
          size: this.size,
        },
      })
      .afterClosed()
      .subscribe((result: string) => {
        if (result) {
          this._chosenTopic = result;
        }
      });
  }
}
