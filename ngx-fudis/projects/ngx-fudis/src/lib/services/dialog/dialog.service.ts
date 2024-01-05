import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Signal, TemplateRef, signal } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class FudisDialogService {
  constructor(public ngMaterialDialog: MatDialog) {}

  private _dialogOpen = signal<boolean>(false);

  /**
   * Open new dialog.
   * @param component Component or template to show in the dialog.
   * @param config Optional configuration object. Use the `data` field to inject data into `component`.
   * @returns Reference to the dialog that was opened.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public open<T, R = any>(
    component: ComponentType<T> | TemplateRef<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: MatDialogConfig<any>,
  ): MatDialogRef<T, R> {
    const dialogRef = this.ngMaterialDialog.open(
      component,
      FudisDialogService._createConfig(config),
    );

    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    return dialogRef;
  }

  public close(): void {
    this.ngMaterialDialog.closeAll();
  }

  public getDialogOpenSignal(): Signal<boolean> {
    return this._dialogOpen.asReadonly();
  }

  public setDialogOpenSignal(value: boolean): void {
    this._dialogOpen.set(value);
  }

  /**
   * Merge consumer's config with ours.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static _createConfig(userConfig: MatDialogConfig<any> = {}): MatDialogConfig<any> {
    const overridableOptions = { hasBackdrop: true, disableClose: true, autoFocus: false };
    const forcedOptions = { enterAnimationDuration: 0, panelClass: 'fudis-dialog-panel' };
    return { ...overridableOptions, ...userConfig, ...forcedOptions };
  }
}
