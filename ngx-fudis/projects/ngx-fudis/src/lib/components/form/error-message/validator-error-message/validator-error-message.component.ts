import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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
export class ValidatorErrorMessageComponent implements OnChanges, OnDestroy, AfterViewInit {
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

  private _newError: FudisFormErrorSummaryItem;

  /**
   * Disposable object for preserving message as Observable string
   */
  private _messageSubscribtion: Subscription;

  private _subscribeToMessage(message: Observable<string>): void {
    this._messageSubscribtion = message.subscribe((value: string) => {
      if (this._currentMessage !== value) {
        this._currentMessage = value;
        this._createError();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof this.message !== 'string' && !this.message) {
        this.throwError();
      }
    }, 1000);
  }

  ngOnChanges(changes: FudisComponentChanges<ValidatorErrorMessageComponent>): void {
    if (
      changes.focusId?.currentValue !== changes.focusId?.previousValue ||
      changes.message?.currentValue !== changes.message?.previousValue ||
      changes.label?.currentValue !== changes.label?.previousValue ||
      changes.type?.currentValue !== changes.type?.previousValue ||
      changes.controlName?.currentValue !== changes.controlName?.previousValue ||
      changes.formId?.currentValue !== changes.formId?.previousValue
    ) {
      /**
       * Update string message and try to create a new error when changes happen
       */

      const newMessage = changes.message?.currentValue;
      const newLabel = changes.label?.currentValue;

      if (newMessage) {
        if (typeof newMessage === 'string') {
          this._currentMessage = newMessage;
        } else {
          this._subscribeToMessage(newMessage);
        }
      }

      if (newLabel) {
        this._createError();
      }
    }
  }

  ngOnDestroy(): void {
    this._removeError();

    if (this._messageSubscribtion) {
      this._messageSubscribtion.unsubscribe();
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
      this._newError = {
        id: this.focusId,
        error: this._currentMessage,
        formId: this.formId,
        label: this.label,
        type: this.type,
        controlName: this.controlName,
        language: this._translationService.getLanguage(),
      };

      this._addNewErrorDelay().then((resolve) => {
        if (resolve) {
          this._errorSummaryService.addNewError(this._newError);
          this._errorSent = true;
          this.handleCreateError.emit(this._newError);
        }
      });
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

  /**
   * TODO: document
   */
  private _addErrorInterval: null | NodeJS.Timeout = null;

  /**
   * Resolve a promise after delay if there hasn't been new updates to error
   * @returns boolean
   */
  private _addNewErrorDelay(): Promise<boolean> {
    let tempNewError: FudisFormErrorSummaryItem;

    return new Promise((resolve) => {
      this._addErrorInterval = setInterval(() => {
        if (tempNewError === this._newError) {
          if (this._addErrorInterval) {
            clearInterval(this._addErrorInterval);
            this._addErrorInterval = null;
          }
          resolve(true);
        } else {
          tempNewError = this._newError;
        }
      }, 100);
    });
  }
}
