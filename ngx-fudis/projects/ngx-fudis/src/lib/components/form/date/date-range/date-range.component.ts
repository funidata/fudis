import { AfterContentInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { FudisIdService } from '../../../../utilities/id-service.service';
import { FudisDateRange, FudisDateRangeItem } from '../../../../types/forms';

@Component({
	selector: 'fudis-date-range',
	templateUrl: './date-range.component.html',
	styleUrls: ['./date-range.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DateRangeComponent implements OnInit, AfterContentInit {
	constructor(private _idService: FudisIdService) {}

	private _destroyed = new Subject<void>();

	protected _dateRangeGroup: FormGroup<FudisDateRange>;

	protected _id: string;

	protected _startMin: Date | null | undefined;

	protected _startMax: Date | null | undefined;

	protected _endMax: Date | null | undefined;

	protected _endMin: Date | null | undefined;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('daterange');

		this._startMin = this.startDate.minDate;
		this._startMax = this.startDate.maxDate;
		this._endMin = this.endDate.minDate;
		this._endMax = this.endDate.maxDate;
	}

	@Input() id: string;

	@Input({ required: true }) startDate: FudisDateRangeItem;

	@Input({ required: true }) endDate: FudisDateRangeItem;

	ngAfterContentInit(): void {
		if (this.startDate?.control && this.endDate?.control) {
			this.startDate.control.valueChanges.pipe(distinctUntilChanged(), takeUntil(this._destroyed)).subscribe(() => {
				this.endDate.control.updateValueAndValidity();
			});

			this.endDate.control.valueChanges.pipe(distinctUntilChanged(), takeUntil(this._destroyed)).subscribe(() => {
				this.startDate.control.updateValueAndValidity();
			});
		}
	}
}
