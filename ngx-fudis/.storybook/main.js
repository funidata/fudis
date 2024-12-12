export const stories = [
  "../projects/ngx-fudis/src/test-playgrounds/*.stories.ts",
  "../projects/ngx-fudis/src/lib/**/*.stories.ts",
  "../projects/ngx-fudis/src/lib/**/*.mdx",
  "../projects/documentation/**/*.mdx",
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
  "./assets/i18n",
];
export const docs = {
  defaultName: "Documentation",
};

export function managerHead(head) {
  return `
    ${head}
    <link rel="shortcut icon" href="favicon.ico">
    <style>
      .sidebar-item:has(#components-description-list--description-list-compact)  { display: none;}
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
      .sb-show-main.sb-main-padded:has(.fudis-footer){
          padding: 0;
      }
    </style>
  `;
}
