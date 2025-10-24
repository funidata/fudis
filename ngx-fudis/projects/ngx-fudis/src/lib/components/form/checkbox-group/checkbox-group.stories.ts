import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { BehaviorSubject } from 'rxjs';
import { CheckboxGroupComponent } from './checkbox-group.component';
import docs from './checkbox-group.mdx';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { checkboxGroupControlsExclude } from '../../../utilities/storybook';

export default {
  title: 'Components/Form/Checkbox Group',
  component: CheckboxGroupComponent,
  decorators: [
    moduleMetadata({
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

const html = String.raw;

const options = [
  {
    controlName: 'email',
    label: 'Email',
    control: new FormControl<boolean | null>(null),
  },
  {
    controlName: 'sms',
    label: 'SMS',
    control: new FormControl<boolean | null>(null),
  },
  {
    controlName: 'phoneCall',
    label: 'Phone call',
    control: new FormControl<boolean | null>(null),
  },
  {
    controlName: 'universityAppNotification',
    label: 'University app notification',
    control: new FormControl<boolean | null>(null),
  },
  {
    controlName: 'paperMail',
    label: 'Paper mail',
    control: new FormControl<boolean | null>(null),
  },
];

const basicFormGroup = new FormGroup(
  {
    email: new FormControl<boolean | null>(null),
    sms: new FormControl<boolean | null>(null),
    phoneCall: new FormControl<boolean | null>(null),
    universityAppNotification: new FormControl<boolean | null>(null),
    paperMail: new FormControl<boolean | null>(null),
  },
  [
    FudisGroupValidators.oneRequired(
      new BehaviorSubject('You need to choose at least one contact method.'),
    ),
  ],
);

const ExampleTemplate: StoryFn = (args) => ({
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
    [popoverText]="popoverText"
    [popoverPosition]="popoverPosition"
    [popoverTriggerLabel]="popoverTriggerLabel"
    [initialFocus]="initialFocus"
    (handleChange)="groupChange($event)"
  >
    <fudis-checkbox-group-option
      *ngFor="let option of options"
      (handleChange)="checkboxChange($event)"
      [controlName]="option.controlName"
      [label]="option.label"
    ></fudis-checkbox-group-option>
  </fudis-checkbox-group>`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  label: 'Preferred contact method',
  helpText: 'Pick at least one contact method.',
  size: 'lg',
  initialFocus: false,
  popoverText: 'We do not recommend paper mail due to its environmental strain.',
  popoverTriggerLabel: 'Additional information',
  popoverPosition: 'right',
};

const withDisabledFormGroupOptions = new FormGroup(
  {
    email: new FormControl<boolean | null>({ value: true, disabled: true }),
    sms: new FormControl<boolean | null | null>(null),
    phoneCall: new FormControl<boolean | null | null>({ value: false, disabled: true }),
    universityAppNotification: new FormControl<boolean | null | null>(null),
    paperMail: new FormControl<boolean | null | null>({ value: null, disabled: true }),
  },
  [
    FudisGroupValidators.oneRequired(
      new BehaviorSubject('You need to choose at least one contact method.'),
    ),
  ],
);

const ExampleWithDisabledTemplate: StoryFn = (args) => ({
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
    [popoverText]="popoverText"
    [popoverPosition]="popoverPosition"
    [popoverTriggerLabel]="popoverTriggerLabel"
    [initialFocus]="initialFocus"
    (handleChange)="groupChange($event)"
  >
    <fudis-checkbox-group-option
      *ngFor="let option of options"
      (handleChange)="checkboxChange($event)"
      [controlName]="option.controlName"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
});

export const ExampleWithDisabledOption = ExampleWithDisabledTemplate.bind({});
ExampleWithDisabledOption.args = {
  label: 'Preferred contact method',
  helpText: 'Obligatory contact method is email.',
  size: 'lg',
  initialFocus: false,
  popoverText: 'Some options are disabled due to university policies.',
  popoverTriggerLabel: 'Additional information',
  popoverPosition: 'right',
};

const withMinMaxFormGroupOptions = new FormGroup(
  {
    email: new FormControl<boolean | null>(null),
    sms: new FormControl<boolean | null | null>(null),
    phoneCall: new FormControl<boolean | null | null>(null),
    universityAppNotification: new FormControl<boolean | null | null>(null),
    paperMail: new FormControl<boolean | null | null>(null),
  },
  [
    FudisGroupValidators.min({
      value: 2,
      message: new BehaviorSubject('Not enough methods chosen.'),
    }),
    FudisGroupValidators.max({
      value: 3,
      message: new BehaviorSubject('Too many methods chosen.'),
    }),
  ],
);

const ExampleWithMinMaxTemplate: StoryFn = (args) => ({
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
    [popoverText]="popoverText"
    [popoverPosition]="popoverPosition"
    [popoverTriggerLabel]="popoverTriggerLabel"
    [initialFocus]="initialFocus"
    (handleChange)="groupChange($event)"
  >
    <fudis-checkbox-group-option
      *ngFor="let option of options"
      (handleChange)="checkboxChange($event)"
      [controlName]="option.controlName"
      [label]="option.label"
    />
  </fudis-checkbox-group>`,
});

export const ExampleWithMinMax = ExampleWithMinMaxTemplate.bind({});
ExampleWithMinMax.args = {
  label: 'Preferred contact method',
  helpText: 'Pick two to three contact methods.',
  size: 'lg',
  initialFocus: false,
  popoverText: 'You should have at least two contact methods in case one fails.',
  popoverTriggerLabel: 'Additional information',
  popoverPosition: 'right',
};
