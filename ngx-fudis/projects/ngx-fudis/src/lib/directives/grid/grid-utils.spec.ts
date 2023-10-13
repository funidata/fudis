import { FudisGridAttributes } from '../../types/grid';
import * as utils from './gridUtils';

describe('GridUtils', () => {
	describe('getGridCssValue function', () => {
		it('should return correct value for grid style property', () => {
			let value: string | number;
			let isGridItem: boolean;
			let correctReturnString: string;

			value = 2;
			isGridItem = true;
			correctReturnString = utils.getGridCssValue(value, isGridItem);

			expect(correctReturnString).toBe('span 2');

			value = 5;
			isGridItem = false;
			correctReturnString = utils.getGridCssValue(value, isGridItem);

			expect(correctReturnString).toBe('repeat(5, 1fr)');

			value = 'stretch';
			isGridItem = true;
			correctReturnString = utils.getGridCssValue(value, isGridItem);

			expect(correctReturnString).toBe('1/-1');

			value = 'inputXs';
			correctReturnString = utils.getGridCssValue(value);

			expect(correctReturnString).toBe('4rem');

			value = 'inputSm';
			correctReturnString = utils.getGridCssValue(value);

			expect(correctReturnString).toBe('10rem');

			value = 'inputMd';
			correctReturnString = utils.getGridCssValue(value);

			expect(correctReturnString).toBe('14rem');

			value = 'inputLg';
			correctReturnString = utils.getGridCssValue(value);

			expect(correctReturnString).toBe('23rem');
		});
	});

	describe('getGridClasses function', () => {
		it('should return one big string out of given grid attributes', () => {
			const values: FudisGridAttributes = {
				width: 'xxl',
				align: 'end',
				marginTop: 'md',
				marginBottom: 'xl',
				rowGap: 'sm',
				columnGap: 'lg',
				marginSides: 'none',
			};

			expect(utils.getGridClasses(values)).toBe(
				'fudis-grid fudis-grid__xxl fudis-grid__align__end fudis-grid__margin__top__md fudis-grid__margin__bottom__xl fudis-grid__row-gap__sm fudis-grid__column-gap__lg fudis-grid__margin__sides__none'
			);
		});

		it('should add custom classes to grid class if given', () => {
			const values: FudisGridAttributes = {
				width: 'xxl',
				align: 'end',
				marginTop: 'md',
				marginBottom: 'xl',
				rowGap: 'responsive',
				columnGap: 'responsive',
				marginSides: 'responsive',
				classes: ['my-custom-class', 'my-other-custom-class'],
			};

			expect(utils.getGridClasses(values)).toBe(
				'fudis-grid fudis-grid__xxl fudis-grid__align__end fudis-grid__margin__top__md fudis-grid__margin__bottom__xl my-custom-class my-other-custom-class'
			);
		});
	});
});
