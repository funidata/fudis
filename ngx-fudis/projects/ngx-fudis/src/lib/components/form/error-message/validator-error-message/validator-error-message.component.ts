import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../services/id/id.service';
import {
  FudisFormErrorSummaryItem,
  FudisFormErrorSummaryRemoveItem,
} from '../../../../types/forms';
import { FudisComponentChanges } from '../../../../types/miscellaneous';

@Component({
  selector: 'fudis-validator-error-message',
  templateUrl: './validator-error-message.component.html',
  styleUrls: ['./validator-error-message.component.scss'],
})
export class ValidatorErrorMessageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  constructor(
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
  ) {
    this._id = _idService.getNewId('validator-error-message');
  }

  /**
   * Id of input this message is related to. Sent to Error Summary service.
   */
  @Input({ required: true }) focusId: string;

  /**
   * Label text of input this message is related to. Sent to Error Summary service.
   */
  @Input({ required: true }) label: string;

  /**
   * Error type from different keys in e. g. control.errors such as 'required' and 'minlength'
   */
  @Input({ required: true }) type: string;

  /**
   * If error is visible or not.
   */
  @Input() visible: boolean = false;

  /**
   * Error message to display
   */
  @Input({ required: true }) message: Observable<string> | string;

  /**
   * Name of control this error is related to.
   */
  @Input() controlName: string | undefined = undefined;

  /**
   * Visual variant of error message
   */
  @Input() variant: 'body-text' | 'form-error' = 'form-error';

  /**
   * Id of parent Form component
   */
  @Input() formId: string | null;

  /**
   * Output for handling a state when error is sent to Error Summary
   */
  @Output() handleCreateError = new EventEmitter<FudisFormErrorSummaryItem>();

  /**
   * Output for handling a state when error is removed from Error Summary
   */
  @Output() handleRemoveError = new EventEmitter<FudisFormErrorSummaryRemoveItem>();

  /**
   * Error message to include in error summary item
   */
  protected _currentMessage: string;

  /**
   * Id generated with FudisIdService
   */
  protected _id: string;

  /**
   * Has error been created and sent forward
   */
  private _errorSent: boolean = false;

  /**
   * Disposable object for preserving message as Observable string
   */
  private _subscribtion: Subscription;

  /**
   * To prevent ngOnChanges running before initial ngOnInit
   */
  private _initFinished: boolean = false;

  ngOnInit(): void {
    /**
     * Create validator error message if a message is a observable string
     */
    if (this.message && typeof this.message !== 'string') {
      this._subscribtion = this.message.subscribe((value: string) => {
        this._currentMessage = value;
        this._createError();
      });
    }
    /**
     * Create validator error message if a message is a string
     */
    if (typeof this.message === 'string') {
      this._currentMessage = this.message;
      this._createError();
    }

    this._initFinished = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof this.message !== 'string' && !this.message) {
        this.throwError();
      }
    }, 1000);
  }

  ngOnChanges(changes: FudisComponentChanges<ValidatorErrorMessageComponent>): void {
    if (this._initFinished) {
      if (
        changes.focusId ||
        changes.message ||
        changes.label ||
        changes.type ||
        changes.controlName ||
        changes.formId
      ) {
        /**
         * Update string message and try to create a new error when changes happen
         */
        if (typeof this.message === 'string') {
          this._currentMessage = this.message;
        }

        this._createError();
      }
    }
  }

  ngOnDestroy(): void {
    this._removeError();

    if (this._subscribtion) {
      this._subscribtion.unsubscribe();
    }
  }

  throwError(): void {
    if (this.controlName) {
      console.warn(
        `Fudis component with id of '${this.focusId}' and control name of '${this.controlName}' is missing error message for error type of: '${this.type}'`,
      );
    } else {
      console.warn(
        `Fudis component with id of '${this.focusId}' is missing error message for error type of: '${this.type}'`,
      );
    }
  }

  private _createError(): void {
    if (this.formId && this.focusId && this._currentMessage && this.label) {
      const newError: FudisFormErrorSummaryItem = {
        id: this.focusId,
        error: this._currentMessage,
        formId: this.formId,
        label: this.label,
        type: this.type,
        controlName: this.controlName,
        language: this._translationService.getLanguage(),
      };

      this._errorSummaryService.addNewError(newError);
      this._errorSent = true;
      this.handleCreateError.emit(newError);
    }
  }

  private _removeError(): void {
    if (this._errorSent && this.formId) {
      const errorToRemove: FudisFormErrorSummaryRemoveItem = {
        id: this.focusId,
        formId: this.formId,
        type: this.type,
        controlName: this.controlName,
      };

      this._errorSummaryService.removeError(errorToRemove, this.formId);
      this.handleRemoveError.emit(errorToRemove);
    }
  }
}
