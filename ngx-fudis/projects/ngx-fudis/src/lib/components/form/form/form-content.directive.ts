import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'fudis-form-actions',
  standalone: false,
})
export class FormActionsDirective {
  @HostBinding('class') private _hostClass = 'fudis-form-actions';
}

@Directive({
  selector: 'fudis-form-header',
  standalone: false,
})
export class FormHeaderDirective {
  @HostBinding('class') private _hostClass = 'fudis-form-header';
}

@Directive({
  selector: 'fudis-form-content',
  standalone: false,
})
export class FormContentDirective {
  @HostBinding('class') private _hostClass = 'fudis-form-content';
}
