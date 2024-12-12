import { Directive, TemplateRef } from '@angular/core';

/**
 * Footer directives
 */
@Directive({ selector: '[fudisFooterContentLeft]' })
export class FooterContentLeftDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisFooterContentRight]' })
export class FooterContentRightDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
