import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FudisSelectOption } from '../../../../../types/forms';

@Component({
  selector: 'fudis-multiselect-chip-list',
  templateUrl: './multiselect-chip-list.component.html',
  styleUrls: ['./multiselect-chip-list.component.scss'],
})
export class MultiselectChipListComponent {
  /**
   * Reference for the chip list ul element
   */
  @ViewChild('chipListRef') protected _chipListRef: ElementRef<HTMLUListElement>;

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
   * @param index clicked index
   */
  protected _clickChip(index: number) {
    this.handleClick.emit(index);

    setTimeout(() => {
      if (index === 0 && this._chipListRef.nativeElement.children[0]) {
        (this._chipListRef.nativeElement.children[0] as HTMLButtonElement).focus();
      } else if (this._chipListRef.nativeElement.children[index - 1]) {
        (this._chipListRef.nativeElement.children[index - 1] as HTMLButtonElement).focus();
      }
    }, 50);
  }
}
