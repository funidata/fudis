import { Component, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

type TestNestedDialogForm = {
  favoriteVeggie: FormControl<string | null>;
};

type Veggie = 'fruit' | 'berry' | 'vegetable';

type Veggies = { [veg in Veggie]?: string | null | undefined };

@Component({
  selector: 'example-nested-dialog',
  imports: [NgxFudisModule, CommonModule],
  template: `
    <fudis-dialog [size]="size">
      @if (id) {
        <fudis-dialog-content>
          <fudis-form
            [title]="title"
            [level]="2"
            [titleVariant]="'xl'"
            [errorSummaryTitle]="'You need to fill up the information.'"
          >
            <fudis-form-content>
              <ng-container *ngTemplateOutlet="favoriteVeggies" />
              <fudis-text-input
                class="fudis-mb-md"
                [id]="'example-input-' + id"
                [label]="'What is your favorite ' + id"
                [control]="exampleDialogFormGroup.controls['favoriteVeggie']"
              />
            </fudis-form-content>
            <fudis-form-actions>
              <fudis-button
                fudisFormSubmit
                (handleClick)="closeDialog()"
                [label]="'Save and close dialog'"
                [variant]="'secondary'"
              />
              @if (nextDialogToOpen) {
                <fudis-button
                  fudisFormSubmit
                  (handleClick)="openDialogTemplate(nextDialogToOpen)"
                  [label]="'Save and open next Dialog'"
                />
              }
            </fudis-form-actions>
          </fudis-form>
        </fudis-dialog-content>
      }
      @if (!id) {
        <fudis-heading fudisDialogTitle [level]="2" [variant]="'xl'">{{ title }}</fudis-heading>
        <fudis-dialog-content>
          <ng-container *ngTemplateOutlet="favoriteVeggies" />
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Close this dialog'" [variant]="'secondary'" />
          <fudis-button (handleClick)="closeAll()" [label]="'Close all Dialogs'" />
        </fudis-dialog-actions>
      }
    </fudis-dialog>

    <ng-template #favoriteVeggies>
      @if ((_favoriteVeggies | keyvalue)?.length === 0) {
        <fudis-body-text class="fudis-mb-sm">
          You don't have any favorite veggies!
        </fudis-body-text>
      }
      @for (veggie of _favoriteVeggies | keyvalue; track veggie.key) {
        <fudis-body-text class="fudis-mb-sm">
          Your favorite {{ veggie.key }} is <b>{{ veggie.value }}</b
          >.
        </fudis-body-text>
      }
    </ng-template>
  `,
})
export class ExampleNestedDialogComponent {
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
    | ComponentType<ExampleNestedDialogComponent>
    | TemplateRef<ExampleNestedDialogComponent>;

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
      | ComponentType<ExampleNestedDialogComponent>
      | TemplateRef<ExampleNestedDialogComponent>,
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

@Component({
  selector: 'example-nested-dialogs',
  imports: [NgxFudisModule, CommonModule, ExampleNestedDialogComponent],
  template: `
    <fudis-body-text class="fudis-mb-md">
      NOTE: It is recommended to have only one Dialog open at a time.
    </fudis-body-text>
    <fudis-button
      (handleClick)="openDialogTemplate(firstDialog)"
      [label]="'Open dialog with nested dialogs'"
    />

    @if (_favourites) {
      @for (veggie of _favourites | keyvalue; track veggie.key) {
        <fudis-body-text class="fudis-mt-sm">
          Your favorite {{ veggie.key }} is <b>{{ veggie.value }}</b
          >.
        </fudis-body-text>
      }
    }

    <ng-template #firstDialog>
      <example-nested-dialog
        [id]="'fruit'"
        [title]="'First opened Dialog'"
        [size]="size"
        [nextDialogToOpen]="secondDialog"
      />
    </ng-template>

    <ng-template #secondDialog>
      <example-nested-dialog
        [id]="'berry'"
        [title]="'Second opened Dialog'"
        [size]="size"
        [nextDialogToOpen]="thirdDialog"
      />
    </ng-template>

    <ng-template #thirdDialog>
      <example-nested-dialog
        [id]="'vegetable'"
        [title]="'Third opened Dialog'"
        [size]="size"
        [nextDialogToOpen]="fourthDialog"
      />
    </ng-template>

    <ng-template #fourthDialog>
      <example-nested-dialog [title]="'Fourth and last opened Dialog'" [size]="size" />
    </ng-template>
  `,
})
export class ExampleNestedDialogsComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  protected _favourites: Veggies | null;

  openDialogTemplate(
    dialogToOpen:
      | ComponentType<ExampleNestedDialogComponent>
      | TemplateRef<ExampleNestedDialogComponent>,
  ) {
    this._dialogService
      .open(dialogToOpen)
      .afterClosed()
      .subscribe((result: Veggies) => {
        if (result) {
          this._favourites = result;
        }
      });
  }
}
