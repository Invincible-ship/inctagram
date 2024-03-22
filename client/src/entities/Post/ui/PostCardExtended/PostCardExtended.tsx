import { Swiper, SwiperSlide } from 'swiper/react'
import { IPost } from '../../model/types/types'
import { FC, useMemo } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { HStack, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PostCardExtended.module.scss'
import { ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
import { AvatarWithUsername } from '@/entities/Profile/ui/AvatarWithUsername'
import { useDateFormatter } from '@/shared/lib/hooks/useDateFormatter/useDateFormatter'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { getFormattedPublciationDate } from '@/shared/utils/getFormattedPublciationDate'
import { PostAdditionalInfo } from '@/entities/Post/ui/PostAdditionalInfo/PostAdditionalInfo'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

type PostCardExtendedProps = {
  className?: string
  onClick?: () => void
  post: IPost
}

export const PostCardExtended: FC<PostCardExtendedProps> = ({ className, post, onClick }) => {
  const { ownerId, userName, avatarOwner, createdAt, description } = post
  const { t: commonT } = useClientTranslation()
  const formatter = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const user = useMemo(
    () => ({
      id: ownerId,
      userName,
      avatarUrl: avatarOwner,
    }),
    [avatarOwner, ownerId, userName],
  )

  return (
    <VStack className={classNames(cls.PostCardExtended, {}, [className])} gap="12">
      <HStack role="link" className={cls.postLink} onClick={onClick}>
        <Swiper
          className={cls.imageContainer}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          centeredSlides={true}
          navigation
          pagination={{ clickable: true }}
        >
          {post?.images?.map(({ url }) => {
            return (
              <SwiperSlide key={url} className={cls.imageSlide}>
                <HStack max>
                  <MyImage src={url} variant={ImageVariant.SQUARE} alt="Post Image" />
                </HStack>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <PostAdditionalInfo className={cls.postAdditionalInfo} />
      </HStack>
      <AvatarWithUsername user={user} />
      <VStack gap="4" max>
        <HStack className={cls.date}>
          {getFormattedPublciationDate(createdAt, formatter, commonT)}
        </HStack>
        <HStack className={cls.description} max>
          {description}
        </HStack>
      </VStack>
    </VStack>
  )
}

export const PostCardExtendedSkeleton = () => {
  return (
    <VStack gap="12" className={cls.Skeleton}>
      <Skeleton width="100%" height="300px" border="5px" />
      <Skeleton width="50%" height="20px" border="5px" />
      <Skeleton width="20%" height="20px" border="5px" />
      <VStack gap="4" max>
        <Skeleton width="100%" height="20px" border="5px" />
        <Skeleton width="100%" height="20px" border="5px" />
        <Skeleton width="85%" height="20px" border="5px" />
      </VStack>
    </VStack>
  )
}
