import Input from '@/shared/ui/Input/Input'
import { useState } from 'react'
import cls from './CitySelect.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { fetchCities } from './utils/fetchCities'

type CitySelectProps<T extends FieldValues> = {
  register?: UseFormRegister<T>
  registerValue?: Path<T>
  setRegisterValue?: UseFormSetValue<T>
  className?: string
  title?: string
  placeholder?: string
  max?: boolean
}

const DEBOUNCE_DELAY = 300

export const CitySelect = <T extends FieldValues>({
  className,
  registerValue,
  setRegisterValue,
  title,
  placeholder,
  max,
}: CitySelectProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [cities, setCities] = useState<string[] | []>([])

  const handleInputChange = async (inputValue: string) => {
    setInputValue(inputValue)

    setRegisterCityValue('')

    debouncedSetNewCities(inputValue)
  }

  const handleCityClick = (cityName: string) => () => {
    setInputValue(cityName)

    setRegisterCityValue(cityName)

    setCities([])
  }

  const setRegisterCityValue = (value: string | null | undefined) => {
    if (setRegisterValue && registerValue)
      setRegisterValue(registerValue, value as PathValue<T, Path<T>>)
  }

  const setNewCities = async (cityValue: string) => {
    const newCities = await fetchCities(cityValue)
    newCities ? setCities(newCities) : setCities([])
  }

  const debouncedSetNewCities = useDebounce(setNewCities, DEBOUNCE_DELAY)

  const mods = {
    [cls.max]: max,
  }

  return (
    <div className={classNames(cls.CitySelect, mods, [className])}>
      <Input
        id={title}
        name={registerValue}
        value={inputValue}
        onChangeText={handleInputChange}
        title={title}
        placeholder={placeholder}
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
}
