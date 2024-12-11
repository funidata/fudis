import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'fudis-section-actions',
})
export class SectionActionsDirective {
  /**
   * Binding CSS class to section actions wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-section-actions';
}

@Directive({
  selector: 'fudis-section-content',
})
export class SectionContentDirective {
  /**
   * Binding CSS class to section content wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-section-content';
}
