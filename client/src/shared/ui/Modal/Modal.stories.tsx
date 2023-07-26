import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { ModalWindow } from './children/ModalWindow';
import { ChildrenDefault } from './children/ModalWindow.stories'

const meta = {
  component: Modal,
  title: "shared/Modal",
  tags: ['autodocs'],
  argTypes: { onClose: { action: 'clicked' } },
  args: {
    isOpen: true,
    children: <ModalWindow {...ChildrenDefault.args} />
  }
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
} satisfies Story
