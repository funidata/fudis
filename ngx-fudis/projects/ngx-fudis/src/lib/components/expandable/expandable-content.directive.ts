import { Directive, HostBinding, TemplateRef } from '@angular/core';

@Directive({
  selector: 'fudis-expandable-actions',
  standalone: false,
})
export class ExpandableActionsDirective {
  @HostBinding('class') private _hostClass = 'fudis-expandable-actions';
}

@Directive({
  selector: '[fudisExpandableContent]',
  standalone: false,
})
export class ExpandableContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
