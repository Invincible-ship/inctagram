import { IProfile } from '../model/types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import { PROFILE_ENDPOINT } from '@/shared/const/apiEndpoints'
import { PROFILE_TAG, USER_TAG } from '@/shared/const/rtk'

export const profileApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProfileData: build.query<IProfile, number | undefined>({
      query: id => `${PROFILE_ENDPOINT}${id ? `/${id}` : ''}`,
      providesTags: (result, error, id) => [{ type: PROFILE_TAG, id }],
    }),
    updateProfile: build.mutation<IProfile, Partial<IProfile>>({
      query: profileData => ({
        method: 'PUT',
        url: PROFILE_ENDPOINT,
        body: profileData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: PROFILE_TAG, id }],
    }),
    // for testing
    deleteProfile: build.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: PROFILE_ENDPOINT,
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
})
