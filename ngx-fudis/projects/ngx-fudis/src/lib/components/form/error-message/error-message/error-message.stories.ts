import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, FormsModule, FormControlOptions } from '@angular/forms';
import { Component } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorMessageComponent } from './error-message.component';
import readme from './readme.mdx';
import { FudisValidators } from '../../../../utilities/form/validators';

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
        <fudis-error-message *ngIf="_errorExists" [message]="observableMessage" />
        <fudis-error-message *ngIf="_errorExists" [message]="stringMessage" />
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
  component: ErrorMessageComponent,
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
      exclude: ['control'],
    },
  },
  argTypes: {},
} as Meta;

export const ErrorMessageExample: StoryFn = () => ({
  template: `
<example-text-input-with-error-message></example-text-input-with-error-message>
	`,
});
