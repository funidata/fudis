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
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { FUDIS_DATE_FORMATS, FudisInputSize } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

import { DatepickerCustomDateAdapter } from '../date-common/datepicker-custom-date-adapter';
import { updateLocale, updateMatDatePickerTranslations } from '../date-common/utilities';
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
		private _changeDetectorRef: ChangeDetectorRef,
		private _datePickerConfigService: FudisTranslationService,
		private _adapter: DateAdapter<Date>,
		private _datepickerIntl: MatDatepickerIntl,
		private _focusService: FudisFocusService,
		_idService: FudisIdService
	) {
		super(_datePickerConfigService, _idService);

		effect(() => {
			this._adapter.setLocale(updateLocale(this._translationService.getLanguage()));

			this._datepickerIntl = updateMatDatePickerTranslations(this._translations(), this._datepickerIntl);
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
		this._setInputId('datepicker');
	}

	ngOnChanges(): void {
		this._changeDetectorRef.detectChanges();

		this._isRequired(this.control);
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}
	}
}
