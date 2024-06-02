import { beforeEach, describe, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewForm from "./ReviewForm";
import { createReview } from "../../../data/review";

vi.mock('../../../data/review', () => ({
    createReview: vi.fn(),
}));

describe("ReviewForm", () => {
    beforeEach(() => {
        localStorage.setItem("user", JSON.stringify("mbolger"));
    });

    afterEach(() => {
        localStorage.clear();
    });

    it("submit a review with text and rating", async () => {
        const updateParentState = vi.fn(); //don't know what this is doing

        render(<ReviewForm updateParentState={updateParentState} product_id={3}/>)

        fireEvent.change(screen.getByPlaceholderText(/Share your thoughts about this product here.../i), {
            target: { value: 'This fruit was kinda mid ngl.'},
        });

        const stars = screen.getAllByTestId(/^star-\d$/);

        fireEvent.click(stars[4]);

        const button = screen.getByRole("button");

        fireEvent.click(button);

        await waitFor(() => {
            expect(createReview).toHaveBeenCalledWith({
                text: 'This fruit was kinda mid ngl.',
                rating: 5,
                username: 'mbolger',
                product_id: 3
            });
        });
    });
});