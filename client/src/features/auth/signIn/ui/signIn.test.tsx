import {render, screen} from '@testing-library/react'
import {SignIn} from './signIn'

jest.mock('@/shared/config/i18n/client', () => ({
  useClientTranslation: jest.fn().mockReturnValue({ t: jest.fn().mockReturnValue('Войти') }),
}))

test('renders SignIn component with correct title', () => {
  render(<SignIn />)

  // Check if the translated text is rendered
  const titleElement = screen.getByText('Войти')
  expect(titleElement).toBeInTheDocument()
})
