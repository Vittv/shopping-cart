import { act, renderHook } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
const mockProduct = (id, price = 10) => ({ id, price, title: "Test Product" });

describe("CartContext", () => {
  test("totalQuantity starts at 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.totalQuantity).toBe(0);
  });

  test("totalPrice starts at 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.totalPrice).toBe(0);
  });

  test("addToCart adds product correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 3));
    expect(result.current.cart["1"].quantity).toBe(3);
  });

  test("addToCart accumulates on same product", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 2));
    act(() => result.current.addToCart(mockProduct("1"), 3));
    expect(result.current.cart["1"].quantity).toBe(5);
  });

  test("addToCart blocks quantity of 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 0));
    expect(result.current.cart["1"]).toBeUndefined();
  });

  test("addToCart blocks negative quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), -1));
    expect(result.current.cart["1"]).toBeUndefined();
  });

  test("totalQuantity sums across products", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 2));
    act(() => result.current.addToCart(mockProduct("2"), 4));
    expect(result.current.totalQuantity).toBe(6);
  });

  test("totalPrice calculates correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1", 20), 2));
    act(() => result.current.addToCart(mockProduct("2", 10), 3));
    expect(result.current.totalPrice).toBe(70);
  });

  test("totalPrice updates when quantity changes", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1", 10), 2));
    act(() => result.current.updateQuantity("1", 5));
    expect(result.current.totalPrice).toBe(50);
  });

  test("removeFromCart removes the item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 2));
    act(() => result.current.removeFromCart("1"));
    expect(result.current.cart["1"]).toBeUndefined();
  });

  test("removeFromCart on nonexistent id does not crash", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(() => act(() => result.current.removeFromCart("999"))).not.toThrow();
  });

  test("updateQuantity changes quantity correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 2));
    act(() => result.current.updateQuantity("1", 5));
    expect(result.current.cart["1"].quantity).toBe(5);
  });

  test("updateQuantity blocks 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 2));
    act(() => result.current.updateQuantity("1", 0));
    expect(result.current.cart["1"].quantity).toBe(2);
  });

  test("updateQuantity blocks negative", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 2));
    act(() => result.current.updateQuantity("1", -1));
    expect(result.current.cart["1"].quantity).toBe(2);
  });

  test("totalQuantity updates after remove", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1"), 3));
    act(() => result.current.addToCart(mockProduct("2"), 2));
    act(() => result.current.removeFromCart("1"));
    expect(result.current.totalQuantity).toBe(2);
  });

  test("totalPrice updates after remove", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockProduct("1", 10), 3));
    act(() => result.current.addToCart(mockProduct("2", 20), 1));
    act(() => result.current.removeFromCart("1"));
    expect(result.current.totalPrice).toBe(20);
  });
});
