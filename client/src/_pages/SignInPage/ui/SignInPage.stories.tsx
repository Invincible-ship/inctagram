import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { SignInPage } from './SignInPage'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'

const meta: Meta<typeof SignInPage> = {
  title: 'Pages/SignInPage',
  component: SignInPage,
  decorators: [(Story: StoryFn) => PageDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof SignInPage>

export const Page: Story = {
  render: () => <SignInPage />,
}
