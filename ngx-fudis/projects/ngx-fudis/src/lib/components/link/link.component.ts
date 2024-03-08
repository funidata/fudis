import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkDirective } from '../../directives/link/link.directive';

@Component({
  selector: 'fudis-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent extends LinkDirective {}
