import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisSelectOption } from '../../../../ngx-fudis/src/lib/types/forms';

type MyForm = {
  dropdownFirst: FormControl<FudisSelectOption[] | null>;
  dropdownSecond: FormControl<FudisSelectOption[] | null>;
};

@Component({
  selector: 'app-dropdown-examples',
  templateUrl: 'dropdownExamples.component.html',
})
export class AppDropdownExamplesComponent {
  testFormGroup = new FormGroup<MyForm>({
    dropdownFirst: new FormControl<FudisSelectOption[] | null>(null),
    dropdownSecond: new FormControl<FudisSelectOption[] | null>(null),
  });

  _options = [
    { value: '123', label: 'This is really long option, to see what is happening' },
    { value: '124', label: 'Shorter option' },
  ];
}
