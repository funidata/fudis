import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FudisValidators } from '../../lib/utilities/form/validators';
import { NgxFudisModule } from '../../lib/ngx-fudis.module';

// interface MyCheckboxGroup {
//   first: FormControl<boolean | null>;
//   second: FormControl<boolean | null>;
//   third: FormControl<boolean | null>;
// }

type MyForm = {
  textInputToBeLeftEmpty: FormControl<string | null>;
  textInputRequired: FormControl<string | null>;
  textAreaRequired: FormControl<string | null>;
  textAreaToBeLeftEmpty: FormControl<string | null>;
};

@Component({
  standalone: true,
  imports: [CommonModule, NgxFudisModule],
  selector: 'example-basic-form-components',
  templateUrl: './basic-form-components.component.html',
})
export class StorybookExampleBasicFormComponentsComponent {
  constructor() {
    this.myForm = new FormGroup<MyForm>({
      textInputRequired: new FormControl(null, FudisValidators.required('This is required!')),
      textInputToBeLeftEmpty: new FormControl(null, FudisValidators.required('This is required!')),
      textAreaRequired: new FormControl(null, [
        FudisValidators.required(
          'This is definitely even required as this error has so many words!',
        ),
        FudisValidators.maxLength(50, 'Too long input!'),
      ]),
      textAreaToBeLeftEmpty: new FormControl(null, [
        FudisValidators.required(
          'This is definitely even required as this error has so many words!',
        ),
        FudisValidators.maxLength(50, 'Too long input!'),
      ]),
    });
  }

  toggleFormDisabled(): void {
    if (this.myForm.disabled) {
      this.myForm.enable();
    } else {
      this.myForm.disable();
    }
  }

  touchControls(): void {
    Object.keys(this.myForm.controls).forEach((control) => {
      this.myForm.controls[control as keyof MyForm].markAsTouched();
    });
  }

  myForm: FormGroup<MyForm>;

  textInputProps = {
    label: 'Longer probably multiline label text',
    helpText: 'Quite long helptext to make sure things go multiline!',
    tooltip: 'Tooltip!',
  };
}
