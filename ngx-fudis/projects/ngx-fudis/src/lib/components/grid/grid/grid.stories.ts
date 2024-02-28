import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';
import { GridComponent } from './grid.component';
import { excludeEverythingExceptRegex, gridExampleExclude } from '../../../utilities/storybook';
import readme from './grid.documentation.mdx';

const html = String.raw;

export default {
  title: 'Components/Grid/Grid',
  component: GridComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => html`<div style="border: 3px solid #b83c2e">${story}</div>`,
    ),
  ],

  parameters: {
    docs: {
      page: readme,
    },
  },
} as Meta;

const columnsToString = (columns: string | number | object): string => {
  if (typeof columns === 'string') {
    return `'${columns}'`;
  }
  if (typeof columns === 'number') {
    return `'${columns.toString()}'`;
  }

  return JSON.stringify(columns);
};

const ExampleTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: { ...args, transformedColumns: columnsToString(args.columns) },
  template: html`<fudis-body-text style="margin: 1rem 0;" [size]="'lg-regular'" [align]="'center'"
      >Current value of <code>columns</code> is:
      <code>{{transformedColumns}}</code></fudis-body-text
    >
    <fudis-grid
      [classes]="['storybook__wrapper-border']"
      [columns]="columns"
      [align]="align"
      [alignItemsX]="alignItemsX"
      [alignItemsY]="alignItemsY"
      [marginTop]="marginTop"
      [marginBottom]="marginBottom"
      [width]="width"
      [columnGap]="columnGap"
      [rowGap]="rowGap"
    >
      <fudis-body-text class="storybook__item-highlight"
        >Grid child element which has more content than most of the child elements</fudis-body-text
      >
      <fudis-body-text class="storybook__item-highlight">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item-highlight">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item-highlight"
        >Grid child element which has more content than most of the child elements</fudis-body-text
      >
      <fudis-body-text class="storybook__item-highlight">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item-highlight">Grid child element</fudis-body-text>
    </fudis-grid>`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  columns: 3,
  align: 'center',
  alignItemsX: 'stretch',
  alignItemsY: 'stretch',
  marginTop: 'none',
  marginBottom: 'none',
  width: 'xxl',
  rowGap: 'responsive',
  columnGap: 'responsive',
};

Example.argTypes = {
  columns: {
    options: [
      1,
      3,
      5,
      '1fr 3fr',
      '1fr 1fr',
      '5fr 1fr',
      'auto max-content auto',
      'auto min-content auto',
    ],
    control: { type: 'select' },
  },
  align: {
    options: ['start', 'end', 'center'],
    control: { type: 'select' },
  },
  alignItemsX: {
    options: ['start', 'center', 'end', 'stretch'],
    control: { type: 'select' },
  },
  alignItemsY: {
    options: ['start', 'center', 'end', 'stretch'],
    control: { type: 'select' },
  },
  width: {
    options: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'initial'],
    control: { type: 'select' },
  },
  marginTop: {
    options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
  marginBottom: {
    options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
  rowGap: {
    options: ['responsive', 'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
  columnGap: {
    options: ['responsive', 'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
};

Example.parameters = {
  controls: {
    exclude: gridExampleExclude,
  },
};

export const EqualColumns = ExampleTemplate.bind({});
EqualColumns.args = {
  columns: 3,
};
EqualColumns.argTypes = {
  columns: {
    options: [1, 2, 3, 4, 6],
    control: { type: 'radio' },
  },
};
EqualColumns.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

export const FrUnits = ExampleTemplate.bind({});
FrUnits.args = {
  columns: '3fr 1fr',
};
FrUnits.argTypes = {
  columns: {
    options: ['3fr 1fr', '1fr 2fr', '1fr 2fr 1fr', '3fr 1fr 2fr', '50fr 25fr 25fr'],
    control: { type: 'radio' },
  },
};
FrUnits.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

export const MinContent = ExampleTemplate.bind({});
MinContent.args = {
  columns: 'auto min-content auto',
};
MinContent.argTypes = {
  columns: {
    options: ['auto min-content auto', '1fr 1fr auto min-content', 'min-content auto min-content'],
    control: { type: 'radio' },
  },
};
MinContent.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

export const MaxContent = ExampleTemplate.bind({});
MaxContent.args = {
  columns: 'max-content 1fr 1fr',
};
MaxContent.argTypes = {
  columns: {
    options: [
      'max-content 1fr 1fr',
      'max-content auto',
      '1fr max-content 1fr',
      'max-content min-content',
    ],
    control: { type: 'radio' },
  },
};
MaxContent.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

export const Auto = ExampleTemplate.bind({});
Auto.args = {
  columns: 'repeat(auto-fit, minmax(10rem, 1fr))',
};
Auto.argTypes = {
  columns: {
    options: [
      'repeat(auto-fit, minmax(10rem, 1fr))',
      'repeat(auto-fit, minmax(5rem, 1fr))',
      'repeat(auto-fit, minmax(5rem, 1fr))',
      'repeat(auto-fill, minmax(5rem, 1fr))',
      'auto 1fr',
      'auto 1fr 1fr',
      '1fr auto 1fr',
      '2fr 1fr auto',
    ],
    control: { type: 'radio' },
  },
};
Auto.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

export const ResponsiveColumns = ExampleTemplate.bind({});
ResponsiveColumns.args = {
  columns: { sm: 2, md: '1fr 2fr', lg: 3, xl: '1fr 2fr 1fr', xxl: 6 },
};
ResponsiveColumns.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};
