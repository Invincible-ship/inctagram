import { getAllSteps } from '../../model/selectors/getAllSteps'
import { resetCreatePostState, setCurrentStep } from '../../model/slice/createPostSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack } from '@/shared/ui/Stack'
import ArrowBackIcon from '@/shared/assets/icons/arrow-back.svg'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import cls from './CreatePostHeader.module.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { getIsLoading } from '../../model/selectors/getIsLoading'
import { getCreatePostErorrs } from '../../model/selectors/getCreatePostErorrs'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

type CreatePostHeaderProps = {
  title: string
  onClose: () => void
  publishPost: () => void
}

export const CreatePostHeader: FC<CreatePostHeaderProps> = ({ title, onClose, publishPost }) => {
  const { t } = useClientTranslation(Namespaces.CREATE_POST)
  const { previousStep, nextStep, currentStep } = useSelector(getAllSteps)
  const isLoading = useSelector(getIsLoading)
  const dispatch = useAppDispatch()

  const handleBackClick = () => {
    if (previousStep) {
      previousStep > 1 ? dispatch(setCurrentStep(previousStep)) : dispatch(resetCreatePostState())
    }
  }

  const next = (step: number) => dispatch(setCurrentStep(step))

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
    <Modal.Header close={onClose}>{title}</Modal.Header>
  )
}
