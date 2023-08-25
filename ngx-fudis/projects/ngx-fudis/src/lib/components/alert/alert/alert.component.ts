import { Component, Input } from '@angular/core';
import { FudisNotification } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
	@Input() variant: FudisNotification = 'info';

	@Input({ required: true }) message: string;

	@Input() routerLinkUrl: string | any[] | null | undefined;

	@Input({ required: true }) id: string;

	@Input() linkTitle: string | undefined;
}
