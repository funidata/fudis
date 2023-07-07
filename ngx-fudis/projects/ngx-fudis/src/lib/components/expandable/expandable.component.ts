import {
	Component,
	ContentChild,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation,
	OnInit,
	OnDestroy,
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
export class ExpandableComponent implements OnInit, OnDestroy {
	@ContentChild(ContentDirective) content: ContentDirective;

	@ContentChild(ActionsDirective) headerButtons: ActionsDirective | null;

	/**
	 * Tag is for semantic support for screen readers, this does not change the appearance of the expandable
	 */
	@Input() tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';

	/**
	 * Type i.e the look of the expandable
	 */
	@Input() variant: FudisExpandableType = 'regular';

	/**
	 * Title for the expandable
	 */
	@Input({ required: true }) title: string;

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

	protected _collapsed = true;

	public getCollapsedStatus(): boolean {
		return this._collapsed;
	}

	protected _id: string;

	constructor(private _idService: FudisIdService, private _errorSummaryService: FudisErrorSummaryService) {
		this._id = `${_idService.getNewId('expandable')}-heading`;
	}

	/**
	 *  Lazy loading variable
	 */
	protected _openedOnce = false;

	private _errorSummaryInfo: FudisFormErrorSummarySection;

	private _errorSummaryInfoSent: boolean = false;

	setCollapsedStatus(value: boolean): void {
		this._collapsed = value ?? this._collapsed;
		this._openedOnce = this._openedOnce || !this._collapsed;
		this.collapsedChange.emit(this._collapsed);
	}

	@Output() collapsedChange = new EventEmitter<boolean>();

	ngOnInit(): void {
		this.addToErrorSummary();
	}

	ngOnDestroy(): void {
		this.removeFromErrorSummary();
	}

	addToErrorSummary(): void {
		if (this.errorSummaryBreadcrumb) {
			this._errorSummaryInfo = {
				id: this._id,
				title: this.title,
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
