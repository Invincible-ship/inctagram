import { render, screen } from '@testing-library/react'
import { ModalWindow } from './ModalWindow'
import Close from '@/shared/assets/icons/close.svg'
import '@testing-library/jest-dom'
import { CloseIcon } from './CloseIcon'

describe('SVG', () => {
	test('renders SVG image', () => {
		render(<CloseIcon />);
		expect(screen.getByTestId('test')).toBeInTheDocument()
		screen.debug()
	});
});

