import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FudisValidators } from '../../lib/utilities/form/validators';
import { NgxFudisModule } from '../../lib/ngx-fudis.module';
import { CheckboxComponent } from '../../lib/components/form/checkbox/checkbox.component';

type MyForm = {
  textInputToBeLeftEmpty: FormControl<string | null>;
  textInputRequired: FormControl<string | null>;
  textAreaRequired: FormControl<string | null>;
  textAreaToBeLeftEmpty: FormControl<string | null>;
  datepickerRequired: FormControl<Date | null>;
  datepickerToBeLeftEmpty: FormControl<Date | null>;
};

@Component({
  imports: [CommonModule, NgxFudisModule, CheckboxComponent],
  selector: 'example-basic-form-components',
  templateUrl: './basic-form-components.component.html',
})
export class StorybookExampleBasicFormComponentsComponent {
  constructor() {
    this.myForm = new FormGroup<MyForm>({
      textInputRequired: new FormControl(null, FudisValidators.required('This is required')),
      textInputToBeLeftEmpty: new FormControl(null, FudisValidators.required('This is required')),
      textAreaRequired: new FormControl(null, [
        FudisValidators.required('This is definitely required as this error has so many words'),
        FudisValidators.maxLength(50, 'Too long input!'),
      ]),
      textAreaToBeLeftEmpty: new FormControl(null, [
        FudisValidators.required('This is definitely required as this error has so many words'),
        FudisValidators.maxLength(50, 'Too long input!'),
      ]),
      datepickerRequired: new FormControl(null, FudisValidators.required('This is required')),
      datepickerToBeLeftEmpty: new FormControl(null, FudisValidators.required('This is required')),
    });
  }

  checked: boolean = false;

  invalid: boolean = false;

  disabled: boolean = false;

  toggleFormDisabled(): void {
    if (this.myForm.disabled) {
      this.myForm.enable();
      this.disabled = false;
      this.setInvalid();
    } else {
      this.myForm.disable();
      this.disabled = true;
      this.invalid = false;
      this.setInvalid();
    }
  }

  setInvalid() {
    if (!this.myForm.disabled) this.invalid = !this.invalid;
  }

  touchControls(): void {
    this.setInvalid();
    Object.keys(this.myForm.controls).forEach((control) => {
      this.myForm.controls[control as keyof MyForm].markAsTouched();
    });
  }

  checkedChange(checked: boolean): void {
    this.checked = !checked;
  }

  myForm: FormGroup<MyForm>;

  inputProps = {
    label: 'Longer probably multiline label text',
    helpText: 'Quite long helptext to make sure things go multiline',
    popoverText: 'Popover!',
    popoverLabel: 'This opens a popover!',
  };
}
