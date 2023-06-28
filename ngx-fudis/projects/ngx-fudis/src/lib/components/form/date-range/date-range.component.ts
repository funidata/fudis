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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDateRangePicker, MatDatepickerIntl } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisTranslationConfigService } from '../../../utilities/config.service';
import { FUDIS_DATE_FORMATS, FudisInputWidth, FudisTranslationConfig } from '../../../types/forms';
import { updateLocale } from './utilities';
import { DatepickerCustomDateAdapter } from '../datepicker/datepicker-custom-date-adapter';

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
export class DateRangeComponent extends InputBaseDirective implements OnInit {
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

	protected _requiredText: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('daterange');

		this._configs()
			.datepicker!.closeLabel!.pipe(takeUntil(this._destroyed))
			.subscribe((value) => {
				this._matDatepickerIntl.closeCalendarLabel = value as string;
			});

		this._configs()
			.requiredText!.pipe(takeUntil(this._destroyed))
			.subscribe((value) => {
				this._requiredText = value;
			});
	}

	setConfigs(): void {
		this._adapter.setLocale(updateLocale(this._configs().appLanguage!));
	}

	range = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null),
	});

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size: FudisInputWidth = 'md';
}
