/**
 * This file contains mock data related to Dropdown Menu Component
 */

interface MockDropdownMenuGroupData {
  country: string;
  items: TestMenuItemActions[];
}

export type TestMenuItemActions = {
  label: string;
  disabled?: boolean;
};

export const defaultMenuItems: TestMenuItemActions[] = [
  {
    label: 'View profile',
    disabled: false,
  },
  { label: 'Update contact details', disabled: true },
  {
    label: 'Request an official transcript of records',
    disabled: false,
  },
  { label: 'Sign out', disabled: false },
];

export const smallDropdownMenuGroupedMockData: MockDropdownMenuGroupData[] = [
  {
    country: 'Course materials',
    items: [
      {
        label: 'Reading list',
        disabled: false,
      },
      {
        label: 'Lecture recordings',
        disabled: false,
      },
    ],
  },
  {
    country: 'Student services',
    items: [
      {
        label: 'Study guidance',
        disabled: true,
      },
      {
        label: 'Accessibility services',
        disabled: false,
      },
    ],
  },
  {
    country: 'Academic tools',
    items: [
      {
        label: 'Course catalogue',
      },
      {
        label: 'Examination timetable',
      },
    ],
  },
];
