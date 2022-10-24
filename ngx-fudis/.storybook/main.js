module.exports = {
  stories: [
    "../projects/ngx-fudis/src/lib/components/**/*.stories.ts",
    "../projects/ngx-fudis/src/lib/foundations/**/*.stories.mdx",
    "../projects/documentation/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        transcludeMarkdown: true,
      },
    },
  ],
  framework: "@storybook/angular",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ['./../projects/ngx-fudis/src/lib/assets/fonts/fira/woff2'],
};
