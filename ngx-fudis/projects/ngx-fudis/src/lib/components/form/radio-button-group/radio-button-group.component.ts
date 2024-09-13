import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FudisInputSize, FudisRadioButtonGroupChangeEvent } from '../../../types/forms';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';
import { FudisIdService } from '../../../services/id/id.service';
import { FormComponent } from '../form/form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { ControlComponentBaseDirective } from '../../../directives/form/control-component-base/control-component-base.directive';

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
    @Host() @Optional() protected _parentForm: FormComponent | null,
    _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
  ) {
    super(_idService, _changeDetectorRef);

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
  @Output() handleChange = new EventEmitter<FudisRadioButtonGroupChangeEvent>();

  ngOnInit() {
    this._setParentComponentId('radio-button-group');
    this._updateValueAndValidityTrigger.next();

    this._triggerErrorSummaryOnInitReload(
      this._parentForm?.errorSummaryVisible,
      this.control.invalid,
    );
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
    const data: FudisRadioButtonGroupChangeEvent = {
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
