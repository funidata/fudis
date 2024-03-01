import { NgxFudisModule } from "../projects/ngx-fudis/src/lib/ngx-fudis.module";
import { useTheme } from "./useTheme";
import { moduleMetadata } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import getVersion from "./getVersion";
import { excludeRegex } from "../projects/ngx-fudis/src/lib/utilities/storybook";

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
                "Docker and NPM (Node.js)",
                "Code Linting and Formatting",
                "Git and GitHub Conventions",
                "Creating Release",
              ],
              "DS Practises",
              [
                "Ways of Working",
                "Project Structure",
                "Naming Conventions",
                "Creating A Component",
                "Testing Practises",
                "Component Checklist",
              ],
            ],
          ],
          "Foundations",
          "Components",
          [
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
              "Input With Language Options",
              "Select",
              ["Common Features", "Select", "Multiselect"],
              "Text Area",
              "Text Input",
            ],
            "Footer",
            "Grid",
            "Icon",
            "Link",
            "Notification",
            "Section",
            "Typography",
          ],
          "Directives",
          "Services",
          "Utilities",
        ],
      },
    },
    version: {
      ...getVersion(),
      style: {
        color: "#1ea7fd",
        border: "1px solid #f2f9ff",
        "background-color": "#f2f9ff",
        "font-size": "12px",
        "text-transform": "none",
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
