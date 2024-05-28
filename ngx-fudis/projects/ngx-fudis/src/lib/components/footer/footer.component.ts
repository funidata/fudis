import {
  Component,
  ContentChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FudisGridColumnsResponsive } from '../../types/grid';
import { FudisTranslationService } from '../../services/translation/translation.service';

import {
  FooterContentLeftDirective,
  FooterContentRightDirective,
} from '../../directives/content-projection/content/content.directive';

@Component({
  selector: 'fudis-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(
    protected _translationService: FudisTranslationService,
    private _cdr: ChangeDetectorRef,
  ) {}

  /**
   * Content projection directive fudisFooterContentLeft is used for binding correct Footer content on the left side of the component.
   */
  @ContentChild(FooterContentLeftDirective)
  protected _footerContentLeft: FooterContentLeftDirective;

  /**
   * Content projection directive fudisFooterContentRight is used for binding correct Footer content on the right side of the component.
   */
  @ContentChild(FooterContentRightDirective)
  protected _footerContentRight: FooterContentRightDirective;

  /**
   * Used to apply grid columns breakpoint values for the Footer
   */
  protected _columns: FudisGridColumnsResponsive = { sm: 2 };
}
