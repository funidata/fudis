export const fudisHeadingLevelArray = [1, 2, 3, 4, 5, 6] as const;

export type FudisHeadingLevel = (typeof fudisHeadingLevelArray)[number];

export const fudisHeadingSizeArray = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'label'] as const;

export type FudisHeadingSize = (typeof fudisHeadingSizeArray)[number];

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
