import { ChangeDetectorRef, Component, Input, AfterViewInit, Signal, effect } from '@angular/core';

import { FudisAlertElement } from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisDialogService } from '../../../services/dialog/dialog.service';

@Component({
	selector: 'fudis-alert-group',
	templateUrl: './alert-group.component.html',
	styleUrls: ['./alert-group.component.scss'],
})
export class AlertGroupComponent implements AfterViewInit {
	constructor(
		private _alertService: FudisAlertService,
		private _translationService: FudisTranslationService,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private _dialogService: FudisDialogService
	) {
		effect(() => {
			this._alertList = this._alertService.getAlertsSignal();
			this._alertGroupLabel = `${this._translationService.getTranslations()().ALERT.HEADING_LABEL}: ${
				this._alertList().length
			}`;

			this._dialogStatus = this._dialogService.getDialogOpenSignal()();

			this._setVisibility();
		});
	}

	@Input() position: 'fixed' | 'absolute' = 'fixed';

	@Input() variant: 'dialog' | 'default' = 'default';

	protected _alertList: Signal<FudisAlertElement[]>;

	protected _alertGroupLabel: string;

	protected _dialogStatus: boolean;

	protected _visible: boolean = false;

	ngAfterViewInit(): void {
		this._setVisibility();
	}

	private _setVisibility(): void {
		if ((this._dialogStatus && this.variant === 'dialog') || (!this._dialogStatus && this.variant === 'default')) {
			this._visible = true;
		} else {
			this._visible = false;
		}
		this._changeDetectorRef.detectChanges();
	}
}
