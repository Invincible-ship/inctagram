import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { action } from '@storybook/addon-actions'
import s from './Input.module.scss'
import '@/shared/styles/variables/common/_form.scss'
import { SharedDecorator } from '@/shared/config/storybook/SharedDecorator/SharedDecorator'

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
  decorators: [(Story: StoryFn) => SharedDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <Input
      id="storybook_test"
      onChange={action('onChange')}
      onKeyPress={action('onKeyPress')}
      title="Email"
    />
  ),
}

export const Error: Story = {
  render: () => (
    <Input
      id="storybook_test"
      onChange={action('onChange')}
      onKeyPress={action('onKeyPress')}
      title="Email"
      error={{ type: '', message: 'required' }}
      className={s.errorInput}
    />
  ),
}
