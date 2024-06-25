import { Component, Input, OnChanges, OnInit, effect } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { FudisFormErrorSummaryItem } from '../../../types/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { FudisComponentChanges } from '../../../types/miscellaneous';

@Component({
  selector: 'fudis-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent implements OnChanges, OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    this._id = _idService.getNewId('guidance');

    effect(() => {
      this._maxLengthText.next(_translationService.getTranslations()().TEXTINPUT.MAX_LENGTH);
    });

    /**
     * If there's a function call of errorSummaryService.reloadFormErrors('id-of-this-form'), and this Guidance's parent Form id is that 'id-for-this-form', this effect() check will trigger and set this Guidance's control / group as touched, so possible errors are set as visible.
     */

    _errorSummaryService.allFormErrorsObservable.pipe(takeUntilDestroyed()).subscribe((errors) => {
      if (
        this.formId &&
        errors[this.formId]?.[this.for] &&
        (_errorSummaryService.formIdToUpdate === this.formId ||
          _errorSummaryService.formIdToUpdate === 'all')
      ) {
        if (this.control?.errors) {
          this.control.markAsTouched();
        } else if (this.formGroup?.errors) {
          this.formGroup.markAllAsTouched();
        }
      }
    });
  }

  /**
   * Id of input, fieldset or similar which Guidance is related to. Used in aria attributes and in emit information for Error Summary Service.
   */
  @Input({ required: true }) for: string;

  /**
   * Label text of input, fieldset or similar Guidance is related to. Used in emit information for Error Summary service.
   */
  @Input({ required: true }) inputLabel: string;

  /**
   * FormControl of related input.
   */
  @Input() control: FormControl;

  /**
   * FormGroup of related FormGroup. E.g. InputWithLanguageOptions with FormGroup
   */
  @Input() formGroup: FormGroup;

  /**
   * Text displayed as guidance help text.
   */
  @Input() helpText: string | undefined;

  /**
   * If there is no Fudis FieldSet and Error Summary associated with this input and its Guidance, 'polite' can be considered so that screen reader will get notified if there are new errors related to the input.
   */
  @Input() ariaLive: 'off' | 'polite' | 'assertive' = 'off';

  /**
   * When set displays also a character count indicator.
   */
  @Input() maxLength: number | undefined = undefined;

  /**
   * Used to match FormControl value for an Input Language Options component so that the component can display the length of the entered input for the connected language option.
   */
  @Input() selectedOption: string;

  /**
   * Used with together with Checkbox Group component, to display errors only when focus has moved outside of whole Checkbox Group.
   */
  @Input() groupBlurredOut: boolean = true;

  /**
   * Id of parent Form component
   */
  @Input() formId: string | null;

  /**
   * To trigger Error Summary reload when this Guidance's Validator Error Messages are initialised. This is used in cases when parent component (e. g. Text Input) is lazy loaded to DOM after initial Error Summary reload was called before these Validator Error Messages existed.
   */
  @Input() reloadErrorSummary: boolean = false;

  /**
   * Assistive text of max character count for screen readers. E. g. "5/20 characters used" where "characters used" is "maxLengthText".
   */
  protected _maxLengthText = new BehaviorSubject<string>('');

  /**
   * Number of characters left when screen reader is alerted about input max length
   */
  protected _maxLengthAlertThreshold: number;

  /**
   * The width of the character-limit-indicator, determined by how many digits are in the maxLength input value
   */
  protected _maxLengthWidth: 'sm' | 'md' | 'lg';

  /**
   * Id from IdService
   */
  protected _id: string;

  /**
   * Collection of validation errors
   */
  protected _lazyLoadedErrors: string[] = [];

  ngOnInit(): void {
    this._setCharacterLimitIndicatorValues();
  }

  ngOnChanges(changes: FudisComponentChanges<GuidanceComponent>): void {
    if (changes.maxLength?.currentValue !== changes.maxLength?.previousValue) {
      this._setCharacterLimitIndicatorValues();
    }
  }

  private _setCharacterLimitIndicatorValues(): void {
    if (this.maxLength) {
      this._maxLengthWidth = this.maxLength > 100 ? 'lg' : this.maxLength > 10 ? 'md' : 'sm';
      this._maxLengthAlertThreshold = this.maxLength - 5;
    }
  }

  /**
   * This function is triggered, if this component is loaded to the DOM after Error Summary has been loaded and there are new validation errors which didn't exist at the time original reload errors call was made.
   */
  protected _reloadErrorSummaryOnLazyLoad(error: FudisFormErrorSummaryItem): void {
    if (this.formId && this.reloadErrorSummary && !this._lazyLoadedErrors.includes(error.type)) {
      this._lazyLoadedErrors.push(error.type);
      this._errorSummaryService.focusToFormOnReload = null;
      this._errorSummaryService.reloadErrorsByFormId(this.formId, false);
    }
  }
}
