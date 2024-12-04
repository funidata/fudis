import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { FudisComponentChanges } from '../../../types/miscellaneous';

@Directive({
  selector: 'fudis-fieldset-actions',
})
export class FieldsetActionsDirective implements OnChanges {
  /**
   * Binding fudis-form__header__actions__dialog CSS class to form header wrapper
   */
  @HostBinding('class') public hostClass =
    'fudis-fieldset-actions fudis-fieldset-actions__align--start';

  /**
   * Alignment of Fieldset Actions container
   */
  @Input() align: 'below' | 'end' | 'start' = 'start';

  ngOnChanges(changes: FudisComponentChanges<FieldsetActionsDirective>): void {
    if (changes.align?.currentValue !== changes.align?.previousValue) {
      this.hostClass = `fudis-fieldset-actions fudis-fieldset-actions__align--${changes.align?.currentValue}`;
    }
  }
}

@Directive({
  selector: 'fudis-fieldset-content',
})
export class FieldsetContentDirective {
  /**
   * Binding fudis-form__header__actions__dialog CSS class to form header wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-fieldset';
}
