import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FudisInputSize, FudisRadioButtonChangeEvent } from '../../../types/forms';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';
import { FudisIdService } from '../../../services/id/id.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { ControlComponentBaseDirective } from '../../../directives/form/control-component-base/control-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Component({
  selector: 'fudis-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent
  extends ControlComponentBaseDirective
  implements OnInit, OnChanges
{
  constructor(
    _changeDetectorRef: ChangeDetectorRef,
    _focusService: FudisFocusService,
    _idService: FudisIdService,
  ) {
    super(_idService, _focusService);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(hasRequiredValidator(this.control));
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

  ngOnInit() {
    this._setParentComponentId('radio-button-group');
    this._updateValueAndValidityTrigger.next();
  }

  /** Add value and validity check when control value changes */
  ngOnChanges(changes: FudisComponentChanges<RadioButtonGroupComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      const original = this.control.updateValueAndValidity;

      this.control.updateValueAndValidity = () => {
        original.apply(this.control);
        this._updateValueAndValidityTrigger.next();
      };
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
