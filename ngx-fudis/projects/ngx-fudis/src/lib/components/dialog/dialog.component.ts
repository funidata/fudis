import { Component, Input } from '@angular/core';

type DialogSize = 's' | 'm' | 'l' | 'initial';

@Component({
	selector: 'fudis-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
	@Input() closeText: string = 'Close';

	@Input() size: DialogSize = 'm';
}
