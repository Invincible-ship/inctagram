import { LangSwitcher } from '@/features/LangSwitcher'
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: () => jest.fn(),
    }
  },
  useSearchParams() {
    return {
      toString: () => jest.fn<string, any>(),
    }
  },
  usePathname() {
    return ''
  },
}))

describe('LangSwitcher', () => {
  test('Test render', () => {
    render(<LangSwitcher />)
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument()
  })
})
