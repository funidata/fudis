/* eslint-disable max-classes-per-file */
import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside the allowed components
 */
@Directive({ selector: '[fudisContent]' })
export class ContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}

  @Input({ required: true }) type:
    | 'expandable'
    | 'notification'
    | 'form'
    | 'fieldset'
    | 'section'
    | 'select-options';
}

/**
 * Fudis Footer directives
 */
@Directive({ selector: '[fudisFooterLeft]' })
export class FooterContentLeftDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisFooterRight]' })
export class FooterContentRightDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

/**
 * Fudis Error Message directives for a use of Fudis Date Range Component
 */
@Directive({ selector: '[fudisDateStartError]' })
export class DateStartErrorDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisDateEndError]' })
export class DateEndErrorDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
