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
  { from: "./../projects/ngx-fudis/src/lib/assets/fonts", to: "/assets" },
  { from: "./../projects/ngx-fudis/src/lib/assets/images", to: "/images" },
  "./assets/i18n",
  {
    from: "./../projects/ngx-fudis/src/lib/assets/images/fudis-logo-mini-black.svg",
    to: "/favicon.svg",
  },
];
export const docs = {
  defaultName: "Documentation",
};

export function managerHead(head) {
  return `
    ${head}
    <link rel="shortcut icon" href="favicon.svg">
    <style>
      .sidebar-item:has(#components-description-list--description-list-compact)  { display: none;}
      .sidebar-item:has(#components-test-playground)  { display: none;}
    </style>
  `;
}
export function previewHead(head) {
  return `
    ${head}
    <style>
      /*
      * These styles are intended for Storybook use only
      */
      .storybook-flex {
          display: flex;
          align-items: center;
      }
      .sb-show-main.sb-main-padded:has(.fudis-footer){
          padding: 0;
      }
          
      .sbdocs .full-width-bg {
        margin-top: -4rem;
        width: 100vw;
        height: 20rem;
        margin-left: calc(-50vw + 50%);
        background-image: url('/images/fudis-bg.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-sizing: border-box;
        margin-bottom: 2rem;
        display: flex;
        
          h1 {
            margin: auto;
            font-size: 40px;
          }

      }
      .welcome-page-wrapper {
          display: flex;
          align-items: center;
      }

      .css-qa4clq {
          .welcome-page-link {
          display: flex;
          align-items: center;
          width: fit-content;
          font-family: 'Fira Sans', sans-serif;
          font-size: 14px;
          color: #1d65b8;
          text-decoration: underline solid;
          margin-right: 8px;
        }
      }
    </style>
  `;
}
