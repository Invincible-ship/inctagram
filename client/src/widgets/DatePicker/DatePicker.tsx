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
import { customizeDatePickerInput } from './utils/customizeDatePickerInput'
import { Control, Controller, FieldError } from 'react-hook-form'
import Link from 'next/link'

type DatePickerProps = {
  control: Control<any>
  value: string
  error?: FieldError
  title?: string
  range?: boolean
  max?: boolean
  width?: number
  minDate?: Date
  maxDate?: Date
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
  minDate,
  maxDate,
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

        const birthdayError = (
          <>
            {error?.message}.{' '}
            <Link className={cls.birthdayErrorLink} href="#" target="_blank">
              {t('privacy-policy')}
            </Link>
          </>
        )

        return (
          <div className={classNames(cls.datePickerField, mods)}>
            <label htmlFor={value}>{title}</label>
            <DatePickerInstance
              // @ts-ignore
              renderCustomHeader={params => <DatePickerHeader t={t} {...params} />}
              dateFormat="dd.mm.yyyy"
              selected={startDate}
              onChange={handleChange}
              onBlur={onBlur}
              selectsRange={range}
              startDate={range ? startDate : undefined}
              endDate={range ? endDate : undefined}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText={placeholderText}
            />
            {error && (
              <span className={cls.datePickerError}>
                {error.type == 'too_big' ? birthdayError : error.message}
              </span>
            )}
          </div>
        )
      }}
    />
  )
}
