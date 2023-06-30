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
	 * Aria-label to indicate deleting item chip
	 */
	@Input() ariaLabel: string = 'Remove filter';

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
		} else {
			// TODO: Focus input kenttään jos/kun poistetaan ainoa/viimeinen chip itemi
			console.log('TODO: focus input kenttään');
		}

		const index = this.selectedItems.indexOf(item);
		this.selectedItems.splice(index, 1);
		this.deleteItem.emit(item);
	}
}
