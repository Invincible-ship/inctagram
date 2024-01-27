import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'
import CreateNewPasswordPage from '@/_pages/CreateNewPasswordPage/CreateNewPasswordPage'

const meta: Meta<typeof CreateNewPasswordPage> = {
  title: 'Pages/CreateNewPasswordPage',
  component: CreateNewPasswordPage,
  decorators: [(Story: StoryFn) => PageDecorator(Story), (Story: StoryFn) => StoreDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof CreateNewPasswordPage>

export const Page: Story = {
  render: () => <CreateNewPasswordPage />,
}
