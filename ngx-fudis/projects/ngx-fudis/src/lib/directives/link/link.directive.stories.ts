import { StoryFn, Meta } from '@storybook/angular';
import readme from './link-directive.mdx';

export default {
  title: 'Directives/Link',
  parameters: {
    docs: {
      page: readme,
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['inherit', 'md', 'lg'],
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn = (args) => ({
  props: args,
  template: html`
    <a
      fudisLink
      href="https://www.example.com"
      [title]="title"
      [external]="external"
      [size]="size"
    ></a>
  `,
});

export const AllCombinations: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-grid [width]="'sm'" [rowGap]="'md'">
      <fudis-heading class="fudis-mb-none">All Link Combinations</fudis-heading>
      <fudis-body-text
        >This page has all combinations from Link's properties. Used for visual regression
        tests.</fudis-body-text
      >
      <a
        fudisLink
        href=""
        [size]="'inherit'"
        [title]="'Independent non-external link of size inherit'"
      ></a>
      <a fudisLink href="" [size]="'md'" [title]="'Independent non-external link of size md'"></a>
      <a fudisLink href="" [size]="'lg'" [title]="'Independent non-external link of size lg'"></a>
      <a
        fudisLink
        href=""
        [size]="'lg'"
        [title]="'Superlongnonexternalsinglewordedlinktotestwordbreakingincaseofsmallscreen'"
      ></a>
      <a
        fudisLink
        href=""
        [external]="true"
        [size]="'inherit'"
        [title]="'Independent external link of size inherit'"
      ></a>
      <a
        fudisLink
        href=""
        [external]="true"
        [size]="'md'"
        [initialFocus]="true"
        [title]="'Independent external link of size md. As a bonus I have initialFocus set to true'"
      ></a>
      <a
        fudisLink
        href=""
        [external]="true"
        [size]="'lg'"
        [title]="'Independent external link of size lg'"
      ></a>
      <a
        fudisLink
        href=""
        [external]="true"
        [size]="'lg'"
        [title]="'Superlongexternalsinglewordedlinktotestwordbreakingincaseofsmallscreen'"
      ></a>

      <fudis-body-text [variant]="'lg-regular'"
        >This Body Text lg-regular has
        <a fudisLink href="" [size]="'inherit'" [title]="'non-external link'"></a>
        and
        <a fudisLink href="" [external]="true" [size]="'inherit'" [title]="'external link'"></a>
        as its child element.</fudis-body-text
      >
      <fudis-body-text [variant]="'md-regular'"
        >This Body Text md-regular has
        <a fudisLink href="" [size]="'inherit'" [title]="'non-external link'"></a>
        and
        <a fudisLink href="" [external]="true" [size]="'inherit'" [title]="'external link'"></a>
        as its child elements.</fudis-body-text
      >
      <fudis-body-text [variant]="'sm-regular'"
        >This Body Text sm-regular has
        <a fudisLink href="" [size]="'inherit'" [title]="'non-external link'"></a>
        and
        <a fudisLink href="" [external]="true" [size]="'inherit'" [title]="'external link'"></a>
        as its child elements.</fudis-body-text
      >
      <fudis-body-text [variant]="'lg-light'"
        >This Body Text lg-light has
        <a fudisLink href="" [size]="'inherit'" [title]="'non-external link'"></a>
        and
        <a fudisLink href="" [external]="true" [size]="'inherit'" [title]="'external link'"></a>as
        its child elements.</fudis-body-text
      >
      <fudis-body-text [variant]="'md-light'"
        >This Body Text md-light has
        <a fudisLink href="" [size]="'inherit'" [title]="'non-external link'"></a>
        and
        <a fudisLink href="" [external]="true" [size]="'inherit'" [title]="'external link'"></a>
        as its child elements.</fudis-body-text
      >
    </fudis-grid>
  `,
});

Example.args = {
  title: 'This is an example title',
  external: false,
  size: 'md',
};

AllCombinations.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
