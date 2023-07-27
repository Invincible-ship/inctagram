import { Meta, StoryObj } from '@storybook/react'
import { ErrorModal } from './ErrorModal'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'FEATURES/auth/signup/Resendlink/Modal',
  component: ErrorModal,
  tags: ['autodocs'],
  argTypes: {
    lng: {
      control: 'select',
      options: ['ru', 'en']
    },
    userEmail: {
      control: 'radio',
      options: [undefined, 'user email']
    }
  },
  args: {
    isOpen: true,
    lng: 'ru',
    onClose: action(' clickedOnTheButton'),
    userEmail: 'user email'
  }
} satisfies Meta<typeof ErrorModal>

export default meta
type Story = StoryObj<typeof meta>

export const ErrorModalStory = {
} satisfies Story