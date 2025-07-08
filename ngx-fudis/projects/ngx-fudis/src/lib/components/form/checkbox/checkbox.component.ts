import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { ControlComponentBaseDirective } from '../../../directives/form/control-component-base/control-component-base.directive';
import { FudisCheckboxChangeEvent, FudisCheckboxOption, FudisComponentChanges } from '../../../types/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisValidatorUtilities } from '../../../utilities/form/validator-utilities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fudis-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  standalone: false,
})
export class CheckboxComponent extends ControlComponentBaseDirective implements OnInit, OnChanges {
  constructor(_idService: FudisIdService, _focusService: FudisFocusService, protected _translationService: FudisTranslationService) {
    super(_idService, _focusService);

      this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(FudisValidatorUtilities.required(this.control));
      }
    });
  }

  /**
   * AriaLabelledBy attribute to be used when visible label is not provided
   */
  @Input() ariaLabelledBy: string;

  /**
   * Emits Checkbox change
   */
  @Output() handleChange = new EventEmitter<FudisCheckboxChangeEvent>();

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

