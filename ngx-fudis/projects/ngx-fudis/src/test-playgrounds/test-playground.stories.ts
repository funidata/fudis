import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { StorybookExampleBasicFormComponentsComponent } from './test-playground-components/basic-form-components.component';
import { TextInputComponent } from '../lib/components/form/text-input/text-input.component';
import { StorybookExampleDescriptionListCollectionComponent } from './test-playground-components/description-list-collection.component';

export default {
  title: 'Components/Test Playground',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        StorybookExampleBasicFormComponentsComponent,
        StorybookExampleDescriptionListCollectionComponent,
      ],
    }),
  ],
} as Meta;

const html = String.raw;

const BasicFormComponentsTemplate: StoryFn = () => ({
  template: html` <example-basic-form-components></example-basic-form-components> `,
});

export const BasicFormComponents = BasicFormComponentsTemplate.bind({});

const DLCollectionTemplate: StoryFn = () => ({
  template: html` <example-description-list-collection></example-description-list-collection> `,
});

export const DescriptionListCollection = DLCollectionTemplate.bind({});
