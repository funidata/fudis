import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FudisCheckboxGroupFormGroup } from '../../../types/forms';
import docs from './checkbox-group.docs.mdx';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { checkboxGroupControlsExclude } from '../../../utilities/storybook';

export default {
  title: 'Components/Form/Checkbox Group',
  component: CheckboxGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
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
  {
    controlName: 'apple',
    label: 'Apple',
    control: new FormControl<boolean | null | undefined>(null),
  },
  {
    controlName: 'fairTradeBanana',
    label: 'Fair trade banana',
    control: new FormControl<boolean | null | undefined>(null),
  },
  {
    controlName: 'pear',
    label: 'Pear',
    control: new FormControl<boolean | null | undefined>(null),
  },
  {
    controlName: 'pineapple',
    label: 'Pineapple',
    control: new FormControl<boolean | null | undefined>(null),
  },
  {
    controlName: 'orange',
    label: 'Orange',
    control: new FormControl<boolean | null | undefined>(null),
  },
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
    checkboxChange: action('checkboxChange'),
    groupChange: action('groupChange'),
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formGroup]="formGroup"
    [label]="label"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
    (handleChange)="groupChange($event)"
  >
    <fudis-checkbox
      *ngFor="let option of options"
      (handleChange)="checkboxChange($event)"
      [controlName]="option.controlName"
      [label]="option.label"
    ></fudis-checkbox>
  </fudis-checkbox-group>`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  label: 'Choose your preferred fruits',
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
    checkboxChange: action('checkboxChange'),
    groupChange: action('groupChange'),
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formGroup]="formGroup"
    [label]="label"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
    (handleChange)="groupChange($event)"
  >
    <fudis-checkbox
      *ngFor="let option of options"
      (handleChange)="checkboxChange($event)"
      [controlName]="option.controlName"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
});

export const ExampleWithDisabledOption = ExampleWithDisabledTemplate.bind({});
ExampleWithDisabledOption.args = {
  label: 'Choose your preferred fruits',
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
    checkboxChange: action('checkboxChange'),
    groupChange: action('groupChange'),
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [formGroup]="formGroup"
    [label]="label"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
    (handleChange)="groupChange($event)"
  >
    <fudis-checkbox
      *ngFor="let option of options"
      (handleChange)="checkboxChange($event)"
      [controlName]="option.controlName"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
});

export const ExampleWithMinMax = ExampleWithMinMaxTemplate.bind({});
ExampleWithMinMax.args = {
  label: 'Choose your preferred fruits',
  helpText: 'Pick two to three fruits.',
  size: 'lg',
  tooltip: 'Fruit sugar is great in small doces!',
  tooltipToggle: false,
  tooltipPosition: 'right',
};

const ExampleWithoutFormGroupTemplate: StoryFn<CheckboxGroupComponent> = (
  args: CheckboxGroupComponent,
) => ({
  props: {
    ...args,
    checkboxChange: action('checkboxChange'),
    groupChange: action('groupChange'),
    options,
  },
  template: html`<fudis-checkbox-group
    [size]="size"
    [label]="label"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
    (handleChange)="groupChange($event)"
  >
    <fudis-checkbox
      *ngFor="let option of options"
      (handleChange)="checkboxChange($event)"
      [control]="option.control"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
});

export const ExampleWithoutFormGroup = ExampleWithoutFormGroupTemplate.bind({});
ExampleWithoutFormGroup.args = {
  label: 'Choose your preferred fruits',
  helpText: 'This Checkbox Group has no App provided FormGroup.',
  size: 'lg',
  tooltip: 'Fruit sugar is great in small doces!',
  tooltipToggle: false,
  tooltipPosition: 'right',
};
