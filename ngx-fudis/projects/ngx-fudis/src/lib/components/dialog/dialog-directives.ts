// eslint-disable-next-line max-classes-per-file
import { Directive } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Directive({
	selector: '[fudisDialogTitle]',
})
export class FudisDialogTitleDirective extends MatDialogTitle {}

@Directive({
	selector: '[fudisDialogContent]',
})
export class FudisDialogContentDirective extends MatDialogContent {}

@Directive({
	selector: '[fudisDialogActions]',
})
export class FudisDialogActionsDirective extends MatDialogActions {}

@Directive({
	selector: '[fudisDialogClose]',
})
export class FudisDialogCloseDirective extends MatDialogClose {}
