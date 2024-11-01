import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { FudisValidators } from '../../../utilities/form/validators';
import readme from './readme.mdx';
import { textInputControlsExclude } from '../../../utilities/storybook';
import { fudisInputSizeArray } from '../../../types/forms';

const html = String.raw;

export default {
  title: 'Components/Form/Text Area',
  component: TextAreaComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: textInputControlsExclude,
    },
  },
  argTypes: {
    size: { options: fudisInputSizeArray },
    helpText: { control: 'text' },
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
} as Meta;

const commonArgs: Partial<TextAreaComponent> = {
  label: 'Text Area label example',
  helpText: 'Example help text',
  size: 'lg',
  initialFocus: false,
  tooltip: '',
  tooltipPosition: 'left',
  tooltipToggle: false,
};

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl(null),
  },
  template: html`
    <fudis-text-area
      [label]="label"
      [size]="size"
      [control]="control"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    >
    </fudis-text-area>
  `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  ...commonArgs,
};

const DisabledTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl({ value: null, disabled: true }),
  },
  template: html`
    <fudis-text-area
      [label]="label"
      [size]="size"
      [control]="control"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    >
    </fudis-text-area>
  `,
});

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  ...commonArgs,
};

const WithValidatorsTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl('', [
      FudisValidators.minLength(
        5,
        `Too short input. Minimum length is 5 and maximum length is 20.`,
      ),
      FudisValidators.maxLength(20, 'Too long input'),
      FudisValidators.required('Missing a value.'),
    ]),
  },
  template: html`
    <fudis-text-area
      [label]="label"
      [size]="size"
      [control]="control"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    >
    </fudis-text-area>
  `,
});
export const WithValidators = WithValidatorsTemplate.bind({});
WithValidators.args = {
  ...commonArgs,
  label: 'Text Area with max and min character length',
  helpText: 'Maximum of 20 characters allowed',
  tooltip: 'Additional info: 5 characters minimum',
};
