import { StoryFn, Meta, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { GridComponent } from './grid.component';
import { excludeEverythingExceptRegex, gridExampleExclude } from '../../../utilities/storybook';
import docs from './grid.docs.mdx';
import { FudisGridService } from '../../../services/grid/grid.service';
import { Component } from '@angular/core';
import { FudisGridAlign, FudisGridProperties } from '../../../types/grid';

@Component({
  selector: 'example-grid-with-service',
  template: `
    <fudis-grid
      [columns]="1"
      [rowGap]="'sm'"
      [align]="'center'"
      [classes]="['fudis-mt-md fudis-mb-md']"
    >
      <fudis-grid [columns]="2" [alignItemsX]="'center'" [rowGap]="'sm'" [alignItemsY]="'center'">
        <fudis-button
          [label]="'Update Grid Service defaults'"
          (handleClick)="updateGridServiceDefaults()"
        />
        <fudis-button
          [label]="'Update Grid [alignItemsX] value'"
          (handleClick)="updateGridAlignValue()"
        />
        <fudis-body-text
          fudisGridItem
          [columns]="'stretch'"
          [alignSelfX]="'center'"
          [variant]="'lg-regular'"
          >Current Grid Service values: <code>{{ _currentServiceConfigs }}</code>
        </fudis-body-text>
      </fudis-grid>

      <fudis-grid
        [alignItemsX]="_gridAlignValue"
        [rowGap]="'sm'"
        [classes]="['storybook__wrapper-border']"
      >
        <fudis-heading [level]="3" [variant]="'md'"
          >Listen to Service's Columns but not AlignItemsX</fudis-heading
        >
        <fudis-body-text class="storybook__item"
          >This Grid has [alignItemsX]="'{{ _gridAlignValue }}'"</fudis-body-text
        >
        <fudis-body-text class="storybook__item"
          >Even if Service values are updated, this should not affect alignment</fudis-body-text
        >
        <fudis-body-text class="storybook__item"
          >But this Grid columns layout should change as well from 2 to 3 cols in sm
          screen!</fudis-body-text
        >
      </fudis-grid>
      <fudis-grid [columns]="2" [classes]="['storybook__wrapper-border']">
        <fudis-heading [level]="3" [variant]="'md'"
          >Listen to Service's AlignItemsX but not Columns</fudis-heading
        >
        <fudis-body-text class="storybook__item"
          >This Grid has no set alignItemsX value</fudis-body-text
        >
        <fudis-body-text class="storybook__item"
          >It should listen to Service updates on alignItemsX</fudis-body-text
        >
        <fudis-body-text class="storybook__item"
          >But it has [columns]="2" and it should not listen to Service's columns</fudis-body-text
        >
      </fudis-grid>

      <fudis-grid [serviceDefaults]="false" [classes]="['storybook__wrapper-border']">
        <fudis-heading [level]="3" [variant]="'md'">Service Defaults are turned off</fudis-heading>
        <fudis-body-text class="storybook__item"
          >This Grid has no set alignItemsX value, and it is ignoring defaults from
          Service!</fudis-body-text
        >
        <fudis-body-text class="storybook__item"
          >It should NOT listen to Service updates!</fudis-body-text
        >
      </fudis-grid>
    </fudis-grid>
  `,
})
class GridWithServiceExampleComponent {
  constructor(private _gridService: FudisGridService) {
    const defaultValue: FudisGridProperties = {
      columns: { xs: 1, sm: 2 },
      alignItemsX: 'end',
    };

    _gridService.setDefaultValues(defaultValue);

    this._currentServiceConfigs = JSON.stringify(_gridService.getDefaultValues()())
      .split(',"')
      .join(', "');
  }

  protected _gridAlignValue: FudisGridAlign = 'end';

  protected _currentServiceConfigs: string;

  updateGridAlignValue(): void {
    this._gridAlignValue =
      this._gridAlignValue === 'center'
        ? 'end'
        : this._gridAlignValue === 'end'
          ? 'start'
          : 'center';
  }

  updateGridServiceDefaults(): void {
    const updateValue =
      this._gridService.getDefaultValues()()?.alignItemsX === 'end' ? 'stretch' : 'end';

    const updateColumnsValue =
      JSON.stringify(this._gridService.getDefaultValues()()?.columns) === '{"xs":1,"sm":2}'
        ? { xs: 1, sm: 3 }
        : { xs: 1, sm: 2 };

    this._gridService.setDefaultValues({
      alignItemsX: updateValue,
      columns: updateColumnsValue,
    });

    this._currentServiceConfigs = JSON.stringify(this._gridService.getDefaultValues()())
      .split(',"')
      .join(', "');
  }
}

const html = String.raw;

export default {
  title: 'Components/Grid/Grid',
  component: GridComponent,
  decorators: [
    moduleMetadata({
      declarations: [GridWithServiceExampleComponent],
    }),
    componentWrapperDecorator(
      (story) => html`<div style="border: 3px solid #b83c2e">${story}</div>`,
    ),
  ],

  parameters: {
    docs: {
      page: docs,
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
  template: html`<fudis-body-text class="fudis-my-sm" [variant]="'lg-regular'" [align]="'center'"
      >Current value of <code>columns</code> is:
      <code>{{transformedColumns}}</code></fudis-body-text
    >
    <fudis-grid
      [classes]="['storybook__wrapper-border']"
      [columns]="columns"
      [align]="align"
      [alignItemsX]="alignItemsX"
      [alignItemsY]="alignItemsY"
      [width]="width"
      [columnGap]="columnGap"
      [rowGap]="rowGap"
    >
      <div class="storybook__item">
        <fudis-body-text>First Grid child's first Body Text inside it</fudis-body-text>
        <fudis-body-text>First Grid child's second Body Text inside it</fudis-body-text>
      </div>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item"
        >Grid child element which has more content than most of the child elements</fudis-body-text
      >
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
      <fudis-body-text class="storybook__item">Grid child element</fudis-body-text>
    </fudis-grid>`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  columns: 3,
  align: 'center',
  alignItemsX: 'stretch',
  alignItemsY: 'stretch',
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

const ExampleWithServiceTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: { ...args },
  template: html` <example-grid-with-service></example-grid-with-service>`,
});

export const ExampleWithService = ExampleWithServiceTemplate.bind({});

ExampleWithService.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
