import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewEncapsulation, effect } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { FUDIS_DATE_FORMATS, FudisInputWidth } from 'projects/ngx-fudis/src/lib/types/forms';
import { InputBaseDirective } from 'projects/ngx-fudis/src/lib/directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../../utilities/id-service.service';
import { FudisTranslationConfigService } from '../../../../utilities/translation-config.service';

import { DatepickerCustomDateAdapter } from '../date-common/datepicker-custom-date-adapter';
import { updateLocale } from '../date-common/utilities';

@Component({
	selector: 'fudis-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: DateAdapter,
			useClass: DatepickerCustomDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: FUDIS_DATE_FORMATS },
	],
})
export class DatepickerComponent extends InputBaseDirective implements OnInit, OnChanges {
	constructor(
		private _idService: FudisIdService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _datePickerConfigService: FudisTranslationConfigService,
		private _adapter: DateAdapter<Date>,
		private _datepickerIntl: MatDatepickerIntl
	) {
		super(_datePickerConfigService);

		effect(() => {
			this.setConfigs();
		});
	}

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<Date | null>;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size: FudisInputWidth = 'md';

	/**
	 * Allowed range for minimun date
	 */
	@Input() minDate: Date | null | undefined;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date | null | undefined;

	protected setConfigs(): void {
		this._adapter.setLocale(updateLocale(this._configs().appLanguage!));
	}

	/**
	 * Set ngMaterial Calendar close button label
	 */
	protected subscribeToCloseLabel(): void {
		this._configs()
			.datepicker.closeLabel.pipe(this._untilDestroyed())
			.subscribe((value) => {
				this._datepickerIntl.closeCalendarLabel = value as string;
			});
	}

	ngOnInit(): void {
		this.subscribeToCloseLabel();
		this.subscribeToRequiredText();
		this._id = this.id ?? this._idService.getNewId('datepicker');
	}

	ngOnChanges(): void {
		this._changeDetectorRef.detectChanges();

		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}
}
