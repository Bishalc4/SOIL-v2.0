import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import AddCartButton from "./AddCartButton";
import { getUser } from "../../../data/user";
import { getCartID, findCartItems, createCartItem } from "../../../data/cart";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

// Test case: Adding a product to the cart
// Testing scenario: logged in user wants to add a product which has id of 3. The user currently don't have any items in their cart

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

vi.mock('../../../data/user', () => ({
    getUser: vi.fn(),
}));

vi.mock('../../../data/cart', () => ({
    getCartID: vi.fn(),
    findCartItems: vi.fn(),
    createCartItem: vi.fn(),
    updateQuantity: vi.fn(),
}));

describe("AddCartButton", () => {
    it("Add a product to the cart", async () => {
        // Mocking user data and cart data functions for this test case
        getUser.mockReturnValue({ username: 'mbloger' });
        getCartID.mockReturnValue(1);
        findCartItems.mockResolvedValue(null);     // this mocks that user don't have anything in the cart
        createCartItem.mockResolvedValue({});

        // Rendering the AddCartButton component
        render(
            <BrowserRouter>
                <AddCartButton productId={3} />
            </BrowserRouter>
        );

        // check that the button with text "Add to cart" is rendered
        expect(screen.getByText("Add to cart")).toBeInTheDocument();

        // Simulating a click event on the "Add to cart" button
        fireEvent.click(screen.getByText('Add to cart'));

        await waitFor(() => {
            //  check that createCartItem function is called with the correct parameters
            expect(createCartItem).toHaveBeenCalledWith({ cart_id: 1, product_id: 3, quantity: 1 });
        });

    });
});
