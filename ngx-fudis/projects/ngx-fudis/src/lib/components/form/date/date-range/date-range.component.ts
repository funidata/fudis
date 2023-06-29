import {
	AfterContentInit,
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	ViewEncapsulation,
	effect,
} from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDateRangePicker, MatDatepickerIntl } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { FudisIdService } from '../../../../utilities/id-service.service';
import { FUDIS_DATE_FORMATS, FudisDateRange, FudisFormGroupErrors } from '../../../../types/forms';

import { DatepickerCustomDateAdapter } from '../date-common/datepicker-custom-date-adapter';
import { FudisTranslationConfigService } from '../../../../utilities/config.service';
import { DateCommonDirective } from '../date-common/date-common.directive';

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
export class DateRangeComponent extends DateCommonDirective implements OnInit, OnChanges, AfterContentInit {
	constructor(
		private _idService: FudisIdService,
		private _dateRangeDetectorRef: ChangeDetectorRef,
		private _dateRangeConfigService: FudisTranslationConfigService,
		private _dateRangeAdapter: DateAdapter<Date>,
		private _dateRangematDatepickerIntl: MatDatepickerIntl
	) {
		super(_dateRangeDetectorRef, _dateRangeConfigService, _dateRangeAdapter, _dateRangematDatepickerIntl);

		effect(() => {
			this.setConfigs();
		});
	}

	protected _dateRangeGroup: FormGroup<FudisDateRange>;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('daterange');

		this._dateRangeGroup = new FormGroup({
			startDate: this.controlStartDate,
			endDate: this.controlEndDate,
		});

		this.subscribeToRequiredText();
		this.subscribeToCloseLabel();
	}

	ngAfterContentInit(): void {
		/**
		 * Workaround for known ngMaterial issue reported multiple times.
		 * E.g. https://github.com/angular/components/issues/21875
		 * E.g. https://github.com/angular/components/issues/24075
		 * E.g. https://github.com/angular/components/issues/27170
		 * E.g. https://github.com/angular/components/issues/27260
		 */
		this.controlStartDate.valueChanges
			.pipe(distinctUntilChanged(), takeUntil(this._destroyed))
			.subscribe(() => setTimeout(() => this.controlEndDate.updateValueAndValidity()));

		this.controlEndDate.valueChanges
			.pipe(distinctUntilChanged(), takeUntil(this._destroyed))
			.subscribe(() => setTimeout(() => this.controlStartDate.updateValueAndValidity()));
	}

	@Input() groupErrorMsg: FudisFormGroupErrors;

	@Input({ required: true }) controlStartDate: FormControl<Date | null>;

	@Input({ required: true }) controlEndDate: FormControl<Date | null>;

	handleInputBlur(): void {
		console.log(this._dateRangeGroup);
	}
}
