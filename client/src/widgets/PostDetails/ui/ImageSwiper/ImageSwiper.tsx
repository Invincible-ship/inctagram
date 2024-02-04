import { PostImage } from '@/entities/Post'
import { Swiper, SwiperSlide } from 'swiper/react'
import s from '../../PostDetails.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import { HStack } from '@/shared/ui/Stack'
import { MyImage } from '@/shared/ui/MyImage/MyImage'
import React from 'react'

type Props = {
  images: PostImage[]
}
export const ImageSwiper = ({ images }: Props) => {
  return (
    <Swiper
      className={s.imageContainer}
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      centeredSlides={true}
      navigation
      pagination={{ clickable: true }}
    >
      {images.map(({ url }) => {
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
