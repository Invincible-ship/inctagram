import Input from '@/shared/ui/Input/Input'
import { FC, useState } from 'react'
import cls from './CitySelect.module.scss'
import axios from 'axios'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

type CitySelectProps = {
  className?: string
  title?: string
  placeholder?: string
  max?: boolean
}

const DEBOUNCE_DELAY = 700

export const CitySelect: FC<CitySelectProps> = ({ className, title, placeholder, max }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [cities, setCities] = useState<string[] | []>([])

  const handleInputChange = async (value: string) => {
    setInputValue(value)

    debouncedSetNewCities(value)
  }

  const handleCityClick = (cityName: string) => () => {
    setInputValue(cityName)
    setCities([])
  }

  const setNewCities = async (value: string) => {
    try {
      const citiesParams = new URLSearchParams({
        input: value,
        types: '(cities)',
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      })

      const citiesResponse = await axios.get(
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_AUTOCOMPLETE_URL as string,
        {
          params: citiesParams,
        },
      )

      const newCities = citiesResponse?.data?.predictions
        ? citiesResponse.data.predictions.map((citiesInfo: any) => citiesInfo?.description)
        : []

      setCities(newCities)
    } catch (err) {
      if (err instanceof Error) {
        console.warn(err)
      }
    }
  }

  const debouncedSetNewCities = useDebounce(setNewCities, DEBOUNCE_DELAY)

  const mods = {
    [cls.max]: max,
  }

  return (
    <div className={classNames(cls.CitySelect, mods, [className])}>
      <Input
        id={title}
        value={inputValue}
        onChangeText={handleInputChange}
        title={title}
        placeholder={placeholder}
        full={max}
      />
      <div className={cls.citiesList}>
        {cities &&
          cities?.map(cityName => {
            return (
              <p key={cityName} className={cls.cityItem} onClick={handleCityClick(cityName)}>
                {cityName}
              </p>
            )
          })}
      </div>
    </div>
  )
}
