import type { Meta, StoryObj } from '@storybook/react'
import { CongratulationUI } from './CongratulationUI'
import { userEvent, within } from '@storybook/testing-library'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'FEATURES/auth/signup/Congratulation',
  component: CongratulationUI,
  tags: ['autodocs'],
  args: {
    title: 'some title',
    text: 'some text',
    buttonText: 'some button text',
    action: action('clicked')
  }
} satisfies Meta<typeof CongratulationUI>

export default meta
type Story = StoryObj<typeof meta>

export const CongratulationUiStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)
  },

} satisfies Story