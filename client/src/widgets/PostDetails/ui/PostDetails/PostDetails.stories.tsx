import type { Meta, StoryObj } from '@storybook/react'
import { PostDetails } from '@/widgets/PostDetails/ui/PostDetails/PostDetails'

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
  userName: 'Nikita',
  description: 'Lorem ipsum dolor',
  images: [{ url }, { url }],
}
export const Post: Story = {
  render: () => {
    // @ts-ignore
    return <PostDetails post={post} onClose={() => {}} isOpen={true} />
  },
}
