import { Component, Input, OnInit, effect } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';

@Component({
  selector: 'fudis-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent implements OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {
    this._id = _idService.getNewId('guidance');

    effect(() => {
      this._maxLengthText = _translationService.getTranslations()().TEXTINPUT.MAX_LENGTH;
    });

    effect(() => {
      const errors = _errorSummaryService.getErrorsOnReload()();

      if (
        this.formId &&
        errors[this.formId]?.[this.for] &&
        (_errorSummaryService.formIdToUpdate === this.formId ||
          _errorSummaryService.formIdToUpdate === 'all')
      ) {
        if (this.control) {
          this.control.markAsTouched();
        } else if (this.formGroup) {
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
   * FormGroup of related FormGroup.
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
  protected _maxLengthText: string;

  /**
   * Number of characters left when screen reader is alerted about input max length
   */
  protected _maxLengthAlertThreshold: number;

  /**
   * Id from IdService
   */
  protected _id: string;

  protected _firstReloadFinished: boolean = false;

  ngOnInit(): void {
    if (this.maxLength) {
      this._maxLengthAlertThreshold = this.maxLength - 5;
    }
  }

  protected _disableReload(): void {
    if (this.formId && this.reloadErrorSummary && !this._firstReloadFinished) {
      this._firstReloadFinished = true;
      this._errorSummaryService.focusToFormOnReload = null;
      this._errorSummaryService.reloadErrorsByFormId(this.formId);
    }
  }
}
