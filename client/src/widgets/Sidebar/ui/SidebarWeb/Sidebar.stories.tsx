import { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'WIDGETS/SideBar',
  tags: ['autodocs'],
  component: Sidebar,
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
type Story = StoryObj<typeof Sidebar>

export const SidebarDefault: Story = {}
