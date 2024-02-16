import { ReadonlyURLSearchParams } from 'next/navigation'
import { PaymentMethodFiled } from '../consts/payment'
import { SubscriptionTypeField } from '../consts/subscription'

export type BaseSubscription = {
  userId: number
  subscriptionId: number
  dateOfPayment: string
  endDateOfSubscription: string
}

export type SubscriptionPaymentType = BaseSubscription & {
  price: number
  subscriptionType: SubscriptionTypeField
  paymentType: PaymentMethodFiled
}

export type SubscriptionCurrentType = BaseSubscription & {
  autoRenewal: boolean
}

export type SubscriptionCost = {
  amount: number
  typeDescription: SubscriptionTypeField
}

export type SubscriptionCurrentResponse = {
  data: SubscriptionCurrentType[]
  hasAutoRenewal: boolean
}

export type SubscriptionPaymentResponse = SubscriptionPaymentType[]

export type SubscriptionCostResponse = {
  data: SubscriptionCost[]
}

export type CreateSubscriptionRequest = {
  typeSubscription: SubscriptionTypeField
  paymentType: PaymentMethodFiled
  amount: number
  baseUrl: string
  params?: ReadonlyURLSearchParams
}

export type CreateSubscriptionResopnse = {
  url: string
}
