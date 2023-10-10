import { HStack } from '@/shared/ui/Stack'
import { ReactNode, useMemo } from 'react'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import ArrowLeft from '@/shared/assets/icons/arrow-left.svg'
import ArrowRight from '@/shared/assets/icons/arrow-right.svg'
import cls from './DatePickerHeader.module.scss'
import { Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'

export const DatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  t,
}: Partial<ReactDatePickerCustomHeaderProps> & {
  t: TFunction<Namespaces, undefined>
}): ReactNode => {
  const currentMonth = date?.getMonth() as number
  const currentYear = date?.getFullYear()

  const mapMonthIndexToName: Record<number, string> = useMemo(() => {
    return {
      0: t('months.jan'),
      1: t('months.feb'),
      2: t('months.mar'),
      3: t('months.apr'),
      4: t('months.may'),
      5: t('months.june'),
      6: t('months.july'),
      7: t('months.aug'),
      8: t('months.sept'),
      9: t('months.oct'),
      10: t('months.nov'),
      11: t('months.dec'),
    }
  }, [t])

  return (
    <HStack className={cls.datePickerHeader} align="center" max>
      <span className={cls.currentMonthAndYear}>
        {`${mapMonthIndexToName[currentMonth]} ${currentYear}`}
      </span>
      <button
        className={cls.btn}
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <HStack align="center" justify="center">
          <ArrowLeft />
        </HStack>
      </button>
      <button
        className={cls.btn}
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <HStack align="center" justify="center">
          <ArrowRight />
        </HStack>
      </button>
    </HStack>
  )
}
