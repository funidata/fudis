import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { FudisValidationErrors, FudisValidators } from '../../../../utilities/form/validators';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { FudisInputSize } from '../../../../types/forms';
import { CommonModule } from '@angular/common';
import { FudisPopoverPosition } from '../../../../types/types';

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-date-filter-with-error-message',
  template: `
    <fudis-datepicker
      [label]="label"
      [id]="'example-date-picker'"
      [size]="size"
      [helpText]="helpText"
      [control]="control"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
      [dateFilter]="myFilter"
    >
      <fudis-error-message
        *ngIf="_errorExists"
        (handleAddError)="handleAddError.emit($event)"
        (handleRemoveError)="handleRemoveError.emit($event)"
        [message]="message"
      />
    </fudis-datepicker>
    <fudis-button
      (click)="toggleCustomError()"
      [label]="'Toggle custom errors'"
      [variant]="'secondary'"
    />
  `,
})
export class DateFilterWithErrorMessageComponent {
  constructor() {
    this.control = new FormControl(null, FudisValidators.required('Date is required.'));
  }

  control: FormControl<Date | null>;
  message = 'This is custom string error message that is placed with content projection';
  label = 'Select a date';
  helpText = 'Choose your favourite date.';
  size: FudisInputSize = 'md';
  dateParse = true;
  initialFocus = false;
  popoverText = 'Is it your birthday?';
  popoverPosition: FudisPopoverPosition = 'left';
  popoverTriggerLabel = 'Additional information';

  protected _errorExists: boolean = false;

  @Output() handleAddError = new EventEmitter<FudisValidationErrors>();
  @Output() handleRemoveError = new EventEmitter<FudisValidationErrors>();

  toggleCustomError(): void {
    this._errorExists = !this._errorExists;
  }

  myFilter(d: Date | null | undefined): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
}
