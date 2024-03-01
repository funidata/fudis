import { FudisGridProperties } from '../../types/grid';
import { convertToRemValue } from '../../utilities/rem-converter';
import * as utils from './gridUtils';

// TODO: Add tests for replaceFormInputWidthsToRem, getGridInputPropertyObject functions. Check if other tests are missing.

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

      expect(correctReturnString).toBe(convertToRemValue(4));

      value = 'inputSm';
      correctReturnString = utils.getGridCssValue(value);

      expect(correctReturnString).toBe(convertToRemValue(10));

      value = 'inputMd';
      correctReturnString = utils.getGridCssValue(value);

      expect(correctReturnString).toBe(convertToRemValue(14));

      value = 'inputLg';
      correctReturnString = utils.getGridCssValue(value);

      expect(correctReturnString).toBe(convertToRemValue(23));
    });
  });

  describe('getGridClasses function', () => {
    it('should return one big string out of given grid attributes', () => {
      const values: FudisGridProperties = {
        width: 'xxl',
        align: 'end',
        marginTop: 'md',
        marginBottom: 'xl',
        rowGap: 'sm',
        columnGap: 'lg',
      };

      expect(utils.getGridClasses(values)).toBe(
        'fudis-grid fudis-grid__xxl fudis-grid__align__end fudis-grid__margin__top__md fudis-grid__margin__bottom__xl fudis-grid__row-gap__sm fudis-grid__column-gap__lg',
      );
    });

    it('should add custom classes to grid class if given', () => {
      const values: FudisGridProperties = {
        width: 'xxl',
        align: 'end',
        marginTop: 'md',
        marginBottom: 'xl',
        rowGap: 'responsive',
        columnGap: 'responsive',
        classes: ['my-custom-class', 'my-other-custom-class'],
      };

      expect(utils.getGridClasses(values)).toBe(
        'fudis-grid fudis-grid__xxl fudis-grid__align__end fudis-grid__margin__top__md fudis-grid__margin__bottom__xl my-custom-class my-other-custom-class',
      );
    });
  });
});
