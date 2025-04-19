import { renderHook, act } from "@testing-library/react-hooks";
import useFetchProducts from "../../hooks/useFetchProducts";
import axios from "../../services/axiosInstance";
import '@testing-library/jest-dom';

// Mock the axios instance
jest.mock("../../services/axiosInstance");

describe("boundary", () => {
  it("useFetchProductsHookComponent boundary should fetch products successfully", async () => {
    const productsMock = [{ id: 1, name: "Product 1" }];
    axios.get.mockResolvedValue({ data: productsMock });

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    // After fetching products, loading should be false, and products should be set
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(productsMock);
    expect(result.current.error).toBeNull();
  });

  it("useFetchProductsHookComponent boundary should handle error when fetching products fails", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch"));

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    // After error, loading should be false, and error should be set
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch product data. Please try again later.");
  });
});
