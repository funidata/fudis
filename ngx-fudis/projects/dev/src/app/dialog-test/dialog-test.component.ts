import { Component } from '@angular/core';
import { DialogService } from 'ngx-fudis';
import { DialogTestContentComponent } from './dialog-test-content/dialog-test-content.component';

@Component({
	selector: 'app-dialog-test',
	template: '<button mat-button (click)="openDialog()">Open dialog</button>',
	styles: [],
})
export class DialogTestComponent {
	constructor(public dialog: DialogService) {}

	openDialog() {
		const ref = this.dialog.open(DialogTestContentComponent);
		ref.afterClosed().subscribe((res: any) => {
			// eslint-disable-next-line no-console
			console.log(res);
		});
	}
}
