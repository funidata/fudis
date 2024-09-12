import { Directive, Input, effect } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisIdParent } from '../../../types/id';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { Subject } from 'rxjs';

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
      this._requiredText.next(_translationService.getTranslations()().REQUIRED);
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
   * If component is a child of Form component, Form's Error Summary is visible, this component's control has errors and when this component is loaded for the first time, it will by default call Error Summary to reload itself again and mark control as touched. This is because if component is lazy loaded to the DOM after the initial reload errors call was made, errors of this component might not appear on the list. To disable this feature, set this to false.
   */
  @Input() errorSummaryReloadOnInit: boolean = true;

  /**
   * Trigger update when control validator is changed
   */
  protected _updateValueAndValidityTrigger = new Subject<void>();

  /**
   * Fudis translation key for required text
   */
  protected _requiredText = new Subject<string>();

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

  /**
   * TODO: write test check cdr logic
   *
   * Tell Guidance, that this component has errors which were not loaded to Error Summary, if component was initialised after parent's Error Summary was set to visible.
   */
  protected _reloadErrorSummaryOnInit(
    parentFormErrorSummaryVisible: boolean | undefined,
    control?: FormControl,
    group?: FormGroup,
  ): boolean {
    if (
      this.errorSummaryReloadOnInit &&
      parentFormErrorSummaryVisible &&
      (control?.invalid || group?.invalid)
    ) {
      return true;
    }
    return false;
  }
}
