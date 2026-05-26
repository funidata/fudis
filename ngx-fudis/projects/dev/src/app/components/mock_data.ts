import { FudisSelectOption } from 'ngx-fudis';

export const defaultOptions: FudisSelectOption<string | { name: string; breed: string }>[] = [
  { value: { name: 'Max The Great', breed: 'Staffy' }, label: 'Dog' },
  { value: 'value-2-capybara', label: 'Capybara' },
  { value: 'value-3-platypys', label: 'Platypus' },
  { value: 'value-4-cat', label: 'Really dangerous cat', disabled: true },
  {
    value: { name: 'value-duplicate-1', breed: 'Unwanted' },
    label: 'Sadly I am an unwanted duplicate',
  },
  {
    value: 'value-5-armadillo_(PARTLY_ENDANGERED)',
    label: 'Screaming hairy armadillo (partly endangered)',
  },
  {
    value: { name: 'value-duplicate-2', breed: 'Unwanted' },
    label: 'Sadly I am an unwanted duplicate',
  },
  { value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
];
