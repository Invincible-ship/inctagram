import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import DropdownMenu from './DropdownMenu'
import DropdownIcon from '../../../../public/icons/dropdown-outline.svg'

describe('DropdownMenu', () => {
  const mockProps = {
    icon: <DropdownIcon />,
    t: jest.fn((str: string) => str),
    items: [
      {
        text: 'home',
        icon: <DropdownIcon data-testid="icon1" />,
        iconActive: <DropdownIcon data-testid="icon1-active" />,
        path: '/item1',
      },
    ],
  }

  it('renders', () => {
    const { getByRole } = render(<DropdownMenu {...mockProps} />)
    const button = getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('Dropdown trigger gets clicked and menu opens: data-state=open', () => {
    render(<DropdownMenu {...mockProps} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(button).toHaveAttribute('data-state', 'open')
  })

  it('Dropdown trigger gets clicked and icon is at the DOM', () => {
    render(<DropdownMenu {...mockProps} />)
    fireEvent.click(screen.getByRole('button'))
    const icon = screen.getByTestId('icon1')
    expect(icon).toBeInTheDocument()
  })

  it('Dropdown trigger gets clicked and t function has been called', async () => {
    render(<DropdownMenu {...mockProps} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockProps.t).toBeCalled()
  })
  it('Dropdown trigger gets clicked and text is at the DOM', async () => {
    render(<DropdownMenu {...mockProps} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    const text = screen.getByText('home')
    expect(text).toBeInTheDocument()
  })
})
