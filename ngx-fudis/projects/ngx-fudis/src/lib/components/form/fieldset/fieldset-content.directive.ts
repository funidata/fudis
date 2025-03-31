import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { FudisComponentChanges, fudisFieldsetActionsAlign } from '../../../types/miscellaneous';

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
  @Input() align: fudisFieldsetActionsAlign = 'start';

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
  @HostBinding('class') private _hostClass = 'fudis-fieldset-content';
}
