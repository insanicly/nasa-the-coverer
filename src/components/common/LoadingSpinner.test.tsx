import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe('LoadingSpinner', () => {
    test('should render Loading text', () => {
        // Given
        const { container } = render(<LoadingSpinner />);

        // When
        const loadingText = screen.getByText('Loading...');

        // Then
        expect(loadingText).toBeInTheDocument();
        expect(container.querySelector(".spinner")).toBeInTheDocument();
    });
});
