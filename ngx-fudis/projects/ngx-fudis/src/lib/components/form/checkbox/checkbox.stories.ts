import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { CommonModule } from '@angular/common';
import { checkboxGroupControlsExclude } from '../../../utilities/storybook';

export default {
  title: 'Components/Form/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, CommonModule],
    }),
  ],
  parameters: {
    controls: { exclude: checkboxGroupControlsExclude },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    myFormGroup: new FormGroup({
      required: new FormControl<boolean | null>(
        null,
        FudisValidators.required('This selection is required'),
      ),
    }),
  },
  template: html`
    <form [formGroup]="myFormGroup">
      <fudis-checkbox
        [label]="'Yes, I accept terms.'"
        [control]="myFormGroup.get('required')"
      >
        <a
          fudisLink
          href="https://www.example.com"
          [title]="'Terms descriptions'"
          [external]="true"
        ></a>
      </fudis-checkbox>
    </form>
  `,
});

export const Example = ExampleTemplate.bind({});

Example.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
