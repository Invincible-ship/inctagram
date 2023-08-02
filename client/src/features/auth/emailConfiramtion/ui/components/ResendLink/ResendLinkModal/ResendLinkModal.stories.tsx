import { Meta, StoryObj } from '@storybook/react'
import { ResendLinkModal } from './ResendLinkModal'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'FEATURES/auth/signup/Resendlink/Modal',
  component: ResendLinkModal,
  tags: ['autodocs'],
  argTypes: {
    lng: {
      control: 'radio',
      options: ['en', 'ru'],
    },
    onClose: action('clicked'),
  },
  args: {
    isOpen: true,
    lng: 'ru',
    userEmail: 'userEmail'
  }
} satisfies Meta<typeof ResendLinkModal>

export default meta
type Story = StoryObj<typeof meta>

export const ResendLinkModalStory = {} satisfies Story