import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnChanges,
  Optional,
  Host,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisInputSize, FudisInputType } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxFromValidator,
  getMaxLengthFromValidator,
  getMinFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { FormComponent } from '../form/form.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'fudis-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent
  extends InputBaseDirective
  implements OnInit, OnChanges, AfterViewInit
{
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    private _focusService: FudisFocusService,
    _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
  ) {
    super(_translationService, _idService, _changeDetectorRef);
  }

  /**
   * FormControl for text-input
   */
  @Input({ required: true }) control: FormControl<string | null | number>;

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
  protected _maxLength: number | undefined = undefined;

  /**
   * Min length for HTML attribute
   */
  protected _minLength: number | undefined = undefined;

  /**
   * Max number for number input HTML attribute
   */
  protected _maxNumber: number | undefined = undefined;

  /**
   * Min number for number input HTML attribute
   */
  protected _minNumber: number | undefined = undefined;

  ngOnInit(): void {
    this._setInputId('text-input');

    /**
     * TODO: write test
     */
    this.control.valueChanges.pipe(takeUntil(this._destroyed)).subscribe((value) => {
      if (typeof value === 'string' && value.trim() === '') {
        this.control.setValue(null);
      }
    });

    this._reloadErrorSummaryOnInit(this._parentForm?.errorSummaryVisible, this.control);
  }

  ngOnChanges(changes: FudisComponentChanges<TextInputComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._required = hasRequiredValidator(this.control);
      this._maxLength = getMaxLengthFromValidator(this.control);
    }

    if (changes.type?.currentValue === 'number') {
      this._minNumber = getMinFromValidator(this.control);
      this._maxNumber = getMaxFromValidator(this.control);
    } else if (changes.type?.currentValue !== changes.type?.previousValue) {
      this._minLength = getMinLengthFromValidator(this.control);
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
