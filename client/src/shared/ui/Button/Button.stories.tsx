import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Button, ButtonTheme } from './Button'
import { SharedDecorator } from '@/shared/config/storybook/SharedDecorator/SharedDecorator'

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  decorators: [(Story: StoryFn) => SharedDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: () => <Button theme={ButtonTheme.DEFAULT}>Button</Button>,
}

export const Secondary: Story = {
  render: () => <Button theme={ButtonTheme.SECONDARY}>Button</Button>,
}

export const Outlined: Story = {
  render: () => <Button theme={ButtonTheme.OUTLINED}>Button</Button>,
}

export const Text: Story = {
  render: () => <Button theme={ButtonTheme.TEXT}>Button</Button>,
}
