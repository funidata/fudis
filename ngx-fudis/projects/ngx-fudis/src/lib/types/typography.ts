export const fudisHeadingLevelArray = [1, 2, 3, 4, 5, 6] as const;

export type FudisHeadingLevel = (typeof fudisHeadingLevelArray)[number];

export const fudisHeadingVariantArray = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

export type FudisHeadingVariant = (typeof fudisHeadingVariantArray)[number];

export const fudisBodyTextArray = [
  'lg-regular',
  'md-regular',
  'sm-regular',
  'lg-light',
  'md-light',
] as const;

export type FudisBodyText = (typeof fudisBodyTextArray)[number];

export const fudisTextAlignArray = ['left', 'right', 'center'] as const;

export type FudisTextAlign = (typeof fudisTextAlignArray)[number];
