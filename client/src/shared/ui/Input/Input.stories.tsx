import type { Meta, StoryObj } from '@storybook/react'
import Input from "./Input";




const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
}

export default meta
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    render: () => <Input title={'Email'} />
}

export const Error: Story = {
    render: () => <Input title={'Email'} className={'error errorLbl error-lbl'} error/>
}



