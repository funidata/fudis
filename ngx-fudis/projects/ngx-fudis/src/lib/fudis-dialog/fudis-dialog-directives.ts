import { Directive } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Directive({
  selector: '[fudis-dialog-title]',
})
export class FudisDialogTitle extends MatDialogTitle {}

@Directive({
  selector: 'fudis-dialog-content',
})
export class FudisDialogContent extends MatDialogContent {}

@Directive({
  selector: 'fudis-dialog-actions',
})
export class FudisDialogActions extends MatDialogActions {}

@Directive({
  selector: '[fudis-dialog-close]',
})
export class FudisDialogClose extends MatDialogClose {}
