import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import useFetchProducts from "../hooks/useFetchProducts";
import useCart from "../hooks/useCart";
import '@testing-library/jest-dom';

// Mock the custom hooks
jest.mock("../hooks/useFetchProducts");
jest.mock("../hooks/useCart");

describe("boundary", () => {
  test("AppComponent boundary displays loading spinner when products are being fetched", () => {
    useFetchProducts.mockReturnValue({ products: [], loading: true, error: null });
    useCart.mockReturnValue({ cart: [], addToCart: jest.fn(), removeFromCart: jest.fn(), updateQuantity: jest.fn(), error: null });

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("AppComponent boundary displays error message if cart actions fail", () => {
    useFetchProducts.mockReturnValue({ products: [{ id: 1, name: "Product 1" }], loading: false, error: null });
    useCart.mockReturnValue({ cart: [], addToCart: jest.fn(), removeFromCart: jest.fn(), updateQuantity: jest.fn(), error: "Failed to update cart" });

    render(<App />);

    expect(screen.getByText(/failed to update cart/i)).toBeInTheDocument();
  });
});
