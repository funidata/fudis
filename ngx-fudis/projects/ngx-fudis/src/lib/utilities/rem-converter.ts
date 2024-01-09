/**
 * Utility function to convert values to rem values used by application.
 * Function takes a number and returns value as string with 'rem' abbreviation.
 */
export const convertToRemValue = (value: number): string => {
  const applicationBody = document.querySelector('body') as HTMLElement;
  const multiplier = getComputedStyle(applicationBody).getPropertyValue('--fudis-rem-multiplier');
  const convertedRemValue: number = value / Number(multiplier);
  return `${convertedRemValue}rem`;
};
