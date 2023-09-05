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

  it('does not render modal when isOpen is false', () => {
    render(<ModalWindow {...ModalWindowMockProps} isOpen={false} />)
    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument()
    expect(screen.queryByText('You have successfully signed up.')).not.toBeInTheDocument()
  })

  it('renders modal with correct title, text and svg-image', () => {
    const { getByText, getByRole, getByTestId } = render(<ModalWindow {...ModalWindowMockProps} />)
    expect(getByText('Modal Title')).toBeInTheDocument()
    expect(getByText('Modal Text test@example.com')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByTestId('svgCloseIcon')).toBeInTheDocument()
  })

  it('renders modal if userEmail={undefined}', () => {
    const { getByText } = render(<ModalWindow {...ModalWindowMockProps} userEmail={undefined} />)
    expect(getByText('Modal Text')).toBeInTheDocument()
  })

  it('calls onClose on a button', () => {
    const { getByRole } = render(<ModalWindow {...ModalWindowMockProps} />)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(ModalWindowMockProps.onClose).toHaveBeenCalled()
  })

  it('calls onClose on an icon', () => {
    const { getByTestId } = render(<ModalWindow {...ModalWindowMockProps} />)
    const iconSpan = getByTestId('svgSpan')
    fireEvent.click(iconSpan)
    expect(ModalWindowMockProps.onClose).toHaveBeenCalled()
  })
})
