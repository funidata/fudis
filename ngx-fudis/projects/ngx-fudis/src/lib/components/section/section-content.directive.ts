import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: 'fudis-section-actions',
    standalone: false
})
export class SectionActionsDirective {
  /**
   * Binding CSS class to section actions wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-section-actions';
}

@Directive({
    selector: 'fudis-section-content',
    standalone: false
})
export class SectionContentDirective {
  /**
   * Binding CSS class to section content wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-section-content';
}
