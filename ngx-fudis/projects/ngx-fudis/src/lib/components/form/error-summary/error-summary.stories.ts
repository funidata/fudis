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

// TODO: Refactor fudis-body-text inline style to Spacing Directive after the directive is exposed again
// (fudisSpacing [marginRight]="'sm'" [marginTop]="'xs'")

@Component({
  selector: 'example-error-summary',
  template: ` <fudis-form
    [align]="'center'"
    [marginTop]="'xl'"
    [titleLevel]="1"
    [title]="'Example Form with Error Summary'"
    [id]="id"
    [errorSummaryLinkType]="'href'"
    [errorSummaryHelpText]="
      'Toggle live remove button to see errors disappear when input value is corrected'
    "
    [errorSummaryVisible]="errorSummaryVisible"
  >
    <ng-template fudisActions type="form">
      <fudis-body-text style="margin: 0.5rem 1rem 0 0;">
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
      <fudis-fieldset [title]="'Form information'">
        <ng-template fudisContent type="fieldset">
          <fudis-grid [columns]="3">
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
          <fudis-grid [columns]="3">
            <!-- <fudis-radio-button-group
              [title]="'Course type'"
              [id]="'radio-button-group-1'"
              [options]="courseTypeOptions"
              [control]="formExample.controls['courseType']"
            /> -->
            <fudis-checkbox-group
              [formGroup]="formExample.controls.courseBooks"
              [title]="'Course books'"
              [helpText]="'Select 1-2 coursebooks'"
            >
              <fudis-checkbox [controlName]="'first'" [label]="'Heir to the Empire'" />
              <fudis-checkbox [controlName]="'second'" [label]="'Dark Force Rising'" />
              <fudis-checkbox [controlName]="'third'" [label]="'The Last Command'" />
            </fudis-checkbox-group>
            <!-- <fudis-datepicker
              [label]="'Start date'"
              [id]="'date-picker-1'"
              [size]="'md'"
              [helpText]="'You have to start from somewhere'"
              [control]="formExample.controls['importantDate']"
            >
            </fudis-datepicker> -->
          </fudis-grid>
        </ng-template>
      </fudis-fieldset>
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
    // Expose after Datepicker is exposed to public API
    // importantDate: new FormControl(null, FudisValidators.required('Start date is missing.')),
    // courseType: new FormControl(null, FudisValidators.required('Course type must be selected.')),
  });

  courseTypeOptions: FudisRadioButtonOption[] = [
    { value: 'basic', label: 'Basic', id: 'courseType-1' },
    { value: 'advanced', label: 'Advanced', id: 'courseType-2' },
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
