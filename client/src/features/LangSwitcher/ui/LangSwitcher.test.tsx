import { LangSwitcher } from '@/features/LangSwitcher/ui/LangSwitcher'
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: () => jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

describe('LangSwitcher', () => {
  test('Test render', () => {
    render(
      <LangSwitcher currentLngId="en" />
    )
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument()
    screen.debug()
  })
})