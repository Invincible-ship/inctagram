'use client'

import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { PostDetailsModal } from '../PostDetailsModal/PostDetailsModal'
import { VStack } from '@/shared/ui/Stack'
import { PostHeader } from '@/widgets/PostDetails/ui/PostHeader/PostHeader'
import { PostDetailsVariant } from '../../model/consts/variant'
import { ImageSwiper } from '@/widgets/PostDetails/ui/ImageSwiper/ImageSwiper'
import { PublicationDescription } from '@/widgets/PostDetails/ui/PublicationDescription/PublicationDescription'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PostDetails.module.scss'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useSelector } from 'react-redux'
import { getCurrentPost } from '../../model/selectors/getCurrentPost'
import { getUpdatedPostList } from '@/widgets/PostDetails/model/selectors/getUpdatedPostList'

type PostDetailsProps = {
  postId: string
  className?: string
  variant?: PostDetailsVariant
  isOpen?: boolean
  onClose?: () => void
}

export const PostDetails = ({
  className,
  postId,
  isOpen,
  onClose,
  variant = PostDetailsVariant.MODAL,
}: PostDetailsProps) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)
  const post = useSelector(getCurrentPost(postId))
  const updatedPostList = useSelector(getUpdatedPostList)

  if (!post) return !updatedPostList ? <PostDetailsCardSkeleton /> : null

  if (variant === PostDetailsVariant.MODAL) {
    return <PostDetailsModal isOpen={isOpen} onClose={onClose} t={t} postId={postId} />
  }

  return (
    <VStack className={classNames(cls.PostDetails, {}, [cls.card, className])} gap="12">
      <PostHeader variant={PostDetailsVariant.CARD} postId={postId} />
      <ImageSwiper postId={postId} />
      <PublicationDescription variant={PostDetailsVariant.CARD} postId={postId} t={t} />
    </VStack>
  )
}

export const PostDetailsCardSkeleton = () => (
  <VStack className={classNames(cls.PostDetails, {}, [cls.card])} gap="12">
    <Skeleton width="100%" height="40px" border="10px"></Skeleton>
    <Skeleton width="100%" height="500px" border="10px"></Skeleton>
    <Skeleton width="80%" height="20px" border="5px"></Skeleton>
    <Skeleton width="50%" height="20px" border="5px"></Skeleton>
    <Skeleton width="40%" height="20px" border="5px"></Skeleton>
    <Skeleton width="100%" height="20px" border="5px"></Skeleton>
  </VStack>
)
