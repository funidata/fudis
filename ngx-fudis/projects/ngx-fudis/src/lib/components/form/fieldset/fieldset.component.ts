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
import { FudisIdService } from '../../../services/id/id.service';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FudisFormErrorSummarySection, FudisInputSize } from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdComponent } from '../../../types/id';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent extends FieldSetBaseDirective implements AfterViewInit, OnInit, OnDestroy, OnChanges {
	constructor(
		_idService: FudisIdService,
		_translationService: FudisTranslationService,
		private _errorSummaryService: FudisErrorSummaryService
	) {
		super(_idService, _translationService);
	}

	@ContentChild(ActionsDirective) headerActions: ActionsDirective | null;

	@ContentChild(NotificationsDirective) notifications: NotificationsDirective;

	@ContentChild(ContentDirective) content: ContentDirective;

	@ViewChild('fieldset') fieldset: ElementRef;

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
	 * Overrides 'width' input. Used to set Checkbox Group and Radio Button Group as wide as other basic form components.
	 */
	@Input() inputSize: FudisInputSize;

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

	/**
	 * Title property to send to error summary service
	 */
	protected _title: string;

	protected _classes: string[];

	/**
	 * Has fieldset been added to error summary
	 */
	private _fieldsetSent: boolean = false;

	/**
	 * Fieldset object to send to error summary
	 */
	private _fieldsetInfo: FudisFormErrorSummarySection;

	ngOnInit(): void {
		this._setFieldsetId('fieldset');

		this._title = this.title;
		this.addToErrorSummary();
		this._setClasses();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this.fieldset.nativeElement.focus();
		}
	}

	ngOnChanges(): void {
		if (this.title !== this._title && this.id) {
			this._title = this.title;
			this.addToErrorSummary();
		}
		this._setClasses();
	}

	addToErrorSummary(): void {
		if (this.errorSummaryBreadcrumb) {
			this._fieldsetInfo = {
				id: this.id,
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

	private _setClasses(): void {
		if (this.inputSize) {
			this._classes = ['fudis-fieldset', `fudis-input-size__${this.inputSize}`];
		} else {
			this._classes = ['fudis-fieldset'];
		}
	}

	private _setFieldsetId(componentType: FudisIdComponent): void {
		if (this.id) {
			this._idService.addNewId(componentType, this.id);
		} else {
			this.id = this._idService.getNewId(componentType);
		}
	}
}
