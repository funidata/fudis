import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BehaviorSubject } from 'rxjs';
import { FudisSelectOption, FudisRadioButtonOption } from '../../../types/forms';
import { FieldSetComponent } from './fieldset.component';
import { FudisValidators } from '../../../utilities/form/validators';
// import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import readme from './readme.mdx';

@Component({
  selector: 'example-fieldset',
  template: `
    <fudis-fieldset
      [width]="'md'"
      [label]="'Example Field Set Title'"
      [helpText]="'Helptext for the fieldset'"
      [align]="'center'"
      [tooltip]="'Some additional information about this fieldset'"
    >
      <ng-template fudisActions [type]="'fieldset'">
        <fudis-button [variant]="'tertiary'" [icon]="'plus'" [label]="'Some action'" />
      </ng-template>
      <ng-template fudisNotifications [type]="'fieldset'">
        <fudis-notification
          ><fudis-body-text>This is notification</fudis-body-text></fudis-notification
        >
      </ng-template>
      <ng-template fudisContent [type]="'fieldset'">
        <fudis-grid [columns]="{ md: 2 }">
          <fudis-text-input
            [control]="fieldsetExample.controls['teacher']"
            [label]="'Responsible teacher'"
            [helpText]="'Someone has to be responsible for this.'"
          />
          <fudis-text-input
            [control]="fieldsetExample.controls['email']"
            [label]="'Contact email'"
            [helpText]="'So that students can ask for more time on their homework.'"
          />
          <fudis-radio-button-group
            [label]="'Course type'"
            [control]="fieldsetExample.controls['courseType']"
          >
            <fudis-radio-button
              *ngFor="let option of courseTypeOptions"
              [label]="option.label"
              [value]="option.value"
            />
          </fudis-radio-button-group>
          <fudis-date-range>
            <fudis-datepicker
              fudisDateStart
              [label]="'Start date'"
              [control]="fieldsetExample.controls.startDate"
            />
            <fudis-datepicker
              fudisDateEnd
              [label]="'End date'"
              [control]="fieldsetExample.controls.endDate"
            />
          </fudis-date-range>
        </fudis-grid>
      </ng-template>
    </fudis-fieldset>
  `,
})
class FieldsetExampleComponent {
  fieldsetExample = new FormGroup({
    teacher: new FormControl(
      '',
      FudisValidators.required("Missing teacher's name who is responsible for this course."),
    ),
    email: new FormControl('', [
      FudisValidators.required('Missing email contact.'),
      FudisValidators.email('Input must be an email address.'),
      FudisValidators.minLength(5, 'Email should be at least 5 characters.'),
    ]),
    startDate: new FormControl<Date | null>(
      null,
      FudisValidators.required('Start date is missing.'),
    ),
    endDate: new FormControl<Date | null>(null, FudisValidators.required('End date is missing.')),
    courseType: new FormControl('', FudisValidators.required('Course type must be selected.')),
  });

  languageOptions: FudisSelectOption<object>[] = [
    { value: 'finnish', label: 'FI' },
    { value: 'swedish', label: 'SV' },
    { value: 'english', label: 'EN' },
  ];

  courseTypeOptions: FudisRadioButtonOption<object>[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'advanced', label: 'Advanced' },
  ];
}

export default {
  title: 'Components/Form/Field Set',
  component: FieldSetComponent,
  decorators: [
    moduleMetadata({
      declarations: [FieldsetExampleComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn<FieldSetComponent> = (args: FieldSetComponent) => ({
  props: args,
  template: html` <example-fieldset /> `,
});

Example.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
