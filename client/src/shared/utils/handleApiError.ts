import { isFetchBaseQueryError } from '@/shared/api/isFetchBaseQueryError'
import { ApiError } from '@/shared/api/types'
import toast from 'react-hot-toast'

export const handleApiError = (err: unknown) => {
  if (isFetchBaseQueryError(err)) {
    const apiError = err.data as ApiError
    Array.isArray(apiError.messages)
      ? apiError.messages.forEach(({ field, message }) =>
          toast.error(`<${capitalize(field)}>: ${message}`),
        )
      : toast.error(apiError.messages)
  } else {
    toast.error('An unexpected error has occured!')
  }
}

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)
