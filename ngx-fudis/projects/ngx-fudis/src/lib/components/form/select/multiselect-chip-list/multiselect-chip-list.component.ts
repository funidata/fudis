import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FudisSelectOption } from '../../../../types/forms';

@Component({
	selector: 'fudis-multiselect-chip-list',
	templateUrl: './multiselect-chip-list.component.html',
	styleUrls: ['./multiselect-chip-list.component.scss'],
})
export class MultiselectChipListComponent {
	/**
	 * Array of selected chip items
	 */
	@Input() selectedItems: FudisSelectOption[];

	/**
	 * Parent component id for binding aria attributes
	 */
	@Input() parentId: string;

	/**
	 * Output for removed chip index in selectedItems
	 */
	@Output() handleClick = new EventEmitter<number>();

	/**
	 * Focuses to the sibling and emits clicked index
	 * @param event click event
	 * @param index clicked index
	 */
	protected _clickChip(event: Event, index: number) {
		const eventTarget = event.target as HTMLButtonElement;
		if (eventTarget.nextElementSibling) {
			(eventTarget.nextElementSibling as HTMLButtonElement).focus();
		} else if (eventTarget.previousElementSibling) {
			(eventTarget.previousElementSibling as HTMLButtonElement).focus();
		}
		this.handleClick.emit(index);
	}
}
