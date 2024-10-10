import { StoryFn, Meta } from '@storybook/angular';
import { GridItemComponent } from './grid-item.component';
import docs from './grid-item.mdx';

const html = String.raw;

export default {
  title: 'Components/Grid/Grid Item',
  component: GridItemComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  props: args,

  template: html`<fudis-grid [columns]="{ xs: 2, md: 4 }">
    <fudis-grid-item [columns]="'stretch'">
      <fudis-body-text
        >Too see alignSelfX and alignSelfY clearly, make sure the preview canvas is wide
        enough.</fudis-body-text
      >
    </fudis-grid-item>
    <fudis-grid-item
      class="storybook__item-highlight"
      [alignSelfX]="alignSelfX"
      [alignSelfY]="alignSelfY"
      [columns]="columns"
    >
      <fudis-body-text>Adjustable grid item</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item"
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

export const AlignSelfX: StoryFn = (args) => ({
  props: { ...args, responsiveAlignSelfX: "{ sm: 'start', md: 'end', lg: 'center' }" },
  template: html`<fudis-grid [columns]="2">
    <fudis-grid-item class="storybook__item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>

    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-grid-item [alignSelfX]="'start'" class="storybook__item-highlight"
      ><fudis-body-text>alignSelfX = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'end'"
      ><fudis-body-text>alignSelfX = 'end'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>

    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'center'">
      <fudis-body-text>alignSelfX = 'center' </fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid item</fudis-body-text>
    <fudis-grid-item
      class="storybook__item-highlight"
      [alignSelfX]="{sm: 'start', md: 'end', lg: 'center'}"
    >
      <fudis-body-text
        >Responsive alignSelfX = <br />
        "{{responsiveAlignSelfX}}"</fudis-body-text
      >
    </fudis-grid-item>
  </fudis-grid>`,
});

export const AlignSelfY: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-grid-item class="storybook__item-highlight">
      <fudis-body-text>alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="storybook__item">
      <fudis-body-text class="fudis-mb-sm"
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

    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="'start'"
      ><fudis-body-text>alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item">
      <fudis-body-text class="fudis-mb-sm"
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
    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="storybook__item">
      <fudis-body-text class="fudis-mb-sm"
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
    <fudis-grid-item class="storybook__item-highlight" [alignSelfY]="'center'"
      ><fudis-body-text>alignSelfY = 'center'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="storybook__item">
      <fudis-body-text class="fudis-mb-sm"
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
      class="storybook__item-highlight"
      [alignSelfY]="{xs: 'end', sm: 'stretch', md: 'start', lg: 'center'}"
      ><fudis-body-text>alignSelfY = 'responsive'</fudis-body-text></fudis-grid-item
    ><fudis-grid-item class="storybook__item">
      <fudis-body-text class="fudis-mb-sm"
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

export const AlignSelfXAndY: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-grid [columns]="2" [width]="'sm'">
    <fudis-grid-item class="storybook__item-highlight">
      <fudis-body-text>alignSelfX = 'stretch' & alignSelfY = 'stretch' (default)</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'start'" [alignSelfY]="'start'"
      ><fudis-body-text>align = 'start' & alignSelfY = 'start'</fudis-body-text></fudis-grid-item
    >
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item class="storybook__item-highlight" [alignSelfX]="'end'" [alignSelfY]="'end'"
      ><fudis-body-text>alignSelfX = 'end' & alignSelfY = 'end'</fudis-body-text></fudis-grid-item
    ><fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
    <fudis-grid-item
      class="storybook__item-highlight"
      [alignSelfX]="'center'"
      [alignSelfY]="'center'"
      ><fudis-body-text
        >alignSelfX = 'center' & alignSelfY = 'center'</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-body-text class="storybook__item"
      >Normal grid item. With more content so effects of adjusting a single element can be seen
      better.</fudis-body-text
    >
  </fudis-grid>`,
});

export const Columns: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-grid [columns]="6">
    <fudis-grid-item class="storybook__item-highlight" [columns]="'stretch'">
      <fudis-body-text>columns = 'stretch', so it takes the full width</fudis-body-text>
    </fudis-grid-item>
    <fudis-grid-item class="storybook__item" class="storybook__item">
      <fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="'3/-1'"
      ><fudis-body-text
        >columns = '3/-1', so it starts from the 3rd column and stretches to the
        end</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="2"
      ><fudis-body-text
        >columns = 2, so it spans 2 columns from where it starts.</fudis-body-text
      ></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item" class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="'5/-1'"
      ><fudis-body-text
        >columns = '5/-1', so it starts 5th column and stretches until the very
        end.</fudis-body-text
      ></fudis-grid-item
    >
  </fudis-grid>`,
});

export const ResponsiveColumns: StoryFn = (args) => ({
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
      <fudis-body-text
        >Try resizing canvas width, so different span widths for items are applied on different
        breakpoints.</fudis-body-text
      >
    </fudis-grid-item>

    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleOne">
      <fudis-body-text>columns="{{exampleOneString}}"</fudis-body-text>
    </fudis-grid-item>
    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>
    <fudis-body-text class="storybook__item">Normal grid-item</fudis-body-text>
    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleTwo"
      ><fudis-body-text>columns="{{exampleTwoString}}"</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item"
      ><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
    >
    <fudis-grid-item class="storybook__item-highlight" [columns]="exampleThree"
      ><fudis-body-text>columns="{{exampleThreeString}}"</fudis-body-text></fudis-grid-item
    >
  </fudis-grid> `,
});

// NOTE: If you set controls: { disable: true } it causes console warning because Controls tab will be hidden and the tab count does not match
AlignSelfX.parameters = {
  controls: { exclude: /.*/g },
};

AlignSelfY.parameters = {
  controls: { exclude: /.*/g },
};

AlignSelfXAndY.parameters = {
  controls: { exclude: /.*/g },
};

Columns.parameters = {
  controls: { exclude: /.*/g },
};

ResponsiveColumns.parameters = {
  controls: { exclude: /.*/g },
};
