import { Directive, Input } from '@angular/core';
import { TFudisSpacing } from '../grid/gridUtils';

@Directive({
	selector: '[fudisSpacing]',
})
export class SpacingDirective {
	@Input() margin: TFudisSpacing;

	@Input() padding: TFudisSpacing;
}
