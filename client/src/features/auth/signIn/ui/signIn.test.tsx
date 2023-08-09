import {render, screen} from '@testing-library/react'
import {SignIn} from './signIn'

test('renders SignIn component with correct title', () => {
  render(<SignIn lng={'en'}/>)

  // Check if the translated text is rendered
  const titleElement = screen.getByText('Sign In')
  expect(titleElement).toBeInTheDocument()
})
