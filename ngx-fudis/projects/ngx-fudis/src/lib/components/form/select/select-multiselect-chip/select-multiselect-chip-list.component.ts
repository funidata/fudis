import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FudisSelectOption } from '../../../../types/forms';

@Component({
	selector: 'fudis-select-multiselect-chip-list',
	templateUrl: './select-multiselect-chip-list.component.html',
	styleUrls: ['./select-multiselect-chip-list.component.scss'],
})
export class SelectMultiselectChipListComponent {
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
	@Output() removedChipIndex = new EventEmitter<number>();

	removeChip(event: Event, index: number) {
		const eventTarget = event.target as HTMLButtonElement;
		if (eventTarget.nextElementSibling) {
			(eventTarget.nextElementSibling as HTMLButtonElement).focus();
		} else if (eventTarget.previousElementSibling) {
			(eventTarget.previousElementSibling as HTMLButtonElement).focus();
		}

		this.removedChipIndex.emit(index);
	}
}
