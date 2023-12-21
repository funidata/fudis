import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FudisSelectOption } from '../../../../../types/forms';

@Component({
	selector: 'fudis-multiselect-chip-list',
	templateUrl: './multiselect-chip-list.component.html',
	styleUrls: ['./multiselect-chip-list.component.scss'],
})
export class MultiselectChipListComponent {
	@ViewChild('chipListRef') public chipListRef: ElementRef<HTMLUListElement>;

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
	protected _clickChip(index: number) {
		this.handleClick.emit(index);

		setTimeout(() => {
			if (index === 0 && this.chipListRef.nativeElement.children[0]) {
				(this.chipListRef.nativeElement.children[0] as HTMLButtonElement).focus();
			} else if (this.chipListRef.nativeElement.children[index - 1]) {
				(this.chipListRef.nativeElement.children[index - 1] as HTMLButtonElement).focus();
			}
		}, 50);
	}
}
