import { Directive, Input } from '@angular/core';
import { Spacing } from '../../types/spacing';

@Directive({
	selector: '[fudisSpacing]',
})
export class SpacingDirective {
	@Input() margin: Spacing;

	@Input() padding: Spacing;
}
