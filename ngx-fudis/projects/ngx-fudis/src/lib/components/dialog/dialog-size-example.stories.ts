import { Component, TemplateRef, ViewChild } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import docs from './dialog.mdx';
import { dialogExclude } from '../../utilities/storybook';
import { DialogComponent } from './dialog.component';
import { FudisDialogSize } from '../../types/miscellaneous';
import { ExampleDialogFormComponent } from './examples/example-dialog-form.component';
import { ExampleDialogLaucherComponent } from './examples/example-dialog-launcher.component';

@Component({
  selector: 'fudis-dialog-size',
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
    this._dialogService.open(ExampleDialogFormComponent, { data: { size: size } });
  }
}

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ExampleDialogFormComponent,
        ExampleDialogLaucherComponent,
      ],
      providers: [],
      declarations: [DialogSizeExampleComponent],
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

const TemplateSize: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-dialog-size></fudis-dialog-size> `,
});

export const ExampleWithDialogSizes = TemplateSize.bind({});
