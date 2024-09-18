import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fudis-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
