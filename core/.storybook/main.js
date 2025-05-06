export const stories = ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"];

export const staticDirs = [{ from: "./../src/assets/fonts/woff", to: "/woff" }];

export const addons = [
  {
    name: "@storybook/addon-essentials",
    options: {
      controls: false,
      actions: false,
    },
  },
  "@storybook/addon-storysource",
  "@storybook/addon-a11y",
];

export const framework = {
  name: "@storybook/html-vite",
  options: {},
};
