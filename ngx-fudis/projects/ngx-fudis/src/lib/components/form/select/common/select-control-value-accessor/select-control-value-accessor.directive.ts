/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { joinInputValues } from '../utilities/selectUtilities';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

@Directive({
  selector: '[fudisSelectBaseControlValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectBaseControlValueAccessorDirective,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SelectBaseControlValueAccessorDirective,
      multi: true,
    },
  ],
})
class SelectBaseControlValueAccessorDirective implements ControlValueAccessor, Validator {
  constructor() {}

  onChanged: () => any = () => {};
  onTouched: () => any = () => {};
  onValidate: () => any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  writeValue(value: unknown): void {}

  registerOnChange(fn: () => any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: () => any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.invalid) {
      return control.errors;
    } else {
      return null;
    }
  }
}

@Directive({
  selector: '[fudisSelectControlValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectControlValueAccessorDirective,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SelectControlValueAccessorDirective,
      multi: true,
    },
  ],
})
export class SelectControlValueAccessorDirective extends SelectBaseControlValueAccessorDirective {
  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2,
  ) {
    super();
  }

  override writeValue(value: FudisSelectOption<object> | null): void {
    const valueToSet = value?.label || null;

    if (valueToSet) {
      this._renderer.setAttribute(this._elementRef.nativeElement, 'value', valueToSet);
    } else {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'value');
    }
  }
}

@Directive({
  selector: '[fudisMultiselectControlValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiselectControlValueAccessorDirective,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MultiselectControlValueAccessorDirective,
      multi: true,
    },
  ],
})
export class MultiselectControlValueAccessorDirective
  extends SelectBaseControlValueAccessorDirective
  implements OnChanges
{
  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2,
  ) {
    super();
  }

  @Input() dropdownRef: SelectDropdownComponent;

  @Input() selectedOptions: FudisSelectOption<object>[] | null;

  /**
   * When selecting / deselecting options, variable for storing them in the order of their id's (usually the DOM order)
   */
  protected _sortedSelectedOptions: FudisSelectOption<object>[] = [];

  ngOnChanges(changes: FudisComponentChanges<MultiselectControlValueAccessorDirective>): void {
    if (changes.selectedOptions?.currentValue !== changes.selectedOptions?.previousValue) {
      this._setVisibleLabel();
    }
  }

  private _setVisibleLabel(): void {
    const dropdown = this.dropdownRef?.dropdownElement?.nativeElement;

    if (dropdown && this.selectedOptions && this.selectedOptions?.length > 0) {
      this._sortedSelectedOptions = this.selectedOptions.sort(
        this._sortSelectedOptionsDOMOrder(dropdown),
      );

      const labelToSet = joinInputValues(this._sortedSelectedOptions);

      this._renderer.setAttribute(this._elementRef.nativeElement, 'value', labelToSet);
    } else {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'value');
    }
  }

  /**
   * Sort selected options the same order they appear in the DOM
   */
  private _sortSelectedOptionsDOMOrder(dropdown: HTMLElement | null) {
    return function (a: FudisSelectOption<object>, b: FudisSelectOption<object>): 0 | -1 | 1 {
      if (a['fudisGeneratedHtmlId'] === b['fudisGeneratedHtmlId']) {
        return 0;
      }

      if (a['fudisGeneratedHtmlId'] && b['fudisGeneratedHtmlId'] && dropdown) {
        const firstEl = dropdown.querySelector(`#${a['fudisGeneratedHtmlId']}`);

        const secondEl = dropdown.querySelector(`#${b['fudisGeneratedHtmlId']}`);

        if (firstEl && secondEl) {
          const position = firstEl.compareDocumentPosition(secondEl);

          if (
            position & Node.DOCUMENT_POSITION_FOLLOWING ||
            position & Node.DOCUMENT_POSITION_CONTAINED_BY
          ) {
            return -1;
          } else if (
            position & Node.DOCUMENT_POSITION_PRECEDING ||
            position & Node.DOCUMENT_POSITION_CONTAINS
          ) {
            return 1;
          }
        }
      }

      return 0;
    };
  }
}
