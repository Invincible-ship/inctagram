import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { PostDetails } from './PostDetails'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { PostDetailsVariant } from '../../model/consts/variant'
import { HStack } from '@/shared/ui/Stack'
import { StateSchema } from '@/app/providers/StoreProvider'
import { PostListSchema } from '@/widgets/PostList'

const url =
  'https://www.ixbt.com/img/n1/news/2021/10/2/22459ff25f8eff76bddf34124cc2c85b16f4cd4a_large.jpg'

const post = {
  avatarOwner: url,
  userName: 'Storybook',
  description: 'Lorem ipsum dolor',
  images: [{ url }, { url }],
  createdAt: '2024-02-22T19:55:50.603Z',
}

const postState: DeepPartial<PostListSchema> = {
  ids: ['1'],
  entities: {
    1: {
      id: 1,
      ...post,
    },
  },
}

const meta: Meta<typeof PostDetails> = {
  title: 'widgets/PostDetails',
  component: PostDetails,
  decorators: [(story: StoryFn) => StoreDecorator(story, { postList: postState })],
}

export default meta
type Story = StoryObj<typeof PostDetails>

export const ModalAuthorized: Story = {
  render: () => {
    return (
      <PostDetails variant={PostDetailsVariant.MODAL} postId="1" onClose={() => {}} isOpen={true} />
    )
  },
  decorators: [
    (Story: StoryFn) =>
      StoreDecorator(Story, {
        postList: postState,
        user: {
          authData: {
            userId: 1,
          },
        },
      }),
  ],
}

export const ModalUnauthorized: Story = {
  render: () => {
    return (
      <PostDetails variant={PostDetailsVariant.MODAL} postId="1" onClose={() => {}} isOpen={true} />
    )
  },
}

export const CardAuthorized: Story = {
  render: () => {
    return (
      <HStack justify="center" max>
        <PostDetails
          variant={PostDetailsVariant.CARD}
          postId="1"
          onClose={() => {}}
          isOpen={true}
        />
      </HStack>
    )
  },
  decorators: [
    (Story: StoryFn) =>
      StoreDecorator(Story, {
        postList: postState,
        user: {
          authData: {
            userId: 1,
          },
        },
      }),
  ],
}

export const CardUnauthorized: Story = {
  render: () => {
    return (
      <HStack justify="center" max>
        <PostDetails
          variant={PostDetailsVariant.CARD}
          postId="1"
          onClose={() => {}}
          isOpen={true}
        />
      </HStack>
    )
  },
}
