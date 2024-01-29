import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import cls from './ProfileCard.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { IViewer } from '@/entities/Viewer'

const mockedProfileData: IViewer = {
  id: 1,
  userName: 'storybook',
  aboutMe: 'Storybook story',
  avatars: [],
}

const ProfileCardStory = ({ owner }: { owner: boolean }) => {
  const { t } = useClientTranslation(Namespaces.PROFILE_PAGE)

  return (
    <HStack className={cls.Story} justify="center" max>
      <ProfileCard profile={mockedProfileData} t={t} isLoading={false} owner={owner} />
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
}

export const Viewer: Story = {
  render: () => <ProfileCardStory owner={false} />,
}
