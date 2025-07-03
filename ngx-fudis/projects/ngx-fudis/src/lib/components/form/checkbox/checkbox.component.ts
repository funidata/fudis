import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { CommonModule } from '@angular/common';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Component({
  selector: 'fudis-checkbox',
  imports: [ReactiveFormsModule, CommonModule, NgxFudisModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent implements OnInit {
  constructor(
    protected _translationService: FudisTranslationService,
    private _idService: FudisIdService,
  ) {}

  /**
   * Optional FormControl for Checkbox
   */
  @Input() control?: FormControl<boolean | null>;

  /**
   * Optional visible Checkbox label
   */
  @Input() label?: string;

  /**
   * AriaLabelledBy attributed to be used when visible label is not provided
   */
  @Input() ariaLabelledBy?: string;

  /**
   * Id for single Checkbox. By default generated.
   */
  @Input() id!: string;

  /**
   * Show text indicating if Checkbox is required or not
   */
  @Input() required?: boolean = false;

  /**
   * Disables the Checkbox, keeping it focusable
   */
  @Input() disabled?: boolean = false;

  /**
   * Sets Checkbox state manually invalid
   */
  @Input() invalid?: boolean = false;

  /**
   * Sets Checkbox state manually checked
   */
  @Input() checked: boolean = false;

  /**
   * Emits changed Checkbox and its control.
   */
  @Output() checkedChange = new EventEmitter<boolean>();

  /**
   * If Checkbox has focus
   */
  protected _focused = false;

  /**
   * When Checkbox is focused
   */
  protected _onFocus(): void {
    this._focused = true;
  }

  /**
   * When Checkbox is blurred
   */
  protected _onBlur(): void {
    this._focused = false;
  }

  /**
   * Manual toggle for Checkbox checked state
   */
  toggleCheckbox(event: Event) {
    if (this.disabled || this.control?.disabled) return;
    const input = event.target as HTMLInputElement;

    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
  }

  ngOnInit() {
    if (this.id) {
      this._idService.addNewId('checkbox', this.id);
    } else {
      this.id = this._idService.getNewId('checkbox');
    }
  }
}
