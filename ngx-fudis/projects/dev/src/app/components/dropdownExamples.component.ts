import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisDropdownOption } from 'dist/ngx-fudis/lib/types/forms';

type MyForm = {
	dropdownFirst: FormControl<FudisDropdownOption[] | null>;
	dropdownSecond: FormControl<FudisDropdownOption[] | null>;
};

@Component({
	selector: 'app-dropdown-examples',
	templateUrl: 'dropdownExamples.component.html',
})
export class AppDropdownExamplesComponent {
	testFormGroup = new FormGroup<MyForm>({
		dropdownFirst: new FormControl<FudisDropdownOption[] | null>(null),
		dropdownSecond: new FormControl<FudisDropdownOption[] | null>(null),
	});

	_options = [
		{ value: '123', viewValue: 'This is really long option, to see what is happening' },
		{ value: '124', viewValue: 'Shorter option' },
	];
}
