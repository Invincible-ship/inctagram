import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For extending Jest matchers
import { ModalWindow } from './ModalWindow'

describe('ModalWindow', () => {
  const ModalWindowMockProps = {
    onClose: jest.fn(),
    isOpen: true,
    userEmail: 'test@example.com',
    title: 'Modal Title',
    text: 'Modal Text',
  }

  it('renders without crashing', () => {
    render(<ModalWindow {...ModalWindowMockProps} />)
  })

  it('renders modal with correct title and text', () => {
    const { getByText, getByRole } = render(<ModalWindow {...ModalWindowMockProps} />)
    expect(getByText('Modal Title')).toBeInTheDocument()
    expect(getByText('Modal Text test@example.com')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('renders modal if userEmail={undefined}', () => {
    const { getByText } = render(<ModalWindow {...ModalWindowMockProps} userEmail={undefined} />)
    expect(getByText('Modal Text')).toBeInTheDocument()
  })

  it('calls onClose when the modal is closed', () => {
    const { getByRole } = render(<ModalWindow {...ModalWindowMockProps} />)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(ModalWindowMockProps.onClose).toHaveBeenCalled()
  })

  it('does not render modal when isOpen is false', () => {
    render(<ModalWindow {...ModalWindowMockProps} isOpen={false} />)
    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument()
    expect(screen.queryByText('You have successfully signed up.')).not.toBeInTheDocument()
  })

  it('renders svg-image', () => {
    const { getByTestId } = render(<ModalWindow {...ModalWindowMockProps} />)
    expect(getByTestId('svgModalWindow')).toBeInTheDocument()
  })
})
