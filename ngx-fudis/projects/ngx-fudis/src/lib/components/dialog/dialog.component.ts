import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FudisAlertService } from '../../services/alert/alert.service';

type DialogSize = 'sm' | 'md' | 'lg' | 'initial';

@Component({
	selector: 'fudis-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
	constructor(private _alertsService: FudisAlertService) {}

	@Input() closeButtonLabel: string;

	@Input() size: DialogSize = 'md';

	ngOnInit(): void {
		this._alertsService.setDialogOpenSignal(true);
	}

	ngOnDestroy(): void {
		this._alertsService.setDialogOpenSignal(false);
	}
}
