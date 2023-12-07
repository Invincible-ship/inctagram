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

type CreatePostHeaderProps = {
  title: string
  onClose: () => void
}

export const CreatePostHeader: FC<CreatePostHeaderProps> = ({ title, onClose }) => {
  const { previousStep, nextStep, currentStep } = useSelector(getAllSteps)
  const dispatch = useAppDispatch()

  const handleBackClick = () => {
    if (previousStep) {
      previousStep > 1 ? dispatch(setCurrentStep(previousStep)) : dispatch(resetCreatePostState())
    }
  }

  const next = (step: number) => dispatch(setCurrentStep(step))

  // TODO: implement publish post
  const publish = () => {}

  const handleNextclick = () => {
    nextStep ? next(nextStep) : publish()
  }

  return currentStep > 1 ? (
    <HStack className={cls.header} align="center" justify="between" max>
      <ArrowBackIcon className={cls.icon} onClick={handleBackClick} />
      <h3 className={cls.title}>{title}</h3>
      <Button theme={ButtonTheme.TEXT} onClick={handleNextclick}>
        {nextStep ? 'Next' : 'Publsih'}
      </Button>
    </HStack>
  ) : (
    <Modal.Header close={onClose}>{title}</Modal.Header>
  )
}
