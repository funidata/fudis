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
  textInput: FormControl<string | null>;
  textInputRequired: FormControl<string | null>;
  textArea: FormControl<string | null>;
  textAreaRequired: FormControl<string | null>;
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
      textInput: new FormControl(null),
      textInputRequired: new FormControl(null, FudisValidators.required('This is required!')),
      textArea: new FormControl(null),
      textAreaRequired: new FormControl(null, FudisValidators.required('This is required!')),
    });
  }

  myForm: FormGroup<MyForm>;

  textInputProps = {
    label: 'Input Label',
    longLabel: 'Longer probably multiline label',
    helpText: 'Helptext for text input',
    tooltip: 'Tooltip!',
  };
}
