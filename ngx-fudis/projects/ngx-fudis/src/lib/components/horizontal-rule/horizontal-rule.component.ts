import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fudis-hr',
  templateUrl: './horizontal-rule.component.html',
  styleUrls: ['./horizontal-rule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalRuleComponent {}
