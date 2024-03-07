import { Swiper, SwiperSlide } from 'swiper/react'
import cls from './ImageSwiper.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import { HStack } from '@/shared/ui/Stack'
import { ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
import { FC, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentPost } from '../../model/selectors/getCurrentPost'

const IMAGE_WIDTH = 1440

type ImageSwiperProps = {
  postId: string
}

export const ImageSwiper: FC<ImageSwiperProps> = memo(({ postId }) => {
  const post = useSelector(getCurrentPost(postId))

  return (
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
              <MyImage src={url} variant={ImageVariant.SQUARE} priority alt="Post Image" />
            </HStack>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
})

ImageSwiper.displayName = 'ImageSwiper'
