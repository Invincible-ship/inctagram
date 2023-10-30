import { FieldError } from 'react-hook-form'

type Params = {
  defaultCalendarIconObj: any
  errorCalendarIconObj: any
  name: string
  error?: FieldError
  max?: boolean
  width?: number
}

export function customizeDatePickerInput({
  defaultCalendarIconObj,
  errorCalendarIconObj,
  max,
  width,
  error,
  name,
}: Params) {
  let calendarIconObj = defaultCalendarIconObj

  const $datePickerWrapper = document.querySelector('.react-datepicker-wrapper') as HTMLDivElement
  const $datePickerInput = document.querySelector(
    '.react-datepicker__input-container input',
  ) as HTMLInputElement

  $datePickerInput.id = name

  if (error) {
    $datePickerWrapper.classList.add('error')
    calendarIconObj = errorCalendarIconObj
  } else {
    $datePickerWrapper.classList.remove('error')
  }

  const calendarIcon = new Image(calendarIconObj.width, calendarIconObj.height)
  calendarIcon.src = calendarIconObj.src
  calendarIcon.style.cssText = `
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
    `
  $datePickerWrapper.appendChild(calendarIcon)

  if (max && !width) $datePickerWrapper.style.width = '100%'
  if (!!width && !max) $datePickerWrapper.style.width = `${width}px`
}
