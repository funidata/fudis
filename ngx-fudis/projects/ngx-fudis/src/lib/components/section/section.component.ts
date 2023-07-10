import { Component, ContentChild, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisHeadingTag, FudisHeadingSize } from '../../types/typography';
import { NotificationsDirective } from '../../directives/content-projection/notifications/notifications.directive';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { FudisGridWidth, FudisGridAlign, FudisGridMarginSide } from '../../types/grid';

import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisSpacing } from '../../types/miscellaneous';
import { FudisErrorSummaryService } from '../form/error-summary/error-summary.service';
import { FudisFormErrorSummarySection } from '../../types/forms';

@Component({
	selector: 'fudis-section',
	templateUrl: './section.component.html',
	styleUrls: ['./section.component.scss'],
})
export class SectionComponent extends TooltipApiDirective implements OnInit, OnChanges, OnDestroy {
	@ContentChild(NotificationsDirective) notifications: NotificationsDirective | null;

	@ContentChild(ContentDirective) content: ContentDirective | null;

	@Input() id: string;

	@Input({ required: true }) title: string;

	@Input() titleTag: FudisHeadingTag = 'h2';

	@Input() titleSize: FudisHeadingSize = 'lg';

	/**
	 * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
	 * xxl = Default value. Viewports of 1600px and larger
	 * xl = Viewports smaller than 1600px
	 * lg = Viewports smaller than 1200px
	 * md = Viewports smaller than 992px
	 * sm = Viewports smaller than 768px
	 * xs = Viewports smaller than 576px
	 */
	@Input() width: FudisGridWidth = 'initial';

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: FudisGridAlign = 'center';

	/**
	 * Margin top for the Grid
	 */
	@Input() marginTop: FudisSpacing = 'none';

	/**
	 * Margin bottom for the Grid
	 */
	@Input() marginBottom: FudisSpacing = 'none';

	/**
	 * Horizontal margins left and right of the grid
	 */
	@Input() marginSides: FudisGridMarginSide = 'none';

	/**
	 * Custom CSS classes for Grid element
	 */
	@Input() classes: string[];

	@Input() errorSummaryBreadcrumb: boolean = false;

	constructor(private _idService: FudisIdService, private _errorSummaryService: FudisErrorSummaryService) {
		super();
	}

	protected _headingId: string;

	protected _classList: string[];

	protected _id: string;

	private _errorSummaryInfo: FudisFormErrorSummarySection;

	private _errorSummaryInfoSent: boolean = false;

	protected _title: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('section');

		this._headingId = `${this._id}-heading`;

		this._classList = this.getClasses();
		this._title = this.title;
		this.addToErrorSummary();
	}

	ngOnChanges(): void {
		this._classList = this.getClasses();

		if (this.title !== this._title && this._id) {
			this._title = this.title;
			this.addToErrorSummary();
		}
	}

	ngOnDestroy(): void {
		this.removeFromErrorSummary();
	}

	private getClasses(): string[] {
		const cssClasses = this.classes ?? [];

		cssClasses.push('fudis-section');

		return cssClasses;
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
