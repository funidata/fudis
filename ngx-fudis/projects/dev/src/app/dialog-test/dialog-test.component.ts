import { Component, OnInit } from '@angular/core';
import { FudisDialogComponent } from '../../../../ngx-fudis/src/lib/fudis-dialog/fudis-dialog.component';
import { DialogTestContentComponent } from './dialog-test-content/dialog-test-content.component';

@Component({
  selector: 'app-dialog-test',
  template: ` <button mat-button (click)="openDialog()">Open dialog</button> `,
  styles: [],
  providers: [FudisDialogComponent],
})
export class DialogTestComponent implements OnInit {
  constructor(public dialog: FudisDialogComponent) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.openDialog(DialogTestContentComponent);
  }
}
