import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

// @Injectable()
@Component({
	selector: 'fudis-dialog',
	styleUrls: ['./dialog.component.scss'],
	templateUrl: './dialog.component.html',
})
export class DialogComponent {
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
		const dialogRef = this.dialog.open(component, DialogComponent.createConfig());
		return dialogRef;
	}

	/**
	 * Merge consumer's config with ours.
	 */
	private static createConfig(userConfig: MatDialogConfig<any> = {}): MatDialogConfig<any> {
		const overridableOptions = { hasBackdrop: true };
		const forcedOptions = { panelClass: 'fudis-dialog-panel' };
		return { ...overridableOptions, ...userConfig, ...forcedOptions };
	}
}
