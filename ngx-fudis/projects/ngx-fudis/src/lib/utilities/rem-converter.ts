// TODO: Write tests

// TODO: Although this works, maybe we should consider creating a service, where multiplier can be defined.

/**
 * Utility function to convert values to rem values used by application.
 * Function takes a number and returns value as string with 'rem' abbreviation.
 */
export const convertToRemValue = (value: number): string => {
  const applicationBody = document?.querySelector('body') as HTMLElement;

  if (applicationBody) {
    const multiplier =
      getComputedStyle(applicationBody)?.getPropertyValue('--fudis-rem-multiplier');

    if (multiplier) {
      const convertedRemValue: number = value / Number(multiplier);
      return `${convertedRemValue}rem`;
    }
  }

  return `${value}rem`;
};
