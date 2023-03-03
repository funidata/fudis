import { Component, ViewEncapsulation } from '@angular/core';

import { GridDirective } from './grid.directive';

@Component({
	selector: 'fudis-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridComponent extends GridDirective {}
