import { Directive, TemplateRef } from '@angular/core';

/**
 * Footer directives
 */
@Directive({
  selector: '[fudisFooterContentLeft]',
  standalone: false,
})
export class FooterContentLeftDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[fudisFooterContentRight]',
  standalone: false,
})
export class FooterContentRightDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
