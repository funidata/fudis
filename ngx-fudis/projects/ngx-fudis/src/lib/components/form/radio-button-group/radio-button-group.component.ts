import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FudisInputSize, FudisRadioButtonChangeEvent } from '../../../types/forms';
import { FudisValidatorUtilities } from '../../../utilities/form/validator-utilities';
import { FudisIdService } from '../../../services/id/id.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { ControlComponentBaseDirective } from '../../../directives/form/control-component-base/control-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fudis-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent
  extends ControlComponentBaseDirective
  implements OnInit, OnChanges
{
  constructor(_focusService: FudisFocusService, _idService: FudisIdService) {
    super(_idService, _focusService);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(FudisValidatorUtilities.required(this.control));
      }
    });
  }

  /**
   * Width of Radio Button Group
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Emit form control and changed option when one option is clicked
   */
  @Output() handleChange = new EventEmitter<FudisRadioButtonChangeEvent>();

  /**
   * Subscription for handling the valueChanges observable
   */
  private _subscription: Subscription;

  ngOnInit() {
    this._setParentComponentId('radio-button-group');
    this._updateValueAndValidityTrigger.next();
  }

  /**
   * Add value and validity check when control value changes
   */
  ngOnChanges(changes: FudisComponentChanges<RadioButtonGroupComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._subscription?.unsubscribe();
      this._subscription = this.control.valueChanges
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this._updateValueAndValidityTrigger.next());
    }
  }

  public triggerEmit(id: string, label: string): void {
    const data: FudisRadioButtonChangeEvent = {
      option: {
        id: id,
        label: label,
        value: this.control?.value,
      },
      control: this.control,
    };
    this.handleChange.emit(data);
  }
}
