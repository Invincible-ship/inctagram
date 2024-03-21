import { HStack } from '@/shared/ui/Stack'
import React, { FC } from 'react'
import HeartIcon from '@/shared/assets/icons/heart-outline.svg'
import CommentIcon from '@/shared/assets/icons/message-circle-outline.svg'

type PostAdditionalInfoProps = {
  className?: string
}

export const PostAdditionalInfo: FC<PostAdditionalInfoProps> = ({ className }) => {
  return (
    <HStack className={className} justify="center" align="center">
      <HStack gap="16">
        <HStack gap="4">
          <HeartIcon />
          238
        </HStack>
        <HStack gap="4">
          <CommentIcon />
          18
        </HStack>
      </HStack>
    </HStack>
  )
}
