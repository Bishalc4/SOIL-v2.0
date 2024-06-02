import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Cart from "./Cart"
import { getCartID, findCartItems, updateQuantity } from '../../data/cart'
import { findAllProducts } from "../../data/product";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

//Test case: incrementing and decrementing the quantity of products in the cart
//* Testing scenario: The test here increment the quantity of the first product of the cart and 
// decrement the quantity of the second product of the cart. the test expect the UpdateQuantity function to be
// called with correct parameters


vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

vi.mock('../../data/product', () => ({
  findAllProducts: vi.fn(),
}));

vi.mock('../../data/cart', () => ({
    getCartID: vi.fn(),
    findCartItems: vi.fn(),
    updateQuantity: vi.fn(),
}));

describe('Cart', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

    it('incrementing and decrementing the quantity of products in the cart', async () => {
    // Mock return values for products and cart items
    const mockProducts = [
      { product_id: 8, price: 4.50, special: { special_price: 8 }, imageUrl: 'banana_image', product_name: 'Organic Banana' },
      { product_id: 13, price: 3.50, special: null, imageUrl: 'applei_mage', product_name: 'Organic Apple'},
      { product_id: 4, price: 2.00, special: null, imageUrl: 'lettuce_image', product_name: 'Organic Lettuce'},
    ];
    const mockCartItems = [
      { product_id: 8, quantity: 2 },
      { product_id: 13, quantity: 3 },
       { product_id: 4, quantity: 1 },
    ];

    // Mock implementations of the data fetching functions
    findAllProducts.mockResolvedValue(mockProducts);
    getCartID.mockReturnValue(4);
    findCartItems.mockResolvedValue(mockCartItems);

        render(
            <BrowserRouter>
                <Cart/>
            </BrowserRouter>
        );

    await waitFor(() => {
      expect(screen.getByText('$28.50')).toBeInTheDocument(); 
    });

    // Simulating a click event on the "+" button which increment the quantity of the first product in the cart
    fireEvent.click(screen.getAllByText('+')[0]);  

    await waitFor(() => {
      // Check if the updateQuantity function was called with the correct parameters
      expect(updateQuantity).toHaveBeenCalledWith({ cart_id: 4, product_id: 8, quantity: 3 });
    }); 

    // Simulating a click event on the "-" button which decrement the quantity of the second product in the cart
    fireEvent.click(screen.getAllByText('-')[1]);

    await waitFor(() => {
      // Check if the updateQuantity function was called with the correct parameters
      expect(updateQuantity).toHaveBeenCalledWith({ cart_id: 4, product_id: 13, quantity: 2 });
    });

    });
});