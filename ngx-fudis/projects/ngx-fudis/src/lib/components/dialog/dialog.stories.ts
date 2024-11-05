import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import docs from './dialog.mdx';
import { dialogExclude } from '../../utilities/storybook';
import { DialogComponent } from './dialog.component';
import { ExampleDialogLaucherComponent } from './examples/example-dialog-launcher.component';
import { ExampleDialogFormComponent } from './examples/example-dialog-form.component';
import { ExampleDialogWithGridComponent } from './examples/example-dialog-grid.component';
import { ExampleNestedDialogsComponent } from './examples/example-nested-dialogs';
import { ExampleDialogSizeComponent } from './examples/example-dialog-size.component';

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ExampleDialogLaucherComponent,
        ExampleDialogFormComponent,
        ExampleDialogWithGridComponent,
        ExampleNestedDialogsComponent,
        ExampleDialogSizeComponent,
      ],
      providers: [],
      declarations: [],
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

const TemplateFrom: StoryFn = (args) => ({
  props: args,
  template: html` <example-dialog-laucher [size]="size"></example-dialog-laucher> `,
});

const TemplateGrid: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-dialog-with-grid [size]="size"></fudis-dialog-with-grid> `,
});

export const ExampleWithGrid = TemplateGrid.bind({});
ExampleWithGrid.args = {
  size: 'md',
};

export const ExampleWithForm = TemplateFrom.bind({});
ExampleWithForm.args = {
  size: 'md',
};

const TemplateNested: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-nested-dialogs [size]="size"></fudis-nested-dialogs> `,
});

export const ExampleWithNestedDialogs = TemplateNested.bind({});
ExampleWithNestedDialogs.args = {
  size: 'sm',
};

const TemplateSize: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-dialog-size></fudis-dialog-size> `,
});

export const ExampleWithDialogSizes = TemplateSize.bind({});
