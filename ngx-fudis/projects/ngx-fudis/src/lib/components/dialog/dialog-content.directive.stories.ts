import { DialogContentDirective } from "./dialog-directives";
import type { StoryObj, Meta } from "@storybook/angular-vite";

const meta: Meta<DialogContentDirective> = {
  title: 'Components/Dialog/Dialog Content Directive',
  component: DialogContentDirective,
  tags: ['!dev', '!autodocs'],
};
export default meta;

export const Default: StoryObj<DialogContentDirective> = {};