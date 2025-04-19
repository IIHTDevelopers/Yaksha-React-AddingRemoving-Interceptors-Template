import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../../components/CartItem";
import '@testing-library/jest-dom';

const mockProduct = { id: 1, title: "Product 1", price: 10, quantity: 2 };
const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();
const mockError = "Failed to update cart";

describe("boundary", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("CartItemComponent boundary displays product information", () => {
        render(
            <CartItem
                product={mockProduct}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
                error={null}
            />
        );

        expect(screen.getByText(/product 1/i)).toBeInTheDocument();
        expect(screen.getByText(/\$10/i)).toBeInTheDocument();
        expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
    });

    test("CartItemComponent boundary calls updateQuantity when 'Increase Quantity' button is clicked", () => {
        render(
            <CartItem
                product={mockProduct}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
                error={null}
            />
        );

        fireEvent.click(screen.getByText(/increase quantity/i));

        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
    });

    test("CartItemComponent boundary calls updateQuantity when 'Decrease Quantity' button is clicked", () => {
        render(
            <CartItem
                product={mockProduct}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
                error={null}
            />
        );

        fireEvent.click(screen.getByText(/decrease quantity/i));

        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
    });

    test("CartItemComponent boundary calls removeFromCart when 'Remove from Cart' button is clicked", () => {
        render(
            <CartItem
                product={mockProduct}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
                error={null}
            />
        );

        fireEvent.click(screen.getByText(/remove from cart/i));

        expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });

    test("CartItemComponent boundary displays error message when error is present", () => {
        render(
            <CartItem
                product={mockProduct}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
                error={mockError}
            />
        );

        expect(screen.getByText(/failed to update cart/i)).toBeInTheDocument();
    });
});
