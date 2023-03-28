// eslint-disable-next-line max-classes-per-file
import { Directive } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Directive({
	selector: '[fudisDialogTitle]',
})
export class DialogTitleDirective extends MatDialogTitle {}

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'fudis-dialog-content',
})
export class DialogContentDirective extends MatDialogContent {}

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'fudis-dialog-actions',
})
export class DialogActionsDirective extends MatDialogActions {}

@Directive({
	selector: '[fudisDialogClose]',
})
export class DialogCloseDirective extends MatDialogClose {}
