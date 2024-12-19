import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  effect,
  inject,
  AfterContentInit,
  signal,
  AfterViewInit,
  Injector,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { FudisErrorSummaryNewError } from '../../../types/errorSummary';

@Component({
  selector: 'fudis-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _errorSummaryService: FudisInternalErrorSummaryService,
    private _elementRef: ElementRef,
  ) {
    this._id = _idService.getNewId('guidance');

    effect(() => {
      this._maxLengthText.next(_translationService.getTranslations()().TEXTINPUT.MAX_LENGTH);
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
   * FormGroup of related FormGroup. E.g. LocalizedTextGroup with FormGroup
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
  @Input() maxLength: number | null = null;

  /**
   * Used to match FormControl value for the Localized Text Group component so that the component can display the length of the entered input for the connected language option.
   */
  @Input() selectedOption: string;

  /**
   * Used with together with Checkbox Group component, to display errors only when focus has moved outside of whole Checkbox Group.
   */
  @Input() groupBlurredOut: boolean = true;

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

  protected _parentFormId = new BehaviorSubject<string | null>(null);

  /**
   * Used prevent checks in HTML DOM before content has been loaded
   */
  protected _afterViewInitDone = signal<boolean>(false);

  private _injector = inject(Injector);

  ngOnInit(): void {
    this._setCharacterLimitIndicatorValues();
  }

  ngOnChanges(changes: FudisComponentChanges<GuidanceComponent>): void {
    if (changes.maxLength?.currentValue !== changes.maxLength?.previousValue) {
      this._setCharacterLimitIndicatorValues();
    }
  }

  ngAfterContentInit(): void {
    this._errorSummaryService
      .getFormAncestorId(this._elementRef.nativeElement as HTMLElement)
      .then((formParentId) => {
        if (formParentId) {
          this._parentFormId.next(formParentId);
          this._subscribeToErrors(formParentId);
        } else {
          this._parentFormId.next(null);
        }
      });
  }

  ngAfterViewInit(): void {
    this._afterViewInitDone.set(true);
  }

  private _subscribeToErrors(formId: string): void {
    /**
     * If there's a function call of errorSummaryService.reloadFormErrors('id-of-this-form'), and this Guidance's parent Form id is that 'id-for-this-form', this effect() check will trigger and set this Guidance's control / group as touched, so possible errors are set as visible.
     */

    toObservable(this._errorSummaryService.errorsSignal[formId], {
      injector: this._injector,
    }).subscribe((errors) => {
      let errorsFound = !!errors?.[this.for];

      // With FormGroups errors are defined differently, so this checks if FormGroups control has errors
      if (this.formGroup && !errorsFound) {
        errorsFound = Object.keys(this.formGroup.controls).some((controlName) => {
          const errorId = this._errorSummaryService.defineErrorId(this.for, controlName);

          return !!errors?.[errorId];
        });
      }

      if (errorsFound) {
        if (this.control?.invalid) {
          this.control.markAsTouched();
        } else if (this.formGroup?.invalid) {
          this.formGroup.markAllAsTouched();
        }
      }
    });
  }

  private _setCharacterLimitIndicatorValues(): void {
    if (this.maxLength) {
      this._maxLengthWidth = this.maxLength >= 100 ? 'lg' : this.maxLength >= 10 ? 'md' : 'sm';
      this._maxLengthAlertThreshold = this.maxLength - 5;
    }
  }

  /**
   * This function is triggered, if this component is loaded to the DOM after Error Summary has been loaded and there are new validation errors which didn't exist at the time original reload errors call was made. It will only trigger reload once all errors of this Guidance are registered.
   */
  protected _reloadErrorSummaryOnLazyLoad(error: FudisErrorSummaryNewError): void {
    if (
      this._parentFormId.value &&
      this._errorSummaryService.errorSummaryVisibilityStatus[this._parentFormId.value]() &&
      !this._lazyLoadedErrors.includes(error.id)
    ) {
      this._lazyLoadedErrors.push(error.id);
      this._errorSummaryService.focusToFormOnReload = null;

      let numberOfErrors = 0;

      if (this.control?.errors) {
        numberOfErrors = numberOfErrors + Object.keys(this.control.errors).length;
      }

      if (this.formGroup) {
        if (this.formGroup.errors) {
          numberOfErrors = numberOfErrors + Object.keys(this.formGroup.errors).length;
        }

        Object.keys(this.formGroup.controls).forEach((control) => {
          const controlErrors = this.formGroup.controls[control]?.errors;

          if (controlErrors) {
            numberOfErrors = numberOfErrors + Object.keys(controlErrors).length;
          }
        });
      }

      if (numberOfErrors === this._lazyLoadedErrors.length && this._afterViewInitDone()) {
        this._errorSummaryService.reloadFormErrors(this._parentFormId.value, false);
      }
    }
  }
}
