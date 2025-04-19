import { renderHook, act } from "@testing-library/react-hooks";
import useCart from "../../hooks/useCart";
import '@testing-library/jest-dom';

describe("boundary", () => {
  test("useCartHookComponent boundary adds product to cart", () => {
    const { result } = renderHook(() => useCart());

    const product = { id: 1, name: "Product 1" };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({ ...product, quantity: 1 });
    expect(result.current.error).toBeNull();
  });

  test("useCartHookComponent boundary removes product from cart", () => {
    const { result } = renderHook(() => useCart());

    const product = { id: 1, name: "Product 1" };

    act(() => {
      result.current.addToCart(product);
      result.current.removeFromCart(product.id);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });
});
