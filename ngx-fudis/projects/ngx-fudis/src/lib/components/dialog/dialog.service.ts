import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class DialogService {
	constructor(public ngMaterialDialog: MatDialog) {}

	/**
	 * Open new dialog.
	 * @param component Component to show in the dialog.
	 * @param config Optional configuration object. Use the `data` field to inject data
	 * into `component`.
	 * @returns Reference to the dialog that was opened.
	 */

	open<T, R = any>(component: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<any>): MatDialogRef<T, R> {
		const dialogRef = this.ngMaterialDialog.open(component, DialogService.createConfig(config));
		return dialogRef;
	}

	close(): void {
		this.ngMaterialDialog.closeAll();
	}

	/**
	 * Merge consumer's config with ours.
	 */
	private static createConfig(userConfig: MatDialogConfig<any> = {}): MatDialogConfig<any> {
		const overridableOptions = { hasBackdrop: true, disableClose: true };
		const forcedOptions = { panelClass: 'fudis-dialog-panel' };
		return { ...overridableOptions, ...userConfig, ...forcedOptions };
	}
}
