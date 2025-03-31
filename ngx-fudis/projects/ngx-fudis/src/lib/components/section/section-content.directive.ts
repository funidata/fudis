import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'fudis-section-actions',
  standalone: false,
})
export class SectionActionsDirective {
  @HostBinding('class') private _hostClass = 'fudis-section-actions';
}

@Directive({
  selector: 'fudis-section-content',
  standalone: false,
})
export class SectionContentDirective {
  @HostBinding('class') private _hostClass = 'fudis-section-content';
}
