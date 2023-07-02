import {Meta, StoryObj} from '@storybook/react'
import {Header} from "@/widgets/Header/ui/Header"

const meta: Meta<typeof Header> = {
    title: 'widgets/Header',
    component: Header,
}

export default meta
type Story = StoryObj<typeof Header>;

export const Default: Story = {
    render: () => <Header lng={'en'}/>,
}