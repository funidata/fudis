import {
	ChangeDetectorRef,
	Component,
	DestroyRef,
	Input,
	OnChanges,
	OnInit,
	Signal,
	ViewEncapsulation,
	effect,
	inject,
} from '@angular/core';
import {
	MatDateFormats,
	MAT_NATIVE_DATE_FORMATS,
	MAT_DATE_FORMATS,
	DateAdapter,
	MAT_DATE_LOCALE,
} from '@angular/material/core';

import { FormControl } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatepickerCustomDateAdapter, FudisDateInputFormat } from './datepicker-custom-date-adapter';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisTranslationConfig, FudisInputWidth } from '../../../types/forms';
import { FudisTranslationConfigService } from '../../../utilities/config.service';

export const FUDIS_DATE_FORMATS: MatDateFormats = {
	...MAT_NATIVE_DATE_FORMATS,
	parse: {
		dateInput: 'DD.MM.YYYY',
	},
	display: {
		...MAT_NATIVE_DATE_FORMATS.display,
		dateInput: FudisDateInputFormat as Intl.DateTimeFormatOptions,
	},
};

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
	private _destroyRef = inject(DestroyRef);

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
		this._adapter.setLocale(this.updateLocale(this._configs().appLanguage!));
	}

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('datepicker');
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);

		this._configs()
			.datepicker!.closeLabel!.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((value) => {
				this._matDatepickerIntl.closeCalendarLabel = value as string;
			});
	}

	// eslint-disable-next-line class-methods-use-this
	updateLocale(value: string): string {
		switch (value) {
			case 'en':
				return 'en-GB';
			case 'fi':
				return 'fi-FI';
			case 'sv':
				return 'sv-SE';
			default:
				return 'en-GB';
		}
	}

	ngOnChanges(): void {
		this._changeDetectorRef.detectChanges();
	}
}
