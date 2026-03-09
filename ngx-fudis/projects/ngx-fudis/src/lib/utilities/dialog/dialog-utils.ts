/**
 * Here we check if the button element is disabled. If it is, close action is not triggered. In case
 * of a _elementRef, it takes the exact element that is attached to, so if it is a fudis-button, we
 * have to check the underlying button element with firstElementChild, that has the aria-disabled
 * attribute. If it is just a button, checking the passed element is enough.
 */
export function isButtonDisabled(element: HTMLElement) {
  return (
    (element?.ariaDisabled && element?.ariaDisabled === 'true') ||
    (element?.firstElementChild?.ariaDisabled &&
      element?.firstElementChild?.ariaDisabled === 'true')
  );
}
