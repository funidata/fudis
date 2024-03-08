import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FudisLinkColor } from '../../types/miscellaneous';

@Directive({
  selector: '[fudisLinkApi]',
})
export class LinkApiDirective {
  /**
   * Link size. By default link will inherit its parent's font-size. If link is not inside e.g. <fudis-heading> or <fudis-body-text> its size can be defined either 'md' (14px) or 'lg' (16px).
   */
  @Input() size: 'inherit' | 'md' | 'lg' = 'inherit';

  /**
   * Link color
   */
  @Input() color: FudisLinkColor = 'primary-dark';

  /**
   * Set browser focus to link on the first load.
   */
  @Input() initialFocus: boolean = true;

  /**
   * Focus event output
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  /**
   * Blur event output
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * Handle Link Component focus event
   */
  protected _handleFocus(event: FocusEvent): void {
    this.handleFocus.emit(event);
  }

  /**
   * Handle Link Component blur event
   */
  protected _handleBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }
}
