import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

/**
 * Replace Storybook logo with brand image on the sidebar
 */
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Components library for Fudis",
    brandUrl: "https://github.com/funidata/fudis",
    brandImage: "/images/fudis-logo-regular-black.svg",
    brandTarget: "_self",
  }),
});
