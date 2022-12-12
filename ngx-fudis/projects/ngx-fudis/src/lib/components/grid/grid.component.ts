import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'fudis-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridComponent {
	@Input() variant: 'regular' | 'wide' = 'regular';

	@Input() alignVertical?: 'start' | 'center' | 'end' = 'start';

	@Input() columns: 1 | 2 | 3 | 4 = 2;
}
