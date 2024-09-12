import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  effect,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FudisSelectOption, FudisInputSize } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'into-depr-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent
  extends InputBaseDirective
  implements OnInit, AfterContentInit, OnChanges, AfterViewInit
{
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    private _focusService: FudisFocusService,
    private _translationService: FudisTranslationService,
    _idService: FudisIdService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _changeDetectorRef);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required = hasRequiredValidator(this.control);
      }
    });

    effect(() => {
      this._clearFilterText =
        this._translationService.getTranslations()().SELECT.AUTOCOMPLETE.CLEAR;
    });
  }

  /**
   * FormControl for the input.
   */
  @Input({ required: true }) override control: FormControl<FudisSelectOption<object> | null>;

  /**
   * Option list
   */
  @Input({ required: true }) options: FudisSelectOption<object>[];

  /**
   * Available sizes for the autocomplete - defaults to large.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Pre-selected dropdown options.
   * If string, it fills the input with given string. NOTE: This sets formControl's value to 'null' if string does not match of any labels from 'options'.
   * If given FudisSelectOption, it searches given 'options' input array for matching 'value' and 'label' with selectedOptions and updates formControl value with item from 'options' input.
   */
  @Input() selectedOption: string | FudisSelectOption<object>[];

  /**
   * Option whether the dropdown options are shown only after three charactes (search) or if options are displayed when focusing the search input even without typing (dropdown)
   */
  @Input() variant: 'search' | 'dropdown' = 'search';

  /**
   * Placeholder text in input when selection is not yet made
   */
  @Input() placeholder: string;

  /**
   * Internal formControl to check if typed text matches with any of the options' label
   */
  protected _autocompleteFormControl = new FormControl<string | null>('');

  /**
   * Internal filtered options derived from options Input
   */
  protected _filteredOptions: Observable<FudisSelectOption<object>[] | null>;

  /**
   * Translated aria-label for close icon which clears the input
   */
  protected _clearFilterText: string;

  ngOnInit(): void {
    this._setInputId('autocomplete');
    this._updateValueAndValidityTrigger.next();
  }

  ngAfterContentInit() {
    this._setInitialValues();
    this._checkFilteredOptions();
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
  }

  // KATSO MALLIA SELECT BASE CONSTRUCTORISTA
  ngOnChanges(changes: FudisComponentChanges<AutocompleteComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._applyControlUpdateCheck();
    }
  }

  /**
   * Clear any written or selected value in the autocomplete field
   */
  protected _clearFilter(): void {
    // Clear input field and control value
    this.control.setValue(null);
    this._autocompleteFormControl.setValue(null);

    this._checkFilteredOptions();

    // After clearing set focus back to input field
    this._inputRef.nativeElement.focus();
  }

  /**
   * Handle blur and set control as touched
   */
  protected _autocompleteBlur(event: FocusEvent): void {
    this.control.markAsTouched();
    if (this.control.valid && this.control.value) {
      this._autocompleteFormControl.patchValue(this.control.value.label);
    }
    this.handleBlur.emit(event);
  }

  private _setInitialValues(): void {
    if (this.control.value) {
      this._autocompleteFormControl.patchValue(this.control.value.label);
    } else if (this.selectedOption && typeof this.selectedOption !== 'string') {
      const findMe = this.selectedOption;

      const foundIndex = this.options.findIndex(
        (option: FudisSelectOption<object>) =>
          option.value === findMe[foundIndex].value && option.label === findMe[foundIndex].label,
      );
      if (foundIndex !== -1) {
        this._autocompleteFormControl.patchValue(this.options[foundIndex].label);
        this.control.patchValue(this.options[foundIndex]);
      }
    } else if (this.selectedOption) {
      this._autocompleteFormControl.patchValue(this.selectedOption);
      this._updateControlValue(this.selectedOption);
    }
  }

  private _checkFilteredOptions() {
    if (this.variant === 'search') {
      this._filteredOptions = this._autocompleteFormControl.valueChanges.pipe(
        startWith(this._autocompleteFormControl.value),
        map((value) => {
          this._updateControlValue(value);
          // Start filtering after three characters
          if (value && value.length > 2 && !this.control.value) {
            return this._filter(value);
          }
          return [];
        }),
      );
    }
    if (this.variant === 'dropdown') {
      this._filteredOptions = this._autocompleteFormControl.valueChanges.pipe(
        // Without empty string the dropdown does not open after clearing the input
        // Without internal control value the validation does not work when using selectedOption
        // TODO: Could be improved/get rid of startWith. This seems to be a bit sticky so current solution might affect performance.
        startWith(this._autocompleteFormControl.value || ''),
        map((value) => {
          this._updateControlValue(value);
          if ((value || value === '') && !this.control.value) {
            return this._filter(value);
          }
          return [];
        }),
      );
    }
  }

  /**
   * Check that value is found from given options list, if not set control as null
   */
  private _updateControlValue(value: string | null): void {
    if (!value) {
      this.control.patchValue(null);
    } else {
      const optionValue = this.options.find((option) => {
        return option.label.toLowerCase() === value.toLowerCase() ? option : null;
      });

      if (optionValue) {
        this.control.patchValue(optionValue);
      } else {
        this.control.patchValue(null);
      }
    }
  }

  /**
   * Filter options when user inputs text or opens dropdown
   */
  private _filter(value: string): FudisSelectOption<object>[] {
    if (value || value === '') {
      const filterValue = value.toLowerCase();
      const filteredOptions = this.options.filter((option) =>
        option.label.toLowerCase().includes(filterValue),
      );

      return filteredOptions;
    }
    return [];
  }
}
