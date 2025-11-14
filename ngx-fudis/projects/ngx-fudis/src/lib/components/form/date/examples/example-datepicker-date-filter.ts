import { FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { FudisValidationErrors } from '../../../../utilities/form/validators';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';

/**
 * Custom validator that checks if the date falls on a disallowed day (0 = Sunday, 6 = Saturday)
 */
export function disallowedWeekendValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return { invalidDate: true };

    const day = date.getDay();
    if (day === 0 || day === 6) {
      return { disallowedDay: { day } };
    }

    return null;
  };
}

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-date-filter-with-error-message',
  template: `
    <fudis-datepicker
      [label]="'Select a date'"
      [id]="'example-date-picker'"
      [size]="'md'"
      [helpText]="'Type in a Saturday or a Sunday'"
      [control]="control"
      [dateParse]="true"
      [initialFocus]="false"
      [popoverText]="'Is it your birthday?'"
      [popoverPosition]="'left'"
      [popoverTriggerLabel]="'Additional information'"
      [dateFilter]="weekendFilter"
    >
      <fudis-error-message
        *ngIf="control.hasError('disallowedDay')"
        (handleAddError)="handleAddError.emit($event)"
        [message]="'This error message is sent from a custom validator'"
      />
    </fudis-datepicker>
  `,
})
export class DateFilterWithErrorMessageComponent {
  constructor() {
    this.control = new FormControl(null, disallowedWeekendValidator());
  }

  control: FormControl<Date | null>;

  @Output() handleAddError = new EventEmitter<FudisValidationErrors>();

  weekendFilter(d: Date | null | undefined): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
}
