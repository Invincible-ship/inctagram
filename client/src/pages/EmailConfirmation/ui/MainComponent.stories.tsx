import { Meta, StoryObj } from '@storybook/react'
import { MainComponent } from './MainComponent'
import { action } from '@storybook/addon-actions'
import { userEvent, within } from '@storybook/testing-library'

const meta = {
  title: 'PAGES/emailConfirmation/Congratulation_&_ResendLink',
  component: MainComponent,
  tags: ['autodocs'],
  args: {
    title: 'Some Title',
    text: 'Some text',
    buttonText: 'Some buttonText',
    action: action('on button click'),
  },
  argTypes: {
    action: { action: 'clicked' },
    status: {
      options: ['Some status', undefined],
      control: { type: 'select' },
    },
    email: {
      options: ['example@gmail.com', undefined],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof MainComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: { status: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story

export const CongratulationEN = {
  args: {
    status: 'sucsess',
    title: 'Congratulation',
    text: 'Your email has been confirmed',
    buttonText: 'Sign In',
  },
  argTypes: {
    status: {
      options: ['sucsess', undefined],
      control: { type: 'select' },
    },
    email: {
      options: [undefined],
      control: { type: 'select' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story

export const CongratulationRU = {
  args: {
    status: 'sucsess',
    title: 'Поздравляем',
    text: 'Ваша электронная почта подтверждена',
    buttonText: 'Войти',
  },
  argTypes: {
    status: {
      options: ['sucsess', undefined],
      control: { type: 'select' },
    },
    email: {
      options: [undefined],
      control: { type: 'select' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story

export const ResendLinkEN = {
  args: {
    email: 'example@gmail.com',
    title: 'Email verification link expired',
    text: 'Looks like the verification link has expired. Not to worry, we can send the link again',
    buttonText: 'Resend verification link',
  },
  argTypes: {
    status: {
      options: [undefined],
      control: { type: 'select' },
    },
    email: {
      options: ['example@gmail.com', undefined],
      control: { type: 'select' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story

export const ResendLinkRU = {
  args: {
    email: 'example@gmail.com',
    title: 'Срок действия ссылки для подтверждения электронной почты истек',
    text: 'Похоже, срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз',
    buttonText: 'Повторно отправить ссылку для подтверждения',
  },
  argTypes: {
    status: {
      options: [undefined],
      control: { type: 'select' },
    },
    email: {
      options: ['example@gmail.com', undefined],
      control: { type: 'select' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story
