import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownBaseDirective } from '../../../../directives/form/dropdown-base/dropdown-base.directive';
import { FudisDropdownOption } from '../../../../types/forms';

@Component({
	selector: 'fudis-select-dropdown',
	templateUrl: './select-dropdown.component.html',
	styleUrls: ['./select-dropdown.component.scss'],
})
export class SelectDropdownComponent extends DropdownBaseDirective {
	@Input({ required: true }) control: FormControl<FudisDropdownOption | null>;
}
