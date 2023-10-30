import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'
import { action } from '@storybook/addon-actions'
import s from './Input.module.scss'
import '@/shared/styles/variables/common/_form.scss'

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <Input
      id="storybook_test"
      onChange={action('onChange')}
      onKeyPress={action('onKeyPress')}
      onEnter={action('onEnter')}
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
      onEnter={action('onEnter')}
      title="Email"
      error={{ type: '', message: 'required' }}
      className={s.errorInput}
    />
  ),
}
