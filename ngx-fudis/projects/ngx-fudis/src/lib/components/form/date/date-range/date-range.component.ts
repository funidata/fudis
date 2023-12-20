import {
	AfterContentInit,
	Component,
	ContentChild,
	ElementRef,
	Inject,
	Input,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { untilDestroyed } from '../../../../utilities/untilDestroyed';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisDateRangeItem } from '../../../../types/forms';
import {
	DateEndErrorDirective,
	DateStartErrorDirective,
} from '../../../../directives/content-projection/content/content.directive';

@Component({
	selector: 'fudis-date-range',
	templateUrl: './date-range.component.html',
	styleUrls: ['./date-range.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DateRangeComponent implements OnInit, AfterContentInit {
	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _idService: FudisIdService
	) {}

	@ViewChild('dateRangeRef') _dateRangeRef: ElementRef;

	/**
	 * Content projection directive fudisDateStartError is used when there's a need to bind custom ErrorMessage to Date Range's start date
	 */
	@ContentChild(DateStartErrorDirective) startDateError: DateStartErrorDirective;

	/**
	 * Content projection directive fudisDateEndError is used when there's a need to bind custom ErrorMessage to Date Range's end date
	 */
	@ContentChild(DateEndErrorDirective) endDateError: DateEndErrorDirective;

	/**
	 * Settings for start date
	 */
	@Input({ required: true }) startDate: FudisDateRangeItem;

	/**
	 * Settings for end date
	 */
	@Input({ required: true }) endDate: FudisDateRangeItem;

	/**
	 * Id for Date Range component
	 */
	@Input() id: string;

	/**
	 * Set browser focus to start date input on the first load.
	 */
	@Input() initialFocus: boolean = false;

	/**
	 * If setting height to equal is completed
	 */
	protected _heightSet: boolean = false;

	/**
	 * Counter for number of tries setting equal height to Date Picker
	 */
	private _heightSetTryCounter: number = 0;

	private _untilDestroyed = untilDestroyed();

	ngOnInit(): void {
		if (this.id) {
			this._idService.addNewId('daterange', this.id);
		} else {
			this.id = this._idService.getNewId('daterange');
		}
	}

	ngAfterContentInit(): void {
		/**
		 * Subscribe to control value changes, so we can trigger start date and end date comparison
		 */
		if (this.startDate?.control && this.endDate?.control) {
			this.startDate.control.valueChanges.pipe(distinctUntilChanged(), this._untilDestroyed()).subscribe(() => {
				this.checkDateCrossings();
			});

			this.endDate.control.valueChanges.pipe(distinctUntilChanged(), this._untilDestroyed()).subscribe(() => {
				this.checkDateCrossings();
			});
		}
		this.setLabelHeight();
	}

	/**
	 * Height of Date Pickers might vary if other one has tooltip and other one not, or if other one has longer label. This sets their label height equal, so they should remain aligned.
	 */
	setLabelHeight(): void {
		const labels = (this._dateRangeRef?.nativeElement as HTMLDivElement)?.querySelectorAll('.fudis-label');
		if (labels?.length === 2) {
			const labelOneHeigth = labels[0].clientHeight;
			const labelTwoHeigth = labels[1].clientHeight;

			const fontSize = Number(
				window.getComputedStyle(this._document.body).getPropertyValue('font-size').replace('px', '')
			);

			if (labelOneHeigth > labelTwoHeigth) {
				(labels[1] as HTMLLabelElement).style.height = `${labelOneHeigth / fontSize}rem`;
			} else if (labelTwoHeigth > labelOneHeigth) {
				(labels[0] as HTMLLabelElement).style.height = `${labelTwoHeigth / fontSize}rem`;
			}

			this._heightSet = true;
		} else if (this._heightSetTryCounter < 100) {
			setTimeout(() => {
				this._heightSetTryCounter += 1;
				this.setLabelHeight();
			}, 100);
		}
	}

	/**
	 * Check and set, if start date is set to after end date.s
	 */
	checkDateCrossings(): void {
		const startDateErrors = this.startDate.control?.errors;
		const endDateErrors = this.endDate.control?.errors;

		const startDate = this.startDate.control?.value;
		const endDate = this.endDate.control?.value;

		// Compate only dates, do not take hours into account.
		if (startDate && endDate && startDate.setHours(0, 0, 0, 0) > endDate.setHours(0, 0, 0, 0)) {
			this.startDate.control.setErrors({ ...startDateErrors, matStartDateInvalid: true });
			this.endDate.control.setErrors({ ...endDateErrors, matEndDateInvalid: true });
		} else if (startDateErrors || endDateErrors) {
			if (startDateErrors) {
				delete startDateErrors['matStartDateInvalid'];
				this.startDate.control.setErrors({ ...startDateErrors });
				this.startDate.control.updateValueAndValidity();
			}
			if (endDateErrors) {
				delete endDateErrors['matEndDateInvalid'];
				this.endDate.control.setErrors({ ...endDateErrors });
				this.endDate.control.updateValueAndValidity();
			}
		}
	}
}
