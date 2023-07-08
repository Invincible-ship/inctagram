import { render } from '@testing-library/react'
import {SignUp} from "@/features/auth/signup";

describe('SignUp', () => {
    test('renders sign up form', () => {
        const { getByText, getByPlaceholderText } = render(<SignUp lng="en" />);
        expect(getByText('Sign Up')).toBeInTheDocument();
        expect(getByPlaceholderText('Epam')).toBeInTheDocument();
        expect(getByPlaceholderText('Epam@epam.com')).toBeInTheDocument();
        expect(getByPlaceholderText('******************')).toBeInTheDocument();
        expect(getByPlaceholderText('Password confirmation')).toBeInTheDocument();
        expect(getByText('Sign Up')).toBeInTheDocument();
        expect(getByText('Do you have an account?')).toBeInTheDocument();
        expect(getByText('Sign In')).toBeInTheDocument();
    });
})