import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Displays additional content in an overlay container.
 */
@Component({
  selector: 'fudis-popover',
  templateUrl: './popover.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
  @Input() id: string;
  @Input() popoverText: string;
}
