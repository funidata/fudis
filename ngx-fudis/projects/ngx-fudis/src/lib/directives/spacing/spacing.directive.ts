import { Directive, Input } from '@angular/core';
import { FudisSpacing } from '../../types/miscellaneous';

@Directive({
	selector: '[fudisSpacing]',
})
export class SpacingDirective {
	@Input() margin: FudisSpacing;

	@Input() padding: FudisSpacing;
}
