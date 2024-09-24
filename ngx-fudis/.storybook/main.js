export const stories = [
  "../projects/ngx-fudis/src/lib/**/*.stories.ts",
  "../projects/ngx-fudis/src/lib/**/*.stories.mdx",
  "../projects/ngx-fudis/src/lib/**/*.docs.mdx",
  "../projects/documentation/**/*.stories.mdx",
  "../projects/documentation/**/*.docs.mdx",
];
export const addons = [
  "@storybook/addon-links",
  "@storybook/addon-essentials",
  "@storybook/addon-interactions",
  "@storybook/addon-a11y",
];
export const framework = {
  name: "@storybook/angular",
  options: {
    enableIvy: true,
  },
};
export const features = {
  modernInlineRender: true,
  previewMdx2: true,
};
export const staticDirs = [
  "./../projects/ngx-fudis/src/lib/assets/fonts/fira/woff2",
  "./../projects/ngx-fudis/src/lib/assets/images",
];
export const docs = {
  autodocs: true,
  defaultName: "Documentation",
};
export function managerHead(head) {
  return `
    ${head}
    <link rel="shortcut icon" href="favicon.ico">
    <style>
      #components-description-list--description-list-compact { display: none;}
    </style>
  `;
}
export function previewHead(head) {
  return `
    ${head}
    <style>
      .storybook-flex {
          display: flex;
          align-items: center;
      }
    </style>
  `;
}
