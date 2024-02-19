import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import cls from './ProfileCard.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { IViewer } from '@/entities/Viewer'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const mockedProfileData: IViewer = {
  id: 1,
  userName: 'storybook',
  aboutMe: 'Storybook story',
  avatars: [],
}

const ProfileCardStory = ({ owner }: { owner: boolean }) => {
  return (
    <HStack className={cls.Story} justify="center" max>
      <ProfileCard profile={mockedProfileData} isLoading={false} />
    </HStack>
  )
}

const meta: Meta<typeof ProfileCardStory> = {
  title: 'widgets/ProfileCard',
  component: ProfileCardStory,
}

export default meta
type Story = StoryObj<typeof ProfileCardStory>

export const Owner: Story = {
  render: () => <ProfileCardStory owner />,
  decorators: [(Story: StoryFn) => StoreDecorator(Story, { user: { authData: { userId: 1 } } })],
  parameters: {
    nextRouter: {
      pathname: '[lng]/profile/[id]',
      asPath: 'en/profile/1',
      query: {
        lng: 'en',
        id: '1',
      },
    },
  },
}

export const Viewer: Story = {
  render: () => <ProfileCardStory owner={false} />,
}
