import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarSize } from './Avatar'
import { VStack } from '@/shared/ui/Stack'
import avatarImage from '../../../../public/images/avatar-story.jpg'

const meta: Meta<typeof Avatar> = {
  title: 'shared/Avatar',
  component: Avatar,
}

export default meta
type Story = StoryObj<typeof Avatar>

const AvatarStory = ({ size, src }: { size: AvatarSize; src?: string }) => {
  return (
    <VStack style={{ height: '100vh' }} align="center" justify="center" max>
      <Avatar size={size} src={src} />
    </VStack>
  )
}

export const WithoutPhotoSmall: Story = {
  render: () => <AvatarStory size={AvatarSize.SMALL} />,
}

export const WithoutPhotoMedium: Story = {
  render: () => <AvatarStory size={AvatarSize.MEDIUM} />,
}

export const Small: Story = {
  render: () => <AvatarStory src={avatarImage.src} size={AvatarSize.SMALL} />,
}

export const Medium: Story = {
  render: () => <AvatarStory src={avatarImage.src} size={AvatarSize.MEDIUM} />,
}
