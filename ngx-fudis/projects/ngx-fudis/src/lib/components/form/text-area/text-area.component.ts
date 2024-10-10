import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxLengthFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TextFieldComponentBaseDirective } from '../../../directives/form/text-field-component-base/text-field-component-base.directive';

@Component({
  selector: 'fudis-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent
  extends TextFieldComponentBaseDirective
  implements OnInit, OnChanges
{
  constructor(_focusService: FudisFocusService, _idService: FudisIdService) {
    super(_idService, _focusService);
    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(hasRequiredValidator(this.control));
        this._maxLength.next(getMaxLengthFromValidator(this.control));
        this._minLength.next(getMinLengthFromValidator(this.control));
      }
    });
  }

  /**
   * FormControl for text-area
   */
  @Input({ required: true }) override control: FormControl<string | null | number>;

  ngOnInit(): void {
    this._setComponentId('text-area');
    this._updateValueAndValidityTrigger.next();
    this._setControlValueSubscription();
  }

  ngOnChanges(changes: FudisComponentChanges<TextAreaComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._applyControlUpdateCheck();
    }

    if (changes.nullControlOnEmptyString?.currentValue !== changes.control?.previousValue) {
      this._setControlValueSubscription();
    }
  }
}
