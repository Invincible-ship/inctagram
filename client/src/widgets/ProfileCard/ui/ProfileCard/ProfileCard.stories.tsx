import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import cls from './ProfileCard.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { IViewer } from '@/entities/Viewer'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const mockedProfileData: IViewer = {
  id: 1,
  userName: 'storybook',
  aboutMe: 'Storybook story',
  avatars: [],
}

const ProfileCardStory = () => {
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
  render: () => <ProfileCardStory />,
  decorators: [(Story: StoryFn) => StoreDecorator(Story, { user: { authData: { userId: 1 } } })],
  parameters: {
    nextjs: {
      navigation: {
        segments: [['id', '1']],
      },
    },
  },
}

export const Viewer: Story = {
  render: () => <ProfileCardStory />,
}
