import { setCompodocJson } from '@storybook/addon-docs/angular';
import { moduleMetadata, Preview } from '@storybook/angular-vite';
import { NgxFudisModule } from '../projects/ngx-fudis/src/lib/ngx-fudis.module';
import { excludeRegex } from '../projects/ngx-fudis/src/lib/utilities/storybook';
import { TranslocoRootModule } from './transloco.module';
import { HttpClient } from '@angular/common/http';
import { TranslocoService } from '@jsverse/transloco';
import docJson from '../documentation.json';
interface DocComponent {
  name: string;
  [key: string]: unknown;
}
interface DocJson {
  components: Array<DocComponent>;
}
/*
  TODO: Remove this workaround when updating to Angular 22.

  Duplicate the compodoc array entries to support Vite's suffixed names.
  Read more about why this is necessary here: https://github.com/funidata/fudis/pull/1038
*/
if ((docJson as DocJson).components) {
  const aliasedComponents = [...(docJson as DocJson).components];

  (docJson as DocJson).components.forEach((component) => {
    aliasedComponents.push({
      ...component,
      name: `${component.name}2`,
    });
  });

  (docJson as DocJson).components = aliasedComponents;
}

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      disableSaveFromUI: true,
      exclude: excludeRegex(),
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      argTypes: {
        exclude: excludeRegex(),
      },
      controls: {
        exclude: excludeRegex(),
      },
      story: { inline: true },
    },
    options: {
      storySort: {
        order: [
          'Documentation',
          [
            'Introduction',
            ['Welcome', 'How to Start Using Fudis'],
            'Development',
            [
              'Getting Started',
              'How to Contribute',
              'Tooling',
              [
                'Setup VS Code',
                'Testing Local Changes in Application',
                'Git and GitHub Conventions',
                'Releases',
              ],
              'DS Practises',
              [
                'Ways of Working',
                'Project Structure',
                'Naming Conventions',
                'Creating a Component',
                'Testing Practises',
                'Component Checklist',
              ],
              'Information Security Management',
            ],
          ],
          'Components',
          [
            'Introduction',
            'Alert Group',
            'Autocomplete multi-select',
            'Badge',
            'Breadcrumbs',
            'Button',
            'Description List',
            'Dialog',
            'Dropdown Menu',
            'Expandable',
            'Form',
            [
              'Checkbox',
              'Checkbox Group',
              'Date',
              'Error Message',
              'Error Summary',
              'Fieldset',
              'Form',
              'Localized Text Group',
              'Radio Button Group',
              'Select',
              ['Common Features', 'Select', 'Multiselect'],
              'Text Area',
              'Text Input',
            ],
            'Footer',
            'Grid',
            ['Grid', 'Grid Item'],
            'Horizontal Rule',
            'Icon',
            'IconButton',
            'Language Badge Group',
            'Loading Spinner',
            'Notification',
            'Pagination',
            'Section',
            'Tab Navigation',
            'Typography',
          ],
          'Directives',
          [
            'Introduction',
            'Form',
            'Grid',
            ['Introduction', 'Grid', 'Grid Item'],
            'Link',
            'Popover',
          ],
          'Services',
          ['Introduction', 'Breakpoint', 'Error Summary', 'Grid', 'Translation'],
          'Utilities',
          ['Introduction', 'Validators'],
        ],
      },
    },
  },

  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NgxFudisModule, TranslocoRootModule],
      providers: [HttpClient, TranslocoService],
    }),
  ],
};

export default preview;
