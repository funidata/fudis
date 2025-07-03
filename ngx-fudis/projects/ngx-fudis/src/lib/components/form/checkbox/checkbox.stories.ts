import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { CommonModule } from '@angular/common';
import { checkboxControlsExclude } from '../../../utilities/storybook';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Form/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, CommonModule],
    }),
  ],
  parameters: {
    controls: { exclude: checkboxControlsExclude },
  },
} as Meta;

const html = String.raw;

const CheckboxControlTemplate: StoryFn = (args) => ({
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
        [required]="required"
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

const CheckboxTemplate: StoryFn = (args) => ({
  ...args,
  props: {
    checkedChange: action('Checkbox toggled'),
  },
  template: html`
    <fudis-checkbox
      [label]="'I am single checkbox'"
      [checked]="checked"
      [disabled]="disabled"
      [invalid]="invalid"
      [required]="required"
      (checkedChange)="checkedChange($event)"
    >
    </fudis-checkbox>
  `,
});

export const Example = CheckboxTemplate.bind({});

Example.args = {
  checked: false,
  disabled: true,
  invalid: false,
  required: true,
  checkedChange: action('Checkbox toggled'),
};

export const controlChecboxWithFormControl = CheckboxControlTemplate.bind({});

controlChecboxWithFormControl.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
