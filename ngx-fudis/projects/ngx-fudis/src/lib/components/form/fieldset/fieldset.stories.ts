import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BehaviorSubject } from 'rxjs';
import {
  FudisSelectOption,
  FudisRadioButtonOption,
  // FudisDateRangeItem,
} from '../../../types/forms';
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
      <ng-template fudisHeader [type]="'fieldset'">
        <fudis-notification
          ><fudis-body-text>This is notification</fudis-body-text></fudis-notification
        >
      </ng-template>
      <ng-template fudisContent [type]="'fieldset'">
        <fudis-grid [columns]="{ md: 2 }">
          <!-- <fudis-input-with-language-options
            [options]="languageOptions"
            [formGroup]="fieldsetExample.controls['name']"
            [label]="'Course name'"
            [helpText]="'Some name would be nice. Provide course name in at least one language.'"
          />
          <fudis-input-with-language-options
            [variant]="'text-area'"
            [options]="languageOptions"
            [formGroup]="fieldsetExample.controls['description']"
            [label]="'Course description'"
            [helpText]="
              'So that students know what they are getting into. Provide description in all languages.'
            "
          /> -->
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
          <!-- <fudis-radio-button-group
            [label]="'Course type'"
            [options]="courseTypeOptions"
            [control]="fieldsetExample.controls['courseType']"
          /> -->
          <!-- <fudis-date-range [startDate]="startDate" [endDate]="endDate" /> -->
        </fudis-grid>
      </ng-template>
    </fudis-fieldset>
  `,
})
class FieldsetExampleComponent {
  fieldsetExample = new FormGroup({
    // Expose when InputWithLanguageOptions is exposed to public API
    // name: new FormGroup(
    //   {
    //     finnish: new FormControl(''),
    //     swedish: new FormControl(''),
    //     english: new FormControl(''),
    //   },
    //   [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('Course name is missing'))],
    // ),
    // description: new FormGroup({
    //   finnish: new FormControl('', [
    //     FudisValidators.required('Missing description in Finnish.'),
    //     FudisValidators.minLength(10, 'Description should at least 10 characters.'),
    //   ]),
    //   swedish: new FormControl('', [
    //     FudisValidators.required('Missing description in Swedish.'),
    //     FudisValidators.minLength(10, 'Description should at least 10 characters.'),
    //   ]),
    //   english: new FormControl('', [
    //     FudisValidators.required('Missing description in English.'),
    //     FudisValidators.minLength(10, 'Description should at least 10 characters.'),
    //   ]),
    // }),
    teacher: new FormControl(
      '',
      FudisValidators.required("Missing teacher's name who is responsible for this course."),
    ),
    email: new FormControl('', [
      FudisValidators.required('Missing email contact.'),
      FudisValidators.email('Input must be an email address.'),
      FudisValidators.minLength(5, 'Email should be at least 5 characters.'),
    ]),
    // startDate: new FormControl<Date | null>(
    //   null,
    //   FudisValidators.required('Start date is missing.'),
    // ),
    // endDate: new FormControl<Date | null>(null, FudisValidators.required('End date is missing.')),
    courseType: new FormControl('', FudisValidators.required('Course type must be selected.')),
  });

  // Expose when DateRange is exposed to public API
  // startDate: FudisDateRangeItem = {
  //   control: this.fieldsetExample.controls.startDate,
  //   label: 'Start date',
  // };

  // endDate: FudisDateRangeItem = {
  //   control: this.fieldsetExample.controls.endDate,
  //   label: 'End date',
  // };

  languageOptions: FudisSelectOption<object>[] = [
    { value: 'finnish', label: 'FI' },
    { value: 'swedish', label: 'SV' },
    { value: 'english', label: 'EN' },
  ];

  courseTypeOptions: FudisRadioButtonOption[] = [
    { value: 'basic', label: 'Basic', id: 'courseType-1' },
    { value: 'advanced', label: 'Advanced', id: 'courseType-2' },
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
