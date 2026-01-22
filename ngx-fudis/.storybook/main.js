export const stories = [
  "../projects/ngx-fudis/src/test-playgrounds/*.stories.ts",
  "../projects/ngx-fudis/src/lib/**/*.stories.ts",
  "../projects/ngx-fudis/src/lib/**/*.mdx",
  "../projects/documentation/**/*.mdx",
  "../projects/ngx-fudis/src/storybook-docs/version-selector/version-selector.stories.ts",
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
  "./static",
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
    <style>
      .sidebar-item:has(#components-description-list--description-list-compact)  { display: none;}
      .sidebar-item:has(#components-test-playground)  { display: none;}
      .sidebar-item:has(#components-form-checkbox--all-states)  { display: none;}
      /* Hide test stories from sidebar */
      [data-item-id*="pw"] {
        display: none !important;
      }
      /* Hide Docs/Version Selector story from sidebar */
      [data-item-id^="docs-version-selector"],
      .sidebar-item:has([data-item-id^="docs-version-selector"]) {
        display: none !important;
      }
      [data-item-id="docs"],
      .sidebar-item:has([data-item-id="docs"]) { display: none !important; }
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
        background-image: url('./images/fudis-bg.svg');
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
      .welcome-page-link {
        font-family: 'Fira Sans', sans-serif;
        font-size: 14px;
        color: #1d65b8;
        text-decoration: underline solid;
        margin-right: 8px;
      }

      .welcome-page-link:focus {
          outline: 2px dashed #484848;
          outline-offset: 1px;
          box-shadow: #fff;
        }

      /* 
      * Remove styling from version selector canvases so that only the selector is shown 
        and style the containing iframe correctly to hide scollbars
      */

      .unstyled-canvas.sbdocs-preview,
      .unstyled-canvas .docs-story {
        margin: 0;
        padding: 0;
        border: 0;
      }

      .unstyled-canvas.sbdocs-preview iframe {
        display: block;
        border: 0;
        overflow: hidden;
      }
      #story--docs-version-selector--version-selector-story {
        overflow: hidden !important;
      }
      #story--docs-version-selector--version-selector-story > div {
        height: 220px !important;
      }

      .unstyled-canvas {
        box-shadow: none !important;
        border: none !important;
      }

      .unstyled-canvas .docs-story > div {
        padding: 0;
        margin: 0;
        border: 0;
      }

      .unstyled-canvas .docs-story [class*="css-"] .innerZoomElementWrapper > * {
        border: none !important;
      }
    </style>

  `;
}
