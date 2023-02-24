import { Component, ViewEncapsulation } from '@angular/core';

import { GridDirective } from './grid.directive';

@Component({
	selector: 'fudis-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridComponent extends GridDirective {
	public get classes(): Array<string | undefined> {
		const classList = [
			'fudis-grid',
			`fudis-grid__${this.width}`,
			`fudis-grid__align__${this.align}`,
			`fudis-grid__margin__top__${this.marginTop}`,
			`fudis-grid__margin__bottom__${this.marginBottom}`,
			this.rowGap === 'responsive' ? '' : `fudis-grid__row-gap__${this.rowGap}`,
			this.columnGap === 'responsive' ? '' : `fudis-grid__column-gap__${this.columnGap}`,
		];

		return classList;
	}
}
