import { useGetAllPaymentsQuery } from '@/entities/Subscription'
import { PaymentsList } from '@/entities/Subscription/ui/PaymentsList/PaymentsList'
import { usePagination, Pagination } from '@/shared/ui/Pagination'
import { VStack } from '@/shared/ui/Stack'
import React, { memo, useMemo } from 'react'
import cls from './SubscriptionsPayments.module.scss'
import { stringToDateTime } from '@/shared/utils/stringToDateTime'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export const SubscriptionsPayments = memo(() => {
  const { currentPage, itemsOnPage, onChangePage, onChangePageAmount } = usePagination()

  const { data: allPayments, isLoading } = useGetAllPaymentsQuery()

  const sortedPayments = useMemo(() => {
    if (!allPayments || allPayments.length == 0) return

    return allPayments.toSorted(
      (a, b) => stringToDateTime(b.dateOfPayment) - stringToDateTime(a.dateOfPayment),
    )
  }, [allPayments])

  const currentPagePayments = useMemo(() => {
    if (!sortedPayments) return

    const startIdx = (currentPage - 1) * +itemsOnPage
    const endIdx = currentPage * +itemsOnPage

    const payments = sortedPayments.slice(startIdx, endIdx)

    return payments
  }, [currentPage, itemsOnPage, sortedPayments])

  const paginationPosition =
    currentPagePayments && currentPagePayments.length < 10 ? 'absolute' : 'static'

  if (isLoading) return <SubscriptionsPaymentsSkeleton />

  return (
    allPayments && (
      <VStack className={cls.SubscriptionsPayments} gap="36" max>
        <PaymentsList payments={currentPagePayments} />
        <Pagination
          className={cls.pagination}
          style={{ position: paginationPosition }}
          itemsLength={allPayments.length}
          currentPage={currentPage}
          itemsOnPage={itemsOnPage}
          onChangePage={onChangePage}
          onChangePageAmount={onChangePageAmount}
        />
      </VStack>
    )
  )
})

const SubscriptionsPaymentsSkeleton = (mobile?: boolean) =>
  mobile ? (
    <VStack gap="12" max>
      <Skeleton width="100%" height={200} border="10px" />
      <Skeleton width="100%" height={200} border="10px" />
      <Skeleton width="100%" height={200} border="10px" />
      <Skeleton width="100%" height={50} border="10px" />
    </VStack>
  ) : (
    <VStack gap="36" max>
      <Skeleton width="100%" height={400} border="10px" />
      <Skeleton width="100%" height={50} border="10px" />
    </VStack>
  )

SubscriptionsPayments.displayName = 'SubscriptionsPayments'
