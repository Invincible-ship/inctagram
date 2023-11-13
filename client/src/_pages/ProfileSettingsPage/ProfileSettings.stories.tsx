import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { ProfileSettingsPage } from './ProfileSettingsPage'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'
import { StateSchema, mockedReduxData } from '@/providers/StoreProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { withQuery } from '@storybook/addon-queryparams'
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
    withQuery,
  ],
  component: ProfileSettingsPage,
}

export default meta
type Story = StoryObj<typeof ProfileSettingsPage>

const ProfilePageWithSP = () => {
  const urlParams = new URLSearchParams(document.location.search)
  const tabValue = urlParams.get('setting') as ProfileSettingValue

  return <ProfileSettingsPage initialTabValue={tabValue} />
}

const StoryComponent = (settingValue: ProfileSettingValue): Story => ({
  parameters: {
    query: {
      setting: settingValue,
    },
  },
  render: () => <ProfilePageWithSP />,
})

export const GeneralInfo = StoryComponent(ProfileSettingValue.GENERAL_INFO)

export const Devices = StoryComponent(ProfileSettingValue.DEVICES)

export const AccountManagment = StoryComponent(ProfileSettingValue.ACCOUNT_MANAGMENT)

export const Payments = StoryComponent(ProfileSettingValue.PAYMENTS)
