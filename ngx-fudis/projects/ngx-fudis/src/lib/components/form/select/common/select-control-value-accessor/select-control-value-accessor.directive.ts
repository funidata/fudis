/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  EventEmitter,
  Output,
  Inject,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FudisSelectOption } from '../../../../../types/forms';
import { joinInputValues } from '../utilities/selectUtilities';
import { DOCUMENT } from '@angular/common';
import { FudisComponentChanges } from '../../../../../../lib/types/miscellaneous';

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
export class SelectControlValueAccessorDirective
  extends SelectBaseControlValueAccessorDirective
  implements OnChanges
{
  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2,
  ) {
    super();
  }

  @Input() filterText: string | null;

  ngOnChanges(changes: FudisComponentChanges<SelectControlValueAccessorDirective>): void {
    if (changes.filterText?.currentValue !== changes.filterText?.previousValue) {
      this.writeValue();
    }
  }

  override writeValue(value?: FudisSelectOption<object> | null): void {
    const valueToSet = value?.label || null;

    if (valueToSet) {
      this._renderer.setAttribute(this._elementRef.nativeElement, 'value', valueToSet);
      if (this._elementRef.nativeElement.value !== valueToSet) {
        this._elementRef.nativeElement.value = valueToSet;
      }
    } else if (this.filterText) {
      this._renderer.setAttribute(this._elementRef.nativeElement, 'value', this.filterText);
      if (this._elementRef.nativeElement.value !== this.filterText) {
        this._elementRef.nativeElement.value = this.filterText;
      }
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
  implements AfterViewInit
{
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _elementRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2,
  ) {
    super();
  }

  @Input() id: string;
  @Input() enableAutocomplete: boolean = false;

  @Output() handleSortedSelectedOptions = new EventEmitter<FudisSelectOption<object>[] | null>();

  ngAfterViewInit(): void {
    this.writeValue(this._selectedOptions);
  }

  /**
   * When selecting / deselecting options, variable for storing them in the order of their id's (usually the DOM order)
   */
  protected _selectedOptions: FudisSelectOption<object>[] | null = null;

  override writeValue(value: FudisSelectOption<object>[] | null): void {
    this._selectedOptions = value;

    this._setVisibleLabel(value);
  }

  private _setVisibleLabel(value: FudisSelectOption<object>[] | null): void {
    const dropdown = this._document.getElementById(`${this.id}-dropdown`);

    if (value) {
      const sortedSelectedOptions = dropdown
        ? [...value].sort(this._sortSelectedOptionsDOMOrder(dropdown, this.id))
        : [...value];

      this.handleSortedSelectedOptions.emit(sortedSelectedOptions);

      if (!this.enableAutocomplete) {
        const labelToSet = joinInputValues(sortedSelectedOptions);

        this._renderer.setAttribute(this._elementRef.nativeElement, 'value', labelToSet);
      }
    } else {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'value');
      this.handleSortedSelectedOptions.emit(null);
    }
  }

  /**
   * Sort selected options the same order they appear in the DOM
   */
  private _sortSelectedOptionsDOMOrder(dropdown: HTMLElement | null, id: string) {
    return function (a: FudisSelectOption<object>, b: FudisSelectOption<object>): 0 | -1 | 1 {
      if (a.value === b.value) {
        return 0;
      }

      const aSelector = `#${id}-option-${a.value}`;
      const bSelector = `#${id}-option-${b.value}`;

      if (dropdown) {
        const firstEl = dropdown.querySelector(aSelector);

        const secondEl = dropdown.querySelector(bSelector);

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
