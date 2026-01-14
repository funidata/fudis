import { Directive, HostBinding } from '@angular/core';

/**
 * Identifies the actions area of a section.
 *
 * Use this directive to add buttons that affect the section as a whole.
 */
@Directive({
  selector: 'fudis-section-actions',
  standalone: false,
})
export class SectionActionsDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-section-actions';
}

/**
 * Identifies the main content area of a section.
 *
 * Use this directive to structure section content.
 */
@Directive({
  selector: 'fudis-section-content',
  standalone: false,
})
export class SectionContentDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-section-content';
}
