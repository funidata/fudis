import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import docs from './radio-button-group.mdx';
import { FudisValidators } from '../../../utilities/form/validators';
import { action } from 'storybook/actions';
import { radioButtonGroupControlsExclude } from '../../../utilities/storybook';

const html = String.raw;

const fruitOptions: FudisRadioButtonOption<object>[] = [
  { value: 'apple', label: 'Apple' },
  {
    value: 'fair-trade-banana',
    label: 'Fair Trade Banana',
  },
  { value: 'cherry', label: 'Cherry' },
];

const control: FormControl = new FormControl(
  null,
  FudisValidators.required('You must choose a fruit'),
);

const ExampleTestTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    formControl: control,
    handleChange: action('handleChange'),
    fruitOptions,
  },
  template: html`<fudis-radio-button-group
    [size]="size"
    [control]="formControl"
    [label]="label"
    [helpText]="helpText"
    [initialFocus]="initialFocus"
    [popoverText]="popoverText"
    [popoverPosition]="popoverPosition"
    [popoverTriggerLabel]="popoverTriggerLabel"
    (handleChange)="handleChange($event)"
  >
    <fudis-radio-button
      *ngFor="let option of fruitOptions"
      [label]="option.label"
      [value]="option.value"
    >
    </fudis-radio-button>
  </fudis-radio-button-group>`,
});

export const Example = ExampleTestTemplate.bind({});
Example.args = {
  label: 'Choose your preferred fruit',
  helpText: 'Fruits are important for your health.',
  size: 'lg',
  initialFocus: false,
  popoverText: 'Fair Trade Banana is right choise',
  popoverTriggerLabel: 'Additional information',
  popoverPosition: 'right',
};

@Component({
  selector: 'disabled-radio-group-example',
  template: `
    <fudis-radio-button-group
      [label]="'Choose a pet'"
      [helpText]="'We all should have a pet.'"
      [control]="control"
      (handleChange)="handleChange($event)"
      >
      @for (option of petOptions; track option) {
        <fudis-radio-button
          [label]="option.label"
          [value]="option.value"
        ></fudis-radio-button>
      }
    </fudis-radio-button-group>
    `,
  standalone: false,
})
class DisabledRadioGroupExampleComponent {
  petOptions: FudisRadioButtonOption<object>[] = [
    { value: 'platypus', label: 'Platypus' },
    {
      value: 'otter',
      label: 'Otter with powerful webbed feet and seal-like ability for holding breath underwater',
    },
    { value: 'capybara', label: 'Capybara' },
  ];

  control: FormControl = new FormControl(
    { value: null, disabled: true },
    FudisValidators.required('You must choose a pet.'),
  );
}

const Disabled: StoryFn = (args) => ({
  props: args,
  template: html`<disabled-radio-group-example></disabled-radio-group-example> `,
});

export default {
  title: 'Components/Form/Radio Button Group',
  component: RadioButtonGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [DisabledRadioGroupExampleComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: radioButtonGroupControlsExclude,
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'full-width'],
      control: { type: 'radio' },
    },
    popoverPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    popoverText: {
      control: { type: 'text' },
    },
    popoverTriggerLabel: {
      control: { type: 'text' },
    },
  },
} as Meta;

export const ExampleWithDisabledOptions = Disabled.bind({});
ExampleWithDisabledOptions.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
