import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  DestroyRef,
  inject,
} from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import {
  FudisCheckboxChangeEvent,
  FudisCheckboxOption,
  FudisComponentChanges,
} from '../../../types/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisValidatorUtilities } from '../../../utilities/form/validator-utilities';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

/**
 * Represents a single boolean form control.
 *
 * Use this component when user need to toggle an option on or off.
 */
@Component({
  selector: 'fudis-checkbox',
  templateUrl: './checkbox.component.html',
  standalone: false,
})
export class CheckboxComponent implements OnInit, OnChanges {
  constructor(
    private _idService: FudisIdService,
    protected _translationService: FudisTranslationService,
  ) {
    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(FudisValidatorUtilities.required(this.control));
      }
    });
  }

  /**
   * FormControl for the input
   */
  @Input({ required: true }) control: FormControl;

  /**
   * Checkbox id. By default generated
   */
  @Input() id: string;

  /**
   * Label for the Checkbox
   */
  @Input() label: string;

  /**
   * AriaLabelledBy attribute to be used when visible label is not provided
   */
  @Input() ariaLabelledBy: string;

  /**
   * AriaDescribedBy attribute for linking custom error messages to Checkbox input
   */
  @Input() ariaDescribedBy: string;

  /**
   * Emits Checkbox change
   */
  @Output() handleChange = new EventEmitter<FudisCheckboxChangeEvent>();

  /**
   * Trigger update when control validator is changed
   */
  protected _updateValueAndValidityTrigger = new Subject<void>();

  /**
   * Set requiredText based on this boolean value
   */
  protected _required = new BehaviorSubject<boolean>(false);

  protected _destroyRef = inject(DestroyRef);

  /**
   * Subscription for handling the valueChanges observable
   */
  private _subscription: Subscription;

  /**
   * If Checkbox has focus
   */
  protected _focused = false;

  /**
   * When Checkbox is focused
   */
  protected _onFocus(): void {
    this._focused = true;
  }

  /**
   * When Checkbox is blurred
   */
  protected _onBlur(): void {
    this._focused = false;
  }

  /**
   * Manual toggle for checkbox checked state
   */
  protected _onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.checked ? true : null;

    this.control.setValue(newValue);
    this.control.markAsTouched();
    this.control.updateValueAndValidity();

    const optionToEmit: FudisCheckboxOption<object> = {
      id: this.id,
      label: this.label,
      value: newValue,
    };

    // Emit after control updates
    this.handleChange.emit({ checkbox: optionToEmit, control: this.control });
  }

  ngOnInit() {
    if (this.id) {
      this._idService.addNewId('checkbox', this.id);
    } else {
      this.id = this._idService.getNewId('checkbox');
    }

    this._updateValueAndValidityTrigger.next();
  }

  /**
   * Add value and validity check when control value changes
   */
  ngOnChanges(changes: FudisComponentChanges<CheckboxComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._subscription?.unsubscribe();
      this._subscription = this.control.valueChanges
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this._updateValueAndValidityTrigger.next());
    }
  }
}
