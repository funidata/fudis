import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverApiDirective } from '../../../directives/tooltip/popover-api.directive';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisInputSize } from '../../../types/forms';

@Component({
  selector: 'fudis-label',
  templateUrl: './label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LabelComponent extends PopoverApiDirective {
  constructor(protected _translationService: FudisTranslationService) {
    super();
  }

  /**
   * Id for label, e. g. used in Dropdown to link ngMaterial mat-select with 'aria-labelledby' to
   * fudis-label
   */
  @Input({ required: true }) id: string;

  /**
   * Text visible as label
   */
  @Input({ required: true }) text: string;

  /**
   * HTML 'for' attribute. E.g. if text-input's id is 'text-input-1', give this id as 'for'
   * attribute to the label
   */
  @Input() for: string;

  /**
   * Show text indicating if form element associated with the label is required or not
   */
  @Input() required: boolean | null;

  /**
   * Size of Label's parent. Used to trigger Label height calculation if parent's size changes.
   */
  @Input() parentSize: FudisInputSize | 'xs';
}
