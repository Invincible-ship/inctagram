import { render } from '@testing-library/react'
import React from 'react'
import { ForgotPassword } from "./ForgotPassword"

describe('ForgotPassword', () => {
    test('renders forgot password component', () => {
        render(<ForgotPassword />)
    })
})