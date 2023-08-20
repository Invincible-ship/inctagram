import React from 'react'
import { render } from '@testing-library/react'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar />)
  })
})
