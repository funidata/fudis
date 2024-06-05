import { Component, Inject, Input, TemplateRef } from '@angular/core';
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
          [title]="'Dialog with fudis-form'"
          [level]="2"
          [errorSummaryLinkType]="'onClick'"
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
              fudisFormSubmit
              [formValid]="exampleDialogFormGroup.valid"
              (handleClick)="closeDialogWithForm()"
              [label]="'Submit'"
            ></fudis-button>
            <fudis-button fudisDialogClose [label]="'Cancel'"></fudis-button>
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
        <fudis-heading fudisDialogTitle [level]="2"
          >Dialog with fudis-grid and scrollable content</fudis-heading
        >
        <fudis-dialog-content>
          <fudis-grid [marginTop]="'md'" [marginBottom]="'md'">
            <fudis-heading [level]="3" [size]="'sm'">
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
          <!-- <fudis-description-list
        [columns]="{ xs: 1, sm: 2, md: 3 }"
        [data]="[
          { key: 'Name', value: 'Mary Rhubarb', subHeading: 'The lady boss' },
          { key: 'Occupation', value: 'Pie maker' },
          { key: 'Special skill', value: 'Spicing it up' },
          {
            key: 'Awards',
            value: 'Pie maker 2023, Mix it up master 2008, Place setting champion 1987'
          }
        ]"
      ></fudis-description-list> -->
          <hr />
          <fudis-grid [columns]="{ xs: 1, sm: 2, md: 3 }" [marginTop]="'sm'" [marginBottom]="'sm'">
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

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [],
      declarations: [DialogWithGridComponent, DialogWithFormComponent, DialogLaucherComponent],
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
      options: ['sm', 'md', 'lg', 'xl', 'initial'],
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

export const ExampleWithForm = TemplateFrom.bind({});
ExampleWithForm.args = {
  size: 'md',
};

export const ExampleWithGrid = TemplateGrid.bind({});
ExampleWithForm.args = {
  size: 'md',
};
