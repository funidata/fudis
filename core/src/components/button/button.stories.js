export default {
  title: "Components/Button",
  decorators: [
    (storyFn) =>
      `<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start;">${storyFn()}</div>`,
  ],
};

export const Primary = () => `
  <button class="fudis-button fudis-button__primary fudis-button__size__medium">
    Primary
  </button>
`;

export const Secondary = () => `
  <button class="fudis-button fudis-button__secondary fudis-button__size__medium">
    Secondary
  </button>
`;

export const Tertiary = () => `
  <button class="fudis-button fudis-button__tertiary fudis-button__size__medium">
  Tertiary
  </button>
`;

export const Primary_Small = () => `
  <button class="fudis-button fudis-button__primary fudis-button__size__small">
  Primary Small
  </button>
`;

export const Secondary_Small = () => `
  <button class="fudis-button fudis-button__secondary fudis-button__size__small">
  Secondary Small
  </button>
`;

export const Tertiary_Small = () => `
  <button class="fudis-button fudis-button__tertiary fudis-button__size__small">
  Tertiary Small
  </button>
`;

export const Disabled = () => `
  <button aria-disabled="true" class="fudis-button fudis-button__primary fudis-button__size__medium">
    Disabled
  </button>
`;
