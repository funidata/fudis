import { Component, OnInit } from '@angular/core';
import { FudisDialog } from '../../../../ngx-fudis/src/lib/components/dialog/dialog';
import { DialogTestContentComponent } from './dialog-test-content/dialog-test-content.component';

@Component({
  selector: 'app-dialog-test',
  template: `<button mat-button (click)="openDialog()">Open dialog</button>`,
  styles: [],
})
export class DialogTestComponent implements OnInit {
  constructor(public dialog: FudisDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const ref = this.dialog.openDialog(DialogTestContentComponent);
    ref.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
