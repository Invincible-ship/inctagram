import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { DottedMenuIcon } from './DottedMenuIcon'
import { SharedDecorator } from '@/shared/config/storybook/SharedDecorator/SharedDecorator'

const meta: Meta<typeof DottedMenuIcon> = {
  title: 'shared/DottedMenuIcon',
  component: DottedMenuIcon,
  decorators: [(Story: StoryFn) => SharedDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof DottedMenuIcon>

export const Default: Story = {
  render: () => <DottedMenuIcon />,
}

export const Active: Story = {
  render: () => <DottedMenuIcon isActive />,
}
