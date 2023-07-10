import {
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { ActionsDirective } from '../../../directives/content-projection/actions/actions.directive';
import { NotificationsDirective } from '../../../directives/content-projection/notifications/notifications.directive';
import { FudisGridWidth, FudisGridAlign, FudisGridMarginSide } from '../../../types/grid';
import { FudisSpacing } from '../../../types/miscellaneous';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisErrorSummaryService } from '../error-summary/error-summary.service';
import { FudisFormErrorSummarySection } from '../../../types/forms';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent extends FieldSetBaseDirective implements AfterViewInit, OnInit, OnDestroy, OnChanges {
	@ContentChild(ActionsDirective) headerActions: ActionsDirective | null;

	@ContentChild(NotificationsDirective) notifications: NotificationsDirective;

	@ContentChild(ContentDirective) content: ContentDirective;

	@ViewChild('fieldset') fieldset: ElementRef;

	constructor(
		private _idService: FudisIdService,
		private _errorSummaryService: FudisErrorSummaryService,
		private _fieldsetTranslationService: FudisTranslationService
	) {
		super(_fieldsetTranslationService);
	}

	/**
	 * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
	 * xxl = Default value. Viewports of 1600px and larger
	 * xl = Viewports smaller than 1600px
	 * lg = Viewports smaller than 1200px
	 * md = Viewports smaller than 992px
	 * sm = Viewports smaller than 768px
	 * xs = Viewports smaller than 576px
	 */
	@Input() width: FudisGridWidth = 'xxl';

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
	 * Set focus to fieldset when it appears first time
	 */
	@Input() initialFocus: boolean = false;

	/**
	 * To disable sending information about this Fieldset to Error Summary service
	 */
	@Input() errorSummaryBreadcrumb: boolean = true;

	/**
	 * Display "Required" text next to fieldset main title. By default set to 'undefined'.
	 */
	@Input() required: boolean | undefined = undefined;

	private _fieldsetSent: boolean = false;

	private _fieldsetInfo: FudisFormErrorSummarySection;

	protected _title: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('fieldset');
		this._title = this.title;
		this.addToErrorSummary();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this.fieldset.nativeElement.focus();
		}
	}

	ngOnChanges(): void {
		if (this.title !== this._title && this._id) {
			this._title = this.title;
			this.addToErrorSummary();
		}
	}

	addToErrorSummary(): void {
		if (this.errorSummaryBreadcrumb) {
			this._fieldsetInfo = {
				id: this._id,
				title: this._title,
			};

			this._errorSummaryService.addFieldset(this._fieldsetInfo);

			this._fieldsetSent = true;
		}
	}

	removeFromErrorSummary(): void {
		if (this.errorSummaryBreadcrumb && this._fieldsetSent) {
			this._errorSummaryService.removeFieldset(this._fieldsetInfo);
		}
	}

	ngOnDestroy(): void {
		this.removeFromErrorSummary();
	}
}
