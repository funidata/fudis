import {
  Component,
  Input,
  Output,
  EventEmitter,
  Host,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FudisIdService } from '../../../../services/id/id.service';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import {
  FudisCheckboxChangeEvent,
  FudisCheckboxGroupFormGroup,
  FudisCheckboxGroupOption,
} from '../../../../types/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fudis-checkbox-group-option',
  templateUrl: './checkbox-group-option.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class CheckboxGroupOptionComponent implements OnInit {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _checkboxGroup: CheckboxGroupComponent<object>,
  ) {}

  /**
   * Control name for this checkbox from FormGroup. Used to link each Checkbox with their Checkbox
   * Group parent's FormGroup.
   */
  @Input({ required: true }) controlName: string;

  /**
   * Visible label of checkbox
   */
  @Input({ required: true }) label: string;

  /**
   * Id for single checkbox. By default generated.
   */
  @Input() id: string;

  /**
   * Emits changed Checkbox and its control.
   */
  @Output() handleChange = new EventEmitter<FudisCheckboxChangeEvent>();

  /**
   * FormControl for each Checkbox provided by parent FormGroup
   */
  protected _control: FormControl<boolean | null>;

  /**
   * If checkbox has focus
   */
  protected _focused = false;

  ngOnInit(): void {
    if (this.id) {
      this._idService.addNewChildId('checkbox-group', this._checkboxGroup.id, this.id);
    } else {
      this.id = this._idService.getNewChildId('checkbox-group', this._checkboxGroup.id);
    }

    const parentControl =
      this._checkboxGroup?.formGroup?.controls?.[
        this.controlName as keyof FudisCheckboxGroupFormGroup<object>
      ];

    if (this.controlName && parentControl) {
      /**
       * Set Checkbox's control to match one in parent FormGroup.
       */
      this._control = parentControl;
    }
  }

  /**
   * For toggling checkbox
   */
  protected _onChange(): void {
    const optionToEmit: FudisCheckboxGroupOption<object> = {
      id: this.id,
      groupName: this._checkboxGroup.id,
      controlName: this.controlName,
      label: this.label,
      value:
        this._checkboxGroup.formGroup.controls[
          this.controlName as keyof typeof this._checkboxGroup.formGroup.controls
        ]?.['value'],
    };

    /**
     * This Checkbox's emit
     */
    this.handleChange.emit({ checkbox: optionToEmit, control: this._control });

    /**
     * Call parent's function, which triggers Checkbox Group's emit
     */
    this._checkboxGroup.triggerEmit(this.controlName);
  }

  /**
   * When focusing out from checkbox, determine if next focus target is outside of the same checkbox
   * group. If yes, then tell parent Checkbox Group, that focus has moved outside. --> If there are
   * validation errors, those should become visible.
   */
  protected _onBlur(event: FocusEvent): void {
    this._focused = false;

    if ((event.relatedTarget as HTMLElement)?.getAttribute('name') !== this._checkboxGroup.id) {
      setTimeout(() => {
        if (document.activeElement?.getAttribute('name') !== this._checkboxGroup.id) {
          this._checkboxGroup.handleBlur.emit(event);
          this._checkboxGroup.setGroupBlurredOut(true);
        }
      }, 150);
    }
  }

  /**
   * When Checkbox is focused
   */
  protected _onFocus(event: FocusEvent): void {
    this._focused = true;

    this._checkboxGroup.onFocus(event);
  }

  /**
   * If control is disabled, prevent toggling it.
   */
  _checkboxClick(event: Event) {
    if (this._control.disabled) {
      event.preventDefault();
    }
  }
}
