import { Component } from '@angular/core';
import { SelectBaseDirective } from '../select-base/select-base.directive';

@Component({
	selector: 'fudis-multiselect',
	templateUrl: './multiselect.component.html',
	styleUrls: ['./multiselect.component.scss'],
})
export class MultiselectComponent extends SelectBaseDirective {}
