import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { FudisComponentChanges } from '../../../types/miscellaneous';

@Directive({
  selector: 'fudis-fieldset-actions',
  standalone: false,
})
export class FieldsetActionsDirective implements OnChanges {
  @HostBinding('class') private _hostClass =
    'fudis-fieldset-actions fudis-fieldset-actions__align--start';

  /**
   * Alignment of Fieldset Actions container
   */
  @Input() align: 'below' | 'end' | 'start' = 'start';

  ngOnChanges(changes: FudisComponentChanges<FieldsetActionsDirective>): void {
    if (changes.align?.currentValue !== changes.align?.previousValue) {
      this._hostClass = `fudis-fieldset-actions fudis-fieldset-actions__align--${changes.align?.currentValue}`;
    }
  }
}

@Directive({
  selector: 'fudis-fieldset-content',
  standalone: false,
})
export class FieldsetContentDirective {
  /**
   * Binding CSS class to content wrapper
   */
  @HostBinding('class') private _hostClass = 'fudis-fieldset-content';
}
