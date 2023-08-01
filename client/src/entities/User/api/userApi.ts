import { rtkApi } from "@/shared/api/rtkApi"
import { USER_TAG } from "@/shared/const/rtk"
import {LoginRequestType, LoginResponseType} from "@/features/auth/signIn/model/types/types"
import { rtkApi } from '@/shared/api/rtkApi';
import { USER_TAG } from '@/shared/const/rtk';
import {
  RegisterParamsType,
  RegisterResponseType,
} from '@/features/auth/signup/model/types/types';

export const userApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    signout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [USER_TAG],
    }),
    signup: build.mutation<RegisterResponseType, RegisterParamsType>({
      query: data => ({
        method: 'POST',
        url: `auth/registration`,
        body: data,
      }),
    }),
    signIn: build.mutation<LoginResponseType, LoginRequestType>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [USER_TAG],
    })
  }),
});
