import { Component, OnInit, Input } from '@angular/core';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Variant = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

@Component({
  selector: 'fudis-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class Heading {
  constructor() {}

  @Input() variant: Variant;

  /**
   * @required
   */
  @Input() tag: HeadingLevel;
}
