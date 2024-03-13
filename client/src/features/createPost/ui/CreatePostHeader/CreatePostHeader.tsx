import { getAllSteps } from '../../model/selectors/getAllSteps'
import {
  resetCreatePostState,
  setCurrentStep,
  setIsModalForward,
  setIsModalBackward,
  setAnimationDirection,
} from '../../model/slice/createPostSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack } from '@/shared/ui/Stack'
import ArrowBackIcon from '@/shared/assets/icons/arrow-back.svg'
import React, { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import cls from './CreatePostHeader.module.scss'
import { ModalHeader } from '@/shared/ui/Modal/Modal'
import { getIsLoading } from '../../model/selectors/getIsLoading'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { ANIMATION_DELAY } from '../../model/consts/aniamtion'
import { AnimationDirection } from '../../model/types/types'

type CreatePostHeaderProps = {
  title: string
  onClose: () => void
  publishPost: () => void
  animationDirection: AnimationDirection
}

export const CreatePostHeader: FC<CreatePostHeaderProps> = memo(
  ({ title, onClose, publishPost, animationDirection }) => {
    const { t } = useClientTranslation(Namespaces.CREATE_POST)
    const { previousStep, nextStep, currentStep } = useSelector(getAllSteps)
    const isLoading = useSelector(getIsLoading)
    const dispatch = useAppDispatch()

    const back = (previousStep: number) => {
      animationDirection !== 'backward' && dispatch(setAnimationDirection('backward'))
      dispatch(setIsModalBackward(true))

      setTimeout(() => {
        dispatch(setIsModalBackward(false))
        dispatch(setCurrentStep(previousStep))
      }, ANIMATION_DELAY)
    }

    const handleBackClick = () => {
      if (!previousStep) return
      if (previousStep < 2) return dispatch(resetCreatePostState())
      back(previousStep)
    }

    const next = (step: number) => {
      animationDirection !== 'forward' && dispatch(setAnimationDirection('forward'))
      dispatch(setIsModalForward(true))

      setTimeout(() => {
        dispatch(setIsModalForward(false))
        dispatch(setCurrentStep(step))
      }, ANIMATION_DELAY)
    }

    const handleNextclick = () => {
      nextStep ? next(nextStep) : publishPost()
    }

    return currentStep > 1 ? (
      <HStack className={cls.header} align="center" justify="between" max>
        <ArrowBackIcon className={cls.icon} onClick={handleBackClick} />
        <h3 className={cls.title}>{title}</h3>
        <Button
          type={!nextStep ? 'submit' : 'button'}
          form={!nextStep ? 'create-post-form' : undefined}
          formAction={undefined}
          theme={ButtonTheme.TEXT}
          onClick={handleNextclick}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {nextStep ? t('next-btn') : t('publish-btn')}
        </Button>
      </HStack>
    ) : (
      <ModalHeader className={cls.defaultHeader} close={onClose}>
        {title}
      </ModalHeader>
    )
  },
)

CreatePostHeader.displayName = 'CreatePostHeader'
