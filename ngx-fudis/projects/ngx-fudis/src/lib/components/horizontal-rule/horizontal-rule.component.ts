import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Visually separates content sections.
 *
 * Use this component to visually indicate thematic breaks.
 */
@Component({
  selector: 'fudis-hr',
  templateUrl: './horizontal-rule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HorizontalRuleComponent {}
