import { getAllProfilesRequestQuery } from '../model/utils/getAllProfilesRequestQuery'
import { AllProfilesRequestParams, ExtendedProfile, IAvatar, IProfile } from '../model/types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import {
  DELETE_PROFILE_AVATARS_ENDPOINT,
  GET_PROFILE_FOLLOWERS,
  GET_PROFILE_FOLLOWING,
  GET_USER_PROFILE,
  PROFILE_AVATARS_ENDPOINT,
  PROFILE_ENDPOINT,
} from '@/shared/const/apiEndpoints'
import { PROFILE_TAG, USER_TAG } from '@/shared/const/rtk'

export const profileApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // Owner
    getOwnerProfileData: build.query<IProfile, number>({
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
    // Other profiles
    getAllProfiles: build.query<ExtendedProfile[], AllProfilesRequestParams>({
      query: config => getAllProfilesRequestQuery(config),
      providesTags: [PROFILE_TAG],
    }),
    getProfileData: build.query<ExtendedProfile, string>({
      query: userName => `${GET_USER_PROFILE}/${userName}`,
      providesTags: (res, err, userName) => [{ type: PROFILE_TAG, id: userName }],
    }),
    getProfileFollowers: build.query<ExtendedProfile[], string>({
      query: userName => GET_PROFILE_FOLLOWERS(userName),
      providesTags: (res, err, userName) => [{ type: PROFILE_TAG, id: userName }],
    }),
    getProfileFollowing: build.query<ExtendedProfile[], string>({
      query: userName => GET_PROFILE_FOLLOWING(userName),
      providesTags: (res, err, userName) => [{ type: PROFILE_TAG, id: userName }],
    }),
  }),
})

export const getOwnerProfileDataQuery = profileApi.endpoints.getOwnerProfileData.initiate
export const updateProfileFulfilledMatcher = profileApi.endpoints.updateProfile.matchFulfilled
export const updateProfileAvatarsFulfilledMatcher =
  profileApi.endpoints.updateProfileAvatars.matchFulfilled
export const {
  useGetOwnerProfileDataQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileAvatarsMutation,
  useDeleteProfileAvatarsMutation,
  useGetProfileDataQuery,
} = profileApi
