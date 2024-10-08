import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import docs from './form.docs.mdx';
import { fudisHeadingLevelArray } from '../../../types/typography';
import { formExclude } from '../../../utilities/storybook';
import { fudisSpacingArray } from '../../../types/spacing';
import { StorybookExampleFormComponent } from './examples/form-example.component';
import { StorybookExampleWithMultipleFormsComponent } from './examples/form-example-with-multiple-forms.component';
import { StorybookExampleDynamicValidatorsComponent } from './examples/form-example-with-dynamic-validators.component';

export default {
  title: 'Components/Form/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        StorybookExampleDynamicValidatorsComponent,
        StorybookExampleFormComponent,
        StorybookExampleWithMultipleFormsComponent,
        ReactiveFormsModule,
        RouterModule,
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    badge: {
      options: ['accent', 'danger', 'primary', 'secondary', 'success'],
      control: {
        type: 'select',
      },
    },
    badgeText: {
      control: {
        type: 'text',
      },
    },
    titleVariant: {
      options: fudisSpacingArray,
      control: {
        type: 'select',
      },
    },
    level: {
      options: fudisHeadingLevelArray,
      control: {
        type: 'select',
      },
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn<FormComponent> = (args: FormComponent) => ({
  props: args,
  template: html` <example-form-content
    [title]="title"
    [titleVariant]="titleVariant"
    [level]="level"
    [helpText]="helpText"
    [badge]="badge"
    [badgeText]="badgeText"
    [errorSummaryHelpText]="errorSummaryHelpText"
    [errorSummaryVisible]="errorSummaryVisible"
  />`,
});

Example.args = {
  title: 'Example Form Heading',
  titleVariant: 'xl',
  level: 1,
  helpText: 'This is an additional help text to give user more information about the form',
  badge: 'primary',
  badgeText: 'Example',
  errorSummaryHelpText:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryVisible: false,
};

Example.parameters = {
  controls: {
    exclude: formExclude,
  },
};

export const ExampleWithMultipleForms: StoryFn<FormComponent> = (args: FormComponent) => ({
  props: args,
  template: html` <example-with-multiple-forms />`,
});

ExampleWithMultipleForms.parameters = {
  controls: {
    exclude: /.*/g,
  },
};

export const ExampleWithDynamicValidators: StoryFn<FormComponent> = (args: FormComponent) => ({
  props: args,
  template: html` <example-dynamic-validator
    [title]="title"
    [helpText]="helpText"
    [titleVariant]="titleVariant"
    [level]="level"
    [errorSummaryHelpText]="errorSummaryHelpText"
    [errorSummaryVisible]="errorSummaryVisible"
    [badge]="badge"
    [badgeText]="badgeText"
  />`,
});

ExampleWithDynamicValidators.args = {
  title: 'Example With Dynamic Validators',
  helpText:
    "This example page is used to test, that when validators are added or removed from the FormControls, components' HTML attributes such as 'required' and max/min length are updated correctly.",
  titleVariant: 'xl',
  level: 1,
  errorSummaryHelpText:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryVisible: false,
  badge: null,
  badgeText: '',
};

ExampleWithDynamicValidators.parameters = {
  controls: {
    exclude: formExclude,
  },
};
