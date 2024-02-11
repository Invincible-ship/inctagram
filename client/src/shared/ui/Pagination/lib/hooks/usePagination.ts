import { ItemsOnPage } from '@/shared/ui/Pagination/ui/Pagination'
import { useCallback, useState } from 'react'

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsOnPage, setItemsOnPage] = useState<ItemsOnPage>('10')

  const onChangePage = useCallback((page: number) => setCurrentPage(page), [])
  const onChangePageAmount = useCallback((amount: ItemsOnPage, newCurrentPage?: number) => {
    setItemsOnPage(amount)
    newCurrentPage && setCurrentPage(newCurrentPage)
  }, [])

  return {
    currentPage,
    itemsOnPage,
    onChangePage,
    onChangePageAmount,
  }
}
