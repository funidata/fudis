import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class FudisDialog {
  constructor(public dialog: MatDialog) {}

  /**
   * Open new dialog.
   * @param component Component to show in the dialog.
   * @param config Optional configuration object. Use the `data` field to inject data into `component`.
   * @returns Reference to the dialog that was opened.
   */
  open<T, R = any>(component: ComponentType<T>, config?: MatDialogConfig<any>): MatDialogRef<T, R> {
    const dialogRef = this.dialog.open(component, this.createConfig());
    return dialogRef;
  }

  /**
   * Merge consumer's config with ours.
   */
  private createConfig(userConfig: MatDialogConfig<any> = {}): MatDialogConfig<any> {
    const overridableOptions = { hasBackdrop: true };
    const forcedOptions = { panelClass: 'fudis-dialog-panel' };
    return { ...overridableOptions, ...userConfig, ...forcedOptions };
  }
}
