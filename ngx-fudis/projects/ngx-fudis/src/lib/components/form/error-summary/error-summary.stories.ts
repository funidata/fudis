import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, importProvidersFrom } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { ErrorSummaryComponent } from './error-summary.component';
import docs from './error-summary-component.docs.mdx';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FudisFormErrorSummaryUpdateStrategy, FudisRadioButtonOption } from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { excludeAllRegex } from '../../../utilities/storybook';

@Component({
  selector: 'example-error-summary',
  template: ` <fudis-form
    class="fudis-mt-xl"
    [align]="'center'"
    [level]="1"
    [title]="'Example Form with Error Summary'"
    [id]="id"
    [errorSummaryHelpText]="
      'Toggle live remove button to see errors disappear when input value is corrected'
    "
    [errorSummaryVisible]="errorSummaryVisible"
  >
    <ng-template fudisActions type="form">
      <fudis-body-text class="fudis-mt-xs fudis-mr-sm">
        Live remove is "{{ toggleLive }}"
      </fudis-body-text>
      <fudis-button
        [label]="'Toggle live remove'"
        [variant]="'secondary'"
        (handleClick)="toggleLiveRemove()"
      />
      <fudis-button fudisFormSubmit [formValid]="formExample.valid" [label]="'Submit'" />
    </ng-template>
    <ng-template fudisContent type="form">
      <fudis-section [title]="'Section title'" [errorSummaryBreadcrumb]="true">
        <ng-template fudisContent [type]="'section'">
          <fudis-fieldset [label]="'Fieldset legend'">
            <ng-template fudisContent type="fieldset">
              <fudis-grid [columns]="{ xs: 1, sm: 2 }">
                <fudis-text-input
                  [id]="'unique-input-3'"
                  [control]="formExample.controls['teacher']"
                  [label]="'Responsible teacher'"
                  [helpText]="'Someone has to be responsible for this.'"
                />
                <fudis-text-input
                  [id]="'unique-input-4'"
                  [control]="formExample.controls['email']"
                  [label]="'Contact email'"
                  [helpText]="'So that students can ask for more time on their homework.'"
                />
              </fudis-grid>
              <fudis-grid [columns]="{ xs: 1, sm: 2 }">
                <fudis-radio-button-group
                  [label]="'Course type'"
                  [control]="formExample.controls['courseType']"
                >
                  <fudis-radio-button
                    *ngFor="let option of courseTypeOptions"
                    [label]="option.label"
                    [value]="option.value"
                  />
                </fudis-radio-button-group>
                <fudis-checkbox-group
                  [formGroup]="formExample.controls.courseBooks"
                  [label]="'Course books'"
                  [helpText]="'Select 1-2 coursebooks'"
                >
                  <fudis-checkbox [controlName]="'first'" [label]="'Heir to the Empire'" />
                  <fudis-checkbox [controlName]="'second'" [label]="'Dark Force Rising'" />
                  <fudis-checkbox [controlName]="'third'" [label]="'The Last Command'" />
                </fudis-checkbox-group>
                <fudis-datepicker
                  [label]="'Start date'"
                  [id]="'date-picker-1'"
                  [size]="'md'"
                  [helpText]="'You have to start from somewhere'"
                  [control]="formExample.controls['importantDate']"
                >
                </fudis-datepicker>
              </fudis-grid>
            </ng-template>
          </fudis-fieldset>
        </ng-template>
      </fudis-section>
    </ng-template>
  </fudis-form>`,
})
class ErrorSummaryExampleComponent {
  constructor(private _errorSummaryService: FudisErrorSummaryService) {}

  errorSummaryVisible: boolean = false;

  toggleLive: FudisFormErrorSummaryUpdateStrategy = 'reloadOnly';

  formExample = new FormGroup({
    courseBooks: new FormGroup(
      {
        first: new FormControl(null),
        second: new FormControl(null),
        third: new FormControl(null),
      },
      [
        FudisGroupValidators.min({ value: 1, message: new BehaviorSubject('No book selected.') }),
        FudisGroupValidators.max({ value: 2, message: new BehaviorSubject('Too many selected.') }),
      ],
    ),
    teacher: new FormControl(
      null,
      FudisValidators.required("Missing teacher's name who is responsible for this course."),
    ),
    email: new FormControl(null, [
      FudisValidators.required('Missing email contact.'),
      FudisValidators.email('Input must be an email address.'),
    ]),
    importantDate: new FormControl(null, FudisValidators.required('Start date is missing.')),
    courseType: new FormControl(null, FudisValidators.required('Course type must be selected.')),
  });

  courseTypeOptions: FudisRadioButtonOption<object>[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'advanced', label: 'Advanced' },
  ];

  toggleLiveRemove(): void {
    if (this._errorSummaryService.updateStrategy === 'reloadOnly') {
      this._errorSummaryService.setUpdateStrategy('onRemove');
      this.toggleLive = this._errorSummaryService.updateStrategy;
    } else if (this._errorSummaryService.updateStrategy === 'onRemove') {
      this._errorSummaryService.setUpdateStrategy('all');
      this.toggleLive = this._errorSummaryService.updateStrategy;
    } else {
      this._errorSummaryService.setUpdateStrategy('reloadOnly');
      this.toggleLive = this._errorSummaryService.updateStrategy;
    }
  }
}

export default {
  title: 'Components/Form/Error Summary',
  component: ErrorSummaryComponent,
  decorators: [
    moduleMetadata({
      declarations: [ErrorSummaryExampleComponent],
      imports: [ReactiveFormsModule, RouterModule],
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
} as Meta;
const html = String.raw;

export const Example: StoryFn<ErrorSummaryComponent> = (args: ErrorSummaryComponent) => ({
  props: args,
  template: html` <example-error-summary />`,
});

Example.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
