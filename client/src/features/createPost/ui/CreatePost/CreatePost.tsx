import { SelectImage } from '../SelectImage/SelectImage'
import { CreatePostStep } from '../../model/consts/createPost'
import { getCurrentStep } from '../../model/selectors/getCurrentStep'
import { initCreatePostFeature } from '../../model/services/initCreatePostFeature'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '@/shared/ui/Modal/Modal'
import CloseModal from '@/features/createPost/ui/CloseModal/CloseModal'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useRouter, useSearchParams } from 'next/navigation'
import { CroppingImage } from '../CroppingImage/CroppingImage'
import { ComponentCommonProps } from '../../model/types/types'

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
  [CreatePostStep.FILTER]: () => <h1>Choose image filter</h1>,
  [CreatePostStep.PUBLISH]: () => <h1>Publish post</h1>,
}

export const CreatePost = () => {
  const router = useRouter()
  const editableSearchParams = new URLSearchParams(Array.from(useSearchParams()))
  const isPostCreating = !!editableSearchParams.get('createPost')
  const toastSizeErrorIdRef = useRef<string>()
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false)
  const [isCloseModalOpen, setIsCloseModalOpen] = useState<boolean>(false)
  const currentStep = useSelector(getCurrentStep)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initCreatePostFeature())
  }, [])

  useEffect(() => {
    setIsCreatePostModalOpen(isPostCreating)
  }, [isPostCreating])

  const handleCreatePostModalClose = () => {
    editableSearchParams.delete('createPost')

    mapStepToValue[currentStep] != CreatePostStep.SELECT
      ? setIsCloseModalOpen(true)
      : (setIsCreatePostModalOpen(false), router.push(`?${editableSearchParams.toString()}`))
  }

  const handleCloseModalClose = () => {
    setIsCloseModalOpen(false)
  }

  const CurrentStepComponent = mapValueToComponent[mapStepToValue[currentStep]]

  return (
    <>
      <Modal isOpen={isCreatePostModalOpen} onClose={handleCreatePostModalClose} width={490}>
        <Suspense fallback={<CreatePostSkeleton />}>
          <CurrentStepComponent
            toastSizeErrorIdRef={toastSizeErrorIdRef}
            onClose={handleCreatePostModalClose}
          />
        </Suspense>
      </Modal>
      <CloseModal isOpen={isCloseModalOpen} onClose={handleCloseModalClose} />
    </>
  )
}

const CreatePostSkeleton = () => {
  return <Skeleton width="100%" height={50} />
}
