import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Optional,
  Host,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisInputSize, FudisInputType } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxFromValidator,
  getMaxLengthFromValidator,
  getMinFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';
import { FormComponent } from '../form/form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';

@Component({
  selector: 'fudis-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent
  extends InputBaseDirective
  implements OnInit, AfterViewInit, OnChanges
{
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    private _focusService: FudisFocusService,
    _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
  ) {
    super(_idService, _changeDetectorRef);
    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required = hasRequiredValidator(this.control);

        if (this.type === 'number') {
          this._minNumber = getMinFromValidator(this.control);
          this._maxNumber = getMaxFromValidator(this.control);
          this._maxLength = null;
          this._minLength = null;
        } else {
          this._maxLength = getMaxLengthFromValidator(this.control);
          this._minLength = getMinLengthFromValidator(this.control);
          this._minNumber = null;
          this._maxNumber = null;
        }
      }
    });
  }

  /**
   * FormControl for text-input
   */
  @Input({ required: true }) override control: FormControl<string | null | number>;

  /**
   * Available sizes for the input. Recommended size for number input is 'sm'.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Type of the input - defaults to 'text'
   */
  @Input() type: FudisInputType = 'text';

  /**
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected override _maxLength: number | null = null;

  /**
   * Min length for HTML attribute
   */
  protected _minLength: number | null = null;

  /**
   * Max number for number input HTML attribute
   */
  protected _maxNumber: number | null = null;

  /**
   * Min number for number input HTML attribute
   */
  protected _minNumber: number | null = null;

  ngOnInit(): void {
    this._setInputId('text-input');
    this._updateValueAndValidityTrigger.next();

    /**
     * TODO: write test
     */
    this.control.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
      if (typeof value === 'string' && value.trim() === '') {
        this.control.setValue(null);
      }
    });

    this._reloadErrorSummaryOnInit(this._parentForm?.errorSummaryVisible, this.control);
  }

  ngOnChanges(changes: FudisComponentChanges<TextInputComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._applyControlUpdateCheck();
    }

    if (changes.type?.currentValue !== changes.type?.previousValue) {
      this._updateValueAndValidityTrigger.next();
    }
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
    /**
     * If Angular FormControl has 'disabled' property, it will bind this as HTML attribute as well. This prevents user to focus to it. This check removes that attribute making input focusable again.
     */
    if (this.control.disabled) {
      this._inputRef.nativeElement.removeAttribute('disabled');
    }
  }
}
