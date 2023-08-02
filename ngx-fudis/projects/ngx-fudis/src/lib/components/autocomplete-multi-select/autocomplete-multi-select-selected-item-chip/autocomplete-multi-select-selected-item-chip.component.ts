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
	 * Output for deleting the chip item
	 */
	@Output() deleteItem = new EventEmitter<FudisDropdownOption>();

	// eslint-disable-next-line class-methods-use-this
	deleteChipItem(event: any, item: FudisDropdownOption) {
		if (event.target.nextElementSibling) {
			event.target.nextElementSibling.focus();
		} else if (event.target.previousElementSibling) {
			event.target.previousElementSibling.focus();
		}

		const index = this.selectedItems.indexOf(item);
		this.selectedItems.splice(index, 1);
		this.deleteItem.emit(item);
	}
}
