import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import cls from './PostDetailsCard.module.scss'
import { PostHeader } from '../PostHeader/PostHeader'
import { FC } from 'react'
import { PostDetailsVariant } from '../../model/consts/variant'
import { ImageSwiper } from '../ImageSwiper/ImageSwiper'
import { PublicationDescription } from '../PublicationDescription/PublicationDescription'
import { Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

type PostDetailsCardProps = {
  postId: string
  t: TFunction<Namespaces, undefined>
  className?: string
}

export const PostDetailsCard: FC<PostDetailsCardProps> = ({ className, postId, t }) => {
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
