import { PostImage } from '@/entities/Post'
import { Swiper, SwiperSlide } from 'swiper/react'
import s from './ImageSwiper.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import { HStack } from '@/shared/ui/Stack'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import { useMemo } from 'react'

const IMAGE_WIDTH = 1440

type Props = {
  images: PostImage[]
}
export const ImageSwiper = ({ images }: Props) => {
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
      {fullImage.map(({ url }) => {
        return (
          <SwiperSlide key={url}>
            <HStack max>
              <MyImage src={url} alt={''} />
            </HStack>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
