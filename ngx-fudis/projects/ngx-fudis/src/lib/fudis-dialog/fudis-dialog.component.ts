import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fudis-dialog',
  templateUrl: './fudis-dialog.component.html',
  styleUrls: ['./fudis-dialog.component.css'],
})
export class FudisDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog<T, R = any>(component: ComponentType<T>): MatDialogRef<T, R> {
    const dialogRef = this.dialog.open(component);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    return dialogRef;
  }
}
