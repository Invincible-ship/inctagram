import { render, screen } from "@testing-library/react";
import { Button, ButtonTheme } from "./Button";

describe("Button", () => {
    test("Test render", () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText("TEST")).toBeInTheDocument();
    });

    test("Test secondary theme", () => {
        render(<Button theme={ButtonTheme.SECONDARY}>TEST</Button>);
        expect(screen.getByText("TEST")).toHaveClass("secondary");
        screen.debug();
    });
});