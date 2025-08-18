import { Directive, Input } from '@angular/core';
import { FudisPopoverPosition } from '../../types/miscellaneous';

@Directive({
  selector: '[fudisTooltipApi]',
  standalone: false,
})
export class TooltipApiDirective {
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
