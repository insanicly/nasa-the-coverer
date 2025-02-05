import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
    test('should render the provided error message', () => {
        // Given
        const errorMessage = 'An error occurred';

        // When
        const { container } = render(<ErrorMessage message={errorMessage} />);

        // Then
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(container.querySelector(".error")).toBeInTheDocument();
    });
});
