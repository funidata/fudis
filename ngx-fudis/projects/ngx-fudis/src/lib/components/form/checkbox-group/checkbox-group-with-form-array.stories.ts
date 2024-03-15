import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { checkboxGroupControlsExclude } from '../../../utilities/storybook';

export default {
  title: 'Components/Form/Checkbox Group/With Form Array',
  component: CheckboxGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      autodocs: false,
    },
    controls: { exclude: checkboxGroupControlsExclude },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const options = [
  { controlName: 'apple', label: 'Apple' },
  { controlName: 'fairTradeBanana', label: 'Fair trade banana' },
  { controlName: 'pear', label: 'Pear' },
  { controlName: 'pineapple', label: 'Pineapple' },
  { controlName: 'orange', label: 'Orange' },
];

const basicFormArray = new FormArray<FormControl<boolean | null | undefined>>(
  [
    new FormControl<boolean | null | undefined>(null),
    new FormControl<boolean | null | undefined>(null),
    new FormControl<boolean | null | undefined>(null),
    new FormControl<boolean | null | undefined>(null),
    new FormControl<boolean | null | undefined>(null),
  ],

  [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('No fruit picked! :('))],
);

const ExampleTemplate: StoryFn<CheckboxGroupComponent> = (args: CheckboxGroupComponent) => ({
  props: {
    ...args,
    formArray: basicFormArray,
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formArray]="formArray"
    [title]="title"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-checkbox
      *ngFor="let option of options; index as i"
      [controlIndex]="i"
      [label]="option.label"
    ></fudis-checkbox>
  </fudis-checkbox-group>`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  title: 'Choose your preferred fruits',
  helpText: 'Pick at least one fruit.',
  size: 'lg',
  tooltip: 'Fruit sugar is great in small doces!',
  tooltipToggle: false,
  tooltipPosition: 'right',
};

const withDisabledFormArrayOptions = new FormArray<FormControl<boolean | null | undefined>>(
  [
    new FormControl<boolean | null | undefined>({ value: true, disabled: true }),
    new FormControl<boolean | null | undefined | null>(null),
    new FormControl<boolean | null | undefined | null>({ value: false, disabled: true }),
    new FormControl<boolean | null | undefined | null>(null),
    new FormControl<boolean | null | undefined | null>({ value: null, disabled: true }),
  ],
  [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('Please pick one! :('))],
);

const ExampleWithDisabledTemplate: StoryFn<CheckboxGroupComponent> = (
  args: CheckboxGroupComponent,
) => ({
  props: {
    ...args,
    formArray: withDisabledFormArrayOptions,
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formArray]="formArray"
    [title]="title"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-checkbox
      *ngFor="let option of options; index as i"
      [controlIndex]="i"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
});

export const ExampleWithDisabledOption = ExampleWithDisabledTemplate.bind({});
ExampleWithDisabledOption.args = {
  title: 'Choose your preferred fruits',
  helpText: 'Some options are disabled and cannot be toggled.',
  size: 'lg',
  tooltip: 'Fruit sugar is great in small doces!',
  tooltipToggle: false,
  tooltipPosition: 'right',
};

const withMinMaxFormArrayOptions = new FormArray<FormControl<boolean | null | undefined>>(
  [
    new FormControl<boolean | null | undefined>(null),
    new FormControl<boolean | null | undefined | null>(null),
    new FormControl<boolean | null | undefined | null>(null),
    new FormControl<boolean | null | undefined | null>(null),
    new FormControl<boolean | null | undefined | null>(null),
  ],
  [
    FudisGroupValidators.min({
      value: 2,
      message: new BehaviorSubject('Not enough fruits picked'),
    }),
    FudisGroupValidators.max({
      value: 3,
      message: new BehaviorSubject('Too many fruits selected!'),
    }),
  ],
);

const ExampleWithMinMaxTemplate: StoryFn<CheckboxGroupComponent> = (
  args: CheckboxGroupComponent,
) => ({
  props: {
    ...args,
    formArray: withMinMaxFormArrayOptions,
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formArray]="formArray"
    [title]="title"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-checkbox
      *ngFor="let option of options; index as i"
      [controlIndex]="i"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
});

export const ExampleWithMinMax = ExampleWithMinMaxTemplate.bind({});
ExampleWithMinMax.args = {
  title: 'Choose your preferred fruits',
  helpText: 'Pick two to three fruits.',
  size: 'lg',
  tooltip: 'Fruit sugar is great in small doces!',
  tooltipToggle: false,
  tooltipPosition: 'right',
};
