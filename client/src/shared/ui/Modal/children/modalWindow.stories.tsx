import { ModalWindow, ModalWindowPropsType } from "./ModalWindow";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<ModalWindowPropsType> = {
  component: ModalWindow,
  title: "shared/ModalWindow",
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ModalWindow>;

export const Default: Story = {
  args: {
    title: 'This is title',
    text: 'This is text',
  },
};
