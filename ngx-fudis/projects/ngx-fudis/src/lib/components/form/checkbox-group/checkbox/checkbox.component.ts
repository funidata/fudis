import {
  Component,
  Input,
  Output,
  EventEmitter,
  Host,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  AfterViewInit,
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
export class CheckboxComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _checkboxGroup: CheckboxGroupComponent,
  ) {}

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
       * If parent has no FormGroup provided, add this control to internally created FormGroup.
       */
      if (!this.controlName) {
        this.controlName = this.id;
      }
      this._checkboxGroup.formGroup.addControl(this.controlName, this.control);
      this._controlAddedToParent = true;
    }
  }

  ngAfterViewInit(): void {
    /**
     * If Angular FormControl has 'disabled' property, it will bind this as HTML attribute as well. This prevents user to focus to it. This removes that attribute making checkbox again focusable. The binded click function _checkboxClick will then prevent toggling the checkbox, if control is disabled.
     */
    if (this.control.disabled) {
      this._inputRef.nativeElement.removeAttribute('disabled');
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

    this.handleChange.emit({ checkbox: optionToEmit, control: this.control });
    this._checkboxGroup.triggerEmit(this.controlName);
  }

  /**
   * When focusing out from checkbox, determine if next focus target is outside of the same checkbox group. If yes, then tell parent Checkbox Group, that focus has moved outside.
   */
  protected _onBlur(event: FocusEvent): void {
    this._focused = false;

    if ((event.relatedTarget as HTMLElement)?.getAttribute('name') !== this._checkboxGroup.id) {
      setTimeout(() => {
        if (document.activeElement?.getAttribute('name') !== this._checkboxGroup.id) {
          this._checkboxGroup.setGroupBlurredOut(true);
        }
      }, 150);
    }
  }

  /**
   * When Checkbox is focused
   */
  protected _onFocus(): void {
    this._focused = true;
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
