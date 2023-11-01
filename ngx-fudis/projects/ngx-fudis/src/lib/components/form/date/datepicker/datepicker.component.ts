import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	ViewEncapsulation,
	effect,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { FUDIS_DATE_FORMATS, FudisInputSize } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

import { DatepickerCustomDateAdapter } from '../date-common/datepicker-custom-date-adapter';
import { updateLocale } from '../date-common/utilities';
import { FudisFocusService } from '../../../../services/focus/focus.service';

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
export class DatepickerComponent extends InputBaseDirective implements OnInit, OnChanges, AfterViewInit {
	constructor(
		private _idService: FudisIdService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _datePickerConfigService: FudisTranslationService,
		private _adapter: DateAdapter<Date>,
		private _datepickerIntl: MatDatepickerIntl,
		private _focusService: FudisFocusService
	) {
		super(_datePickerConfigService);

		effect(() => {
			this._datepickerIntl.calendarLabel = this._translations().DATEPICKER.CALENDAR;
			this._datepickerIntl.closeCalendarLabel = this._translations().DATEPICKER.CLOSE;
			this._datepickerIntl.openCalendarLabel = this._translations().DATEPICKER.OPEN;
			this._datepickerIntl.prevMonthLabel = this._translations().DATEPICKER.PREV_MONTH;
			this._datepickerIntl.nextMonthLabel = this._translations().DATEPICKER.NEXT_MONTH;
			this._datepickerIntl.prevYearLabel = this._translations().DATEPICKER.PREV_YEAR;
			this._datepickerIntl.nextYearLabel = this._translations().DATEPICKER.NEXT_YEAR;
			this._datepickerIntl.prevMultiYearLabel = this._translations().DATEPICKER.PREV_MULTIYEAR;
			this._datepickerIntl.nextMultiYearLabel = this._translations().DATEPICKER.NEXT_MULTIYEAR;
			this._datepickerIntl.switchToMonthViewLabel = this._translations().DATEPICKER.SWITCH_MONTH_VIEW;
			this._datepickerIntl.switchToMultiYearViewLabel = this._translations().DATEPICKER.SWITCH_MULTIYEAR_VIEW;

			this._adapter.setLocale(updateLocale(this._translationService.getLanguage()));
		});
	}

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<Date | null>;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size: FudisInputSize = 'md';

	/**
	 * Allowed range for minimun date
	 */
	@Input() minDate: Date | null | undefined;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date | null | undefined;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('datepicker');
	}

	ngOnChanges(): void {
		this._changeDetectorRef.detectChanges();

		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this._id)) {
			this.focusToInput();
		}
	}
}
