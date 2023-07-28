// Import necessary dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CongratulationUI } from "./CongratulationUI";

describe("CongratulationUI", () => {
  const mockTitle = "Congratulations!";
  const mockText = "You did it!";
  const mockButtonText = "Go to Login";
  const mockAction = jest.fn();

  it("renders the component with correct props", () => {
    render(
      <CongratulationUI
        title={mockTitle}
        text={mockText}
        action={mockAction}
        buttonText={mockButtonText}
      />
    );
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockText)).toBeInTheDocument();
    expect(screen.getByText(mockButtonText)).toBeInTheDocument();
  });

  it("calls the action prop when the button is clicked", () => {
    render(
      <CongratulationUI
        title={mockTitle}
        text={mockText}
        action={mockAction}
        buttonText={mockButtonText}
      />
    );
    fireEvent.click(screen.getByText(mockButtonText));
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
