import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'fudis-form-actions',
  standalone: false,
})
export class FormActionsDirective {
  /**
   * Binding fudis-form-actions CSS class to form actions directive
   */
  @HostBinding('class') public hostClass = 'fudis-form-actions';
}

@Directive({
  selector: 'fudis-form-header',
  standalone: false,
})
export class FormHeaderDirective {
  @HostBinding('class') public hostClass = 'fudis-form-header';
}

@Directive({
  selector: 'fudis-form-content',
  standalone: false,
})
export class FormContentDirective {
  @HostBinding('class') public hostClass = 'fudis-form-content';
}
