import { FudisHeadingLevel, FudisHeadingVariant } from '../../types/typography';

/**
 * Get corresponding default variant for heading level
 */
export const getVariant = (level: FudisHeadingLevel): FudisHeadingVariant => {
  switch (level) {
    case 1:
      return 'xxl';
    case 2:
      return 'xl';
    case 3:
      return 'lg';
    case 4:
      return 'md';
    case 5:
      return 'sm';
    case 6:
      return 'xs';
    default:
      return 'lg';
  }
};
