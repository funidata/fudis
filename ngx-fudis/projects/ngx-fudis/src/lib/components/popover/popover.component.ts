import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fudis-popover',
  standalone: true,
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
  @Input() id: string;
  @Input() popoverText: string;
}
