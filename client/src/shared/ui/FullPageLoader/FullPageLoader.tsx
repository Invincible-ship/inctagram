import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC } from 'react'
import cls from './FullPageLoader.module.scss'
import { Portal } from '@/shared/ui/Portal/Portal'

type FullPageLoaderProps = {
  label?: string
}

export const FullPageLoader: FC<FullPageLoaderProps> = ({ label }) => {
  return (
    <Portal>
      <HStack className={cls.container} justify="center" align="center" max>
        <Overlay />
        <VStack className={cls.content} justify="center" align="center" gap="12">
          <span className={cls.loader}></span>
          <HStack>{label}</HStack>
        </VStack>
      </HStack>
    </Portal>
  )
}
