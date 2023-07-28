import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SignUpModal } from './SignUpModal';

// Mock the useClientTranslation hook
jest.mock('./../../../../../shared/config/i18n/client', () => ({
  useClientTranslation: (lng: string, ns: string, options: string) => {
    const t = (key: string) => {
      const translations: Record<string, string> = {
        'signUpModal.title': 'Test Title',
        'signUpModal.text': 'Test Text',
      };
      return translations[key] || key;
    };
    return { t, i18n: { resolvedLanguage: lng, changeLanguage: jest.fn() } };
  },
}));



describe('SignUpModal component', () => {
  const mockProps = {
    lng: 'en',
    onClose: jest.fn(),
    isOpen: true,
    userEmail: 'test@example.com',
  };

  it('renders without crashing', () => {
    render(<SignUpModal {...mockProps} />);
  });

  it('renders the modal window with the correct title and text', () => {
    const { getByText } = render(<SignUpModal {...mockProps} />);
    const titleElement = getByText('Test Title');
    const textElement = getByText('Test Text test@example.com');
    expect(titleElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('calls onClose when the modal is closed', () => {
    const { getByRole } = render(<SignUpModal {...mockProps} />);
    const closeButton = getByRole('button');
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

});
