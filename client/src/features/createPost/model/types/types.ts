import { ImageVariant } from '@/shared/ui/MyImage/MyImage'
import { CSSProperties, MutableRefObject } from 'react'

export type CreatePostImage = {
  id: number
  src: string
  file: File
  styles?: CSSProperties
  orientation?: ImageVariant
  scale?: number
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
  toastSizeErrorIdRef: MutableRefObject<string | undefined>
}
