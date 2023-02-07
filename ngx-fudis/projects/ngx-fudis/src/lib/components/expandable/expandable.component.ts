/* eslint-disable no-underscore-dangle */
import { Component, ContentChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ExpandableType } from '../../types/expandables';
import { ExpandableContentDirective } from './expandable-content.directive';

/**
 * Example usage:
 *
 * ```
 * <fudis-expandable>
 * 	<ng-template fudisExpandableContent>
 * 		<your-body-template />
 * 	</ng-template>
 * </fudis-expandable>
 * ```
 */

@Component({
	selector: 'fudis-expandable',
	templateUrl: './expandable.component.html',
	styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent {
	@ContentChild(ExpandableContentDirective) content: ExpandableContentDirective;

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
	@Input() title: string;

	/**
	 * Optional sub title, placed underneath the main title
	 */
	@Input() subTitle?: string;

	/**
	 * This input is mainly for Storybook purposes to imitate expandable content.
	 * Do not use this Input if your expandable contains more than just plain text.
	 */
	@Input() contentText?: string;

	constructor(public ref: ElementRef) {}

	private _collapsed = true;

	get collapsed(): boolean {
		return this._collapsed;
	}

	/**
	 * Expandable is initially collapsed by default but can be controlled by [collapsed] input property
	 */
	@Input() set collapsed(value: boolean) {
		this.setCollapsedStatus(value);
	}

	/**
	 *  Lazy loading variable
	 */
	openedOnce = false;

	setCollapsedStatus(value: boolean): void {
		this._collapsed = value ?? this._collapsed;
		this.openedOnce = this.openedOnce || !this.collapsed;
		this.collapsedChange.emit(this.collapsed);
	}

	@Output() collapsedChange = new EventEmitter<boolean>();
}
