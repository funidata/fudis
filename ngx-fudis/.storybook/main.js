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

  // To inject custom rules for <head> element. E.g. hide one Story from sidebar, so it can be still used in component's Docs page
  managerHead: (head) => `
    ${head}
    <link rel="shortcut icon" href="favicon.ico">
    <style>
      #components-description-list--description-list-compact { display: none;}
    </style>
  `,
  // Rules for rendered canvas. E. g. if you need custom CSS classes in your Story's html
  previewHead: (head) => `
    ${head}
    <style>
      .storybook-flex {
          display: flex;
          align-items: center;
      }
    </style>
  `,
};
