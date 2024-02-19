import { Directive, Input, Signal, effect } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationConfig } from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisIdParent } from '../../../types/id';

@Directive({
  selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective extends TooltipApiDirective {
  constructor(
    protected _idService: FudisIdService,
    protected _translationService: FudisTranslationService,
  ) {
    super();

    effect(() => {
      this._translations = this._translationService.getTranslations();

      this._requiredText = this._translations().REQUIRED;
    });
  }

  /**
   * Title legend for fieldset
   */
  @Input({ required: true }) title: string;

  /**
   * Unique id for fieldset
   */
  @Input() id: string;

  /**
   * Additional guidance text, aligned underneath the main title legend text
   */
  @Input() helpText: string;

  /**
   * Visual size of title legend. Default 'md' and 'sm' is similar to standard input label, used in e. g. RadioButtonGroup.
   */
  @Input() titleSize: 'md' | 'sm' = 'md';

  /**
   * Fudis translation key for required text
   */
  protected _requiredText: string;

  /**
   * Basic Fudis translation keys
   */
  protected _translations: Signal<FudisTranslationConfig>;

  protected _setParentId(parentType: FudisIdParent): void {
    if (this.id) {
      this._idService.addNewParentId(parentType, this.id);
    } else {
      this.id = this._idService.getNewParentId(parentType);
    }
  }
}
