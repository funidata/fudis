import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type DialogSize = 's' | 'm' | 'l' | 'initial';

@Component({
	selector: 'fudis-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
	@Input() closeButtonLabel: string;

	@Input() size: DialogSize = 'm';
}
