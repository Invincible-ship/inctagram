import React from 'react'
import { render, screen } from '@testing-library/react'
import DropdownMenu from './DropdownMenu'
import DropdownIcon from '../../../../public/icons/dropdown-outline.svg'

describe('DropdownMenu', () => {
  const mockProps = {
    icon: <DropdownIcon />,
    t: jest.fn(),
    items: [
      {
        text: 'Item 1',
        icon: <DropdownIcon data-testid="icon1" />,
        iconActive: <DropdownIcon data-testid="icon1-active" />,
        path: '/item1',
      },
    ],
  }

  it('render', () => {
    const { getByRole } = render(<DropdownMenu {...mockProps} />)

    const button = getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
