import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FudisCheckboxGroupFormGroup } from '../../../types/forms';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { checkboxGroupControlsExclude } from '../../../utilities/storybook';

export default {
  title: 'Components/Form/Checkbox Group/With Form Group',
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

const basicFormGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
  {
    apple: new FormControl<boolean | null | undefined>(null),
    fairTradeBanana: new FormControl<boolean | null | undefined>(null),
    pear: new FormControl<boolean | null | undefined>(null),
    pineapple: new FormControl<boolean | null | undefined>(null),
    orange: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('No fruit picked! :('))],
);

const ExampleTemplate: StoryFn<CheckboxGroupComponent> = (args: CheckboxGroupComponent) => ({
  props: {
    ...args,
    formGroup: basicFormGroup,
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formGroup]="formGroup"
    [title]="title"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-checkbox
      *ngFor="let option of options"
      [controlName]="option.controlName"
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

const withDisabledFormGroupOptions = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
  {
    apple: new FormControl<boolean | null | undefined>({ value: true, disabled: true }),
    fairTradeBanana: new FormControl<boolean | null | undefined | null>(null),
    pear: new FormControl<boolean | null | undefined | null>({ value: false, disabled: true }),
    pineapple: new FormControl<boolean | null | undefined | null>(null),
    orange: new FormControl<boolean | null | undefined | null>({ value: null, disabled: true }),
  },
  [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('Please pick one! :('))],
);

const ExampleWithDisabledTemplate: StoryFn<CheckboxGroupComponent> = (
  args: CheckboxGroupComponent,
) => ({
  props: {
    ...args,
    formGroup: withDisabledFormGroupOptions,
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formGroup]="formGroup"
    [title]="title"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-checkbox
      *ngFor="let option of options"
      [controlName]="option.controlName"
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

const withMinMaxFormGroupOptions = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
  {
    apple: new FormControl<boolean | null | undefined>(null),
    fairTradeBanana: new FormControl<boolean | null | undefined | null>(null),
    pear: new FormControl<boolean | null | undefined | null>(null),
    pineapple: new FormControl<boolean | null | undefined | null>(null),
    orange: new FormControl<boolean | null | undefined | null>(null),
  },
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
    formGroup: withMinMaxFormGroupOptions,
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formGroup]="formGroup"
    [title]="title"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-checkbox
      *ngFor="let option of options"
      [controlName]="option.controlName"
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
