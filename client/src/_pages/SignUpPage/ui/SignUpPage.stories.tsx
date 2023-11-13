import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { SignUpPage } from './SignUpPage'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'

const meta: Meta<typeof SignUpPage> = {
  title: 'pages/SignUpPage',
  component: SignUpPage,
  decorators: [(Story: StoryFn) => PageDecorator(Story), (Story: StoryFn) => StoreDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof SignUpPage>

export const Page: Story = {
  render: () => (
    <GoogleOAuthProvider clientId="storybook_test">
      <SignUpPage />
    </GoogleOAuthProvider>
  ),
}
