import { MutableRefObject } from 'react'

export type CreatePostImage = {
  id: number
  src: string
  file: File
}

export type PostData = {
  images: CreatePostImage[] | []
  uploadId?: string
  description?: string
}

export type ICreatePostSchema = {
  postData: PostData
  maxStep: number
  currentStep: number
  previousStep?: number
  nextStep?: number
  isUploadigPhotosLoading: boolean
  isLoading: boolean
  errors: string[]
  draft?: Omit<ICreatePostSchema, 'draft'>
}

export type ComponentCommonProps = {
  onClose: () => void
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
}
