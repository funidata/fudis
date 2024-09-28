import {
  Component,
  Input,
  Output,
  EventEmitter,
  Host,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FudisIdService } from '../../../../services/id/id.service';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import { FudisCheckboxChangeEvent, FudisCheckboxOption } from '../../../../types/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fudis-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent implements OnInit, OnDestroy {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _checkboxGroup: CheckboxGroupComponent,
  ) {}

  /**
   * HTML input element of checkbox
   */
  @ViewChild('inputRef') private _inputRef: ElementRef<HTMLInputElement>;

  /**
   * Control name for this checkbox from FormGroup. Required if FormGroup is given to the parent. Used to link each Checkbox with their Checkbox Group parent's FormGroup.
   */
  @Input() controlName: string;

  /**
   * Provide FormControl for each checkbox, when you do not provide FormGroup for the parent Checkbox Group.
   */
  @Input() control: FormControl<boolean | null | undefined>;

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
   * If checkbox has focus
   */
  protected _focused = false;

  /**
   * Boolean for syncing, if this Checkbox had 'control' property provided and parent had no 'formGroup' provided.
   */
  private _controlAddedToParent: boolean = false;

  ngOnInit(): void {
    if (this.id) {
      this._idService.addNewChildId('checkbox-group', this._checkboxGroup.id, this.id);
    } else {
      this.id = this._idService.getNewChildId('checkbox-group', this._checkboxGroup.id);
    }

    if (
      !this.control &&
      this.controlName &&
      this._checkboxGroup.formGroup.controls?.[this.controlName]
    ) {
      /**
       * Set Checkbox's control to match one in parent FormGroup.
       */
      this.control = this._checkboxGroup.formGroup.controls[this.controlName];
    } else if (this.control && this._checkboxGroup.internalFormGroup) {
      /**
       * If no name was provided, use id instead.
       */
      if (!this.controlName) {
        this.controlName = this.id;
      }

      /**
       * If parent has no FormGroup provided, add this control to internally created FormGroup.
       */
      this._checkboxGroup.formGroup.addControl(this.controlName, this.control);
      this._controlAddedToParent = true;
    }
  }

  ngOnDestroy(): void {
    if (this._controlAddedToParent && this.controlName) {
      if (this._checkboxGroup.formGroup.controls[this.controlName]) {
        (this._checkboxGroup.formGroup as FormGroup).removeControl(this.controlName);
      }
    }
  }

  /**
   * For toggling checkbox
   */
  protected _onChange(): void {
    const optionToEmit: FudisCheckboxOption<object> = {
      id: this.id,
      groupName: this._checkboxGroup.id,
      controlName: this.controlName,
      label: this.label,
      value: this._checkboxGroup.formGroup.controls[this.controlName].value,
    };

    /**
     * This Checkbox's emit
     */
    this.handleChange.emit({ checkbox: optionToEmit, control: this.control });

    /**
     * Call parent's function, which triggers Checkbox Group's emit
     */
    this._checkboxGroup.triggerEmit(this.controlName);
  }

  /**
   * When focusing out from checkbox, determine if next focus target is outside of the same checkbox group. If yes, then tell parent Checkbox Group, that focus has moved outside. --> If there are validation errors, those should become visible.
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
    if (this.control.disabled) {
      event.preventDefault();
    }
  }
}
