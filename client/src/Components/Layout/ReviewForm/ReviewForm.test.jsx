import { describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReviewForm from "./ReviewForm";

describe("ReviewForm", () => {
    it("submit a review with valid text and rating", () => {

        const updateParentState = vi.fn; //don't know what this is doing

        render(<ReviewForm updateParentState={updateParentState} product_id={3}/>)

        // fireEvent.change(screen.getByPlaceholderText(/Share your thoughts about this product here.../i), {
        //     target: { value: 'This fruit was kinda mid ngl.'}
        // });
    });
});