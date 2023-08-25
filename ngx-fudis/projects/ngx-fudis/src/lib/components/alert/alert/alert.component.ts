import { Component, Input } from '@angular/core';
import { FudisNotification } from '../../../types/miscellaneous';
import { FudisAlertService } from '../alert-service/alert.service';

@Component({
	selector: 'fudis-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
	constructor(private _alertService: FudisAlertService) {}

	@Input() variant: FudisNotification = 'info';

	@Input({ required: true }) message: string;

	@Input() routerLinkUrl: string | any[] | null | undefined;

	@Input({ required: true }) id: string;

	@Input() linkTitle: string | undefined;

	protected _handleCloseClick(): void {
		this._alertService.dismissAlert(this.id);
	}
}
