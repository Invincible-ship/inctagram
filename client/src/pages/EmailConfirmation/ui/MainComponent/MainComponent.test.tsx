// Import necessary dependencies
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MainComponent } from './MainComponent'
import ImageCongratulation from './../../../../../public/icons/congratulation.svg'

describe('EmailConfirmation', () => {
  const mockProps = {
    title: 'Congratulations!',
    text: 'You did it!',
    buttonText: 'Go to Login',
    action: jest.fn(),
    status: 'some status',
    icon: <ImageCongratulation data-testid="testid img" />,
  }

  it('renders the component with correct props', () => {
    const { getByText } = render(<MainComponent {...mockProps} />)
    expect(getByText(mockProps.title)).toBeInTheDocument()
    expect(getByText(mockProps.text)).toBeInTheDocument()
    expect(getByText(mockProps.buttonText)).toBeInTheDocument()
  })

  it('calls the action prop when the button is clicked', () => {
    const { getByRole } = render(<MainComponent {...mockProps} />)
    fireEvent.click(getByRole('button'))
    expect(mockProps.action).toHaveBeenCalledTimes(1)
  })
  it('renders svg-image', () => {
    const { getByTestId } = render(<MainComponent {...mockProps} />)
    expect(getByTestId('testid img')).toBeInTheDocument()
  })
})
