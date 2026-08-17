export const stories = [
  "../projects/ngx-fudis/src/test-playgrounds/*.stories.ts",
  "../projects/ngx-fudis/src/lib/**/*.stories.ts",
  "../projects/ngx-fudis/src/lib/**/*.mdx",
  "../projects/documentation/**/*.mdx",
];
export const addons = [
  "@storybook/addon-links",
  "@storybook/addon-a11y",
  "@storybook/addon-docs",
  import.meta.resolve("./local-preset.ts"),
];
export const framework = {
  name: "@storybook/angular",
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

export const core = {
  allowedHosts: ["fudis-storybook", "localhost"],
};

export async function webpackFinal(config) {
  config.plugins = config.plugins.filter((p) => p.constructor.name !== "ProgressPlugin");
  return config;
}

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

      .storybook-example-focus:focus {
          outline: 2px dashed #484848;
          outline-offset: 1px;
          box-shadow: #fff;
      }
    </style>

  `;
}
