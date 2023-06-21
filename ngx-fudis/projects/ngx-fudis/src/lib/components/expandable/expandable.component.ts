import { Component, ContentChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ExpandableType } from '../../types/expandables';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { IdService } from '../../utilities/id-service.service';

/**
 * Example usage:
 *
 * ```
 * <fudis-expandable>
 *  <ng-template fudisActions>
 *    <fudis-button />
 *  </ng-template>
 * 	<ng-template fudisContent>
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
export class ExpandableComponent {
	@ContentChild(ContentDirective) content: ContentDirective;

	@ContentChild(ActionsDirective) headerButtons: ActionsDirective;

	/**
	 * Tag is for semantic support for screen readers, this does not change the appearance of the expandable
	 */
	@Input() tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';

	/**
	 * Type i.e the look of the expandable
	 */
	@Input() variant: ExpandableType = ExpandableType.regular;

	/**
	 * Title for the expandable
	 */
	@Input({ required: true }) title: string;

	/**
	 * Optional sub title, placed underneath the main title
	 */
	@Input() subTitle: string;

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

	constructor(private _idService: IdService) {
		this._id = _idService.getNewId('expandable');
	}

	/**
	 *  Lazy loading variable
	 */
	protected _openedOnce = false;

	setCollapsedStatus(value: boolean): void {
		this._collapsed = value ?? this._collapsed;
		this._openedOnce = this._openedOnce || !this._collapsed;
		this.collapsedChange.emit(this._collapsed);
	}

	@Output() collapsedChange = new EventEmitter<boolean>();
}
