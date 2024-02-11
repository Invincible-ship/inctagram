import { ComponentProps, FC, memo, useMemo } from 'react'
import cls from './Pagination.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import BackIcon from '@/shared/assets/icons/arrow-ios-back.svg'
import NextIcon from '@/shared/assets/icons/arrow-ios-forward.svg'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Select, SelectItem } from '@/shared/ui/Select/Select'

export type ItemsOnPage = '10' | '20' | '30' | '50' | '100'

const itemsOnPageArr: ItemsOnPage[] = ['10', '20', '30', '50', '100']

type PaginationProps = ComponentProps<'nav'> & {
  itemsLength: number
  onChangePage?: (page: number) => void
  onChangePageAmount?: (itemsOnPage: ItemsOnPage, newCurrentPage?: number) => void
  currentPage: number
  itemsOnPage: ItemsOnPage
}

const PAGE_PLACEHOLDER = '...'
const PAGE_PLACEHOLDER_KEY = () => Math.floor(Math.random() * 1000000)

export const Pagination: FC<PaginationProps> = memo(props => {
  const {
    itemsLength,
    onChangePage,
    onChangePageAmount,
    itemsOnPage,
    currentPage,
    className,
    ...rest
  } = props
  const { t } = useClientTranslation()

  const pages = useMemo(() => {
    return Math.ceil(itemsLength / +itemsOnPage)
  }, [itemsLength, itemsOnPage])

  const visiblePaginationPages = useMemo(() => {
    const pagesArr = Array(pages)
      .fill('')
      .map((_, idx) => idx + 1)

    const visiblePages = []

    if (pages < 8) return pagesArr

    // initial items
    currentPage - 3 > 1 ? visiblePages.push(1) : visiblePages.push(...pagesArr.slice(0, 5))

    // middle itmes
    if (currentPage + 3 < pages) {
      currentPage - 3 > 1
        ? visiblePages.push(
            PAGE_PLACEHOLDER,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            PAGE_PLACEHOLDER,
            pages,
          )
        : visiblePages.push(PAGE_PLACEHOLDER, pages)
    } else {
      // final items
      visiblePages.push(PAGE_PLACEHOLDER, ...pagesArr.slice(-5))
    }

    return visiblePages
  }, [currentPage, pages])

  const handleChangePage = (page: number) => () => onChangePage?.(page)
  const handleChangePageAmount = (amount: ItemsOnPage) => {
    const newCurrentPage =
      +amount > +itemsOnPage ? Math.ceil((currentPage * +itemsOnPage) / +amount) : 1
    onChangePageAmount?.(amount, newCurrentPage)
  }

  const handleBackClick = () => onChangePage?.(currentPage - 1)
  const handleNextClick = () => onChangePage?.(currentPage + 1)

  const isBackItemDisabled = currentPage == 1
  const isNextItemDisabled = currentPage == pages

  const backItemMods = {
    [cls.disabled]: isBackItemDisabled,
  }

  const nextItemMods = {
    [cls.disabled]: isNextItemDisabled,
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={classNames(cls.Pagination, {}, [className])}
      {...rest}
    >
      <ul className={cls.paginationContent}>
        <li className={classNames(cls.paginationItem, backItemMods)}>
          <button className={cls.backBtn} onClick={handleBackClick} disabled={isBackItemDisabled}>
            <BackIcon viewBox="0 0 24 24" width="16" height="16" />
          </button>
        </li>
        {visiblePaginationPages.map(page => {
          const isClickable = page !== PAGE_PLACEHOLDER
          const key = isClickable ? page : PAGE_PLACEHOLDER_KEY()
          const onClick = isClickable ? handleChangePage(page as number) : undefined
          const mods = {
            [cls.active]: page === currentPage,
            [cls.placeholder]: !isClickable,
          }

          return (
            <li key={key} className={classNames(cls.paginationItem, mods)} onClick={onClick}>
              {page}
            </li>
          )
        })}
        <li className={classNames(cls.paginationItem, nextItemMods)}>
          <button className={cls.nextBtn} onClick={handleNextClick} disabled={isNextItemDisabled}>
            <NextIcon viewBox="0 0 24 24" width="16" height="16" />
          </button>
        </li>
      </ul>
      <div className={cls.selectContainer}>
        {t('pagination.pages-amount-1')}
        <Select
          value={itemsOnPage}
          onValueChange={handleChangePageAmount}
          triggerClassName={cls.selectTrigger}
        >
          {itemsOnPageArr.map(amount => (
            <SelectItem key={amount} className={cls.selectItem} value={amount}>
              {amount}
            </SelectItem>
          ))}
        </Select>
        {t('pagination.pages-amount-2')}
      </div>
    </nav>
  )
})

Pagination.displayName = 'Pagination'
