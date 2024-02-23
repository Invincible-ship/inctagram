import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { PostList } from './PostList'
import { StateSchema, mockedReduxData } from '@/app/providers/StoreProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { PostListPage } from '../../model/consts/postListPage'
import { PostListCardType } from '../../model/consts/postListCardType'
import { createMockedPostListData } from '../../model/mock/createMockedPostListData'
import cls from './PostList.module.scss'
import { HStack } from '@/shared/ui/Stack'

const options = {
  page: PostListPage.PROFILE,
  type: PostListCardType.IMAGE,
  amount: 16,
}

const mockedStoreData: DeepPartial<StateSchema> = {
  user: mockedReduxData.user,
  postList: createMockedPostListData(options),
}

const PostListStory = () => {
  return (
    <HStack className={cls.Story} justify="center" max>
      <PostList className={cls.postList} />
    </HStack>
  )
}

const meta: Meta<typeof PostListStory> = {
  title: 'widgets/PostList',
  decorators: [(Story: StoryFn) => StoreDecorator(Story, mockedStoreData)],
  component: PostListStory,
}

export default meta
type Story = StoryObj<typeof PostListStory>

export const ImageType: Story = {
  render: () => <PostListStory />,
}
