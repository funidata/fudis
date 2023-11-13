import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { FudisIdService } from '../../services/id/id.service';

type DialogSize = 'sm' | 'md' | 'lg' | 'initial';

@Component({
	selector: 'fudis-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
	constructor(
		private _dialogService: FudisDialogService,
		private _idService: FudisIdService
	) {
		this._id = _idService.getNewId('dialog');
	}

	@Input() closeButtonLabel: string;

	@Input() size: DialogSize = 'md';

	/**
	 * Id generated from FudisIdService
	 */
	protected _id: string;

	ngOnInit(): void {
		this._dialogService.setDialogOpenSignal(true);
	}

	ngOnDestroy(): void {
		this._dialogService.setDialogOpenSignal(false);
	}
}
