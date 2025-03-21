import {
  FudisDefaultGridProperties,
  fudisGridAlignItemsArray,
  FudisGridProperties,
  FudisGridPropertyCollection,
} from '../../types/grid';
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

      fudisGridAlignItemsArray.forEach((value) => {
        isGridItem = false;
        correctReturnString = utils.getGridCssValue(value, isGridItem);

        expect(correctReturnString).toBe(value);
      });

      value = 'inputXs';
      correctReturnString = utils.getGridCssValue(value);

      expect(correctReturnString).toBe('calc(4rem / var(--fudis-rem-multiplier))');

      value = 'inputSm';
      correctReturnString = utils.getGridCssValue(value);

      expect(correctReturnString).toBe('calc(10rem / var(--fudis-rem-multiplier))');

      value = 'inputMd';
      correctReturnString = utils.getGridCssValue(value);

      expect(correctReturnString).toBe('calc(14rem / var(--fudis-rem-multiplier))');

      value = 'inputLg';
      correctReturnString = utils.getGridCssValue(value);

      expect(correctReturnString).toBe('calc(23rem / var(--fudis-rem-multiplier))');
    });
  });

  describe('replaceFormInputWidthsToRem function', () => {
    it('should return corresponding string with rem calculation', () => {
      let values: string;
      let returnValue: string;

      values = 'inputXs inputSm';
      returnValue = utils.replaceFormInputWidthsToRem(values);

      expect(returnValue).toBe(
        'calc(4rem / var(--fudis-rem-multiplier)) calc(10rem / var(--fudis-rem-multiplier))',
      );

      values = 'inputMd inputLg';
      returnValue = utils.replaceFormInputWidthsToRem(values);

      expect(returnValue).toBe(
        'calc(14rem / var(--fudis-rem-multiplier)) calc(23rem / var(--fudis-rem-multiplier))',
      );
    });
  });

  describe('getGridClasses function', () => {
    it('should return one big string out of given grid attributes', () => {
      const values: FudisGridProperties = {
        width: 'xxl',
        align: 'end',
        rowGap: 'sm',
        columnGap: 'lg',
      };

      expect(utils.getGridClasses(values)).toBe(
        'fudis-grid fudis-grid__xxl fudis-grid__align__end fudis-grid__row-gap__sm fudis-grid__column-gap__lg',
      );
    });

    it('should add custom classes to grid class if given', () => {
      const values: FudisGridProperties = {
        width: 'xxl',
        align: 'end',
        rowGap: 'responsive',
        columnGap: 'responsive',
        classes: 'my-custom-class my-other-custom-class',
      };

      expect(utils.getGridClasses(values)).toBe(
        'fudis-grid fudis-grid__xxl fudis-grid__align__end my-custom-class my-other-custom-class',
      );
    });
  });

  describe('getValuesForCSSClasses', () => {
    it('should return correct values depending on defualt settings', () => {
      let properties: FudisGridPropertyCollection;
      let serviceDefaults: boolean;
      let returnObject: FudisGridProperties;

      const emptyAppValues = {};
      const emptyServiceValues = {};

      const valuesFromDefaults: FudisDefaultGridProperties = {
        align: 'center',
        alignItemsY: 'center',
        alignItemsX: 'center',
        classes: 'default-test-class',
        columnGap: 'none',
        rowGap: 'none',
        width: 'xxl',
      };

      const valuesFromApp: FudisGridProperties = {
        align: 'start',
        alignItemsY: 'start',
        alignItemsX: 'start',
        classes: 'app-test-class',
        columnGap: 'md',
        rowGap: 'sm',
        width: 'lg',
      };

      const valuesFromService: FudisDefaultGridProperties = {
        align: 'center',
        alignItemsY: 'start',
        alignItemsX: 'start',
        classes: 'service-test-class',
        columnGap: 'lg',
        rowGap: 'md',
        width: 'md',
      };

      // Returns appValues
      properties = {
        appValues: valuesFromApp,
        defaultValues: valuesFromDefaults,
        serviceValues: valuesFromService,
      };
      serviceDefaults = false;
      returnObject = utils.getValuesForCSSClasses(properties, serviceDefaults);
      expect(returnObject).toStrictEqual(valuesFromApp);

      // Returns defaultValues
      properties = {
        appValues: emptyAppValues,
        defaultValues: valuesFromDefaults,
        serviceValues: valuesFromService,
      };
      serviceDefaults = false;
      returnObject = utils.getValuesForCSSClasses(properties, serviceDefaults);
      expect(returnObject).toStrictEqual(valuesFromDefaults);

      // Returns serviceValues
      properties = {
        appValues: emptyAppValues,
        defaultValues: valuesFromDefaults,
        serviceValues: valuesFromService,
      };
      serviceDefaults = true;
      returnObject = utils.getValuesForCSSClasses(properties, serviceDefaults);
      expect(returnObject).toStrictEqual(valuesFromService);

      // Returns defaultValues
      properties = {
        appValues: emptyAppValues,
        defaultValues: valuesFromDefaults,
        serviceValues: emptyServiceValues,
      };
      serviceDefaults = true;
      returnObject = utils.getValuesForCSSClasses(properties, serviceDefaults);
      expect(returnObject).toStrictEqual(valuesFromDefaults);
    });
  });
});
