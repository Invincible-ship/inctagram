import { IAvatar, IProfile } from '../model/types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import {
  DELETE_PROFILE_AVATARS_ENDPOINT,
  PROFILE_AVATARS_ENDPOINT,
  PROFILE_ENDPOINT,
} from '@/shared/const/apiEndpoints'
import { PROFILE_TAG, USER_TAG } from '@/shared/const/rtk'

export const profileApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // Profile info
    getProfileData: build.query<IProfile, number>({
      query: () => PROFILE_ENDPOINT,
      providesTags: (result, error, id) => [{ type: PROFILE_TAG, id }],
    }),
    updateProfile: build.mutation<void, Partial<IProfile>>({
      query: newProfileInfoWithId => {
        const { id, ...body } = newProfileInfoWithId

        return {
          method: 'PUT',
          url: PROFILE_ENDPOINT,
          body,
        }
      },
      invalidatesTags: (result, error, body) => [{ type: PROFILE_TAG, id: body?.id }, PROFILE_TAG],
    }),
    // Profile avatars
    updateProfileAvatars: build.mutation<
      { avatars: IAvatar[] },
      { formData: FormData; id: string }
    >({
      query: ({ formData }) => ({
        method: 'POST',
        url: PROFILE_AVATARS_ENDPOINT,
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: PROFILE_TAG, id: arg.id }],
    }),
    deleteProfileAvatars: build.mutation<void, string>({
      query: id => ({
        method: 'DELETE',
        url: DELETE_PROFILE_AVATARS_ENDPOINT,
      }),
      invalidatesTags: (result, error, id) => [{ type: PROFILE_TAG, id }],
    }),
    // For testing
    deleteProfile: build.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: PROFILE_ENDPOINT,
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
})

export const getProfileDataQuery = profileApi.endpoints.getProfileData.initiate
export const updateProfileFulfilledMatcher = profileApi.endpoints.updateProfile.matchFulfilled
export const updateProfileAvatarsFulfilledMatcher =
  profileApi.endpoints.updateProfileAvatars.matchFulfilled
export const {
  useGetProfileDataQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileAvatarsMutation,
  useDeleteProfileAvatarsMutation,
} = profileApi
