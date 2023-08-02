// Import necessary dependencies
import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { CongratulationUI } from "./CongratulationUI"

describe("CongratulationUI", () => {
  const mockProps = {
    title: "Congratulations!",
    text: "You did it!",
    buttonText: 'Go to Login',
    action: jest.fn()
  }

  it("renders the component with correct props", () => {
    const { getByText } = render(<CongratulationUI {...mockProps} />)
    expect(getByText(mockProps.title)).toBeInTheDocument()
    expect(getByText(mockProps.text)).toBeInTheDocument()
    expect(getByText(mockProps.buttonText)).toBeInTheDocument()
  })

  it("calls the action prop when the button is clicked", () => {
    const { getByRole } = render(<CongratulationUI {...mockProps} />)
    fireEvent.click(getByRole('button'))
    expect(mockProps.action).toHaveBeenCalledTimes(1)
  })
  it("renders svg-image", () => {
    const { getByRole } = render(<CongratulationUI {...mockProps} />)
    expect(getByRole('img')).toBeInTheDocument()
  })
})
