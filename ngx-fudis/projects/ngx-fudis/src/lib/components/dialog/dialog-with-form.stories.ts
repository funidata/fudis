import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import docs from './dialog.mdx';
import { dialogExclude } from '../../utilities/storybook';
import { DialogComponent } from './dialog.component';
import { ExampleDialogLaucherComponent } from './examples/example-dialog-launcher.component';
import { ExampleDialogFormComponent } from './examples/example-dialog-form.component';

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

export const ExampleWithForm = TemplateFrom.bind({});
ExampleWithForm.args = {
  size: 'md',
};
