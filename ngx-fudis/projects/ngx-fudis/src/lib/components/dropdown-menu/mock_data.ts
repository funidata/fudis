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
    label: 'First item',
    disabled: false,
  },
  { label: 'Second item', disabled: true },
  {
    label: 'Third item with really long label to push it to the limit!',
    disabled: false,
  },
  { label: 'Fourth item', disabled: false },
];

export const smallDropdownMenuGroupedMockData: MockDropdownMenuGroupData[] = [
  {
    country: 'Netherlands',
    items: [
      {
        label: 'Golden jackal',
        disabled: false,
      },
      {
        label: 'Mountain lion',
        disabled: false,
      },
    ],
  },
  {
    country: 'Brazil',
    items: [
      {
        label: 'Small Indian mongoose',
        disabled: true,
      },
      {
        label: 'Falcon, prairie',
        disabled: false,
      },
    ],
  },
  {
    country: 'China',
    items: [
      {
        label: 'Salmon pink bird eater tarantula',
      },
      {
        label: 'Crane, sandhill',
      },
    ],
  },
];