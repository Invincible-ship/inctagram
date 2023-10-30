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
      invalidatesTags: result => [{ type: PROFILE_TAG, id: result?.id }, PROFILE_TAG],
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

export const getProfileDataByIdQuery = profileApi.endpoints.getProfileDataById.initiate
export const {
  useGetProfileDataByIdQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileAvatarsMutation,
  useDeleteProfileAvatarsMutation,
} = profileApi
