import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl, ReactiveFormsModule, FormsModule, FormControlOptions } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorMessageDirective } from './error-message.directive';
import readme from './readme.mdx';
import { FudisValidationErrors, FudisValidators } from '../../../../utilities/form/validators';
import { excludeAllRegex, errorMessageExclude } from '../../../../utilities/storybook';

@Component({
  selector: 'example-text-input-with-error-message',
  template: `
    <fudis-grid [columns]="2" [width]="'xs'">
      <fudis-text-input
        fudisGridItem
        [columns]="'stretch'"
        [control]="control"
        [label]="'Focus to input'"
      >
        <fudis-error-message
          *ngIf="_errorExists"
          (handleAddError)="handleAddError.emit($event)"
          (handleRemoveError)="handleRemoveError.emit($event)"
          [message]="observableMessage"
        />
        <fudis-error-message
          *ngIf="_errorExists"
          (handleAddError)="handleAddError.emit($event)"
          (handleRemoveError)="handleRemoveError.emit($event)"
          [message]="stringMessage"
        />
      </fudis-text-input>
      <fudis-button
        (click)="toggleCustomError()"
        [label]="'Toggle custom errors'"
        [variant]="'secondary'"
      />
      <fudis-button
        (click)="switchErrorMessage()"
        [label]="'Switch message content'"
        [variant]="'secondary'"
      />
    </fudis-grid>
  `,
})
class TextInputWithErrorMessageComponent {
  constructor() {
    this.control = new FormControl(
      '',
      FudisValidators.required('This validation message is send by Fudis Validators'),
    );
  }

  observableMessage: Subject<string> = new BehaviorSubject<string>(
    'This is a custom observable error message that is placed with content projection',
  );

  stringMessage: string =
    'This is custom string error message that is placed with content projection';

  customErrorExists: FormControlOptions;

  originalMessage: boolean = true;

  control: FormControl<string | null>;

  protected _errorExists: boolean = false;

  @Output() handleAddError = new EventEmitter<FudisValidationErrors>();
  @Output() handleRemoveError = new EventEmitter<FudisValidationErrors>();

  toggleCustomError(): void {
    this._errorExists = !this._errorExists;
  }

  switchErrorMessage(): void {
    if (this.originalMessage) {
      this.observableMessage.next('Observable value has been changed in custom error message');

      this.stringMessage = 'String message value has been changed in custom error message';
    } else {
      this.observableMessage.next(
        'This is a custom observable error message that is placed with content projection',
      );
      this.stringMessage =
        'This is custom string error message that is placed with content projection';
    }

    this.originalMessage = !this.originalMessage;
  }
}

export default {
  title: 'Components/Form/Error Message',
  component: ErrorMessageDirective,
  decorators: [
    moduleMetadata({
      declarations: [TextInputWithErrorMessageComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: errorMessageExclude,
    },
  },
  argTypes: {
    message: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl(
      '',
      FudisValidators.required('This validation message is send by Fudis Validators'),
    ),
    addError: action('addError'),
  },
  template: html`
    <fudis-body-text
      class="grid-refresh-text fudis-mb-lg"
      [variant]="'sm-regular'"
      style="width: 12rem;"
    >
      &uarr; Click 'Remount' refresh button from the toolbar to refresh canvas error
      message.</fudis-body-text
    >
    <fudis-text-input [control]="control" [label]="'Focus to input'">
      <fudis-error-message (handleAddError)="addError($event)" [message]="message" />
    </fudis-text-input>
  `,
});

export const Example = Template.bind({});
Example.args = {
  message: 'This is custom string error message that is placed with content projection',
};

export const ExampleWithObservableError: StoryFn = (args) => ({
  ...args,
  props: {
    handleAddError: action('handleAddError'),
    handleRemoveError: action('handleRemoveError'),
  },
  template: `
<example-text-input-with-error-message
(handleAddError)="handleAddError($event)"
(handleRemoveError)="handleRemoveError($event)"></example-text-input-with-error-message>
	`,
});

ExampleWithObservableError.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
