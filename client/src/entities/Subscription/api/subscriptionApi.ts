import { rtkApi } from '@/shared/api/rtkApi'
import {
  CANCEL_AUTO_RENEWAL,
  CREATE_SUBSCRIPTION,
  GET_ALL_PAYMENTS,
  GET_CURRENT_SUBSCRIPTIONS,
  GET_SUBSCRIPTION_COST,
} from '@/shared/const/apiEndpoints'
import {
  CreateSubscriptionRequest,
  CreateSubscriptionResopnse,
  SubscriptionCostResponse,
  SubscriptionCurrentResponse,
  SubscriptionPaymentResponse,
} from '../model/types/types'
import { SUBSCRIPTION_TAG } from '@/shared/const/rtk'

export const subscriptionApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    // queries
    getCurrentSubscription: build.query<SubscriptionCurrentResponse, void>({
      query: () => GET_CURRENT_SUBSCRIPTIONS,
      providesTags: [SUBSCRIPTION_TAG, { type: SUBSCRIPTION_TAG, id: 'RENEWAL' }],
    }),
    getSubscriptionCost: build.query<SubscriptionCostResponse, void>({
      query: () => GET_SUBSCRIPTION_COST,
    }),
    getAllPayments: build.query<SubscriptionPaymentResponse, void>({
      query: () => GET_ALL_PAYMENTS,
      providesTags: [SUBSCRIPTION_TAG],
    }),
    // mutations
    createSubscription: build.mutation<CreateSubscriptionResopnse, CreateSubscriptionRequest>({
      query: body => ({
        method: 'POST',
        url: CREATE_SUBSCRIPTION,
        body,
      }),
      invalidatesTags: [SUBSCRIPTION_TAG],
    }),
    cancelAutoRenewal: build.mutation<void, void>({
      query: body => ({
        method: 'POST',
        url: CANCEL_AUTO_RENEWAL,
        body,
      }),
      invalidatesTags: [{ type: SUBSCRIPTION_TAG, id: 'RENEWAL' }],
    }),
  }),
})

export const {
  useGetCurrentSubscriptionQuery,
  useGetSubscriptionCostQuery,
  useGetAllPaymentsQuery,
  useCreateSubscriptionMutation,
  useCancelAutoRenewalMutation,
} = subscriptionApi
