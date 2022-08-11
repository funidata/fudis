import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Injectable()
export class FudisDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog<T, R = any>(component: ComponentType<T>): MatDialogRef<T, R> {
    const dialogRef = this.dialog.open(component);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    return dialogRef;
  }
}
