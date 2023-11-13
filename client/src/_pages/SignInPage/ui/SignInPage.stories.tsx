import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { SignInPage } from './SignInPage'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'

const meta: Meta<typeof SignInPage> = {
  title: 'Pages/SignInPage',
  component: SignInPage,
  decorators: [(Story: StoryFn) => PageDecorator(Story), (Story: StoryFn) => StoreDecorator(Story)],
}

export default meta
type Story = StoryObj<typeof SignInPage>

export const Page: Story = {
  render: () => (
    <GoogleOAuthProvider clientId="storybook_test">
      <SignInPage />
    </GoogleOAuthProvider>
  ),
}
