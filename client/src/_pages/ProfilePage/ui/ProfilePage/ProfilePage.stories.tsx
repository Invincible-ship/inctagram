import type { Meta, StoryFn, StoryObj } from '@storybook/react'

// import { ProfilePage } from './ProfilePage'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'
import { StateSchema, mockedReduxData } from '@/providers/StoreProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import {
  PostList,
  PostListCardType,
  PostListPage,
  createMockedPostListData,
} from '@/widgets/PostList'
import { VStack } from '@/shared/ui/Stack'
import { ProfileCard } from '@/widgets/ProfileCard'
import { PostDetailsWrapper } from '../PostDetailsWrapper/PostDetailsWrapper'
import { IViewer } from '@/entities/Viewer'
import { FC } from 'react'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

const mockedStoreData: DeepPartial<StateSchema> = {
  user: mockedReduxData.user,
  postList: createMockedPostListData(PostListPage.PROFILE, PostListCardType.IMAGE),
}

const mockedProfileData: IViewer = {
  id: 1,
  userName: 'storybook',
  aboutMe: 'Storybook story',
  avatars: [],
}

const ProfilePage: FC<{ owner: boolean }> = ({ owner }) => {
  const { t } = useClientTranslation(Namespaces.PROFILE_PAGE)

  return (
    <VStack gap="48" max>
      <ProfileCard t={t} owner={owner} profile={mockedProfileData} isLoading={false} />
      <PostList />
      <PostDetailsWrapper />
    </VStack>
  )
}

const meta: Meta<typeof ProfilePage> = {
  title: 'pages/ProfilePage',
  decorators: [
    (Story: StoryFn) => PageDecorator(Story),
    (Story: StoryFn) => StoreDecorator(Story, mockedStoreData),
  ],
  component: ProfilePage,
}

export default meta
type Story = StoryObj<typeof ProfilePage>

export const Owner: Story = {
  render: () => <ProfilePage owner />,
}

export const Viewer: Story = {
  render: () => <ProfilePage owner={false} />,
}