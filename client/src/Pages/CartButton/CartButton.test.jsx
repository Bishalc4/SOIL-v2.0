import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import CartButton from './CartButton';
import { findAllProducts } from '../../data/product';
import { getCartID, findCartItems } from '../../data/cart';
import '@testing-library/jest-dom';

// Test case: Displaying and updating total price of the cart
// Testing scenario: the test first renders the CartButton component and calculates the total price of the cart and displays it on the screen. 
// Then the cart gets updated which rerenders the CartButton component and calculates the total price of the updated cart and displays it on the screen

// Mocking modules to avoid making actual network requests
vi.mock('../../data/product', () => ({
  findAllProducts: vi.fn(),
}));

vi.mock('../../data/cart', () => ({
  getCartID: vi.fn(),
  findCartItems: vi.fn(),
}));

describe('CartButton', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('displays and updates the total price', async () => {
    // Mock return values for products and cart items
    const mockProducts = [
      { product_id: 1, price: 10, special: { special_price: 8 }, imageUrl: 'url1', product_name: 'Product 1' },
      { product_id: 2, price: 5.50, special: null, imageUrl: 'url2', product_name: 'Product 2' },
    ];
    const mockCartItems = [
      { product_id: 1, quantity: 2 },
      { product_id: 2, quantity: 1 },
    ];

    // Mock implementations of the data fetching functions
    findAllProducts.mockResolvedValue(mockProducts);
    getCartID.mockReturnValue('test-cart-id');
    findCartItems.mockResolvedValue(mockCartItems);

    // Render the CartButton component
    render(<CartButton />);

    // Wait for the async operations to complete and the total price to be calculated
    await waitFor(() => {
      const totalPrice = screen.getByText('$21.50'); // (2 * 8 (special price)) + (1 * 5.50)
      expect(totalPrice).toBeInTheDocument();
    });

    // Mock updated cart items to simulate a change in the cart
    const mockUpdatedCartItems = [
      { product_id: 1, quantity: 2 },
      { product_id: 2, quantity: 5 },
    ];

    findCartItems.mockResolvedValue(mockUpdatedCartItems);

    // Re-render the CartButton component to simulate the cart update
    render(<CartButton />);

    // Wait for the async operations to complete and the updated total price to be calculated
    await waitFor(() => {
      const totalPrice = screen.getByText('$43.50'); // (2 * 8 (special price)) + (5 * 5.50)
      expect(totalPrice).toBeInTheDocument();
    });
  });
});
