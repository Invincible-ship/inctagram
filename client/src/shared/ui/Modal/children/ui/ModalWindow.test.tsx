import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import { ModalWindow } from "./ModalWindow"

describe("ModalWindow", () => {
    const mockOnClose = jest.fn()

    const defaultProps = {
        lng: "en",
        onClose: mockOnClose,
        isOpen: true,
        userEmail: "test@example.com",
        title: "Modal Title",
        text: "Modal Text",
    };

    afterEach(() => {
        jest.clearAllMocks()
    });

    it("renders modal window with correct props", () => {
        const { getByTestId, getByText } = render(
            <ModalWindow {...defaultProps} />
        );
        expect(getByTestId("ModalWindow")).toBeInTheDocument()
        expect(getByText("Modal Title")).toBeInTheDocument()
        expect(getByText("Modal Text test@example.com")).toBeInTheDocument()
        expect(getByText("OK")).toBeInTheDocument()
    });

    it("calls onClose when close button is clicked", () => {
        const { getByTestId } = render(<ModalWindow {...defaultProps} />)

        fireEvent.click(getByTestId("closeButton"))

        expect(mockOnClose).toHaveBeenCalled()
    });

    it("calls onClose when OK button is clicked", () => {
        const { getByText } = render(<ModalWindow {...defaultProps} />)

        fireEvent.click(getByText("OK"))

        expect(mockOnClose).toHaveBeenCalled()
    });
});
