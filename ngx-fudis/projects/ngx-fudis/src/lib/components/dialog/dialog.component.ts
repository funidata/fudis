import { Component, Input } from '@angular/core';

type DialogSize = 'sm' | 'md' | 'lg' | 'initial';

@Component({
	selector: 'fudis-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
	@Input() closeButtonLabel: string;

	@Input() size: DialogSize = 'md';
}
