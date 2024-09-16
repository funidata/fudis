import { setCompodocJson } from "@storybook/addon-docs/angular";
import { moduleMetadata } from "@storybook/angular";
import docJson from "../documentation.json";
import { NgxFudisModule } from "../projects/ngx-fudis/src/lib/ngx-fudis.module";
import { excludeRegex } from "../projects/ngx-fudis/src/lib/utilities/storybook";
import { useTheme } from "./useTheme";

setCompodocJson(docJson);

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
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
            "Development",
            [
              "Getting Started",
              "Tooling",
              [
                "Setup VS Code",
                "Command Reference",
                "Testing Local Changes with Symlink",
                "Git and GitHub Conventions",
                "Creating a Release",
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
            ],
          ],
          "Foundations",
          [
            "Introduction",
            "Breakpoints",
            "Borders",
            "Colors",
            "Focus",
            "Grid",
            "Layers",
            "Spacing",
            "Typography",
            "Utilities",
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
              "Checkbox Group",
              "Date",
              "Error Message",
              "Error Summary",
              "Field Set",
              "Form",
              ["Example", "Example With Multiple Forms", "Example with Dynamic Validators"],
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
            "Icon",
            "Language Badge Group",
            "Link",
            "Notification",
            "Section",
            "Typography",
          ],
          "Directives",
          ["Introduction", "Form", "Grid", ["Introduction", "Grid", "Grid Item"], "Tooltip"],
          "Services",
          ["Introduction", "Error Summary", "Grid", "Translation"],
          "Utilities",
          ["Introduction"],
        ],
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Project theme for components",
    defaultValue: "sisu",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "sisu", title: "Sisu" },
        { value: "into", title: "Into" },
      ],
      title: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  useTheme,
  moduleMetadata({
    imports: [NgxFudisModule],
  }),
];

export default preview;
