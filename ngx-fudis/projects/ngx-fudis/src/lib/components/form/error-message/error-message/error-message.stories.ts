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
        [label]="'Required text input'"
      >
        <fudis-error-message *ngIf="_errorExists" [message]="observableMessage" />
        <fudis-error-message *ngIf="_errorExists" [message]="stringMessage" />
      </fudis-text-input>
      <fudis-button (click)="toggleCustomError()" [label]="'Toggle custom error'" />
      <fudis-button (click)="switchErrorMessage()" [label]="'Switch message content'" />
    </fudis-grid>
  `,
})
class TextInputWithErrorMessageComponent {
  constructor() {
    this.control = new FormControl('', FudisValidators.required('This field is required.'));
  }

  observableMessage: Subject<string> = new BehaviorSubject<string>(
    'This is a custom error observable message coming from fudis-error-message element',
  );

  stringMessage: string = 'This is custom string message';

  customErrorExists: FormControlOptions;

  originalMessage: boolean = true;

  control: FormControl<string | null>;

  protected _errorExists: boolean = true;

  toggleCustomError(): void {
    this._errorExists = !this._errorExists;
  }

  switchErrorMessage(): void {
    if (this.originalMessage) {
      this.observableMessage.next('Observable value changed, so now this is me!');

      this.stringMessage = 'String message value changed to this!';
    } else {
      this.observableMessage.next('Custom message can be observable string like this');
      this.stringMessage = 'Or just a plain string like this one!';
    }

    this.originalMessage = !this.originalMessage;
    console.log(this.control);
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
<!--
Full code example available in:
components/form/error-message/error-message/error-message.stories.ts
-->
<example-text-input-with-error-message/>
	`,
});
