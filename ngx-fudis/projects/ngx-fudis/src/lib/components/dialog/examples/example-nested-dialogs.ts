import { Component, Input, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { ExampleSingleNestedDialogComponent } from './example-single-nested-dialog.component';

type Veggie = 'fruit' | 'berry' | 'vegetable';

type Veggies = { [veg in Veggie]?: string | null | undefined };

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule, ExampleSingleNestedDialogComponent],
  selector: 'fudis-nested-dialogs',
  template: `
    <fudis-body-text class="fudis-mb-md">
      NOTE: It is recommended to have only one Dialog open at a time.
    </fudis-body-text>
    <fudis-button
      (handleClick)="openDialogTemplate(firstDialog)"
      [label]="'Open dialog with nested dialogs'"
    />

    <ng-container *ngIf="_favourites">
      <fudis-body-text class="fudis-mt-sm" *ngFor="let veggie of _favourites | keyvalue">
        Your favorite {{ veggie.key }} is <b>{{ veggie.value }}</b
        >.
      </fudis-body-text>
    </ng-container>

    <ng-template #firstDialog>
      <fudis-nested-dialog
        [id]="'fruit'"
        [title]="'First opened Dialog'"
        [size]="size"
        [nextDialogToOpen]="secondDialog"
      />
    </ng-template>

    <ng-template #secondDialog>
      <fudis-nested-dialog
        [id]="'berry'"
        [title]="'Second opened Dialog'"
        [size]="size"
        [nextDialogToOpen]="thirdDialog"
      />
    </ng-template>

    <ng-template #thirdDialog>
      <fudis-nested-dialog
        [id]="'vegetable'"
        [title]="'Third opened Dialog'"
        [size]="size"
        [nextDialogToOpen]="fourthDialog"
      />
    </ng-template>

    <ng-template #fourthDialog>
      <fudis-nested-dialog [title]="'Fourth and last opened Dialog'" [size]="size" />
    </ng-template>
  `,
})
export class ExampleNestedDialogsComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  protected _favourites: Veggies | null;

  openDialogTemplate(
    dialogToOpen:
      | ComponentType<ExampleSingleNestedDialogComponent>
      | TemplateRef<ExampleSingleNestedDialogComponent>,
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

  closeDialog() {
    this._dialogService.close(this._favourites);
  }

  closeAll(): void {
    this._dialogService.closeAll();
  }
}
