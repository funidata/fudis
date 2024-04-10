module.exports = {
  stories: [
    "../projects/ngx-fudis/src/lib/**/*.stories.ts",
    "../projects/ngx-fudis/src/lib/**/*.stories.mdx",
    "../projects/ngx-fudis/src/lib/**/*.docs.mdx",
    "../projects/documentation/**/*.stories.mdx",
    "../projects/documentation/**/*.docs.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/angular",
    options: {
      enableIvy: true,
    },
  },
  features: {
    modernInlineRender: true,
    previewMdx2: true,
  },
  staticDirs: [
    "./../projects/ngx-fudis/src/lib/assets/fonts/fira/woff2",
    "./../projects/ngx-fudis/src/lib/assets/images",
  ],
  docs: {
    autodocs: true,
    defaultName: "Documentation",
  },
  managerHead: (head) => `
    ${head}
    <link rel="shortcut icon" href="favicon.ico">
  `,
  previewHead: (head) => `
    ${head}
    <style>
            .storybook-flex {
                display: flex;
                align-items: center;
            }
            .storybook-flex-column {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
    </style>
  `,
  env: (config) => {
    return {
      ...config,
      STORYBOOK_FUDIS_VERSION: process.env.STORYBOOK_FUDIS_VERSION || "",
    };
  },
};
