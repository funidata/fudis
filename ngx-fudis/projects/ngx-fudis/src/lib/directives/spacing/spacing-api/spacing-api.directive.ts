import { Directive, Input } from '@angular/core';
import { FudisSpacingResponsive } from '../../../types/spacing';
import { FudisSpacing } from '../../../types/spacing';

@Directive({
  selector: '[fudisApiSpacing]',
})
export class SpacingApiDirective {
  @Input() marginTop: FudisSpacing | FudisSpacingResponsive;

  @Input() marginBottom: FudisSpacing | FudisSpacingResponsive;

  @Input() marginRight: FudisSpacing | FudisSpacingResponsive;

  @Input() marginLeft: FudisSpacing | FudisSpacingResponsive;
}
