import {render, screen} from '@testing-library/react'
import {SignIn} from "./signIn"

test('renders SignIn component with correct title', async () => {
  render(<SignIn />)
  expect(screen.getByTestId('11')).toBeInTheDocument()
})
