import {
	Component,
	ContentChild,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation,
	OnInit,
	OnDestroy,
	OnChanges,
} from '@angular/core';
import { FudisExpandableType } from '../../types/miscellaneous';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisErrorSummaryService } from '../form/error-summary/error-summary.service';
import { FudisFormErrorSummarySection } from '../../types/forms';

/**
 * Example usage:
 *
 * ```
 * <fudis-expandable>
 *  <ng-template fudisActions type="expandable">
 *    <fudis-button />
 *  </ng-template>
 * 	<ng-template fudisContent type="expandable">
 * 		<your-body-template />
 * 	</ng-template>
 * </fudis-expandable>
 * ```
 */

@Component({
	selector: 'fudis-expandable',
	templateUrl: './expandable.component.html',
	styleUrls: ['./expandable.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ExpandableComponent implements OnInit, OnDestroy, OnChanges {
	constructor(
		private _idService: FudisIdService,
		private _errorSummaryService: FudisErrorSummaryService
	) {
		this._id = this._idService.getNewId('expandable');
		this._headingId = `${this._id}-heading`;
	}

	@ContentChild(ContentDirective) content: ContentDirective;

	@ContentChild(ActionsDirective) headerButtons: ActionsDirective | null;

	/**
	 * Title of the expandable
	 */
	@Input({ required: true }) title: string;

	/**
	 * Determines header's semantic aria-level for screen readers, default is equivalent for h2
	 */
	@Input() level: number = 2;

	/**
	 * Type i.e visual variant of the expandable
	 */
	@Input() variant: FudisExpandableType = 'regular';

	/**
	 * Expandable content padding depth
	 */
	@Input() padding: 'default' | 'small' = 'default';

	/**
	 * Optional sub title, placed underneath the main title
	 */
	@Input() subTitle: string;

	/**
	 * Display Expandable title in the breadcrumb of Form Error Summary
	 */
	@Input() errorSummaryBreadcrumb: boolean = false;

	/**
	 * Expandable is initially collapsed by default but can be controlled by [collapsed] input property
	 */
	@Input() set collapsed(value: boolean) {
		this.setCollapsedStatus(value);
	}

	/**
	 * Optional output function when the collapsed status changes
	 */
	@Output() collapsedChange = new EventEmitter<boolean>();

	/**
	 * Internal boolean of whether the expandable is currently collapsed
	 */
	protected _collapsed: boolean = true;

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	/**
	 * Internal, separate unique heading id
	 */
	protected _headingId: string;

	/**
	 *  Lazy loading check for expanding content
	 */
	protected _openedOnce: boolean = false;

	/**
	 * Internal, separate title property to send to error summary service
	 */
	protected _title: string;

	/**
	 * Object to send to error summary service
	 */
	private _errorSummaryInfo: FudisFormErrorSummarySection;

	/**
	 * Is info sent to error summary service
	 */
	private _errorSummaryInfoSent: boolean = false;

	public getCollapsedStatus(): boolean {
		return this._collapsed;
	}

	setCollapsedStatus(value: boolean): void {
		this._collapsed = value ?? this._collapsed;
		this._openedOnce = this._openedOnce || !this._collapsed;
		this.collapsedChange.emit(this._collapsed);
	}

	ngOnInit(): void {
		this._title = this.title;
		this.addToErrorSummary();
	}

	ngOnChanges(): void {
		if (this.title !== this._title && this._id) {
			this._title = this.title;
			this.addToErrorSummary();
		}
	}

	ngOnDestroy(): void {
		this.removeFromErrorSummary();
	}

	addToErrorSummary(): void {
		if (this.errorSummaryBreadcrumb) {
			this._errorSummaryInfo = {
				id: this._id,
				title: this._title,
			};
			this._errorSummaryService.addSection(this._errorSummaryInfo);
			this._errorSummaryInfoSent = true;
		}
	}

	removeFromErrorSummary(): void {
		if (this._errorSummaryInfoSent) {
			this._errorSummaryService.removeSection(this._errorSummaryInfo);
		}
	}
}
