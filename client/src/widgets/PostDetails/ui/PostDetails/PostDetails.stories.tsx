import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { PostDetails } from '@/widgets/PostDetails/ui/PostDetails/PostDetails'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof PostDetails> = {
  title: 'widgets/PostDetails',
  component: PostDetails,
}

export default meta
type Story = StoryObj<typeof PostDetails>

const url =
  'https://www.ixbt.com/img/n1/news/2021/10/2/22459ff25f8eff76bddf34124cc2c85b16f4cd4a_large.jpg'

const post = {
  avatarOwner: url,
  userName: 'Storybook',
  description: 'Lorem ipsum dolor',
  images: [{ url }, { url }],
  createdAt: '2024-02-22T19:55:50.603Z',
}
export const Post: Story = {
  render: () => {
    return <PostDetails onClose={() => {}} isOpen={true} />
  },
  decorators: [(story: StoryFn) => StoreDecorator(story, { post: { post } })],
}
