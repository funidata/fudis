import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FudisAlertService } from '../../services/alert/alert.service';
import { FudisDialogService } from '../../services/dialog/dialog.service';

type DialogSize = 'sm' | 'md' | 'lg' | 'initial';

@Component({
	selector: 'fudis-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
	constructor(
		private _alertsService: FudisAlertService,
		private _dialogService: FudisDialogService
	) {}

	@Input() closeButtonLabel: string;

	@Input() size: DialogSize = 'md';

	ngOnInit(): void {
		this._dialogService.setDialogOpenSignal(true);
	}

	ngOnDestroy(): void {
		this._dialogService.setDialogOpenSignal(false);
	}
}
