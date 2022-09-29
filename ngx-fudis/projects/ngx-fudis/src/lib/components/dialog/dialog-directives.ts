// eslint-disable-next-line max-classes-per-file
import { Directive } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[fudis-dialog-title]',
})
export class FudisDialogTitleDirective extends MatDialogTitle {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'fudis-dialog-content',
})
export class FudisDialogContentDirective extends MatDialogContent {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'fudis-dialog-actions',
})
export class FudisDialogActionsDirective extends MatDialogActions {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[fudis-dialog-close]',
})
export class FudisDialogCloseDirective extends MatDialogClose {}
