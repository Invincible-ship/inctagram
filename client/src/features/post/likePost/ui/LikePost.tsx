import HeartIcon from '@/shared/assets/icons/heart-outline.svg'
import { HStack } from '@/shared/ui/Stack'

export const LikePost = () => {
  return (
    <HStack style={{ cursor: 'pointer' }} align="center">
      <HeartIcon />
    </HStack>
  )
}
