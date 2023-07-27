import { ModalWindow } from "./ModalWindow";
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ModalWindow,
  title: "shared/ModalWindow",
  tags: ['autodocs'],
} satisfies Meta<typeof ModalWindow>

export default meta

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'This is title',
    text: 'This is text',
    isOpen: true,
    //onClose: () => { },
  },
} satisfies Story

