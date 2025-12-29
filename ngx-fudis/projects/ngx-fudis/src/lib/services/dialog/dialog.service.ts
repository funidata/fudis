/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FudisDialogService {
  constructor(public ngMaterialDialog: MatDialog) {}

  private _dialogOpen = new BehaviorSubject<boolean>(false);

  private _justClosedDropdownWithEscape = new BehaviorSubject<boolean>(false);

  /**
   * Open new dialog.
   *
   * @param component Component or template to show in the dialog.
   * @param config Optional configuration object. Use the `data` field to inject data into
   *   `component`.
   * @returns Reference to the dialog that was opened.
   */
  public open<T, R = any, D = any>(
    component: ComponentType<T> | TemplateRef<T>,
    config?: MatDialogConfig<D>,
  ): MatDialogRef<T, R> {
    return this.ngMaterialDialog.open(component, FudisDialogService._createConfig<D>(config));
  }

  /**
   * Close opened Dialog
   *
   * @param dialogResult Data sent to Component which opened this dialog.
   */
  public close<R = any>(dialogResult?: R): void {
    const currentDialogs = this.ngMaterialDialog.openDialogs;

    if (currentDialogs.length > 0) {
      currentDialogs?.[currentDialogs.length - 1].close(dialogResult);
    }
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
   * Set flag to indicate that a dropdown was just closed with Escape key, so that dialog does not
   * also close with the same key press.
   */
  public dropdownClosedWithEscape(): void {
    this._justClosedDropdownWithEscape.next(true); // set the flag

    // Reset the flag after a short delay (backup)
    setTimeout(() => {
      this._justClosedDropdownWithEscape.next(false);
    }, 1000);
  }

  /**
   * Check if a dropdown was just closed with Escape key. Resets the flag after checking.
   */
  public hasJustClosedDropdownWithEscape(): boolean {
    const hasJustClosed = this._justClosedDropdownWithEscape.value;
    if (hasJustClosed) {
      this._justClosedDropdownWithEscape.next(false); // Reset the flag
    }
    return hasJustClosed;
  }

  /**
   * @returns Currently open Dialogs
   */
  public dialogsOpen(): MatDialogRef<any, any>[] {
    return this.ngMaterialDialog.openDialogs;
  }

  /**
   * Merge consumer's config with ours.
   */
  private static _createConfig<D = any>(userConfig: MatDialogConfig<D> = {}): MatDialogConfig<D> {
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
