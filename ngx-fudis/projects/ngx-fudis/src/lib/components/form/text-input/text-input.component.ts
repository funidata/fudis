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
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxFromValidator,
  getMinFromValidator,
  getMinLengthFromValidator,
} from '../../../utilities/form/getValidators';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { FormComponent } from '../form/form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  ) {
    super(_idService, _changeDetectorRef);
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
  protected override _maxLength: number | undefined = undefined;

  /**
   * Min length for HTML attribute
   */
  protected _minLength: number | undefined = undefined;

  /**
   * Max number for number input HTML attribute
   */
  protected _maxNumber: number | undefined = undefined;  /* mahdollisesti joku observable inputBaseen ja kaikki muut subscripbaa */

  /**
   * Min number for number input HTML attribute
   */
  protected _minNumber: number | undefined = undefined;  /* mahdollisesti joku observable inputBaseen ja kaikki muut subscripbaa */

  ngOnInit(): void {
    this._setInputId('text-input');

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
/* TODO: move these checks under _applyControlUpdateCheck in InputBase directive */
  ngOnChanges(changes: FudisComponentChanges<TextInputComponent>): void {
    
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._initialCheck();    
      this._applyControlUpdateCheck();
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
