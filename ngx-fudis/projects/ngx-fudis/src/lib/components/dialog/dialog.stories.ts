import { Component, Inject, Input, Optional, TemplateRef, ViewChild } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import docs from './dialog.docs.mdx';
import { FudisValidators } from '../../utilities/form/validators';
import { dialogExclude } from '../../utilities/storybook';
import { DialogComponent } from './dialog.component';
import { FudisDialogSize } from '../../types/miscellaneous';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type TestForm = {
  powerAnimal: FormControl<string | null>;
};

type TestNestedDialogForm = {
  favoriteVeggie: FormControl<string | null>;
};

type Veggie = 'fruit' | 'berry' | 'vegetable';

type Veggies = { [veg in Veggie]?: string | null | undefined };

@Component({
  selector: 'fudis-dialog-laucher',
  template: ` <fudis-button
      (handleClick)="openDialogComponent()"
      [label]="'Open dialog with form'"
    ></fudis-button>

    <ng-container *ngIf="this._chosenPowerAnimal">
      <fudis-body-text
        >Great choise, your power animal is {{ this._chosenPowerAnimal }}.</fudis-body-text
      >
    </ng-container>`,
})
class DialogLaucherComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  protected _chosenPowerAnimal: string | null;

  exampleDialogFormGroup = new FormGroup<TestForm>({
    powerAnimal: new FormControl(
      null,
      FudisValidators.required('You need to choose your power animal'),
    ),
  });

  openDialogComponent() {
    this._dialogService
      .open(DialogWithFormComponent, {
        data: {
          greeting: 'This is greeting sent from the component, which opened up this dialog!',
          size: this.size,
        },
      })
      .afterClosed()
      .subscribe((result: string) => {
        if (result) {
          this._chosenPowerAnimal = result;
        }
      });
  }
}

@Component({
  selector: 'fudis-dialog-with-form',
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
class DialogWithFormComponent {
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

@Component({
  selector: 'fudis-dialog-with-grid',
  template: `
    <fudis-button
      (handleClick)="openDialogTemplate(dialogWithGrid)"
      [label]="'Open dialog with grid'"
    ></fudis-button>

    <ng-template #dialogWithGrid>
      <fudis-dialog [size]="size">
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'"
          >Dialog with fudis-grid and scrollable content</fudis-heading
        >
        <fudis-dialog-content>
          <fudis-grid [classes]="'fudis-mb-md'">
            <fudis-heading [level]="3" [variant]="'sm'">
              I am fudis-heading inside the grid taking the whole width
            </fudis-heading>
            <fudis-body-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
              vehicula ut massa non facilisis. Aliquam vehicula risus vitae ex condimentum, sed
              efficitur neque scelerisque. Mauris facilisis vel orci sit amet tincidunt. Praesent
              ante leo, tempus eu blandit vel, tempus nec augue. Nam dui est, scelerisque quis
              mauris sit amet, sagittis pharetra lectus. Donec nec ligula et dolor venenatis
              bibendum. Vestibulum metus tortor, fermentum eu dignissim id, ultrices vitae metus.
              Donec eget vulputate risus. Proin eros augue, volutpat mollis varius non, posuere ac
              turpis. Aliquam et convallis tortor, non semper mi. Praesent nec eleifend mauris, at
              laoreet urna. Quisque dignissim nibh sollicitudin, finibus justo non, efficitur est.
            </fudis-body-text>
            <fudis-body-text>
              Proin pellentesque at felis vel imperdiet. Vivamus eros lorem, condimentum non rutrum
              quis, aliquam vitae dolor. Morbi dictum leo non porttitor egestas. Sed sed aliquet
              purus. Sed nec metus dictum, porta justo ut, cursus lorem. Nam libero dolor, pulvinar
              eu enim et, porttitor sodales ipsum. Nullam tristique ante sed massa porta, in
              accumsan nibh pretium. Integer vel facilisis neque, a lacinia dui. Donec cursus eget
              mi a aliquam. Vestibulum commodo, elit a mattis porttitor, eros neque euismod sem, eu
              hendrerit ante nisl sed quam. Vestibulum euismod leo ac magna pretium.
            </fudis-body-text>
          </fudis-grid>
          <fudis-hr />
          <fudis-grid [columns]="{ xs: 1, sm: 2, md: 3 }" [classes]="'fudis-mt-sm fudis-mb-sm'">
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Showcase of grid items</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>I am last item of the grid</fudis-body-text>
            </div>
          </fudis-grid>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>
  `,
})
class DialogWithGridComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openDialogTemplate<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
    this._dialogService.open(dialogToOpen);
  }
}

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

@Component({
  selector: 'fudis-dialog-size-example',
  template: `
    <fudis-grid [columns]="'repeat(3,auto)'" [width]="'sm'">
      <fudis-heading>Regular Dialogs</fudis-heading>
      <fudis-button
        *ngFor="let size of sizes"
        [label]="'Open regular ' + size + ' dialog'"
        (handleClick)="openDialog(size)"
      />
    </fudis-grid>
    <fudis-hr class="fudis-my-xl" />
    <fudis-grid [columns]="'repeat(3,auto)'" [width]="'sm'">
      <fudis-heading>Form Dialogs</fudis-heading>
      <fudis-button
        *ngFor="let size of sizes"
        [label]="'Open form ' + size + ' dialog'"
        (handleClick)="openDialogWithForm(size)"
      />
    </fudis-grid>

    <ng-template #exampleDialogTemplate>
      <fudis-dialog [size]="_size">
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'"
          >This dialog size is {{ _size }}</fudis-heading
        >
        <fudis-dialog-content>
          <fudis-body-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
            vehicula ut massa non facilisis. Aliquam vehicula risus vitae ex condimentum, sed
            efficitur neque scelerisque.
          </fudis-body-text>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>
  `,
})
class DialogSizeExampleComponent {
  constructor(private _dialogService: FudisDialogService) {}

  protected _size: FudisDialogSize;

  sizes: FudisDialogSize[] = ['xs', 'md', 'md', 'lg', 'xl'];

  @ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

  openDialog(size: FudisDialogSize): void {
    this._size = size;
    this._dialogService.open(this.templateRef);
  }

  openDialogWithForm(size: FudisDialogSize): void {
    this._dialogService.open(DialogWithFormComponent, { data: { size: size } });
  }
}

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [],
      declarations: [
        DialogWithGridComponent,
        DialogWithFormComponent,
        NestedDialogsComponent,
        DialogLaucherComponent,
        NestedDialogComponent,
        DialogSizeExampleComponent,
      ],
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

const TemplateGrid: StoryFn<DialogComponent> = (args: DialogComponent) => ({
  props: args,
  template: html` <fudis-dialog-with-grid [size]="size"></fudis-dialog-with-grid> `,
});

const TemplateFrom: StoryFn<DialogComponent> = (args: DialogComponent) => ({
  props: args,
  template: html` <fudis-dialog-laucher [size]="size"></fudis-dialog-laucher> `,
});

const TemplateNested: StoryFn<DialogComponent> = (args: DialogComponent) => ({
  props: args,
  template: html` <fudis-nested-dialogs [size]="size"></fudis-nested-dialogs> `,
});

const TemplateSize: StoryFn<DialogComponent> = (args: DialogComponent) => ({
  props: args,
  template: html` <fudis-dialog-size-example></fudis-dialog-size-example> `,
});

export const ExampleWithForm = TemplateFrom.bind({});
ExampleWithForm.args = {
  size: 'md',
};

export const ExampleWithGrid = TemplateGrid.bind({});
ExampleWithGrid.args = {
  size: 'md',
};

export const ExampleWithNestedDialogs = TemplateNested.bind({});
ExampleWithNestedDialogs.args = {
  size: 'sm',
};
export const ExampleWithDialogSizes = TemplateSize.bind({});
