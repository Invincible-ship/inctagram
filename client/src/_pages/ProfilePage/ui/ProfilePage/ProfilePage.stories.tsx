import type { Meta, StoryFn, StoryObj } from '@storybook/react'
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
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery/useMediaQuery'

const options = {
  page: PostListPage.PROFILE,
  type: PostListCardType.IMAGE,
  amount: 8,
}

const mockedStoreData: DeepPartial<StateSchema> = {
  user: mockedReduxData.user,
  postList: createMockedPostListData(options),
}

const mockedProfileData: IViewer = {
  id: 1,
  userName: 'storybook',
  aboutMe: 'Storybook story',
  avatars: [],
}

const ProfilePageComponent = () => {
  const { t } = useClientTranslation(Namespaces.PROFILE_PAGE)
  const mobile = useMediaQuery('(max-width: 769px)')

  return (
    <VStack gap="48" max>
      <ProfileCard profile={mockedProfileData} mobile={mobile} isLoading={false} />
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
  component: ProfilePageComponent,
}

export default meta
type Story = StoryObj<typeof ProfilePageComponent>

export const ProfilePage: Story = {
  render: () => <ProfilePageComponent />,
}
