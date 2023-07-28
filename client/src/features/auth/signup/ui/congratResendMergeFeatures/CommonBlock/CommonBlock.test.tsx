import React from 'react';
import { render } from "@testing-library/react"
import { CommonBlock } from './CommonBlock';

describe('CommonBlock component', () => {
  const mockProps = {
    title: 'Test Title',
    text: 'Test Text',
    textSecondPart: 'Test Second Part',
    email: 'test@example.com',
    children: <div>Test Children</div>,
  };

  it('renders without crashing', () => {
    render(<CommonBlock {...mockProps} />);
  });

  it('renders the title correctly', () => {
    const { getByText } = render(<CommonBlock {...mockProps} />);
    const titleElement = getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the text, email and textSecondPart correctly', () => {
    const { getByText } = render(<CommonBlock {...mockProps} />);
    const textElement = getByText(`${mockProps.text} ${mockProps.email} ${mockProps.textSecondPart}`);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the children correctly', () => {
    const { getByText } = render(<CommonBlock {...mockProps} />);
    const childrenElement = getByText('Test Children');
    expect(childrenElement).toBeInTheDocument();
  });

});
