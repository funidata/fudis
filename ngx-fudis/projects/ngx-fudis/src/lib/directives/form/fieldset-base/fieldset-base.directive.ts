import { Directive, Input, Signal, effect } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationConfig } from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisIdParent } from '../../../types/id';
import { FormGroup } from '@angular/forms';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';

@Directive({
  selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective extends TooltipApiDirective {
  constructor(
    protected _idService: FudisIdService,
    protected _translationService: FudisTranslationService,
    protected _errorSummaryService: FudisInternalErrorSummaryService,
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
   * Fudis translation key for required text
   */
  protected _requiredText: string;

  /**
   * Basic Fudis translation keys
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * To prevent ngOnChanges running before initial ngOnInit
   */
  protected _initFinished: boolean = false;

  /**
   * Generate id for parent component
   */
  protected _setParentId(parentType: FudisIdParent): void {
    if (this.id) {
      this._idService.addNewParentId(parentType, this.id);
    } else {
      this.id = this._idService.getNewParentId(parentType);
    }
  }

  // TODO: write tests and move to inputbase
  protected reloadErrorSummary(group: FormGroup, formId: string): void {
    if (group.errors) {
      group.markAllAsTouched();

      this._errorSummaryService.focusToFormOnReload = null;
      this._errorSummaryService.reloadErrorsByFormId(formId);
    }
  }
}
