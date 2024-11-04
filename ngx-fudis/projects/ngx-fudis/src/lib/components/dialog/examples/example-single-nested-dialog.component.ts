import { Component, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFudisModule } from 'ngx-fudis';
import { CommonModule } from '@angular/common';

type TestNestedDialogForm = {
  favoriteVeggie: FormControl<string | null>;
};

type Veggie = 'fruit' | 'berry' | 'vegetable';

type Veggies = { [veg in Veggie]?: string | null | undefined };

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'fudis-nested-dialog',
  template: `
    <fudis-dialog [size]="size">
      <fudis-dialog-content *ngIf="id">
        <fudis-form
          [title]="title"
          [level]="2"
          [titleVariant]="'xl'"
          [errorSummaryHelpText]="'You need to fill up the information.'"
        >
          <ng-template fudisContent [type]="'form'">
            <ng-container *ngTemplateOutlet="favoriteVeggies" />
            <fudis-text-input
              class="fudis-mb-md"
              [id]="'example-input-' + id"
              [label]="'What is your favorite ' + id"
              [control]="exampleDialogFormGroup.controls['favoriteVeggie']"
            />
          </ng-template>
          <ng-template fudisActions [type]="'form'">
            <fudis-button
              fudisFormSubmit
              (handleClick)="closeDialog()"
              [label]="'Save and close dialog'"
              [variant]="'secondary'"
            />
            <fudis-button
              *ngIf="nextDialogToOpen"
              fudisFormSubmit
              (handleClick)="openDialogTemplate(nextDialogToOpen)"
              [label]="'Save and open next Dialog'"
            />
          </ng-template>
        </fudis-form>
      </fudis-dialog-content>
      <ng-container *ngIf="!id">
        <fudis-heading fudisDialogTitle [level]="2" [variant]="'xl'">{{ title }}</fudis-heading>
        <fudis-dialog-content>
          <ng-container *ngTemplateOutlet="favoriteVeggies" />
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Close this dialog'" [variant]="'secondary'" />
          <fudis-button (handleClick)="closeAll()" [label]="'Close all Dialogs'" />
        </fudis-dialog-actions>
      </ng-container>
    </fudis-dialog>

    <ng-template #favoriteVeggies>
      <fudis-body-text class="fudis-mb-sm" *ngIf="(_favoriteVeggies | keyvalue)?.length === 0">
        You don't have any favorite veggies!
      </fudis-body-text>
      <fudis-body-text class="fudis-mb-sm" *ngFor="let veggie of _favoriteVeggies | keyvalue">
        Your favorite {{ veggie.key }} is <b>{{ veggie.value }}</b
        >.
      </fudis-body-text>
    </ng-template>
  `,
})
export class ExampleSingleNestedDialogComponent {
  constructor(
    private _dialogService: FudisDialogService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data?: { favoriteVeggies?: Veggies },
  ) {
    this._favoriteVeggies = this.data?.favoriteVeggies || {};
  }

  @Input() size: FudisDialogSize = 'md';
  @Input() id: Veggie;
  @Input() title: string;
  @Input() nextDialogToOpen:
    | ComponentType<ExampleSingleNestedDialogComponent>
    | TemplateRef<ExampleSingleNestedDialogComponent>;

  protected _favoriteVeggies: Veggies = {};
  exampleDialogFormGroup = new FormGroup<TestNestedDialogForm>({
    favoriteVeggie: new FormControl(null),
  });

  updateFavoriteVeggies(): Veggies {
    const value = this.exampleDialogFormGroup?.controls?.favoriteVeggie?.value;

    if (value) {
      this._favoriteVeggies[this.id] = value;
    }

    return this._favoriteVeggies;
  }

  openDialogTemplate(
    dialogToOpen:
      | ComponentType<ExampleSingleNestedDialogComponent>
      | TemplateRef<ExampleSingleNestedDialogComponent>,
  ) {
    this._dialogService.open(dialogToOpen, {
      data: {
        favoriteVeggies: this.updateFavoriteVeggies(),
      },
    });
  }

  closeDialog() {
    this._dialogService.close(this.updateFavoriteVeggies());
  }

  closeAll(): void {
    this._dialogService.closeAll();
  }
}
