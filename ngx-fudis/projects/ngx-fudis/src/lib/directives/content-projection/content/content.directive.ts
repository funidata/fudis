import { Directive, Input, TemplateRef } from '@angular/core';

// TODO: Write tests for all Content Directives in this file
/**
 * A marker directive used to tag the template that will be rendered inside the allowed components
 */
@Directive({ selector: '[fudisContent]' })
export class ContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}

  /**
   * Component type to protect wrong content projection to nested components
   */
  @Input({ required: true }) type:
    | 'expandable'
    | 'notification'
    | 'form'
    | 'fieldset'
    | 'section'
    | 'select-options';
}

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

/**
 * Error Message directives for Date Range Component
 */
@Directive({ selector: '[fudisStartDateError]' })
export class StartDateErrorDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisEndDateError]' })
export class EndDateErrorDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
