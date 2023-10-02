'use client'

import { FC, useContext, useLayoutEffect, useState } from 'react'
import DatePickerInstance from 'react-datepicker'
import './DatePicker.scss'
import { DatePickerHeader } from './DatePickerHeader'
import { LanguageContext } from '@/providers/LanguageProvider/LanguageProvider'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import defaultCalendarIconObj from '@/shared/assets/icons/calendar-default.svg?url'
import errorCalendarIconObj from '@/shared/assets/icons/calendar-error.svg?url'
import cls from './DatePicker.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { customizeDatePickerInput } from '@/shared/ui/DatePicker/utils/customizeDatePickerInput'
import { Control, Controller, FieldError } from 'react-hook-form'

type DatePickerProps = {
  control: Control<any>
  value: string
  error?: FieldError
  title?: string
  range?: boolean
  max?: boolean
  width?: number
}

type Value = Date | null
type RangeValue = [Value, Value]

export const DatePicker: FC<DatePickerProps> = ({
  max,
  width,
  range,
  error,
  control,
  value,
  title,
}) => {
  const [startDate, setStartDate] = useState<Value>(null)
  const [endDate, setEndDate] = useState<Value>(null)
  const lngId = useContext(LanguageContext)
  const { t } = useClientTranslation(lngId, Namespaces.DATE_PICKER)

  useLayoutEffect(() => {
    customizeDatePickerInput({
      defaultCalendarIconObj,
      errorCalendarIconObj,
      max,
      width,
      error,
      value,
    })
  }, [max, width, error, value])

  const placeholderText = range ? t('placeholder-range') : t('placeholder')

  const mods = {
    [cls.max]: max,
  }

  return (
    <Controller
      control={control}
      name={value}
      render={({ field: { onChange, onBlur } }) => {
        const handleChange = (value: Value | RangeValue) => {
          if (value instanceof Array) {
            const [start, end] = value
            setStartDate(start)
            setEndDate(end)
          } else {
            setStartDate(value)
          }

          onChange(value)
        }

        return (
          <div className={classNames(cls.datePickerField, mods)}>
            <label htmlFor={value}>{title}</label>
            <DatePickerInstance
              // @ts-ignore
              renderCustomHeader={params => <DatePickerHeader t={t} {...params} />}
              selected={startDate}
              onChange={handleChange}
              onBlur={onBlur}
              selectsRange={range}
              startDate={range ? startDate : undefined}
              endDate={range ? endDate : undefined}
              placeholderText={placeholderText}
            />
            {error && <span className={cls.datePickerError}>{error.message}</span>}
          </div>
        )
      }}
    />
  )
}
