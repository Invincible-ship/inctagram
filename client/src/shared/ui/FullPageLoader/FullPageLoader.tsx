import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC } from 'react'
import cls from './FullPageLoader.module.scss'
import { Portal } from '@/shared/ui/Portal/Portal'
import { classNames } from '@/shared/lib/classNames/classNames'
import { FlexGap } from '@/shared/ui/Stack/Flex/Flex'

export enum LoaderSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

const loaderGap: Record<LoaderSize, FlexGap> = {
  small: '16',
  medium: '24',
  large: '36',
}

type FullPageLoaderProps = {
  size?: LoaderSize
  label?: string
}

export const FullPageLoader: FC<FullPageLoaderProps> = ({ label, size = LoaderSize.MEDIUM }) => {
  return (
    <Portal>
      <HStack className={cls.container} justify="center" align="center" max>
        <Overlay />
        <VStack
          className={classNames(cls.content, {}, [cls[size]])}
          justify="center"
          align="center"
          gap={loaderGap[size]}
        >
          <span className={classNames(cls.loader, {}, [cls[size]])}></span>
          <HStack>{label}</HStack>
        </VStack>
      </HStack>
    </Portal>
  )
}
