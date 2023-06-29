import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';

import { FUDIS_DATE_FORMATS } from 'projects/ngx-fudis/src/lib/types/forms';
import { checkRequiredAttributes } from '../../../../utilities/form/errorsAndWarnings';
import { FudisIdService } from '../../../../utilities/id-service.service';
import { FudisTranslationConfigService } from '../../../../utilities/config.service';
import { DateCommonDirective } from '../date-common/date-common.directive';
import { DatepickerCustomDateAdapter } from '../date-common/datepicker-custom-date-adapter';

@Component({
	selector: 'fudis-datepicker[id][label]',
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
export class DatepickerComponent extends DateCommonDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		private _datePickerDetectorRef: ChangeDetectorRef,
		private _datePickerConfigService: FudisTranslationConfigService,
		private _datePickerAdapter: DateAdapter<Date>,
		private _datePickermatDatepickerIntl: MatDatepickerIntl
	) {
		super(_datePickerDetectorRef, _datePickerConfigService, _datePickerAdapter, _datePickermatDatepickerIntl);
	}

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<Date | null>;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('datepicker');
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);

		this.subscribeToCloseLabel();
	}
}
