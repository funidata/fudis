import { Directive, Input } from '@angular/core';
import { FudisPopoverPosition } from '../../types/miscellaneous';

@Directive({
  selector: '[fudisPopoverApi]',
  standalone: false,
})
export class PopoverApiDirective {
  /**
   * Text placed inside popover
   */
  @Input() popoverText: string;

  /**
   * Position of the popover on the parent element
   */
  @Input() popoverPosition: FudisPopoverPosition = 'below';

  /**
   * Label for the element that triggers the popover
   */
  @Input() popoverTriggerLabel: string;
}
