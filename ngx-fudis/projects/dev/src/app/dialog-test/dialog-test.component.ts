import { Component, OnInit } from '@angular/core';
import { FudisDialogService } from '../../../../../projects/ngx-fudis/src/lib/fudis-dialog/fudis-dialog.service';
import { DialogTestContentComponent } from './dialog-test-content/dialog-test-content.component';

@Component({
  selector: 'app-dialog-test',
  template: `<button mat-button (click)="openDialog()">Open dialog</button>`,
  styles: [],
})
export class DialogTestComponent implements OnInit {
  constructor(public dialog: FudisDialogService) {}

  ngOnInit(): void {}

  openDialog() {
    const ref = this.dialog.openDialog(DialogTestContentComponent);
    ref.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
