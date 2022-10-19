// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta, moduleMetaData } from '@storybook/angular/types-6-0';
import { moduleMetaData } from '@storybook/angular';
import { HeadingComponent } from './heading.component';
import { BodyTextComponent } from '../body-text/body-text.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Components/Heading',
  component: HeadingComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  decorators: [
    moduleMetadata({
        declarations: [ HeadingComponent, BodyTextComponent],
    }),
],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<HeadingComponent> = (args: HeadingComponent) => ({
  props: args,
});

export const Example = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Example.args = {
  tag: 'h1',
  variant: 'xxl',
};

Example.args = {
  tag: 'h2',
  variant: 'xl',
};

Example.args = {
  tag: 'h3',
  variant: 'l',
};

Example.args = {
  tag: 'h4',
  variant: 'm',
};

Example.args = {
  tag: 'h5',
  variant: 's',
};

Example.args = {
  tag: 'h6',
  variant: 'xs',
};

export const AllTypes = () => ({
  template: `\
<fudis-heading tag='h4'>Tässä on otsikko</fudis-heading>
<fudis-body-text size='m-regular'>Tässä vähän pidempi teksti, jonka perässä pitäisi olla välistys kokoa M</fudis-body-text>`,
});
