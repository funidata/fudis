import { Component } from '@angular/core';
import { DropdownBaseDirective } from '../../../../directives/form/dropdown-base/dropdown-base.directive';

@Component({
	selector: 'fudis-select-dropdown',
	templateUrl: './select-dropdown.component.html',
	styleUrls: ['./select-dropdown.component.scss'],
})
export class SelectDropdownComponent extends DropdownBaseDirective {}
