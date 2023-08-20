import React from 'react'
import { render } from '@testing-library/react'
import { SidebarItem } from './SidebarItem'
import DropdownIcon from '../../../../public/icons/dropdown-outline.svg'

describe('Sidebar', () => {
  const mockProps = {
    onClick: jest.fn(),
    isActive: false,
    text: 'Hello',
    icon: <DropdownIcon />,
    path: '/item',
  }
  it('renders without crashing', () => {
    render(<SidebarItem {...mockProps} />)
  })
})
