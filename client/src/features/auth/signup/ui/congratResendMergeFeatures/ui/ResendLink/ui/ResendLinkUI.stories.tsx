import { Meta, StoryObj } from '@storybook/react'
import { ResendLinkUI } from './ResendLinkUI'
import { action } from '@storybook/addon-actions'
import { userEvent, within } from '@storybook/testing-library'

const meta = {
  title: 'FEATURES/auth/signup/ResendLink',
  component: ResendLinkUI,
  tags: ['autodocs'],
  args: {
    title: 'Some Title',
    text: 'Some text',
    buttonText: 'Some buttonText',
    action: action('on button click')
  }
} satisfies Meta<typeof ResendLinkUI>

export default meta
type Story = StoryObj<typeof meta>

export const ResendLinkUiStory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },
} satisfies Story