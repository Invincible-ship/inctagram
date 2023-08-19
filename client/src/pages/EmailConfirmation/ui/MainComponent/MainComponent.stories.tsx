import { Meta, StoryObj } from '@storybook/react'
import { MainComponent } from './MainComponent'
import { action } from '@storybook/addon-actions'
import { userEvent, within } from '@storybook/testing-library'
import ImageCongratulation from './../../../../../public/icons/congratulation.svg'
import ImageResendLink from './../../../../../public/icons/resendLink.svg'

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

//export const Default = {
//args: {},
//  play: async ({ canvasElement }) => {
//    const canvas = within(canvasElement)

//    const button = canvas.getByRole('button')
//    await userEvent.click(button)
//  },
//} satisfies Story

export const Congratulation = {
  args: {
    t: (str: string) => str,
    title: 'congratulation.title',
    text: 'Your email has been confirmed',
    buttonText: 'Sign In',
    icon: <ImageCongratulation />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story

export const ResendLink = {
  args: {
    t: (str: string) => str,
    email: 'example@gmail.com',
    title: 'Email verification link expired',
    text: 'Looks like the verification link has expired. Not to worry, we can send the link again',
    buttonText: 'Resend verification link',
    icon: <ImageResendLink />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story
