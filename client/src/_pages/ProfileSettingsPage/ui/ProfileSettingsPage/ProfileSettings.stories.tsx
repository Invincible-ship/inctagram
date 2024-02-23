import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { ProfileSettingsPage } from './ProfileSettingsPage'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'
import { StateSchema, mockedReduxData } from '@/app/providers/StoreProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ProfileSettingValue } from '@/features/editableProfileGeneralInfo'

const mockData: DeepPartial<StateSchema> = {
  user: mockedReduxData.user,
  profile: {
    profileData: {
      id: 1,
      userName: 'storybook',
      firstName: 'storybook',
      lastName: 'storybook',
      city: 'storybook',
      dateOfBirth: new Date('10-10-2000'),
      aboutMe: 'storybook',
    },
  },
}

const meta: Meta<typeof ProfileSettingsPage> = {
  title: 'pages/ProfileSettings',
  decorators: [
    (Story: StoryFn) => PageDecorator(Story),
    (Story: StoryFn) => StoreDecorator(Story, mockData),
  ],
  component: ProfileSettingsPage,
}

export default meta
type Story = StoryObj<typeof ProfileSettingsPage>

export const GeneralInfo: Story = {
  render: () => <ProfileSettingsPage initialTabValue={ProfileSettingValue.GENERAL_INFO} />,
}

export const Devices: Story = {
  render: () => <ProfileSettingsPage initialTabValue={ProfileSettingValue.DEVICES} />,
}

export const AccountManagment: Story = {
  render: () => <ProfileSettingsPage initialTabValue={ProfileSettingValue.ACCOUNT_MANAGMENT} />,
}

export const Payments: Story = {
  render: () => <ProfileSettingsPage initialTabValue={ProfileSettingValue.PAYMENTS} />,
}
