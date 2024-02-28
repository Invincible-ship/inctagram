import { PostImage, getCurrentPost } from '@/entities/Post'
import { Swiper, SwiperSlide } from 'swiper/react'
import s from './ImageSwiper.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import { HStack } from '@/shared/ui/Stack'
import { ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

const IMAGE_WIDTH = 1440

export const ImageSwiper = memo(() => {
  const { images } = useSelector(getCurrentPost)

  const fullImage = useMemo(() => {
    return images.filter(image => (image.width ? image.width == IMAGE_WIDTH : image))
  }, [images])

  return (
    <Swiper
      className={s.imageContainer}
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      centeredSlides={true}
      navigation
      pagination={{ clickable: true }}
    >
      {fullImage?.map(({ url }) => {
        return (
          <SwiperSlide key={url} className={s.imageSlide}>
            <HStack max>
              <MyImage src={url} variant={ImageVariant.SQUARE} alt={''} />
            </HStack>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
})

ImageSwiper.displayName = 'ImageSwiper'
