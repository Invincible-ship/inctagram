import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'
import ForgotPasswordPage from '@/_pages/ForgotPasswordPage/ForgotPasswordPage'

const meta: Meta<typeof ForgotPasswordPage> = {
  title: 'Pages/ForgotPasswordPage',
  component: ForgotPasswordPage,
  decorators: [(Story: StoryFn) => PageDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof ForgotPasswordPage>

export const Page: Story = {
  render: () => <ForgotPasswordPage />,
}
