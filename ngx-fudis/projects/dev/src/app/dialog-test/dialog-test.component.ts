import { Component, OnInit } from '@angular/core';
import { FudisDialogService } from "../../../../ngx-fudis/src/lib/fudis-dialog/fudis-dialog.service";
import { DialogTestContentComponent } from './dialog-test-content/dialog-test-content.component';

@Component({
  selector: 'app-dialog-test',
  template: ` <button mat-button (click)="openDialog()">Open dialog</button> `,
  styles: [],
  providers: [FudisDialogService],
})
export class DialogTestComponent implements OnInit {
  constructor(public dialog: FudisDialogService) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.openDialog(DialogTestContentComponent);
  }
}
