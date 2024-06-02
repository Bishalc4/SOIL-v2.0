//references:
    //https://bogr.dev/blog/react-testing-intro/
    //https://vitest.dev/guide/ui.html

    import { beforeEach, describe, expect, vi, afterEach } from "vitest";
    import { render, screen, fireEvent, waitFor } from "@testing-library/react";
    import ReviewForm from "./ReviewForm";
    import { createReview } from "../../../data/review";
    
    vi.mock('../../../data/review', () => ({
        createReview: vi.fn(),
    }));
    
    describe("ReviewForm", () => {
        //sets the local storage key "user" (the logged in user) to "mbolger"
        beforeEach(() => {
            localStorage.setItem("user", JSON.stringify("mbolger"));
        });
    
        //clears the local storage after the rest has run
        afterEach(() => {
            localStorage.clear();
        });
    
        it("submit a review with text and rating", async () => {
            /*the updateParentState is a function passed to review form to re-render reviews
            when a review has been submitted*/
            const updateParentState = vi.fn();
    
            render(<ReviewForm updateParentState={updateParentState} product_id={3}/>)
    
            //gets the input textfield to write the review
            fireEvent.change(screen.getByPlaceholderText(/Share your thoughts about this product here.../i), {
                target: { value: 'This fruit was kinda mid ngl.'},
            });
    
            //sets the number of stars (the rating)
            const stars = screen.getAllByTestId(/^star-\d$/);
            fireEvent.click(stars[4]);
    
            //submits the review by "clicking" the post button
            const button = screen.getByRole("button");
            fireEvent.click(button);
    
            //checks if the /data folder paramater matched what was passed to it correctly
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