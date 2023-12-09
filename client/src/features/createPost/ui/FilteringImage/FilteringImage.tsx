import { ImageFilter, ImageVariant, MyImage } from '@/shared/ui/MyImage/MyImage'
import { HStack, VStack } from '@/shared/ui/Stack'
import React, { CSSProperties, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import cls from './FilteringImage.module.scss'
import { getPostImages } from '../../model/selectors/getPostImages'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setPostImageFilter } from '@/features/createPost/model/slice/createPostSlice'
import { getFilterOriginalStyles } from '@/features/createPost/model/utils/getFilterOriginalStyles'

export const FilteringImage = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [filterOriginalStyles, setFilterOriginalStyles] = useState<CSSProperties>({})
  const images = useSelector(getPostImages)
  const filters = Object.values(ImageFilter)
  const dispatch = useAppDispatch()

  const currentImage = useMemo(() => images[currentSlide], [images, currentSlide])

  const { id, src, orientation, scale, filter: activeFilter } = currentImage

  const setImageFilter = (id: number, filter: ImageFilter) => () => {
    dispatch(setPostImageFilter({ id, filter }))
  }

  const getImageAlt = (filter?: ImageFilter) =>
    filter
      ? `Create Post Image With ${filter[0].toUpperCase() + filter.slice(1)} Filter`
      : 'Create Post Image'

  useLayoutEffect(() => {
    if (orientation != ImageVariant.ORIGINAL) return

    getFilterOriginalStyles(src).then(styles => setFilterOriginalStyles(styles))
  }, [orientation, src])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .original-image-filter-rect::before, .original-image-filter-rect::after {
              inset: ${filterOriginalStyles.inset};
              width: ${filterOriginalStyles.width};
              height: ${filterOriginalStyles.height};
            }
          `,
        }}
      ></style>

      <HStack className={cls.FilteringImage} justify="start">
        <Swiper
          className={cls.imageContainer}
          onActiveIndexChange={({ activeIndex }) => setCurrentSlide(activeIndex)}
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
                  wrapperClassName="original-image-filter-rect"
                  src={src}
                  variant={orientation}
                  filter={filter}
                  scale={scale}
                  alt={getImageAlt(filter)}
                  width={490}
                  height={490}
                />
              </HStack>
            </SwiperSlide>
          ))}
        </Swiper>

        <HStack className={cls.filtersContainer} justify="center" wrap="wrap" gap="24">
          {filters.map(filter => {
            const mods = {
              [cls.active]: filter == activeFilter,
            }

            return (
              <VStack
                key={filter}
                className={classNames(cls.imageWithFilter, mods)}
                onClick={setImageFilter(id, filter)}
                justify="start"
                align="center"
                gap="8"
              >
                <HStack className={cls.imageWrapper} max>
                  <MyImage
                    wrapperClassName="original-image-filter-rect"
                    src={src}
                    variant={orientation}
                    filter={filter}
                    scale={scale}
                    width={102}
                    height={102}
                    alt={getImageAlt(filter)}
                  />
                </HStack>
                <span>{filter}</span>
              </VStack>
            )
          })}
        </HStack>
      </HStack>
    </>
  )
}
