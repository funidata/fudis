/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FudisDialogService {
  constructor(public ngMaterialDialog: MatDialog) {}

  private _dialogOpen = new BehaviorSubject<boolean>(false);

  /**
   * Open new dialog.
   * @param component Component or template to show in the dialog.
   * @param config Optional configuration object. Use the `data` field to inject data into `component`.
   * @returns Reference to the dialog that was opened.
   */
  public open<T, R = any>(
    component: ComponentType<T> | TemplateRef<T>,
    config?: MatDialogConfig<any>,
  ): MatDialogRef<T, R> {
    const newDialog = this.ngMaterialDialog.open(
      component,
      FudisDialogService._createConfig(config),
    );

    return newDialog;
  }

  /**
   * Close opened Dialog
   * @param dialogResult Data sent to Component which opened this dialog.
   */
  public close(dialogResult?: any): void {
    const currentDialogs = this.ngMaterialDialog.openDialogs;

    currentDialogs?.[currentDialogs.length - 1].close(dialogResult);
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
  public getDialogOpenStatus(): BehaviorSubject<boolean> {
    return this._dialogOpen;
  }

  /**
   * Set dialog open
   */
  public setDialogOpenStatus(value: boolean): void {
    this._dialogOpen.next(value);
  }

  /**
   *
   * @returns Currently open Dialogs
   */
  public dialogsOpen(): MatDialogRef<any, any>[] {
    return this.ngMaterialDialog.openDialogs;
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
