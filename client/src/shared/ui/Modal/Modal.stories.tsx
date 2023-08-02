import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { ModalWindow } from '../../../features/auth/emailConfiramtion/ui/ModalWindow/ModalWindow'
import { ChildrenDefault } from '../../../features/auth/emailConfiramtion/ui/ModalWindow/modalWindow.stories'

const meta = {
  component: Modal,
  title: 'shared/Modal',
  tags: ['autodocs'],
  argTypes: { onClose: { action: 'clicked' } },
  args: {
    isOpen: true,
    children: <ModalWindow {...ChildrenDefault.args} />,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {} satisfies Story
