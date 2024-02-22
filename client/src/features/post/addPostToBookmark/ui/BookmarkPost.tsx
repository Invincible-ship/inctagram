import { HStack } from '@/shared/ui/Stack'
import BookmarkIcon from '@/shared/assets/icons/bookmark-outline.svg'

export const BookmarkPost = () => (
  <HStack style={{ cursor: 'pointer' }} align="center">
    <BookmarkIcon />
  </HStack>
)
