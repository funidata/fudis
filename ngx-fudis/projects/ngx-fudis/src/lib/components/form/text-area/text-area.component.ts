import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisInputSize } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxLengthFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';

@Component({
  selector: 'fudis-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent
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
   * FormControl for text-area
   */
  @Input({ required: true }) control: FormControl<string | null | number>;

  /**
   * Text Area size
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Min length for HTML attribute
   */
  protected _minLength: number | undefined = undefined;

  /**
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected _maxLength: number | undefined = undefined;

  ngOnInit(): void {
    this._setInputId('text-area');
  }

  ngOnChanges(): void {
    this._required = this.required ?? hasRequiredValidator(this.control);
    this._maxLength = getMaxLengthFromValidator(this.control);
    this._minLength = getMinLengthFromValidator(this.control);
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
  }
}
