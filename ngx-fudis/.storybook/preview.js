import { setCompodocJson } from "@storybook/addon-docs/angular";
import { moduleMetadata } from "@storybook/angular";
import { NgxFudisModule } from "../projects/ngx-fudis/src/lib/ngx-fudis.module";
import { excludeRegex } from "../projects/ngx-fudis/src/lib/utilities/storybook";

import { TranslocoRootModule } from ".storybook/transloco.module";
import { HttpClient } from "@angular/common/http";
import { TranslocoService } from "@jsverse/transloco";
import docJson from "../documentation.json";
import "zone.js";

setCompodocJson(docJson);

const preview = {
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
          "Documentation",
          [
            "Introduction",
            ["Welcome", "How to Start Using Fudis"],
            "Development",
            [
              "Getting Started",
              "How to Contribute",
              "Tooling",
              [
                "Setup VS Code",
                "Testing Local Changes with Symlink",
                "Git and GitHub Conventions",
                "Releases",
              ],
              "DS Practises",
              [
                "Ways of Working",
                "Project Structure",
                "Naming Conventions",
                "Creating a Component",
                "Testing Practises",
                "Component Checklist",
              ],
              "Information Security Management",
            ],
          ],
          "Components",
          [
            "Introduction",
            "Alert Group",
            "Autocomplete multi-select",
            "Badge",
            "Breadcrumbs",
            "Button",
            "Description List",
            "Dialog",
            "Dropdown Menu",
            "Expandable",
            "Form",
            [
              "Checkbox",
              "Checkbox Group",
              "Date",
              "Error Message",
              "Error Summary",
              "Fieldset",
              "Form",
              "Localized Text Group",
              "Radio Button Group",
              "Select",
              ["Common Features", "Select", "Multiselect"],
              "Text Area",
              "Text Input",
            ],
            "Footer",
            "Grid",
            ["Grid", "Grid Item"],
            "Horizontal Rule",
            "Icon",
            "IconButton",
            "Language Badge Group",
            "Link",
            "Loading Spinner",
            "Notification",
            "Pagination",
            "Section",
            "Tab Navigation",
            "Typography",
          ],
          "Directives",
          ["Introduction", "Form", "Grid", ["Introduction", "Grid", "Grid Item"], "Popover"],
          "Services",
          ["Introduction", "Error Summary", "Grid", "Translation"],
          "Utilities",
          ["Introduction"],
        ],
      },
    },
  },

  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [NgxFudisModule, TranslocoRootModule],
      providers: [HttpClient, TranslocoService],
    }),
  ],
};

export default preview;
