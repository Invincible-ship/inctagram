import { Meta, StoryObj } from '@storybook/react'
import { MainComponent } from './MainComponent'
import { action } from '@storybook/addon-actions'
import { userEvent, within } from '@storybook/testing-library'
import ImageCongratulation from './../../../../../public/icons/congratulation.svg'
import ImageResendLink from './../../../../../public/icons/resendLink.svg'

const meta = {
  title: 'PAGES/emailConfirmation',
  component: MainComponent,
  tags: ['autodocs'],
  args: {
    namespaces: 'emailConfiramtion',
    action: action('on button click'),
  },
  argTypes: {
    action: { action: 'clicked' },
  },
} satisfies Meta<typeof MainComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Congratulation = {
  args: {
    title: 'congratulation.title',
    text: 'congratulation.text',
    buttonText: 'congratulation.buttonText',
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
    title: 'resendLink.title',
    text: 'resendLink.text',
    buttonText: 'resendLink.buttonText',
    icon: <ImageResendLink />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story
