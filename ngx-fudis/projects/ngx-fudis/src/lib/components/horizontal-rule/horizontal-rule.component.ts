import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fudis-hr',
  templateUrl: './horizontal-rule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HorizontalRuleComponent {}
