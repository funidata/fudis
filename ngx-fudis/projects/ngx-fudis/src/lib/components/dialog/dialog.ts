import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class FudisDialog {
	constructor(public dialog: MatDialog) {}

	/**
	 * Open new dialog.
	 * @param component Component to show in the dialog.
	 * @param config Optional configuration object. Use the `data` field to inject data
	 * into `component`.
	 * @returns Reference to the dialog that was opened.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	open<T, R = any>(component: ComponentType<T>, config?: MatDialogConfig<any>): MatDialogRef<T, R> {
		const dialogRef = this.dialog.open(component, FudisDialog.createConfig());
		return dialogRef;
	}

	/**
	 * Merge consumer's config with ours.
	 */
	private static createConfig(userConfig: MatDialogConfig<any> = {}): MatDialogConfig<any> {
		const overridableOptions = { hasBackdrop: true };
		const forcedOptions = { panelClass: 'fds-dialog-panel' };
		return { ...overridableOptions, ...userConfig, ...forcedOptions };
	}
}
