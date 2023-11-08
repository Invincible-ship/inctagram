/* eslint-disable */

import Input from '@/shared/ui/Input/Input'
import { useState } from 'react'
import cls from './CitySelect.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { fetchCities } from './utils/fetchCities'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'

type CitySelectProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  className?: string
  title?: string
  placeholder?: string
  max?: boolean
}

const DEBOUNCE_DELAY = 300

export const CitySelect = <T extends FieldValues>({
  className,
  control,
  name,
  title,
  placeholder,
  max,
}: CitySelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: formValue } }) => {
        const [inputValue, setInputValue] = useState<string>('')
        const [cities, setCities] = useState<string[] | []>([])
        const { t } = useClientTranslation(Namespaces.CITY_SELECT)

        if (!inputValue && formValue) setInputValue(formValue)

        const handleInputChange = async (inputValue: string) => {
          if (!inputValue.length) onChange(null)
          setInputValue(inputValue)

          debouncedSetNewCities(inputValue)
        }

        const handleCityClick = (cityName: string) => () => {
          setInputValue(cityName)
          onChange(cityName)

          setCities([])
        }

        const setNewCities = async (cityValue: string) => {
          const newCities = await fetchCities(cityValue)
          setCities(newCities || [])
        }

        const debouncedSetNewCities = useDebounce(setNewCities, DEBOUNCE_DELAY)

        const mods = {
          [cls.max]: max,
        }

        return (
          <div className={classNames(cls.CitySelect, mods, [className])}>
            <Input
              id={title}
              name={name}
              value={inputValue}
              onChangeText={handleInputChange}
              title={title}
              placeholder={placeholder || t('placeholder')}
              full={max}
            />
            <div className={cls.citiesList}>
              {cities.length > 0 &&
                cities.map(cityName => {
                  return (
                    <p key={cityName} className={cls.cityItem} onClick={handleCityClick(cityName)}>
                      {cityName}
                    </p>
                  )
                })}
            </div>
          </div>
        )
      }}
    />
  )
}
