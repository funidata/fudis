import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular-vite';
import { fudisInputSizeArray, FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import docs from './radio-button-group.mdx';
import { FudisValidators } from '../../../utilities/form/validators';
import { action } from 'storybook/actions';
import { radioButtonGroupControlsExclude } from '../../../utilities/storybook';
import { RadioButtonComponent } from './radio-button/radio-button.component';

const html = String.raw;

const studyFormatOptions: FudisRadioButtonOption<object>[] = [
  { value: 'on-campus', label: 'On campus' },
  {
    value: 'online',
    label: 'Online',
  },
  { value: 'hybrid', label: 'Hybrid' },
];

const control: FormControl = new FormControl(
  null,
  FudisValidators.required('Select a study format.'),
);

const ExampleTestTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    formControl: control,
    handleChange: action('handleChange'),
    studyFormatOptions,
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
    @for (option of studyFormatOptions; track option.value) {
    <fudis-radio-button [label]="option.label" [value]="option.value" />
    }
  </fudis-radio-button-group>`,
});

export const Example = ExampleTestTemplate.bind({});
Example.args = {
  label: 'Choose your study format',
  helpText: 'Select the format that suits your study plan.',
  size: 'lg',
  initialFocus: false,
  popoverText: 'Hybrid courses combine campus sessions with online work.',
  popoverTriggerLabel: 'Additional information',
  popoverPosition: 'right',
};

@Component({
  selector: 'disabled-radio-group-example',
  imports: [RadioButtonGroupComponent, RadioButtonComponent],
  template: `
    <fudis-radio-button-group
      [label]="'Preferred contact method'"
      [helpText]="'Select the contact method we should use for study-related matters.'"
      [control]="control"
      (handleChange)="handleChange($event)"
    >
      @for (option of contactMethodOptions; track option.value) {
        <fudis-radio-button [label]="option.label" [value]="option.value"></fudis-radio-button>
      }
    </fudis-radio-button-group>
  `,
})
class DisabledRadioGroupExampleComponent {
  contactMethodOptions: FudisRadioButtonOption<object>[] = [
    { value: 'email', label: 'Email' },
    {
      value: 'text-message',
      label: 'Text message',
    },
    { value: 'phone-call', label: 'Phone call' },
  ];

  control: FormControl = new FormControl(
    { value: null, disabled: true },
    FudisValidators.required('Select a contact method.'),
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
      imports: [DisabledRadioGroupExampleComponent],
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
      options: fudisInputSizeArray,
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
