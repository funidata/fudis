import { Directive, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { FudisPopoverPosition, FudisTooltipPosition } from '../../types/miscellaneous';

@Directive({
  selector: '[fudisTooltipApi]',
  providers: [MatTooltip],
})
export class TooltipApiDirective {
  /**
   * Text placed inside tooltip
   */

  // TODO: should this be renamed to tooltipText? also get rid off undefined type

  @Input() tooltip: string | undefined;

  /**
   * Trigger tooltip on click
   */
  @Input() tooltipToggle = false;

  /**
   * Position of the tooltip on the parent element
   */
  @Input() tooltipPosition: FudisTooltipPosition = 'below';

  /**
   * Text placed inside popover
   */
  @Input() popoverText: string;

  /**
   * Position of the popover on the parent element
   */
  @Input() popoverPosition: FudisPopoverPosition = 'below';
}
