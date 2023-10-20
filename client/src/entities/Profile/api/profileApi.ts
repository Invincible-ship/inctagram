import { IProfile } from '../model/types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import { PROFILE_ENDPOINT } from '@/shared/const/apiEndpoints'
import { PROFILE_TAG, USER_TAG } from '@/shared/const/rtk'

export const profileApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProfileDataById: build.query<IProfile, number>({
      query: id => `${PROFILE_ENDPOINT}/${id}`,
      providesTags: (result, error, id) => [{ type: PROFILE_TAG, id }],
    }),
    updateProfile: build.mutation<IProfile, Omit<Partial<IProfile>, 'id'>>({
      query: profileData => ({
        method: 'PUT',
        url: PROFILE_ENDPOINT,
        body: profileData,
      }),
      invalidatesTags: result => {
        const id = result?.id
        return [{ type: PROFILE_TAG, id }, PROFILE_TAG]
      },
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

export const getProfileDataByIdQuery = profileApi.endpoints.getProfileDataById.initiate
export const { useGetProfileDataByIdQuery, useUpdateProfileMutation, useDeleteProfileMutation } =
  profileApi
