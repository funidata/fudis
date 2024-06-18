import { Component, ViewEncapsulation } from '@angular/core';
import { DropdownBaseDirective } from '../../../../../directives/form/dropdown-base/dropdown-base.directive';

@Component({
  selector: 'fudis-select-dropdown, fudis-select-dropdown-menu',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectDropdownComponent extends DropdownBaseDirective {}
