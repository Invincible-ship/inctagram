import { SelectImage } from '../SelectImage/SelectImage'
import { CreatePostStep } from '../../model/consts/createPost'
import { getCurrentStep } from '../../model/selectors/getCurrentStep'
import { initCreatePostFeature } from '../../model/services/initCreatePostFeature'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ReactNode, Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '@/shared/ui/Modal/Modal'
import CloseModal from '@/features/createPost/ui/CloseModal/CloseModal'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useRouter, useSearchParams } from 'next/navigation'

const mapStepToValue: Record<number, CreatePostStep> = {
  1: CreatePostStep.SELECT,
  2: CreatePostStep.EDIT,
  3: CreatePostStep.FILTER,
  4: CreatePostStep.PUBLISH,
}

const mapValueToComponent: Record<CreatePostStep, ReactNode> = {
  [CreatePostStep.SELECT]: <SelectImage />,
  [CreatePostStep.EDIT]: <h1>Edit Image</h1>,
  [CreatePostStep.FILTER]: <h1>Choose image filter</h1>,
  [CreatePostStep.PUBLISH]: <h1>Publish post</h1>,
}

export const CreatePost = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editableSearchParams = new URLSearchParams(Array.from(searchParams))
  const isPostCreating = !!editableSearchParams.get('createPost')
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

  return (
    <>
      <Modal
        className="createPostModal"
        isOpen={isCreatePostModalOpen}
        onClose={handleCreatePostModalClose}
      >
        <Suspense fallback={<CreatePostSkeleton />}>
          {mapValueToComponent[mapStepToValue[currentStep]]}
        </Suspense>
      </Modal>
      <CloseModal isOpen={isCloseModalOpen} onClose={handleCloseModalClose} />
    </>
  )
}

const CreatePostSkeleton = () => {
  return <Skeleton width="100%" height={50} />
}
