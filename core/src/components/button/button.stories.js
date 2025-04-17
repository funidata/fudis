import './button.scss';

export default {
  title: 'Components/Button',
  decorators: [(storyFn) => `<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start;">${storyFn()}</div>`],
};

export const Primary = () => `
  <button type="button" class="fudis-button fudis-button__label--visible fudis-button__primary fudis-button__size__medium">
    Button
  </button>
`;