import { useSelector } from 'react-redux'
import { getPostImages } from '../../model/selectors/getPostImages'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Swiper, SwiperSlide } from 'swiper/react'
import cls from './PublishingPost.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import { AvatarWithUsername } from '@/entities/Profile/ui/AvatarWithUsername'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ChangeEvent, FC, memo, useCallback } from 'react'
import { setPostDescription } from '../../model/slice/createPostSlice'
import { getPostDescription } from '../../model/selectors/getPostDescription'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { IProfile, getProfileData } from '@/entities/Profile'
import { ComponentCommonProps } from '../../model/types/types'
import { classNames } from '@/shared/lib/classNames/classNames'

export const PublishingPost: FC<ComponentCommonProps> = memo(({ className }) => {
  const { t } = useClientTranslation(Namespaces.CREATE_POST)
  const user = useSelector(getProfileData) as IProfile
  const images = useSelector(getPostImages)
  const description = useSelector(getPostDescription)
  const dispatch = useAppDispatch()

  const handlePostDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setPostDescription(e.target.value)),
    [dispatch],
  )

  return (
    <HStack className={classNames(cls.PublishingPost, {}, [className])}>
      <Swiper
        className={cls.imageContainer}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        style={{ width: 490 }}
      >
        {images.map(({ src, orientation, scale, filter }) => (
          <SwiperSlide key={src}>
            <HStack max>
              <MyImage
                src={src}
                variant={orientation}
                filter={filter}
                scale={scale}
                alt="Create Post Image"
                width={490}
                height={490}
                fallback={<Skeleton width={490} height={490} />}
              />
            </HStack>
          </SwiperSlide>
        ))}
      </Swiper>
      <form className={cls.postInfoForm}>
        <VStack className={cls.postInfoContainer} justify="start" max>
          <VStack className={cls.descriptionField} justify="start" gap="24" max>
            <AvatarWithUsername user={user} />
            <TextArea
              className={cls.textarea}
              value={description}
              title={t('post-publishing.textarea-label')}
              onChange={handlePostDescription}
              maxLength={500}
              withCounter
            />
            <span className={cls.underline}></span>
          </VStack>
        </VStack>
      </form>
    </HStack>
  )
})

PublishingPost.displayName = 'PublishingPost'
