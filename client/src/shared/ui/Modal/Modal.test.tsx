import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For extending Jest matchers
import { Modal } from './Modal'
import { ModalWindow } from '../../../features/auth/emailConfiramtion/ui/ModalWindow/ModalWindow'

describe('ModalWindow', () => {
  const mockProps = {
    children: ModalWindow,
    isOpen: true,
    onClose: jest.fn(),
  }

  const ModalWindowMockProps = {
    onClose: mockProps.onClose,
    isOpen: true,
    userEmail: 'test@example.com',
    title: 'Modal Title',
    text: 'Modal Text',
  }

  it('renders without crashing', () => {
    render(
      <Modal {...mockProps}>
        <ModalWindow {...ModalWindowMockProps} />
      </Modal>,
    )
  })

  it('renders modal with correct title and text', () => {
    const { getByText, getByRole } = render(
      <Modal {...mockProps}>
        <ModalWindow {...ModalWindowMockProps} />
      </Modal>,
    )
    expect(getByText('Modal Title')).toBeInTheDocument()
    expect(getByText('Modal Text test@example.com')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('renders modal if userEmail={undefined}', () => {
    const { getByText } = render(
      <Modal {...mockProps}>
        <ModalWindow {...ModalWindowMockProps} userEmail={undefined} />
      </Modal>,
    )
    expect(getByText('Modal Text')).toBeInTheDocument()
  })

  it('calls onClose when the modal is closed', () => {
    const { getByRole } = render(
      <Modal {...mockProps}>
        <ModalWindow {...ModalWindowMockProps} />
      </Modal>,
    )
    const button = getByRole('button')
    fireEvent.click(button)
    expect(mockProps.onClose).toHaveBeenCalled()
  })

  it('does not render modal when isOpen is false', () => {
    render(
      <Modal {...mockProps}>
        <ModalWindow {...ModalWindowMockProps} isOpen={false} />
      </Modal>,
    )
    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument()
    expect(screen.queryByText('You have successfully signed up.')).not.toBeInTheDocument()
  })
})
