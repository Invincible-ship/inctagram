import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './Dropdown'
import { SharedDecorator } from '@/shared/config/storybook/SharedDecorator/SharedDecorator'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { VStack } from '@/shared/ui/Stack'

const DropdownMenuStoryComponent = ({
  position,
}: {
  position?: DropdownMenuContentProps['side']
}) => (
  <VStack style={{ height: '100vh' }} align="center" justify="center" max>
    <DropdownMenu>
      <DropdownMenuTrigger>Storybook trigger</DropdownMenuTrigger>
      <DropdownMenuContent side={position}>
        <DropdownMenuItem>Storybook</DropdownMenuItem>
        <DropdownMenuItem>Storybook</DropdownMenuItem>
        <DropdownMenuItem>Storybook</DropdownMenuItem>
        <DropdownMenuItem>Storybook</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </VStack>
)

const meta: Meta<typeof DropdownMenuStoryComponent> = {
  title: 'shared/DefaultDropdownMenu',
  component: DropdownMenuStoryComponent,
  decorators: [(Story: StoryFn) => SharedDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof DropdownMenuStoryComponent>

export const Top: Story = {
  render: () => <DropdownMenuStoryComponent position="top" />,
}

export const Bottom: Story = {
  render: () => <DropdownMenuStoryComponent position="bottom" />,
}

export const Right: Story = {
  render: () => <DropdownMenuStoryComponent position="right" />,
}

export const Left: Story = {
  render: () => <DropdownMenuStoryComponent position="left" />,
}
