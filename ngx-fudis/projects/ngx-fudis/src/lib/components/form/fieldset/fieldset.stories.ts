import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FudisRadioButtonOption } from '../../../types/forms';
import { FieldSetComponent } from './fieldset.component';
import { FudisValidators } from '../../../utilities/form/validators';
import readme from './readme.mdx';
import { excludeAllRegex } from '../../../utilities/storybook';

@Component({
  selector: 'example-fieldset',
  template: `
    <fudis-fieldset
      [width]="'md'"
      [label]="'Example Fieldset Title'"
      [helpText]="'Helptext for the fieldset'"
      [align]="'center'"
      [tooltip]="'Some additional information about this fieldset'"
    >
      <fudis-fieldset-actions [align]="alignActions">
        <fudis-button
          (handleClick)="changeAlign()"
          [id]="'change-actions-align-button'"
          [variant]="'tertiary'"
          [icon]="'switch'"
          [label]="'Change Actions Align'"
        />
      </fudis-fieldset-actions>
      <fudis-fieldset-content>
        <fudis-notification
          ><fudis-body-text
            >Currently Fieldset Actions are aligned: {{ alignActions }}</fudis-body-text
          ></fudis-notification
        >
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
      </fudis-fieldset-content>
    </fudis-fieldset>
  `,
})
class FieldsetExampleComponent {
  alignActions: 'start' | 'end' | 'below';

  changeAlign(): void {
    if (this.alignActions === 'start') {
      this.alignActions = 'end';
    } else if (this.alignActions === 'end') {
      this.alignActions = 'below';
    } else {
      this.alignActions = 'start';
    }
  }

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

  courseTypeOptions: FudisRadioButtonOption<object>[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'advanced', label: 'Advanced' },
  ];
}

export default {
  title: 'Components/Form/Fieldset',
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

export const Example: StoryFn = (args) => ({
  props: args,
  template: html` <example-fieldset /> `,
});

Example.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
