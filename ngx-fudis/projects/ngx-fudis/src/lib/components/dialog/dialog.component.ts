import { Component, Input, OnDestroy, OnInit, effect } from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { FudisIdService } from '../../services/id/id.service';
import { FudisTranslationService } from '../../services/translation/translation.service';

type DialogSize = 'sm' | 'md' | 'lg' | 'initial';

@Component({
	selector: 'fudis-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
	constructor(
		private _dialogService: FudisDialogService,
		private _idService: FudisIdService,
		private _translateService: FudisTranslationService
	) {
		effect(() => {
			this._closeLabel = this._translateService.getTranslations()().DIALOG.CLOSE;
		});
		this._id = _idService.getNewId('dialog');
	}

	/**
	 * Dialog size
	 */
	@Input() size: DialogSize = 'md';

	/**
	 * Dialog's close button has to have absolute positioning when used inside fudis-form
	 */
	public closeButtonPositionAbsolute: boolean = false;

	/**
	 * Id generated from FudisIdService
	 */
	protected _id: string;

	/**
	 * Aria-label for top right close button
	 */
	protected _closeLabel: string;

	ngOnInit(): void {
		this._dialogService.setDialogOpenSignal(true);
	}

	ngOnDestroy(): void {
		this._dialogService.setDialogOpenSignal(false);
	}
}
