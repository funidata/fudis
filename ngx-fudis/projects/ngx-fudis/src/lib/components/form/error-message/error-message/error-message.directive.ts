import {
  DestroyRef,
  Directive,
  EventEmitter,
  Host,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import {
  FudisValidationErrors,
  FudisValidatorFn,
  FudisValidatorMessage,
} from '../../../../utilities/form/validators';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { TextInputComponent } from '../../text-input/text-input.component';
import { TextAreaComponent } from '../../text-area/text-area.component';
import { DatepickerComponent } from '../../date/datepicker/datepicker.component';
import { LocalizedTextGroupComponent } from '../../localized-text-group/localized-text-group.component';
import { CheckboxGroupComponent } from '../../checkbox-group/checkbox-group.component';
import { RadioButtonGroupComponent } from '../../radio-button-group/radio-button-group.component';
import { SelectComponent } from '../../select/select/select.component';
import { MultiselectComponent } from '../../select/multiselect/multiselect.component';
import { FudisComponentChanges } from '../../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisCheckboxGroupFormGroup } from '../../../../types/forms';

@Directive({
  selector: 'fudis-error-message',
})
export class ErrorMessageDirective implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    @Host() @Optional() private _textInput: TextInputComponent,
    @Host() @Optional() private _textArea: TextAreaComponent,
    @Host() @Optional() private _datePicker: DatepickerComponent,
    @Host() @Optional() private _LocalizedTextGroup: LocalizedTextGroupComponent,
    @Host()
    @Optional()
    private _checkboxGroup: CheckboxGroupComponent<FudisCheckboxGroupFormGroup<object>>,
    @Host() @Optional() private _select: SelectComponent,
    @Host() @Optional() private _multiSelect: MultiselectComponent,
    @Host() @Optional() private _radioButtonGroup: RadioButtonGroupComponent,
  ) {
    if (_textInput) {
      this._parent = _textInput;
    } else if (_textArea) {
      this._parent = _textArea;
    } else if (_datePicker) {
      this._parent = _datePicker;
    } else if (_radioButtonGroup) {
      this._parent = _radioButtonGroup;
    } else if (_LocalizedTextGroup) {
      this._parentGroup = _LocalizedTextGroup;
    } else if (_checkboxGroup) {
      this._parentGroup = _checkboxGroup;
    } else if (_select) {
      this._parent = _select;
    } else if (_multiSelect) {
      this._parent = _multiSelect;
    }

    this._id = _idService.getNewId('error-message');
  }

  /**
   * Error message to display
   */
  @Input({ required: true }) message: Observable<string> | string;

  /**
   * Output for handling a state when error is sent to Error Summary
   */
  @Output() handleAddError = new EventEmitter<FudisValidationErrors>();

  /**
   * Output for handling a state when error is removed from Error Summary
   */
  @Output() handleRemoveError = new EventEmitter<FudisValidationErrors>();

  /**
   * Id generated with FudisIdService
   */
  private _id: string;

  /**
   * Boolean determining if Error Message is added
   */
  private _errorAdded: boolean = false;

  /**
   * Convert provided string message to an observable so it updates accordingly in the validator
   */
  private _messageStringAsObservable: Subject<string>;

  /**
   * Possible parent components to used with Error Message
   */
  private _parent:
    | TextInputComponent
    | TextAreaComponent
    | DatepickerComponent
    | RadioButtonGroupComponent
    | SelectComponent
    | MultiselectComponent;

  /**
   * Possible parent group components to used with Error Message
   */
  private _parentGroup:
    | LocalizedTextGroupComponent
    | CheckboxGroupComponent<FudisCheckboxGroupFormGroup<object>>;

  /**
   * Custom instance of FudisValidator
   */
  private _customValidatorInstance: FudisValidatorFn;

  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if ((this._parent || this._parentGroup) && this.message) {
      this._addControlValidator();
    }
  }

  ngOnChanges(changes: FudisComponentChanges<ErrorMessageDirective>): void {
    const newMessage = changes.message?.currentValue;

    if (newMessage !== changes.message?.previousValue) {
      /**
       * Update validator message if message is a string and not observable
       */
      if (typeof newMessage === 'string') {
        if (!this._messageStringAsObservable) {
          this._messageStringAsObservable = new BehaviorSubject<string>(newMessage);
          this._customValidatorInstance = this._customControlValidatorFn(
            this._messageStringAsObservable,
          );
        } else {
          this._messageStringAsObservable.next(newMessage);
        }
        this._parent?.control?.updateValueAndValidity();
        this._parentGroup?.formGroup?.updateValueAndValidity();
      } else if (newMessage) {
        this._customValidatorInstance = this._customControlValidatorFn(newMessage);

        newMessage.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
          this._parent?.control?.updateValueAndValidity();
          this._parentGroup?.formGroup?.updateValueAndValidity();
        });
      }
    }
  }

  ngOnDestroy(): void {
    this._removeValidator();
  }

  /**
   * Create custom validator with error message
   */
  private _customControlValidatorFn(message: FudisValidatorMessage): FudisValidatorFn {
    return (control: AbstractControl) => {
      if (!control) {
        return null;
      }
      return { [this._id]: { message } };
    };
  }

  /**
   * Add created validator to the parent component control
   */
  private _addControlValidator(): void {
    if (this._parent) {
      this._errorAdded = true;
      this._parent.control.addValidators(this._customValidatorInstance);
      this._parent.control.updateValueAndValidity();
      this.handleAddError.emit({ [this._id]: { message: this.message } });
    } else if (this._parentGroup) {
      this._errorAdded = true;
      this._parentGroup.formGroup.addValidators(this._customValidatorInstance);
      this._parentGroup.formGroup.updateValueAndValidity();
      this.handleAddError.emit({ [this._id]: { message: this.message } });
    }
  }

  /**
   * Remove created validator from parent component control
   */
  private _removeValidator(): void {
    if (this._parent && this._customValidatorInstance && this._errorAdded) {
      this._errorAdded = false;
      this._parent.control.removeValidators(this._customValidatorInstance);
      this._parent.control.updateValueAndValidity();
      this.handleRemoveError.emit({ [this._id]: { message: this.message } });
    } else if (this._parentGroup && this._customValidatorInstance && this._errorAdded) {
      this._errorAdded = false;
      this._parentGroup.formGroup.removeValidators(this._customValidatorInstance);
      this._parentGroup.formGroup.updateValueAndValidity();
      this.handleRemoveError.emit({ [this._id]: { message: this.message } });
    }
  }
}
