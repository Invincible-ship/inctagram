import { TGeneralInfo } from '@/features/editableProfileSettings/model/types/generalInfo'
import { rtkApi } from '@/shared/api/rtkApi'
import { ME_ENDPOINT } from '@/shared/const/apiEndpoints'
import { USER_TAG } from '@/shared/const/rtk'

export const profileApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    updateProfileGeneralInfo: build.mutation<void, Partial<TGeneralInfo>>({
      query: newData => ({
        url: ME_ENDPOINT,
        method: 'PUT',
        body: newData,
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
})

export const { useUpdateProfileGeneralInfoMutation } = profileApi
