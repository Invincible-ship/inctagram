import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ModalWindow } from './ModalWindow'
//import { ModalWindow } from './ModalWindow'

const meta = {
  component: ModalWindow,
  title: 'MODAL_WINDOWS/auth_ModalWindows',
  tags: ['autodocs'],
  args: {
    onClose: action('clicked'),
    isOpen: true,
    title: 'Some title',
    text: 'Some text',
    userEmail: 'Some email',
  },
} satisfies Meta<typeof ModalWindow>

export default meta
type Story = StoryObj<typeof meta>

// Storys ========================
export const Default: Story = {}

export const SignUpModalEN: Story = {
  args: {
    title: 'Email sent',
    text: 'We have sent a link to confirm your email to',
    userEmail: 'example@gmail.com',
  },
}

export const SignUpModalRU: Story = {
  args: {
    title: 'Письмо отправлено',
    text: 'Мы отправили ссылку для подтверждения электронной почты на',
    userEmail: 'example@gmail.com',
  },
}

export const ConfirmationLinkWasUsedEN: Story = {
  args: {
    title: 'Email is confirmed',
    text: 'Go to the Login page',
    userEmail: '',
  },
  argTypes: {
    userEmail: {
      control: 'select',
      options: [undefined],
    },
  },
}

export const ConfirmationLinkWasUsedRU: Story = {
  args: {
    title: 'Ваша почта уже подтверждена',
    text: 'Перейдите на страницу входа',
    userEmail: '',
  },
  argTypes: {
    userEmail: {
      control: 'select',
      options: [undefined],
    },
  },
}

export const ErrorModalEN: Story = {
  args: {
    title: 'Email error',
    text: 'Email is incorrect',
    userEmail: '',
  },
  argTypes: {
    userEmail: {
      control: 'select',
      options: [undefined],
    },
  },
}

export const ErrorModalRU: Story = {
  args: {
    title: 'Ошибка электронной почты',
    text: 'Электронная почта неверна',
    userEmail: '',
  },
  argTypes: {
    userEmail: {
      control: 'select',
      options: [undefined],
    },
  },
}
