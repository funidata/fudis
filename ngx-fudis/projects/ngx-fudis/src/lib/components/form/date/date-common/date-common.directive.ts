import { ChangeDetectorRef, Directive, Input, OnChanges, effect } from '@angular/core';
import { InputBaseDirective } from 'projects/ngx-fudis/src/lib/directives/form/input-base/input-base.directive';
import { FudisTranslationConfigService } from 'projects/ngx-fudis/src/lib/utilities/config.service';
import { DateAdapter } from '@angular/material/core';
import { FudisInputWidth } from 'projects/ngx-fudis/src/lib/types/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';

import { takeUntil } from 'rxjs';
import { updateLocale } from './utilities';

@Directive({
	selector: '[fudisDateCommon]',
})
export class DateCommonDirective extends InputBaseDirective implements OnChanges {
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		_configService: FudisTranslationConfigService,
		private readonly _adapter: DateAdapter<Date>,
		private _matDatepickerIntl: MatDatepickerIntl
	) {
		super(_configService);

		effect(() => {
			this.setConfigs();
		});
	}

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size: FudisInputWidth = 'md';

	/**
	 * Allowed range for minimun date
	 */
	@Input() minDate: Date | null;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date | null;

	_closeLabel: string;

	protected setConfigs(): void {
		this._adapter.setLocale(updateLocale(this._configs().appLanguage!));
	}

	protected subscribeToCloseLabel(): void {
		this._configs()
			.datepicker!.closeLabel!.pipe(takeUntil(this._destroyed))
			.subscribe((value) => {
				this._matDatepickerIntl.closeCalendarLabel = value as string;
			});
	}

	ngOnChanges(): void {
		this._changeDetectorRef.detectChanges();
	}
}
