import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';
import { GridItemComponent } from './grid-item.component';
import readme from './grid-item.documentation.mdx';

const html = String.raw;

export default {
  title: 'Components/Grid/Grid Item',
  component: GridItemComponent,
  parameters: {
    docs: {
      page: readme,
    },
  },
  decorators: [
    componentWrapperDecorator(
      (story) => html`
        <style>
          .grid-item-highlight {
            padding: 0.5rem;
            background-color: #fdefb4;
          }

          .grid-item {
            padding: 0.5rem;
            background-color: #f1f1f1;
          }
        </style>
        ${story}
      `,
    ),
  ],
} as Meta;

const Template: StoryFn<GridItemComponent> = (args: GridItemComponent) => ({
  props: args,

  template: html`<fudis-grid [columns]="4">
    <fudis-grid-item [columns]="'stretch'">
      <fudis-heading [level]="1" [size]="'lg'"
        >This grid demonstrates adjusting a single item in a grid.</fudis-heading
      >
      <fudis-body-text
        >Too see alignSelfX and alignSelfY clearly, make sure the preview canvas is wide
        enough.</fudis-body-text
      >
      <fudis-body-text
        >If the canvas do not refresh when changing knobs, click the refresh button from top of
        Storybook's toolbar.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item
      class="grid-item-highlight"
      [alignSelfX]="alignSelfX"
      [alignSelfY]="alignSelfY"
      [columns]="columns"
    >
      <fudis-body-text>Adjustable grid item</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
  </fudis-grid>`,
});

export const Example = Template.bind({});
Example.args = {
  alignSelfX: 'stretch',
  alignSelfY: 'stretch',
  columns: 'auto',
};
Example.argTypes = {
  alignSelfX: {
    options: ['stretch', 'start', 'end', 'center'],
    control: { type: 'radio' },
  },
  alignSelfY: {
    options: ['stretch', 'start', 'end', 'center'],
    control: { type: 'radio' },
  },
  columns: {
    options: ['stretch', 'auto', 2, '2/4', '2/-1'],
    control: { type: 'radio' },
  },
};

export const AlignX: StoryFn<GridItemComponent> = (args: GridItemComponent) => ({
  props: { ...args, responsiveAlignX: "{ sm: 'start', md: 'end', lg: 'center' }" },
  template: html`<fudis-grid [columns]="2">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates attribute of 'alignSelfX'</fudis-heading
    >
    <fudis-grid-item class="grid-item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>

    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-grid-item [alignSelfX]="'start'" class="grid-item-highlight"
      ><fudis-body-text>alignSelfX = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'end'"
      ><fudis-body-text>alignSelfX = 'end'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>

    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'center'">
      <fudis-body-text>alignSelfX = 'center' </fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
    <fudis-grid-item
      class="grid-item-highlight"
      [alignSelfX]="{sm: 'start', md: 'end', lg: 'center'}"
    >
      <fudis-body-text>Responsive alignSelfX =</fudis-body-text>
      <fudis-body-text>"{{responsiveAlignX}}"</fudis-body-text>
    </fudis-grid-item>
  </fudis-grid>`,
});

export const AlignY: StoryFn<GridItemComponent> = (args: GridItemComponent) => ({
  props: args,
  template: html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates attribute of 'alignSelfY'</fudis-heading
    >
    <fudis-grid-item class="grid-item-highlight">
      <fudis-body-text>alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="grid-item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >

    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="'start'"
      ><fudis-body-text>alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="grid-item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfY]="'center'"
      ><fudis-body-text>alignSelfY = 'center'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="grid-item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item
      class="grid-item-highlight"
      [alignSelfY]="{xs: 'end', sm: 'stretch', md: 'start', lg: 'center'}"
      ><fudis-body-text>alignSelfY = 'responsive'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="grid-item">
      <fudis-body-text style="margin-bottom: 1rem;"
        >Normal grid item. With more content so effects of adjusting a single element can be seen
        better.</fudis-body-text
      >
      <fudis-body-text
        >Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six
        pounders careen avast belay. Sutler Jack Ketch broadside six pounders gally knave landlubber
        or just lubber handsomely ballast draft. Landlubber or just lubber Sea Legs bucko code of
        conduct chase wench spike lateen sail bilge boom.</fudis-body-text
      ></fudis-grid-item
    >
  </fudis-grid>`,
});

export const alignXAndY: StoryFn<GridItemComponent> = (args: GridItemComponent) => ({
  props: args,
  template: html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates combination of 'alignSelfX' and 'alignSelfY'</fudis-heading
    >
    <fudis-grid-item class="grid-item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' & alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'start'" [alignSelfY]="'start'"
      ><fudis-body-text>align = 'start' & alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'end'" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfX = 'end' & alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="grid-item-highlight" [alignSelfX]="'center'" [alignSelfY]="'center'"
      ><fudis-body-text
        >alignSelfX = 'center' & alignSelfY = 'center'</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-body-text class="grid-item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
  </fudis-grid>`,
});

export const columns: StoryFn<GridItemComponent> = (args: GridItemComponent) => ({
  props: args,
  template: html`<fudis-grid [columns]="6">
    <fudis-heading [level]="1" [size]="'lg'"
      >This grid demonstrates 'columns' attribute. Parent grid has six columns.
    </fudis-heading>
    <fudis-grid-item class="grid-item-highlight" [columns]="'stretch'">
      <fudis-body-text>columns = 'stretch', so it takes the full width</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="grid-item" class="grid-item">
      <fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="'3/-1'"
      ><fudis-body-text
        >columns = '3/-1', so it starts from the 3rd column and stretches to the
        end</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="2"
      ><fudis-body-text
        >columns = 2, so it spans 2 columns from where it starts.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="grid-item" class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="'5/-1'"
      ><fudis-body-text
        >columns = '5/-1', so it starts 5th column and stretches until the very
        end.</fudis-body-text
      ></fudis-grid-item
    >
  </fudis-grid>`,
});

export const responsiveColumns: StoryFn<GridItemComponent> = (args: GridItemComponent) => ({
  props: {
    ...args,
    exampleOne: { xs: 'stretch', md: 3, lg: 1 },
    exampleOneString: "{'xs: 'stretch', md: 3, lg: 'auto'}",
    exampleTwo: { default: '4/-1', md: 2 },
    exampleTwoString: "{ default: '4/-1', md: 2 }",
    exampleThree: { xs: '2/-1', md: 3, lg: '2/-1' },
    exampleThreeString: "{ xs: '2/-1', md: 3, lg: '2/-1' }",
  },
  template: html`<fudis-grid [columns]="6">
    <fudis-grid-item [columns]="'stretch'">
      <fudis-heading [level]="1" [size]="'lg'"
        >This grid demonstrates responsive 'columns' attribute for a Grid Item. Parent grid has six
        columns.
      </fudis-heading>
      <fudis-body-text
        >Try resizing canvas width, so different span widths for items are applied on different
        breakpoints.</fudis-body-text
      >
    </fudis-grid-item>

    <fudis-grid-item class="grid-item-highlight" [columns]="exampleOne">
      <fudis-body-text>columns="{{exampleOneString}}"</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="grid-item">Normal grid-item</fudis-body-text>
    <fudis-grid-item class="grid-item-highlight" [columns]="exampleTwo"
      ><fudis-body-text>columns="{{exampleTwoString}}"</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="grid-item-highlight" [columns]="exampleThree"
      ><fudis-body-text>columns="{{exampleThreeString}}"</fudis-body-text></fudis-grid-item
    >
  </fudis-grid> `,
});

// NOTE: If you set controls: { disable: true } it causes console warning because Controls tab will be hidden and the tab count does not match
AlignX.parameters = {
  controls: { exclude: /.*/g },
};

AlignY.parameters = {
  controls: { exclude: /.*/g },
};

alignXAndY.parameters = {
  controls: { exclude: /.*/g },
};

columns.parameters = {
  controls: { exclude: /.*/g },
};

responsiveColumns.parameters = {
  controls: { exclude: /.*/g },
};
