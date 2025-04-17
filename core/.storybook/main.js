export const stories = [
  "../src/**/*.mdx",
  "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
];

export const addons = [
  "@storybook/addon-essentials",
  "@storybook/addon-interactions"
]

export const framework = {
  name: "@storybook/html-vite",
  options: {},
};