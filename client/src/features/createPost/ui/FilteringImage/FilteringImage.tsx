import { ImageFilter, MyImage } from '@/shared/ui/MyImage/MyImage'
import { HStack, VStack } from '@/shared/ui/Stack'
import React, { FC, Suspense, memo, useMemo, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import cls from './FilteringImage.module.scss'
import { getPostImages } from '../../model/selectors/getPostImages'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setPostImageFilter } from '@/features/createPost/model/slice/createPostSlice'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { Swiper as TSwiper } from 'swiper/types'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { ComponentCommonProps } from '../../model/types/types'

export const FilteringImage: FC<ComponentCommonProps> = memo(({ className }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const { t } = useClientTranslation(Namespaces.CREATE_POST)
  const images = useSelector(getPostImages)
  const filters = Object.values(ImageFilter)
  const dispatch = useAppDispatch()

  const currentImage = useMemo(() => images[currentSlide], [images, currentSlide])

  const { id, src, orientation, scale, filter: activeFilter } = currentImage

  const setImageFilter = (id: number, filter: ImageFilter) => () => {
    dispatch(setPostImageFilter({ id, filter }))
  }

  const onSlideChange = ({ activeIndex }: TSwiper) => setCurrentSlide(activeIndex)

  const getImageAlt = (filter?: ImageFilter) =>
    filter
      ? `Create Post Image With ${filter[0].toUpperCase() + filter.slice(1)} Filter`
      : 'Create Post Image'

  return (
    <HStack className={classNames(cls.FilteringImage, {}, [className])} justify="start">
      <Swiper
        className={cls.imageContainer}
        onSlideChange={onSlideChange}
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
                fallback={<Skeleton width={490} height={490} />}
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
                  src={src}
                  variant={orientation}
                  filter={filter}
                  scale={scale}
                  width={102}
                  height={102}
                  alt={getImageAlt(filter)}
                  fallback={<Skeleton width={102} height={102} />}
                />
              </HStack>
              <span>{t(`image-filtering.filters.${filter}`)}</span>
            </VStack>
          )
        })}
      </HStack>
    </HStack>
  )
})

FilteringImage.displayName = 'FilteringImage'
