'use client'

import { CreatePostStep } from '../../model/consts/createPost'
import { getCurrentStep } from '../../model/selectors/getCurrentStep'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { CSSProperties, FC, useCallback, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '@/shared/ui/Modal/Modal'
import CloseModal from '../CloseModal/CloseModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { ComponentCommonProps } from '../../model/types/types'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { getTitle } from '../../model/utils/getTitle'
import { CreatePostHeader } from '../CreatePostHeader/CreatePostHeader'
import './canvas.scss'
import { getCreatePostErorrs } from '../../model/selectors/getCreatePostErorrs'
import toast from 'react-hot-toast'
import { resetCreatePostState } from '../../model/slice/createPostSlice'
import { publishPostThunk } from '../../model/services/publishPostThunk'
import { getIsModalForward } from '../../model/selectors/getIsModalForward'
import { getIsModalBackward } from '../../model/selectors/getIsModalBackward'
import { getAnimationDirection } from '../../model/selectors/getAnimationDirection'
import cls from './CreatePost.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SelectImage } from '../SelectImage/SelectImage'
import { CroppingImage } from '../CroppingImage/CroppingImage'
import { FilteringImage } from '../FilteringImage/FilteringImage'
import { PublishingPost } from '../PublishingPost/PublishingPost'
import { revalidateDataByTag } from '@/shared/lib/serverActions/revalidateDataByTag'
import { POST_TAG } from '@/shared/const/rtk'

const mapStepToValue: Record<number, CreatePostStep> = {
  1: CreatePostStep.SELECT,
  2: CreatePostStep.EDIT,
  3: CreatePostStep.FILTER,
  4: CreatePostStep.PUBLISH,
}

const mapValueToComponent: Record<CreatePostStep, FC<ComponentCommonProps>> = {
  [CreatePostStep.SELECT]: SelectImage,
  [CreatePostStep.EDIT]: CroppingImage,
  [CreatePostStep.FILTER]: FilteringImage,
  [CreatePostStep.PUBLISH]: PublishingPost,
}

export const CreatePost = () => {
  const router = useRouter()
  const sp = useSearchParams()
  const isPostCreating = !!sp.get('createPost')
  const toastSizeErrorIdRef = useRef<string>()
  const [isCloseModalOpen, setIsCloseModalOpen] = useState<boolean>(false)
  const currentStep = useSelector(getCurrentStep)
  const isModalForward = useSelector(getIsModalForward)
  const isModalBackward = useSelector(getIsModalBackward)
  const animationDirection = useSelector(getAnimationDirection)
  const errors = useSelector(getCreatePostErorrs)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(Namespaces.CREATE_POST)

  const closeCreatePostModal = useCallback(() => {
    toast.remove(toastSizeErrorIdRef.current)

    const actualSearchParams = new URLSearchParams(Array.from(sp))
    actualSearchParams.delete('createPost')
    history.pushState(null, '', `?${actualSearchParams.toString()}`)
  }, [sp])

  const handleCreatePostModalClose = useCallback(() => {
    if (mapStepToValue[currentStep] != CreatePostStep.SELECT) {
      return setIsCloseModalOpen(true)
    }

    closeCreatePostModal()
  }, [currentStep, closeCreatePostModal])

  const handleCloseModalClose = () => {
    setIsCloseModalOpen(false)
  }

  const publishPost = useCallback(async () => {
    await dispatch(publishPostThunk())

    if (errors.length) return errors.forEach(error => toast.error(`<Server>: ${error}`))

    toast.success(t('toasts.sizeError'))

    closeCreatePostModal()
    dispatch(resetCreatePostState())
  }, [errors, dispatch, t, closeCreatePostModal])

  const title = useMemo(() => getTitle(currentStep, t), [currentStep, t])

  const CurrentStepComponent = mapValueToComponent[mapStepToValue[currentStep]]

  const mods = useMemo(
    () => ({
      [cls.openBackward]: animationDirection == 'backward',
      [cls.openForward]: animationDirection == 'forward',
      [cls.closingForward]: isModalForward,
      [cls.closingBackward]: isModalBackward,
    }),
    [isModalForward, isModalBackward, animationDirection],
  )

  const modalContentStyles: CSSProperties = {
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgba(51, 51, 51, .5)',
    backdropFilter: 'blur(15px)',
    border: 'none',
  }

  return (
    <>
      <Modal
        contentStyles={modalContentStyles}
        isOpen={isPostCreating}
        onClose={handleCreatePostModalClose}
        withoutAnimation
      >
        <CreatePostHeader
          title={title}
          onClose={handleCreatePostModalClose}
          publishPost={publishPost}
          animationDirection={animationDirection}
        />
        <CurrentStepComponent
          className={classNames(cls.currentStepComponent, mods)}
          toastSizeErrorIdRef={toastSizeErrorIdRef}
        />
      </Modal>
      <CloseModal
        isOpen={isCloseModalOpen}
        onClose={handleCloseModalClose}
        closeCreatePostModal={closeCreatePostModal}
      />
    </>
  )
}
