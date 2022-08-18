import { Directive } from '@angular/core';
import { MatDialogTitle } from '@angular/material/dialog';

@Directive({
  selector: '[fudis-dialog-title]',
})
export class FudisDialogTitle extends MatDialogTitle {}
