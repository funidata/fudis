import { Component, Input, OnChanges, OnInit, ViewEncapsulation, effect } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDateRangePicker, MatDatepickerIntl } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../utilities/id-service.service';

import { FUDIS_DATE_FORMATS, FudisDateRange, FudisFormGroupErrors, FudisInputWidth } from '../../../types/forms';
import { updateLocale } from './utilities';
import { DatepickerCustomDateAdapter } from '../datepicker/datepicker-custom-date-adapter';
import { FudisTranslationConfigService } from '../../../utilities/config.service';

@Component({
	selector: 'fudis-date-range',
	templateUrl: './date-range.component.html',
	styleUrls: ['./date-range.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: DateAdapter,
			useClass: DatepickerCustomDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: FUDIS_DATE_FORMATS },
		{ provide: MatDateRangePicker },
	],
})
export class DateRangeComponent extends InputBaseDirective implements OnInit, OnChanges {
	constructor(
		private readonly _adapter: DateAdapter<Date>,
		private _matDatepickerIntl: MatDatepickerIntl,
		private _idService: FudisIdService,
		_configService: FudisTranslationConfigService
	) {
		super(_configService);

		effect(() => {
			this.setConfigs();
		});
	}

	protected _dateRangeGroup: FormGroup<FudisDateRange>;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('daterange');

		this._dateRangeGroup = new FormGroup({
			endDate: this.controlEndDate,
			startDate: this.controlStartDate,
		});

		this._configs()
			.datepicker!.closeLabel!.pipe(takeUntil(this._destroyed))
			.subscribe((value) => {
				this._matDatepickerIntl.closeCalendarLabel = value as string;
			});

		this.subscribeToRequiredText();
	}

	setConfigs(): void {
		this._adapter.setLocale(updateLocale(this._configs().appLanguage!));
	}

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size: FudisInputWidth = 'md';

	@Input() groupErrorMsg: FudisFormGroupErrors;

	@Input({ required: true }) controlStartDate: FormControl<Date | null>;

	@Input({ required: true }) controlEndDate: FormControl<Date | null>;

	@Input() minStartDate: Date | null = null;

	@Input() maxStartDate: Date | null = null;

	@Input() minEndDate: Date | null = null;

	@Input() maxEndDate: Date | null = null;

	// eslint-disable-next-line class-methods-use-this, @angular-eslint/no-empty-lifecycle-method
	ngOnChanges(): void {
		// console.log(this.controlStartDate.hasValidator(Validators.required));
	}
}
