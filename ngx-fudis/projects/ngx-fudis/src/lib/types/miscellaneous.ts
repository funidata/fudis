import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Alert
 */
export const fudisAlertPositionArray = ['static', 'absolute', 'fixed'] as const;
export type FudisAlertPosition = (typeof fudisAlertPositionArray)[number];

export interface FudisAlert {
  message: Observable<string>;
  type: FudisNotification;
  id: string;
}

export interface FudisAlertElement extends FudisAlert {
  htmlId: string;
  buttonId: string;
  initialFocus: boolean;
}

/**
 * Badge
 */
export const fudisBadgeVariantArray = [
  'accent',
  'danger',
  'primary',
  'secondary',
  'success',
] as const;
export type FudisBadgeVariant = (typeof fudisBadgeVariantArray)[number];

/**
 * Button
 */
export const fudisButtonVariantArray = ['primary', 'secondary', 'tertiary'] as const;
export type FudisButtonVariant = (typeof fudisButtonVariantArray)[number];

/**
 * TODO: Remove
 */
export const fudisButtonSizeArray = ['icon-only', 'small', 'medium'] as const;
export type FudisButtonSize = (typeof fudisButtonSizeArray)[number];

export const fudisButtonTypeArray = ['submit', 'button'] as const;
export type FudisButtonType = (typeof fudisButtonTypeArray)[number];

/**
 * Description List
 */
export type FudisDescriptionListVariant = 'regular' | 'compact';

export type FudisDescriptionListItemDetailLanguageContent = {
  [lang in FudisLanguageAbbr]?: { [id: string]: string | null | undefined };
};

/**
 * Dialog
 */
export const fudisDialogSizeArray = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type FudisDialogSize = (typeof fudisDialogSizeArray)[number];

/**
 * Dropdown Menu
 */
export const fudisDropdownMenuAlignArray = ['left', 'center', 'right'] as const;
export type FudisDropdownMenuAlign = (typeof fudisDropdownMenuAlignArray)[number];

/**
 * Expandable
 */
export type FudisExpandableType = 'regular' | 'lite';

/**
 * FieldsetActions
 */
export const fudisFieldsetActionsAlignArray = ['start', 'below', 'end'] as const;
export type fudisFieldsetActionsAlign = (typeof fudisFieldsetActionsAlignArray)[number];

/**
 * Language Badge
 */
export type FudisLanguageAbbr = 'fi' | 'sv' | 'en';

/**
 * Notification
 */
export const fudisNotificationVariantArray = ['warning', 'danger', 'success', 'info'] as const;
export type FudisNotification = (typeof fudisNotificationVariantArray)[number];

export type FudisPopoverPosition = 'left' | 'right' | 'above' | 'below';

/**
 * Types for extending ngOnChanges SimpleChanges type
 *
 * - T = any FudisComponent which have @Input() properties
 * - P = property of component. E. g. for Grid columns and rowGap or for Heading level and size.
 * - So T[P] translates to e.g. HeadingComponent['level'] --> HeadingComponent.level --> values from
 *   1-6
 */
interface FudisComponentChange<T, P extends keyof T> extends SimpleChange {
  previousValue: T[P] | undefined;
  currentValue: T[P] | undefined;
  firstChange: boolean;
}

export type FudisComponentChanges<T> = {
  [P in keyof T]?: FudisComponentChange<T, P>;
};
