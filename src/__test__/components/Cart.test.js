import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../../components/Cart";
import '@testing-library/jest-dom';

const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();

const mockCart = [
    { id: 1, name: "Product 1", quantity: 2 },
    { id: 2, name: "Product 2", quantity: 1 },
];

describe("boundary", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("CartComponent boundary displays 'Your cart is empty.' when cart is empty", () => {
        render(<Cart cart={[]} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);

        expect(screen.getByText(/your cart is empty./i)).toBeInTheDocument();
    });

    test("CartComponent boundary calls removeFromCart when remove button is clicked", () => {
        render(<Cart cart={mockCart} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);

        const removeButtons = screen.getAllByText(/remove/i);
        fireEvent.click(removeButtons[0]);

        expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });
});
