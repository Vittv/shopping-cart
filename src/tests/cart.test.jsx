import { act, renderHook } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe("CartContext", () => {
  test("totalQuantity starts at 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.totalQuantity).toBe(0);
  });

  test("addToCart adds quantity correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart("1", 3));
    expect(result.current.cart["1"]).toBe(3);
  });

  test("addToCart accumulates on same product", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart("1", 2));
    act(() => result.current.addToCart("1", 3));
    expect(result.current.cart["1"]).toBe(5);
  });

  test("addToCart blocks quantity of 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart("1", 0));
    expect(result.current.cart["1"]).toBeUndefined();
  });

  test("totalQuantity sums across products", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart("1", 2));
    act(() => result.current.addToCart("2", 4));
    expect(result.current.totalQuantity).toBe(6);
  });
});
