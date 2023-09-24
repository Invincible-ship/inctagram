import { screen } from '@testing-library/react'
import { ConfirmationEmailPage } from './ConfirmationEmailPage'
import { componentRender } from '@/shared/lib/tests/componentRender'
import { useSearchParams } from 'next/navigation'
import { CONFIRMATION_STATUS } from '@/features/auth/confirmationEmailViaCode'

type SearchParams = {
  status?: CONFIRMATION_STATUS
  email?: string
}
const searchParams: Record<CONFIRMATION_STATUS, SearchParams> = {
  success: {
    status: 'success',
  },
  confirm: {
    status: 'confirm',
  },
  invalid: {
    status: 'invalid',
    email: 'example123@test.ru',
  },
}

jest.mock('next/navigation')

function setup(params?: SearchParams) {
  useSearchParams.mockReturnValue(new URLSearchParams(params))
  componentRender(<ConfirmationEmailPage />)
  const heading = screen.getByRole('heading')
  const button = screen.getByRole('button')
  const imageWrapper = screen.getByTestId<HTMLDivElement>('image-wrapper')
  return { heading, button, imageWrapper }
}

describe('Confirmation email page', () => {
  test('Rendering', () => {
    const { heading, button, imageWrapper } = setup()
    expect(useSearchParams).toHaveBeenCalled()
    expect(heading).toHaveTextContent('null.title')
    expect(button).toBeInTheDocument()
    expect(imageWrapper).toBeInTheDocument()
  })

  test('Success status', () => {
    const { heading, button, imageWrapper } = setup(searchParams.success)
    expect(heading).toHaveTextContent('success.title')
    expect(button).toHaveTextContent('success.button-text')
    expect(imageWrapper.style.maxWidth).toEqual('432px')
  })

  test('Confirm status', () => {
    const { heading, button, imageWrapper } = setup(searchParams.confirm)
    expect(heading).toHaveTextContent('confirm.title')
    expect(button).toHaveTextContent('confirm.button-text')
    expect(imageWrapper.style.maxWidth).toEqual('432px')
  })

  test('Invalid status', () => {
    const { heading, button, imageWrapper } = setup(searchParams.invalid)
    expect(heading).toHaveTextContent('invalid.title')
    expect(button).toHaveTextContent('invalid.button-text')
    expect(imageWrapper.style.maxWidth).toEqual('473px')
  })
})
