import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FudisDropdownOption } from '../../../types/forms';

@Component({
	selector: 'fudis-autocomplete-multi-select-selected-item-chip',
	templateUrl: './autocomplete-multi-select-selected-item-chip.component.html',
	styleUrls: ['./autocomplete-multi-select-selected-item-chip.component.scss'],
})
export class AutocompleteMultiSelectSelectedItemChipComponent {
	/**
	 * Array of selected chip items
	 */
	@Input() selectedItems: FudisDropdownOption[];

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
