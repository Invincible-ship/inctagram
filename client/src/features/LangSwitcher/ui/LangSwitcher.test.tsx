import { SuspenseLangSwitcher } from '@/features/LangSwitcher/ui/LangSwitcher'
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
    render(<SuspenseLangSwitcher />)
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument()
    screen.debug()
  })
})
