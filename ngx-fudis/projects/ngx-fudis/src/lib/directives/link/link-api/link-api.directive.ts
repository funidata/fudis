import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fudisLinkApi]',
})
export class LinkApiDirective {
  /**
   * Link size. By default link will inherit its parent's font-size. If link is not inside e.g. <fudis-heading> or <fudis-body-text> its size can be defined either 'md' (14px) or 'lg' (16px).
   */
  @Input() size: 'inherit' | 'md' | 'lg' = 'inherit';

  /**
   * Set browser focus to link on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * Id for the anchor element. By default generated with FudisIdService
   */
  @Input() id: string;
}
