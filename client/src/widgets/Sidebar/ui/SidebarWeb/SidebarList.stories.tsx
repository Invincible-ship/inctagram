import { Meta, StoryObj } from '@storybook/react'
import { SidebarList } from './Sidebar.List'

const meta: Meta<typeof SidebarList> = {
  title: 'WIDGETS/SideBar/List',
  tags: ['autodocs'],
  component: SidebarList,
  decorators: [
    Story => (
      <div style={{ height: '100vh' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof SidebarList>

export const Sidebar: Story = {}
