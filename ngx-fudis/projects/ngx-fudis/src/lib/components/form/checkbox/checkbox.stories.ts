import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { checkboxGroupControlsExclude } from '../../../utilities/storybook';

export default {
  title: 'Components/Form/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
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
      <fudis-checkbox [label]="'Yes, I accept terms.'" [control]="myFormGroup.get('required')">
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

const CheckboxStates: StoryFn = (args) => ({
  props: {
    ...args,
    myFormGroup: new FormGroup({
      invalidOption: new FormControl<boolean | null>(null, FudisValidators.required('Required')),
      focusedOption: new FormControl<boolean | null>(null, FudisValidators.required('Required')),
      validOption: new FormControl<boolean | null>(true),
      disabledOption: new FormControl<boolean | null>({ value: true, disabled: true }),
    }),
  },
  template: html`
    <form [formGroup]="myFormGroup" style="display: flex; flex-direction: column;">
      <fudis-checkbox
        [label]="'Option'"
        [control]="myFormGroup.get('invalidOption')"
      ></fudis-checkbox>
      <fudis-checkbox
        [label]="'Option'"
        [control]="myFormGroup.get('focusedOption')"
      ></fudis-checkbox>
      <fudis-checkbox
        [label]="'Option'"
        [control]="myFormGroup.get('validOption')"
      ></fudis-checkbox>
      <fudis-checkbox
        [label]="'Option'"
        [control]="myFormGroup.get('disabledOption')"
      ></fudis-checkbox>
    </form>
  `,
});

export const AllStates = CheckboxStates.bind({});

AllStates.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
