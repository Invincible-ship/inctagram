import { SelectImage } from '../SelectImage/SelectImage'
import { CreatePostStep } from '../../model/consts/createPost'
import { getCurrentStep } from '../../model/selectors/getCurrentStep'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '@/shared/ui/Modal/Modal'
import CloseModal from '@/features/createPost/ui/CloseModal/CloseModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { CroppingImage } from '../CroppingImage/CroppingImage'
import { ComponentCommonProps } from '../../model/types/types'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { getTitle } from '../../model/utils/getTitle'
import { CreatePostHeader } from '../CreatePostHeader/CreatePostHeader'
import { FilteringImage } from '../FilteringImage/FilteringImage'
import { PublishingPost } from '../PublishingPost/PublishingPost'
import './canvas.scss'
import { getCreatePostErorrs } from '../../model/selectors/getCreatePostErorrs'
import toast from 'react-hot-toast'
import { resetCreatePostState } from '../../model/slice/createPostSlice'
import { publishPostThunk } from '@/features/createPost/model/services/publishPostThunk'

const mapStepToValue: Record<number, CreatePostStep> = {
  1: CreatePostStep.SELECT,
  2: CreatePostStep.EDIT,
  3: CreatePostStep.FILTER,
  4: CreatePostStep.PUBLISH,
}

const mapValueToComponent: Record<
  CreatePostStep,
  | ForwardRefExoticComponent<Omit<ComponentCommonProps, 'ref'> & RefAttributes<string>>
  | FC<ComponentCommonProps>
> = {
  [CreatePostStep.SELECT]: SelectImage,
  [CreatePostStep.EDIT]: CroppingImage,
  [CreatePostStep.FILTER]: FilteringImage,
  [CreatePostStep.PUBLISH]: PublishingPost,
}

export const CreatePost = () => {
  const router = useRouter()
  const editableSearchParams = new URLSearchParams(Array.from(useSearchParams()))
  const isPostCreating = !!editableSearchParams.get('createPost')
  const toastSizeErrorIdRef = useRef<string>()
  const [isCloseModalOpen, setIsCloseModalOpen] = useState<boolean>(false)
  const currentStep = useSelector(getCurrentStep)
  const errors = useSelector(getCreatePostErorrs)
  const dispatch = useAppDispatch()
  const { t } = useClientTranslation(Namespaces.CREATE_POST)

  const closeCreatePostModal = () => {
    toast.remove(toastSizeErrorIdRef.current)
    editableSearchParams.delete('createPost')
    router.push(`?${editableSearchParams.toString()}`)
  }

  const handleCreatePostModalClose = useCallback(() => {
    if (mapStepToValue[currentStep] != CreatePostStep.SELECT) {
      return setIsCloseModalOpen(true)
    }

    closeCreatePostModal()
  }, [currentStep])

  const handleCloseModalClose = () => {
    setIsCloseModalOpen(false)
  }

  const publishPost = useCallback(async () => {
    await dispatch(publishPostThunk())

    if (errors.length) return errors.forEach(error => toast.error(`<Server>: ${error}`))

    toast.success(t('toasts.sizeError'))

    closeCreatePostModal()
    dispatch(resetCreatePostState())
  }, [errors, dispatch, t])

  const title = useMemo(() => getTitle(currentStep, t), [currentStep, t])

  const CurrentStepComponent = mapValueToComponent[mapStepToValue[currentStep]]

  return (
    <>
      <Modal isOpen={isPostCreating} onClose={handleCreatePostModalClose} withoutAnimation>
        <CreatePostHeader
          title={title}
          onClose={handleCreatePostModalClose}
          publishPost={publishPost}
        />
        <CurrentStepComponent toastSizeErrorIdRef={toastSizeErrorIdRef} />
      </Modal>
      <CloseModal
        isOpen={isCloseModalOpen}
        onClose={handleCloseModalClose}
        closeCreatePostModal={closeCreatePostModal}
      />
    </>
  )
}
