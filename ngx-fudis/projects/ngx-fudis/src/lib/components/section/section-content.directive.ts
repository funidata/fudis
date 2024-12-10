import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'fudis-section-actions',
})
export class SectionActionsDirective {
  /**
   * Binding fudis-section__header__actions CSS class to section actions wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-section__header__actions';
}

@Directive({
  selector: 'fudis-section-content',
})
export class SectionContentDirective {
  /**
   * Binding fudis-section__content CSS class to section content wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-section__content';
}
