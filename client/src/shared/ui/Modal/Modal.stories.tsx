import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { ModalWindow } from './children/ModalWindow';

const meta = {
  component: Modal,
  title: "shared/Modal",
  tags: ['autodocs'],
  args: {
    isOpen: true,
    children: <ModalWindow isOpen={true} onClose={() => { }} text='text' title='title' />
  }
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
} satisfies Story
