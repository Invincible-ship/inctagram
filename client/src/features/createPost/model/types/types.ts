export type ICreatePostSchema = {
  postData: {
    maxStep: number
    currentStep: number
    previousStep?: number
    nextStep?: number
    images: File[] | []
    uploadId?: string
    description?: string
  }
  isUploadigPhotosLoading: boolean
  isLoading: boolean
  errors: string[]
}
