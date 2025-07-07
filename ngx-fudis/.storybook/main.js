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
      
      .version-badges {
        .fudis-badge__primary {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;

        a.sbdocs {
            color: #484848;
            font-family: 'Fira Sans', sans-serif;
            font-size: 12px;
            font-weight: 400;
            padding: 1px 3px;
            line-height: 14px;
            text-transform: uppercase;
            vertical-align: middle;
            background-color: #daedff;

            border: 1px solid #1076db;
            border-radius: 2px;
        }
        
        p {
        margin: 0;
        }
      }
    }
    </style>
  `;
}
