import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';
import { GridComponent } from './grid.component';
import { excludeEverythingExceptRegex } from '../../../utilities/storybook';
import readme from './grid.component.mdx';

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

const ExampleTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: args,
  template: html`<fudis-grid
    [classes]="['storybook__wrapper-border']"
    [columns]="columns"
    [align]="align"
    [alignItemsX]="alignItemsX"
    [alignItemsY]="alignItemsY"
    [marginTop]="marginTop"
    [marginBottom]="marginBottom"
    [marginSides]="marginSides"
    [width]="width"
    [columnGap]="columnGap"
    [rowGap]="rowGap"
  >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    ><fudis-body-text class="storybook__item-highlight"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of grid-template-columns: {{columns}}</fudis-body-text
    >
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
  marginSides: 'responsive',
  width: 'xxl',
  rowGap: 'responsive',
  columnGap: 'responsive',
};

Example.argTypes = {
  columns: {
    options: [1, 2, 3, 4, 5, 6, '1fr 3fr', '1fr 1fr', '5fr 1fr'],
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
  marginSides: {
    options: ['responsive', 'none'],
    control: { type: 'select' },
  },
};

const EquallyWideColumnsTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: args,
  template: html`<fudis-grid [columns]="columns">
    <fudis-body-text class="storybook__item-highlight"
      >Grid item. Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Grid item. Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Grid item. Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Grid item. Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Grid item. Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Grid item. Current value of columns is: {{columns}}</fudis-body-text
    >
  </fudis-grid>`,
});

export const EquallyWideColumns = EquallyWideColumnsTemplate.bind({});
EquallyWideColumns.args = {
  columns: 3,
};
EquallyWideColumns.argTypes = {
  columns: {
    options: [1, 2, 3, 4, 6],
    control: { type: 'radio' },
  },
};
EquallyWideColumns.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

const UnequallyWideColumnsTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: args,

  template: html`<fudis-grid [columns]="columns">
    <fudis-heading class="storybook__item-highlight" [level]="1" [size]="'lg'"
      >To apply unequally proportioned colums, use native CSS grid-template-column 'fr'
      values.</fudis-heading
    >
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
  </fudis-grid>`,
});

export const UnequallyWideColumns = UnequallyWideColumnsTemplate.bind({});
UnequallyWideColumns.args = {
  columns: '3fr 1fr',
};
UnequallyWideColumns.argTypes = {
  columns: {
    options: ['3fr 1fr', '1fr 2fr', '1fr 2fr 1fr', '3fr 1fr 2fr'],
    control: { type: 'radio' },
  },
};
UnequallyWideColumns.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

const ResponsiveColumnsTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: {
    ...args,
    columnObjectOne: '{md: 2, xxl: 4}',
    defaultObject: '{xs: 1, md: 2, xl: 4}',
    columnObjectTwo: '{sm: 2, md: 3}',
    combinedObject: '{xs: 1, sm: 2, md: 3, xl: 4}',
  },
  template: html`<fudis-grid [columns]="columns">
    <fudis-grid-item class="storybook__item-highlight" [columns]="'stretch'">
      <fudis-body-text class="text-margin">
        You don't need to provide value for all breakpoints.</fudis-body-text
      >
      <fudis-body-text class="text-margin">
        E. g. with {{columnObjectOne}} Grid will have default value of '1fr' until 'md' breakpoint
        and 'md' rule is on until hitting 'xxl' breakpoint.</fudis-body-text
      >
      <fudis-body-text class="text-margin"
        >Using FudisGridService's 'setDefaultValues()' you can define default values applied to all
        your Grids.</fudis-body-text
      >
      <fudis-body-text class="text-margin"
        >If you set default values and provide values for single Grid, values are combined.
      </fudis-body-text>
      <fudis-body-text>
        E. g. with default values of {{defaultObject}} and provided Grid values of
        {{columnObjectTwo}} applied values will be: {{combinedObject}}
      </fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
  </fudis-grid>`,
});

export const ResponsiveColumns = ResponsiveColumnsTemplate.bind({});

ResponsiveColumns.args = {
  columns: { xs: 1, sm: 2, md: '1fr 2fr', lg: 3, xl: '1fr 2fr 1fr', xxl: 6 },
};

ResponsiveColumns.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};
