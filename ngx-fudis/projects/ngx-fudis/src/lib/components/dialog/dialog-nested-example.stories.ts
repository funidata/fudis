import { Component, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import docs from './dialog.mdx';
import { dialogExclude } from '../../utilities/storybook';
import { DialogComponent } from './dialog.component';
import { FudisDialogSize } from '../../types/miscellaneous';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type TestNestedDialogForm = {
  favoriteVeggie: FormControl<string | null>;
};

type Veggie = 'fruit' | 'berry' | 'vegetable';

type Veggies = { [veg in Veggie]?: string | null | undefined };

@Component({
  selector: 'fudis-nested-dialog',
  template: `
    <fudis-dialog [size]="size">
      <fudis-dialog-content *ngIf="id">
        <fudis-form [title]="title" [level]="2" [titleVariant]="'xl'">
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
class NestedDialogComponent {
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
    | ComponentType<NestedDialogComponent>
    | TemplateRef<NestedDialogComponent>;

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
    dialogToOpen: ComponentType<NestedDialogComponent> | TemplateRef<NestedDialogComponent>,
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
class NestedDialogsComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  protected _favourites: Veggies | null;

  openDialogTemplate(
    dialogToOpen: ComponentType<NestedDialogComponent> | TemplateRef<NestedDialogComponent>,
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

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [],
      declarations: [NestedDialogsComponent, NestedDialogComponent],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: dialogExclude,
    },
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as Meta;

const html = String.raw;

const TemplateNested: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-nested-dialogs [size]="size"></fudis-nested-dialogs> `,
});

export const ExampleWithNestedDialogs = TemplateNested.bind({});
ExampleWithNestedDialogs.args = {
  size: 'sm',
};
