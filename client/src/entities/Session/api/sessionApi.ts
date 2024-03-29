import { Session } from '../model/types/types'
import { rtkApi } from '@/shared/api/rtkApi'
import {
  GET_ALL_SESSIONS,
  TERMINATE_ALL_SESSIONS,
  TERMINATE_SESSION,
} from '@/shared/const/apiEndpoints'
import { SESSION_TAG } from '@/shared/const/rtk'

export const sessionApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getAllSessions: build.query<Session[], void>({
      query: () => GET_ALL_SESSIONS,
      providesTags: [SESSION_TAG],
    }),
    terminateSession: build.mutation<void, number>({
      query: id => ({
        method: 'DELETE',
        url: TERMINATE_SESSION(id),
      }),
      invalidatesTags: [SESSION_TAG],
    }),
    terminateAllSessions: build.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: TERMINATE_ALL_SESSIONS,
      }),
      invalidatesTags: [SESSION_TAG],
    }),
  }),
})

export const {
  useGetAllSessionsQuery,
  useTerminateAllSessionsMutation,
  useTerminateSessionMutation,
} = sessionApi
