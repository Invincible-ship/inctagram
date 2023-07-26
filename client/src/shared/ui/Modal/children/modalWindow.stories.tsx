import { ModalWindow } from "./ModalWindow";
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library'

const meta = {
  component: ModalWindow,
  title: "shared/ModalWindow",
  tags: ['autodocs'],
} satisfies Meta<typeof ModalWindow>

export default meta

type Story = StoryObj<typeof meta>;

export const DefaultModalWindow: Story = {
  args: {
    title: 'This is title',
    text: 'This is text',
    isOpen: true,
    //onClose: () => { },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await userEvent.click(button);

    const closeImg = canvas.getByTestId('ModalWindowStioryTestId');
    await userEvent.click(closeImg);
  },
} satisfies Story

