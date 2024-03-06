import { AfterViewInit, Component, Input, OnInit, OnChanges } from '@angular/core';
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
    private _focusService: FudisFocusService,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
  ) {
    super(_translationService, _idService);
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
  }

  ngOnChanges(changes: FudisComponentChanges<TextInputComponent>): void {
    if (changes.control) {
      this._required = hasRequiredValidator(this.control);
    }

    if (changes.type?.currentValue === 'number') {
      this._minNumber = getMinFromValidator(this.control);
      this._maxNumber = getMaxFromValidator(this.control);
    } else if (changes.type) {
      this._maxLength = getMaxLengthFromValidator(this.control);
      this._minLength = getMinLengthFromValidator(this.control);
    }
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
  }
}
