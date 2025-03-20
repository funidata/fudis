import { FudisGridColumnsResponsive } from "../../types/grid";
import { FudisSpacingResponsive } from "../../types/spacing";
import { getBreakpointRules } from "./breakpoint-utils";

let spacingValues: FudisSpacingResponsive = {
  default: 'none',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
};

let gridColumnValues: FudisGridColumnsResponsive = {
  "sm":2,"md":"1fr 2fr","lg":3,"xl":"1fr 2fr 1fr","xxl":6
};

describe('Breakpoint Utility functions', () => {
  describe('getBreakpointRules', () => {
    it('should return correct style breakpoint object when FudisSpacing tokens are used', () => {

      const includesFudisSpacingTokens = getBreakpointRules(
        spacingValues,
        'none',
        true,
      );

      const expectedValues =
      [
        { name: 'default', value: 'none', breakpoint: '(min-width: 0)' },
        {
          name: 'xs',
          value: 'calc(0.5rem / var(--fudis-rem-multiplier))',
          breakpoint: '(min-width: 0)'
        },
        {
          name: 'sm',
          value: 'calc(1rem / var(--fudis-rem-multiplier))',
          breakpoint: '(min-width: 36em)'
        },
        {
          name: 'md',
          value: 'calc(1.5rem / var(--fudis-rem-multiplier))',
          breakpoint: '(min-width: 48em)'
        },
        {
          name: 'lg',
          value: 'calc(2rem / var(--fudis-rem-multiplier))',
          breakpoint: '(min-width: 62em)'
        },
        {
          name: 'xl',
          value: 'calc(2.5rem / var(--fudis-rem-multiplier))',
          breakpoint: '(min-width: 75em)'
        },
        {
          name: 'xxl',
          value: 'calc(4rem / var(--fudis-rem-multiplier))',
          breakpoint: '(min-width: 100em)'
        }
      ]

      expect(includesFudisSpacingTokens).toEqual(expectedValues);
    });

    it('should return correct style breakpoint object when responsive grid column values are passed as numbers and fraction', () => {
      
      const doNotIncludeFudisSpacingTokens = getBreakpointRules(
        gridColumnValues,
        '1fr',
      );

      const expectedValues = 
      [
        { name: 'default', value: '1fr', breakpoint: '(min-width: 0)' },
        {
          name: 'sm',
          value: 'repeat(2, 1fr)',
          breakpoint: '(min-width: 36em)'
        },
        { name: 'md', value: '1fr 2fr', breakpoint: '(min-width: 48em)' },
        {
          name: 'lg',
          value: 'repeat(3, 1fr)',
          breakpoint: '(min-width: 62em)'
        },
        { name: 'xl', value: '1fr 2fr 1fr', breakpoint: '(min-width: 75em)' },
        {
          name: 'xxl',
          value: 'repeat(6, 1fr)',
          breakpoint: '(min-width: 100em)'
        }
      ]

      expect(doNotIncludeFudisSpacingTokens).toEqual(expectedValues);
    })
  })
});