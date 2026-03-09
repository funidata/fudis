import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FudisSelectOption } from '../../../../../types/forms';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';

@Component({
  selector: 'fudis-multiselect-chip-list',
  templateUrl: './multiselect-chip-list.component.html',
  styleUrls: ['./multiselect-chip-list.component.scss'],
  standalone: false,
})
export class MultiselectChipListComponent<T = string> {
  constructor(protected _translationService: FudisTranslationService) {}
  /**
   * Reference for the chip list ul element
   */
  @ViewChild('chipListRef') protected _chipListRef: ElementRef<HTMLUListElement>;

  /**
   * Array of selected chip items
   */
  @Input() selectedItems: FudisSelectOption<T>[];

  /**
   * Parent component id for binding aria attributes
   */
  @Input() parentId: string;

  /**
   * Output for removed chip index in selectedItems
   */
  @Output() handleClick = new EventEmitter<FudisSelectOption<T>>();

  /**
   * If focus is in some of the chip buttons
   */
  protected _focused: boolean = false;

  /**
   * Focus setter
   */
  protected _setFocus(value: boolean): void {
    this._focused = value;
  }

  /**
   * Focuses to the sibling and emits clicked index
   *
   * @param index Clicked index
   */
  protected _clickChip(clickedOption: FudisSelectOption<T>, index: number) {
    this.handleClick.emit(clickedOption);
    setTimeout(() => {
      const buttons = this._chipListRef.nativeElement.querySelectorAll('button');
      if (index === 0 && buttons[0]) {
        buttons[0].focus();
      } else if (buttons[index - 1]) {
        buttons[index - 1].focus();
      }
    }, 50);
  }
}
