import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FudisIdService } from '../../../../services/id/id.service';
import {
  FudisErrorSummaryNewError,
  FudisErrorSummaryRemoveError,
} from '../../../../types/errorSummary';
import { FudisComponentChanges } from '../../../../types/miscellaneous';

@Component({
  selector: 'fudis-validator-error-message',
  templateUrl: './validator-error-message.component.html',
  styleUrls: ['./validator-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidatorErrorMessageComponent implements OnChanges, OnDestroy, AfterViewInit {
  constructor(
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private _idService: FudisIdService,
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
  @Output() handleCreateError = new EventEmitter<FudisErrorSummaryNewError>();

  /**
   * Output for handling a state when error is removed from Error Summary
   */
  @Output() handleRemoveError = new EventEmitter<FudisErrorSummaryRemoveError>();

  /**
   * Error message to include in error summary item
   */
  protected _currentMessage = new BehaviorSubject<string>('');

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
  private _messageSubscribtion: Subscription;

  private _subscribeToMessage(message: Observable<string>): void {
    this._messageSubscribtion = message.subscribe((value: string) => {
      if (this._currentMessage.value !== value) {
        this._currentMessage.next(value);
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
      changes.message?.currentValue !== changes.message?.previousValue ||
      changes.label?.currentValue !== changes.label?.previousValue ||
      changes.formId?.currentValue !== changes.formId?.previousValue
    ) {
      /**
       * Update string message and try to create a new error when changes happen
       */

      const newMessage = changes.message?.currentValue;
      const newLabel = changes.label?.currentValue;
      const newFormId = changes.formId?.currentValue;

      if (newMessage) {
        if (typeof newMessage === 'string') {
          this._currentMessage.next(newMessage);
          this._createError();
        } else {
          this._subscribeToMessage(newMessage);
        }
      }

      if (newLabel) {
        this._createError();
      }

      if (newFormId) {
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
    if (this.formId && this.focusId && this._currentMessage.value) {
      const newError: FudisErrorSummaryNewError = {
        focusId: this.focusId,
        formId: this.formId,
        message: `${this.label}: ${this._currentMessage.value}`,
        id: this.controlName ? `${this.type}_${this.controlName}` : this.type,
      };

      this._errorSummaryService.addError(newError);
      this._errorSent = true;
      this.handleCreateError.emit(newError);
    }
  }

  private _removeError(): void {
    if (this._errorSent && this.formId) {
      const errorToRemove: FudisErrorSummaryRemoveError = {
        focusId: this.focusId,
        formId: this.formId,
        id: this.controlName ? `${this.type}_${this.controlName}` : this.type,
      };

      this._errorSummaryService.removeError(errorToRemove);
      this.handleRemoveError.emit(errorToRemove);
    }
  }
}
