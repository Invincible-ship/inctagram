import React from 'react'
import {render, screen} from '@testing-library/react'
import {Header} from "@/widgets/Header"

describe('Header component', () => {
    test('renders header with bell icon', () => {
        render(<Header lng={'en'}/>)
        const bellIcon = screen.getByTestId('bell-icon')
        expect(bellIcon).toBeInTheDocument()
    })
})