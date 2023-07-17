import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Input from "./Input"

describe("Input component", () => {
  test("renders without error", () => {
    render(<Input />)
  })

  test("calls onChange callback when input value changes", () => {
    const handleChange = jest.fn()
    const { getByTestId } = render(<Input onChange={handleChange} />)
    const input = getByTestId("input")
    fireEvent.change(input, { target: { value: "Test" } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.anything())
  })

  test("displays error message when error prop is provided", () => {
    const error = { message: "Required field" }
    const { getByText } = render(<Input error={error} />)
    const errorMessage = getByText(error.message)
    expect(errorMessage).toBeInTheDocument()
  })
})
