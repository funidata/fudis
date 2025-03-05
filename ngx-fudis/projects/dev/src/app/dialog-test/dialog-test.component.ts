import { Component } from '@angular/core';
import { FudisDialogService } from 'ngx-fudis';
import { DialogTestContentComponent } from './dialog-test-content/dialog-test-content.component';

@Component({
    selector: 'app-dialog-test',
    template: '<button mat-button (click)="openDialog()">Open dialog</button>',
    styles: [],
    standalone: false
})
export class DialogTestComponent {
  constructor(public dialog: FudisDialogService) {}

  openDialog() {
    const ref = this.dialog.open(DialogTestContentComponent);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref.afterClosed().subscribe((res: any) => {
      console.log(res);
    });
  }
}
