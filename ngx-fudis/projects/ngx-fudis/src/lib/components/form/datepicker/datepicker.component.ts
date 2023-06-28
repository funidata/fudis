import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	Signal,
	ViewEncapsulation,
	effect,
} from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { FormControl } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { DatepickerCustomDateAdapter } from './datepicker-custom-date-adapter';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisTranslationConfig, FudisInputWidth, FUDIS_DATE_FORMATS } from '../../../types/forms';
import { FudisTranslationConfigService } from '../../../utilities/config.service';
import { updateLocale } from '../date-range/utilities';

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
export class DatepickerComponent extends InputBaseDirective implements OnInit, OnChanges {
	private _destroyed = new Subject<void>();

	constructor(
		private readonly _adapter: DateAdapter<Date>,
		private _configService: FudisTranslationConfigService,
		private _matDatepickerIntl: MatDatepickerIntl,
		private _idService: FudisIdService,
		private _changeDetectorRef: ChangeDetectorRef
	) {
		super();

		effect(() => {
			this._configs = this._configService.getConfig();
			this.setConfigs();
		});
	}

	protected _configs: Signal<FudisTranslationConfig>;

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
	@Input() minDate: Date | null;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date | null;

	_closeLabel: string;

	setConfigs(): void {
		this._adapter.setLocale(updateLocale(this._configs().appLanguage!));
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('datepicker');
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);

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
