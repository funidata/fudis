/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Signal, TemplateRef, signal } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class FudisDialogService {
  constructor(public ngMaterialDialog: MatDialog) {}

  private _dialogOpen = signal<boolean>(false);

  //private _dialogRef: MatDialogRef<any, any>;

  private _dialogRefs: MatDialogRef<any, any>[] = [];

  /**
   * Open new dialog.
   * @param component Component or template to show in the dialog.
   * @param config Optional configuration object. Use the `data` field to inject data into `component`.
   * @returns Reference to the dialog that was opened.
   */
  public open<T, R = any>(
    component: ComponentType<T> | TemplateRef<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: MatDialogConfig<any>,
  ): MatDialogRef<T, R> {
    const newDialog = this.ngMaterialDialog.open(
      component,
      FudisDialogService._createConfig(config),
    );

    this._dialogRefs.push(newDialog);

    newDialog.afterClosed().subscribe(() => {
      this._dialogRefs.pop();
    });

    return newDialog;
  }

  /**
   * Close opened Dialog
   * @param dialogResult Data sent to Component which opened this dialog.
   */
  public close(dialogResult?: any): void {
    this._dialogRefs[this._dialogRefs.length - 1].close(dialogResult);
  }

  /**
   * Close all instances of Dialogs
   */
  public closeAll(): void {
    this.ngMaterialDialog.closeAll();
  }

  /**
   * Get dialog open status
   */
  public getDialogOpenSignal(): Signal<boolean> {
    return this._dialogOpen.asReadonly();
  }

  /**
   * Set dialog open
   */
  public setDialogOpenSignal(value: boolean): void {
    this._dialogOpen.set(value);
  }

  /**
   *
   * @returns Amount of dialogs opened
   */
  public dialogsOpen(): number {
    return this._dialogRefs.length;
  }

  /**
   * Merge consumer's config with ours.
   */
  private static _createConfig(userConfig: MatDialogConfig<any> = {}): MatDialogConfig<any> {
    const overridableOptions = { hasBackdrop: true, disableClose: true, autoFocus: false };
    const forcedOptions = {
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
      panelClass: 'fudis-dialog-panel',
      backdropClass: 'fudis-dialog-backdrop',
    };
    return { ...overridableOptions, ...userConfig, ...forcedOptions };
  }
}
