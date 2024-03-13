import { ChangeDetectorRef, Directive, Input, Signal, effect } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationConfig } from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisIdParent } from '../../../types/id';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective extends TooltipApiDirective {
  constructor(
    protected _idService: FudisIdService,
    protected _translationService: FudisTranslationService,
    protected _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();

    effect(() => {
      this._translations = this._translationService.getTranslations();

      this._requiredText = this._translations().REQUIRED;
    });
  }

  /**
   * Label legend for fieldset
   */
  @Input({ required: true }) label: string;

  /**
   * Unique id for fieldset
   */
  @Input() id: string;

  /**
   * Additional guidance text, aligned underneath the main label legend text
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
   * To trigger Error Summary reload when this component's children Validator Error Messages are initialised. This is used in cases when this parent component is lazy loaded to DOM after initial Error Summary reload was called before children Validator Error Messages existed.
   */
  protected _reloadErrorSummary = false;

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

  // TODO: write tests
  protected reloadErrorSummary(group: FormGroup): void {
    if (group.errors) {
      this._reloadErrorSummary = true;
      this._changeDetectorRef.detectChanges();
    }
  }
}
